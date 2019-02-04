import { Injectable, OnDestroy, Inject } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { IWebsocketService, IWsMessage, WebSocketConfig } from './websocket.interfaces';
import { RxWebsocketSubject } from './websocket.subject';
import { config } from './websocket.config';


@Injectable({
    providedIn: 'root'
})
export class WebsocketService implements IWebsocketService, OnDestroy {

    private websocketSub: SubscriptionLike;
    private websocket$: RxWebsocketSubject<IWsMessage<any>>;

    constructor(@Inject(config) private wsConfig: WebSocketConfig) {
        // init websocket connetcion
        this.websocket$ = new RxWebsocketSubject<IWsMessage<any>>(wsConfig);

        this.websocketSub = this.websocket$.subscribe(
            null,
            (error: ErrorEvent) => console.error('WebSocket error!', error)
        );
    }

    ngOnDestroy() {
        this.websocketSub.unsubscribe();
    }

    // on message event
    public on<T>(event: string): Observable<T> {
        if (event) {
            return this.websocket$.pipe(
                filter((message: IWsMessage<T>) => message.event === event),
                map((message: IWsMessage<T>) => message.data)
            );
        }
    }

    // on message to server
    public send(event: string, data: any = {}): void {
        if (event) {
            const emitData: IWsMessage<any> = { event, data };

           this.websocket$.send(emitData);
        }
    }

}
