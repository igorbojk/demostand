import {Component, OnInit} from '@angular/core';
import {WS} from "../../../shared/constants/websocket.events";
import {WebsocketService} from "../../../shared/services/websocket";

@Component({
    selector: 'app-home-status',
    templateUrl: './home-status.component.html',
    styleUrls: ['./home-status.component.scss']
})
export class HomeStatusComponent implements OnInit {
    statusArr: Array<any> = [];
    config: any = {};
    status: any = {
        door_closed: {
            status: false,
            title: 'Двери закрыты',
            img: 'dver.png'
        },
        window_closed: {
            status: false,
            title: 'Окна закрыты',
            img: 'okno.png'
        },
        eco_mode: {
            status: false,
            title: 'Эко-режим отопления',
            img: 'eco.png'
        },
        house_lock: {
            status: false,
            title: 'Дом поставлен на охрану',
            img: 'oxrana.png'
        },
        motor_off: {
            status: false,
            title: 'Насос выключен',
            img: 'nasos.png'
        },
        water_off: {
            status: false,
            title: 'Подача воды перекрыта',
            img: 'podacha-vodi.png'
        },
        propeller_off: {
            status: false,
            title: 'Вытяжной вентилятор включен',
            img: 'vent.png'
        },
        warm_off: {
            status: false,
            title: 'Котел выключен',
            img: 'kotel.png'
        },
        motor_on: {
            status: false,
            title: 'Насос включен',
            img: 'nasos.png'
        },
        warm_on: {
            status: false,
            title: 'Котел включен',
            img: 'kotel.png'
        },
        light_off: {
            status: false,
            title: 'Свет включен',
            img: 'svet.png'
        },
        elect_on: {
            status: false,
            title: 'Розетки включены',
            img: 'rozetki.png'
        },
        normal_warm: {
            status: false,
            title: 'Обычный режим отопления',
            img: 'otopl.png'
        },
        house_unlocked: {
            status: false,
            title: 'Дом снят с охраны',
            img: 'oxrana.png'
        }
    };

    constructor(private wsService: WebsocketService) {
    }

    ngOnInit() {
        this.wsService.on<any>(WS.ON.MESSAGES)
            .subscribe((
                config: any) => {
                this.config = config;
                console.log(config);
            });
    }

    prepareStatus(config: Object): void {

    }


}
