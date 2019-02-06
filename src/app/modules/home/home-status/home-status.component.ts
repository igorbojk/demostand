import {Component, OnInit} from '@angular/core';
import {WS} from "../../../shared/constants/websocket.events";
import {WebsocketService} from '../../../shared/services/websocket/websocket.service';
import {EVENTS, TYPE_EVENT} from '../../../shared/constants/event-type';

@Component({
    selector: 'app-home-status',
    templateUrl: './home-status.component.html',
    styleUrls: ['./home-status.component.scss']
})
export class HomeStatusComponent implements OnInit {
    statusArr: Array<any> = [];
    config: any = {};
    status: any = {
        door: {
            status: false,
            title: 'Двери закрыты',
            img: 'dver.png'
        },
        window: {
            status: false,
            title: 'Окна закрыты',
            img: 'okno.png'
        },
        eco_mode: {
            status: false,
            title: 'Эко-режим отопления',
            img: 'eco.png'
        },
        house_locked: {
            status: false,
            title: 'Дом поставлен на охрану',
            img: 'oxrana.png'
        },
        house_unlocked: {
            status: false,
            title: 'Дом снят с охраны',
            img: 'oxrana.png'
        },
        motor: {
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
        }
    };

    constructor(private wsService: WebsocketService) {
    }

    ngOnInit() {
        this.wsService.onMessage.subscribe((
            data: any) => {
            if (!data) return
            this.prepareStatus(data.status);
        });
    }

    prepareStatus(elems: any): void {
        this.statusArr = [];
        if (!elems.length) return
        elems.forEach((key) => {
            if (!this.status[key]) return
            let item = this.status[key];
            item.status = key;
            this.statusArr.push(item);
        });

        this.checkAutoHideOff();
    }

    checkAutoHideOff():void {
        setTimeout( () => {
            this.statusArr = [];
        }, 4000);
    }

    getPath(item):string {
        return 'assets/icon/'+item.img;
    }



}
