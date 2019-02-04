import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../../../shared/services/websocket";
import {IMessage} from "../../../shared/models/imessage.model";
import {WS} from "../../../shared/constants/websocket.events";
import {TYPE_EVENT} from "../../../shared/constants/event-type";

@Component({
    selector: 'app-home-body',
    templateUrl: './home-body.component.html',
    styleUrls: ['./home-body.component.scss']
})
export class HomeBodyComponent implements OnInit {

    allRooms : any = {};

    constructor(private wsService: WebsocketService) {
    }

    ngOnInit() {
        this.wsService.on<any>(WS.ON.MESSAGES)
            .subscribe((
                rooms: any) => {
                // this.allRooms = rooms;
                this.checkRoom(rooms);
                console.log(rooms);
            });
    }

    checkAutoHideOff():void {
        setTimeout( () => {
            for (let key in this.allRooms) {
                if (this.allRooms.hasOwnProperty(key)) {
                    if(this.allRooms[key] === 'off'){
                        this.allRooms[key] = null;
                    }
                }
            }
        }, 4000);
    }

    checkRoom(rooms: any):void {
        for (let key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                this.allRooms[TYPE_EVENT[key]] = rooms[key];
            }
        }
        this.checkAutoHideOff();
    }

}
