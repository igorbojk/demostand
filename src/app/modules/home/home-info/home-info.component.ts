import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {WS} from "../../../shared/constants/websocket.events";
import {WebsocketService} from "../../../shared/services/websocket";
import {TYPE_EVENT} from "../../../shared/constants/event-type";

@Component({
    selector: 'app-home-info',
    templateUrl: './home-info.component.html',
    styleUrls: ['./home-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class HomeInfoComponent implements OnInit {

    statusItems: any = [];
    allRooms: any = {};
    status: any = {
        all_light_off: {
            status: false,
            on: 'Весь свет выключен',
            img_on: 'lamp.png',
            img_off: 'lamp.png',
        },
        gostin: {
            status: false,
            on: 'Свет в гостинной включен',
            off: 'Свет в гостинной выключен',
            img_on: 'lamp.png',
            img_off: 'lamp.png',
        },
        kuhnya: {
            status: false,
            on: 'Свет на кухне включен',
            off: 'Свет на кухне выключен',
            img_on: 'lamp.png',
            img_off: 'lamp.png',
        },
        spalnya: {
            status: false,
            on: 'Свет в спальне включен',
            off: 'Свет в спальне выключен',
            img_on: 'lamp.png',
            img_off: 'lamp.png',
        },
        home_lock_status: {
            status: false,
            on: 'Дом открыт',
            off: 'Дом закрыт',
            img_on: 'close.png',
            img_off: 'close.png',
        },
        okno: {
            status: false,
            on: 'Окно открыто',
            off: 'Окно закрыто',
            img_on: 'okno2.png',
            img_off: 'okno2.png'
        },
        okna: {
            status: false,
            on: 'Окна открыты',
            off: 'Окна закрыты',
            img_on: 'okno2.png',
            img_off: 'okno2.png'
        },
        gostin_kondic: {
            status: false,
            on: 'Кондиционер в гостинной включен',
            off: 'Кондиционер в гостинной выключен',
            img_on: 'kondic.png',
            img_off: 'kondic.png',
        },
        spalnya_kondic: {
            status: false,
            on: 'Кондиционер в спальне включен',
            off: 'Кондиционер в спальне выключен',
            img_on: 'kondic.png',
            img_off: 'kondic.png',
        },
        sensor_water: {
            status: false,
            on: 'Сработал датчик влажности',
            img_on: 'datchik-vlag.png',
            img_off: 'datchik-vlag.png'
        },
        water: {
            status: false,
            on: 'Сработал датчик протечки',
            img_on: 'datchik-prot.png',
            img_off: 'datchik-prot.png'
        },
        gostin_rozetka: {
            status: false,
            on: 'Розетка в гостинной включена',
            off: 'Розетка в гостинной выключена',
            img_on: 'rozetka.png',
            img_off: 'rozetka.png'
        },
        kuhnya_rozetka: {
            status: false,
            on: 'Розетка на кухне включена',
            off: 'Розетка на кухне выключена',
            img_on: 'rozetka.png',
            img_off: 'rozetka.png'
        },
        spalnya_rozetka: {
            status: false,
            on: 'Розетка в спальне включена',
            off: 'Розетка в спальне выключена',
            img_on: 'rozetka.png',
            img_off: 'rozetka.png'
        },
        otopl: {
            status: false,
            on: 'Отопление включено',
            off: 'Отопление выключено',
            img_on: 'otopl-vkl.png',
            img_off: 'otopl-vikl.png'
        }
    };

    constructor(private wsService: WebsocketService) {
    }

    checkAutoHideOff():void {
        setTimeout( () => {
            this.statusItems = [];
        }, 4000);
    }

    ngOnInit() {
        this.wsService.on<any>(WS.ON.MESSAGES)
            .subscribe((
                elems: any) => {
                // this.allRooms = rooms;
                console.log(elems);
                this.prepareInfo(elems);
            });
    }

    public trackItem (index: number, item: any) {
        return index;
    }

    getPath(item):string {
        return 'assets/icon/'+item['img_'+item.status];
    }

    getTitle(item):string {
        return item[item.status];
    }

    prepareInfo(elems: any): void {
        this.statusItems = [];
        for (let key in elems) {
            if (elems.hasOwnProperty(key)) {
                let item = this.status[TYPE_EVENT[key]];
                item.status = elems[key];
                this.statusItems.push(item);
            }
        }
        this.checkAutoHideOff();
    }


}
