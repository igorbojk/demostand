import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject, Subject, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // Объявление всех массивов данных
  //  defaultServerUrl = '188.120.233.76:8000'; //Remote server for test
  //  defaultServerUrl = '172.16.100.200:8000'; // Real local server
  //  defaultServerUrl = '178.57.106.214:8000'; // Real local server with remote access  
  //   defaultServerUrl = 'localhost:8000'; //localhost for test
    defaultServerUrl = '188.120.233.76:8000'; //localhost for test
  serverUrl;

  roomsArr: Array<any>;
  settingsArr: Array<any>;
  scenesArr: Array<any>;
  settingsChange = new BehaviorSubject<any>(undefined);
  roomsChange = new BehaviorSubject<any>(undefined);
  scenesChange = new BehaviorSubject<any>(undefined);
  eventsArr: Array<any>;
  usersArr: Array<any>;
  eventsChange = new BehaviorSubject<any>(undefined);
  usersChange = new BehaviorSubject<any>(undefined);

  panelColor = '#004f92';
  colorChange;

  defaultDashbord;
  defaultDashbordChange = new BehaviorSubject<any>(undefined);

  userId;

  socketGetURL;
  socketSendURL;

  socketGet;
  socketSend;

  loadingChange = new BehaviorSubject<any>(undefined);

  error;
  errorChange = new BehaviorSubject<any>(undefined);

  onMessage = new BehaviorSubject<any>(undefined);

  public messages: Subject<any>;


  constructor(private http: HttpClient) {
    // this.userId = localStorage.getItem('userId');
    this.userId = 'tester0192';
    this.serverUrl = localStorage.getItem('serverUrl');

    if (!this.userId) {
      this.generateUserId();
    }

    //console.log('IDDDDD');
    //console.log(this.userId);


    if (!this.serverUrl) {
      this.serverUrl = this.defaultServerUrl;
    }
    //console.log(this.serverUrl);

    if (localStorage.getItem('panelColor')) {
      this.panelColor = localStorage.getItem('panelColor');
    }
    this.colorChange = new BehaviorSubject<any>(this.panelColor);

    this.getItems();

    this.startWebSocket();
  }

  // Функция первоначальной загрузки данных
  webSocketSendFirstStart() {
    this.socketSend.onopen = () => {
      //console.log(' Send Start');
      this.wsSend(this.userId, 'checkuser');


    };
    this.socketSend.onclose = () => {
      //console.log('Socket Send Close');
      this.webSocketSendFirstStart();
    };
  }

  // Подключение Веб Сокета
  startWebSocket() {
    this.socketGetURL = 'ws://' + this.serverUrl + '/?user=' + this.userId;
    this.socketSendURL = 'ws://' + this.serverUrl + '/?user=' + this.userId + '_2';


    this.socketGet = new WebSocket(this.socketGetURL);
    this.socketSend = new WebSocket(this.socketSendURL);

    //console.log('Start Web Socket');
    this.socketGet = new WebSocket(this.socketGetURL);
    this.socketSend = new WebSocket(this.socketSendURL);
    this.webSocketSendFirstStart();
    // Слушатели сообщений Web Socket'a
    this.socketGet.onopen = () => {
      this.socketGet.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.onMessage.next(data);
      };
    };
    this.socketGet.onerror = (event) => {
      //console.log('error: ' + event);
      //console.log(event);
    };

    this.socketGet.onclose = (event) => {
      //console.log('Socket Get Close');
      this.reconnectToServer();
      this.errorChange.next('SocketClose');
    };
  }

  // Загрузка item'ов
  setItems(items) {
    items.forEach((item, itemIndex) => {
      this.roomsArr.forEach((room, roomIndex) => {
        room.items.forEach((roomItem, roomItemIndex) => {
          if (item.id === roomItem.id) {
            this.roomsArr[roomIndex].items[roomItemIndex] = item;
          }
        });
      });
    });
    this.roomsChange.next(this.roomsArr);
  }


  // Загрузка настроек
  setSettings(items) {
    items.forEach((item, itemIndex) => {
      this.settingsArr.forEach((settingItem, settingIndex) => {
        if (item.id === settingItem.id) {
          this.settingsArr[settingIndex] = item;
          //console.log('setSettings: ' + settingIndex);
        } else if (settingItem.items) {
          this.settingsArr[settingIndex].items.forEach((settingItem2, settingIndex2) => {
            if (item.id === settingItem2.id) {
              this.settingsArr[settingIndex].items[settingIndex2] = item;
            }
          });
        }
      });
    });
  }

  // Загрузка Событий
  setEvents(items) {
    items.forEach((item, itemIndex) => {
      this.eventsArr.forEach((settingItem, settingIndex) => {
        if (item.id === settingItem.id) {
          this.eventsArr[settingIndex] = item;
        }
      });
    });
  }

  setUsers(items) {
    this.usersArr = items;
    this.usersChange.next(this.usersArr);
  }

  setItem(item) {
    this.roomsArr.forEach((room, roomIndex) => {
      room.items.forEach((roomItem, roomItemIndex) => {
        if (item.id === roomItem.id) {
          this.roomsArr[roomIndex].items[roomItemIndex] = item;
        }
      });
    });
  }

  // Отправка сообщений на WebSocket
  wsSend(item, type) {
    //console.log('Ws Send');
    let status;
    let message;
    if (type === 'item') {
      status = 'itemChange';
      message = '{ "status": "itemChange", "items": [' + JSON.stringify(item) + ']}';
    } else if (type === 'event') {
      message = '{ "status": "eventChange", "events": [' + JSON.stringify(item) + ']}';
    } else if (type === 'setting') {
      message = '{ "status": "settingChange", "settings": [' + JSON.stringify(item) + ']}';
    } else if (type == 'checkuser') {
      message = '{ "status" : "checkuser;' + item + '"}';
    } else if (type === 'adduser') {
      message = '{ "status": "adduser", "iduser": "' + this.userId + '", "items": ' + item + '}';
    } else if (type === 'edituser') {
      message = '{ "status": "edituser", "iduser": "' + this.userId + '", "items": ' + item + '}';
    } else if (type === 'deleteuser') {
      message = '{ "status": "deleteuser", "iduser": "' + this.userId + '", "items": ' + item + '}';
    }
    //console.log('message: ' + message);
    this.socketSend.send((message));
  }

  // Первоначальная загрузка и распределение данных по локальным массивам
  getItems() {
    this.getRooms().subscribe((items) => {
      this.roomsArr = items;
      this.roomsChange.next(items);
    });

    this.getSettings().subscribe((items) => {
      this.settingsArr = items;
      this.settingsChange.next(items);
    });

    this.getEvents().subscribe((items) => {
      this.eventsArr = items;
      this.eventsChange.next(items);
    });

    // this.getUsers().subscribe((items) => {
    //   this.usersArr = items;
    //   this.usersChange.next(items);
    // });

    this.getScenes().subscribe((items) => {
      this.scenesArr = items;
      this.scenesChange.next(items);
    });


  }

  // Observable для массива rooms
  getRooms(): Observable<any> {
    return this.http.get('assets/data.json').pipe(map(data => {
      let rooms = data['rooms'];
      return rooms.map(function (item: any) {
        return item;
      });
    }));
  }

  getScenes(): Observable<any> {
    return this.http.get('assets/data.json').pipe(map(data => {
      let scenes = data['scenes'];
      return scenes.map(function (item: any) {
        return item;
      });
    }));
  }

  // Observable для массива settings
  getSettings(): Observable<any> {
    return this.http.get('assets/data.json').pipe(map(data => {
      let settings = data['settings'];
      return settings.map(function (item: any) {
        return item;
      });
    }));
  }

  // Observable для массива events
  getEvents(): Observable<any> {
    return this.http.get('assets/data.json').pipe(map(data => {
      let events = data['events'];
      return events.map(function (item: any) {
        return item;
      });
    }));
  }

  getColor() {
    return this.panelColor;
  }

  setColor(color) {
    this.colorChange.next(color);
    localStorage.setItem('panelColor', color);
  }

  // Изменение поля status элемента и отправка по WebSocket
  onChangeStatus(item, type) {
    let itemCop = item;
    if (itemCop.status === 'off') {
      itemCop.status = 'on';
    } else if (itemCop.status === 'on') {
      itemCop.status = 'off';
    }
    //console.log(type);
    this.wsSend(itemCop, type);
  }

  // Изменение поля value элемента и отправка по WebSocket
  onChangeValue(item, value, status) {
    item.value = value;
    this.wsSend(item, status);
  }

  onChangeItem(item, type) {
    this.wsSend(item, type);
  }

  changeElement(item) {
    this.roomsArr.forEach((itemEl, index) => {
      if (itemEl.id === item.id) {
        this.roomsArr[index] = item;
        this.roomsChange.next(this.roomsArr);
        return;
      }
    });
  }

  // Получение id Клиента
  getUserId() {
    return this.userId;
  }

  getServerUrl() {
    return this.serverUrl;
  }

  // Изменение id Клиента
  setUserId(userId) {
    this.userId = userId;
    localStorage.setItem('userId', userId);
    //console.log('setUserID');
    //console.log(this.userId);
    location.reload();
  }

  // Генерация id Клиента при первом входе
  generateUserId() {
    let id;
    let date = new Date();
    let random = Math.ceil((Math.random() * 1000));
    id = '' + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds() + random;
    this.userId = id;
    localStorage.setItem('userId', id);
  }

  saveServerUrl(serverUrl) {
    this.socketGet.close();
    this.socketSend.close();
    localStorage.setItem('serverUrl', serverUrl);
    this.startWebSocket();
  }

  addNewUser(user, dashboard) {
    let response = '[{"id":"' + user + '", "dashboard":"' + dashboard + '"}]';
    this.wsSend(response, 'adduser');
  }

  editUser(newUserId, oldUserId, dashboard) {
    let response = '[{"id":"' + newUserId + '", "dashboard":"' + dashboard + '", "old_id":"' + oldUserId + '"}]';
    this.wsSend(response, 'edituser');
  }

  deleteUser(userId, dashboard) {
    let response = ' [{"id":"' + userId + '", "dashboard":"' + dashboard + '"}]';
    this.wsSend(response, 'deleteuser');
  }


  reconnectToServer() {
    this.startWebSocket();
  }

}
