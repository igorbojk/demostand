import { Observable, Subject, Observer, interval } from 'rxjs';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/websocket';
import { share, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { IWsMessage, WebSocketConfig } from './websocket.interfaces';


// we inherit from the ordinary Subject
export class RxWebsocketSubject<T> extends Subject<T> {

    private config: WebSocketSubjectConfig<IWsMessage<any>>;
    private reconnection$: Observable<number>;
    private websocket$: WebSocketSubject<any>;
    private connection$: Observer<boolean>;
    private reconnectInterval: number;  // pause between connections
    private reconnectAttempts: number;  // number of connection attempts
    private isConnected: boolean;

    public connectionStatus: Observable<boolean>;

    constructor(wsConfig: WebSocketConfig) {
        super();

        this.reconnectInterval = wsConfig.reconnectInterval || 5000;
        this.reconnectAttempts = wsConfig.reconnectAttempts || 10;

        // connection status
        this.connectionStatus = new Observable((observer) => {
            this.connection$ = observer;
        });

        // config for WebSocketSubject
        // except the url, here is closeObserver and openObserver to update connection status
        this.config = {
            url: wsConfig.url,
            closeObserver: {
                next: (e: CloseEvent) => {
                    this.websocket$ = null;
                    this.connection$.next(false);
                }
            },
            openObserver: {
                next: (e: Event) => {
                    console.warn('WebSocket connected!');
                    this.connection$.next(true);
                }
            }
        };

        // we connect
        this.connect();

        // we follow the connection status and run the reconnect while losing the connection
        this.connectionStatus
            .pipe(share(), distinctUntilChanged())
            .subscribe((isConnected) => {
                this.isConnected = isConnected;

                if (!this.reconnection$ && typeof(isConnected) === 'boolean' && !isConnected) {
                    this.reconnect();
                }
            });
    }

    public connect(): void {
        this.websocket$ = new WebSocketSubject(this.config);

        this.websocket$.subscribe(
            // when receiving a message, we just send it to our Subject
            (message) => this.next(message),
            (error: Event) => {
                if (!this.websocket$) {
                    // in case of an error with a loss of connection, we restore it
                    this.reconnect();
                }
            });
    }

    // WebSocket Reconnect handling
    public reconnect(): void {
        this.reconnection$ = interval(this.reconnectInterval)
            .pipe(takeWhile((v, index) => {
                return index < this.reconnectAttempts && !this.websocket$;
            }));

        this.reconnection$.subscribe(
            () => this.connect(),
            null,
            () => {
                // if the reconnection attempts are failed, then we call complete of our Subject and status
                this.reconnection$ = null;

                if (!this.websocket$) {
                    this.complete();
                    this.connection$.complete();
                }
            });
    }

    // sending the message
    public send(data: IWsMessage<any>): void {
        if (this.isConnected) {
            this.websocket$.next(JSON.stringify(data));
        } else {
            console.error('Connection error!');
        }
    }
}
