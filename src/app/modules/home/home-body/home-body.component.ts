import {Component, OnInit} from '@angular/core';
import {IMessage} from "../../../shared/models/imessage.model";
import {WS} from "../../../shared/constants/websocket.events";
import {TYPE_EVENT} from "../../../shared/constants/event-type";
import {WebsocketService} from '../../../shared/services/websocket/websocket.service';

@Component({
    selector: 'app-home-body',
    templateUrl: './home-body.component.html',
    styleUrls: ['./home-body.component.scss']
})
export class HomeBodyComponent implements OnInit {

    allRooms: any = {};

    constructor(private wsService: WebsocketService) {
    }

    ngOnInit() {
        this.wsService.onMessage.subscribe((
            rooms: any) => {
            // this.allRooms = rooms;
            this.checkRoom(rooms);
            console.log(rooms);
        });

    }

// {"kuhnya":"on"}

    checkAutoHideOff(): void {
        setTimeout( () => {
            for (const key in this.allRooms) {
                if (this.allRooms.hasOwnProperty(key)) {
                    if (this.allRooms[key] === 'off') {
                        this.allRooms[key] = null;
                    }
                }
            }
        }, 4000);
    }

    checkRoom(rooms: any): void {

        for (const key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                this.allRooms[TYPE_EVENT[key]] = rooms[key];
            }
        }
        // this.checkAutoHideOff();
    }

}
