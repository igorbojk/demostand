export const TYPE_EVENT = {
    '1': 'gostin',
    '2': 'kuhnya',
    '3': 'spalnya',
    '4': 'all_light',
    '5': 'home_lock_status',
    '6': 'door',
    '7': 'window',
    '8': 'eco_mode',
    '9': 'house_locked',
    '10': 'house_unlocked',
    '11': 'elect_on',
    '12': 'normal_warm'
    // '4': 'vanna',
    // '5': 'ventilyaciya',
    // '6': 'otopl',
    // '7': 'protechki',
    // '8': 'gostin_kondic',
    // '9': 'spalnya_kondic',
    // '10': 'okna',
    // '11': 'okno_dver',
    // '12': 'okno',
    // '13': 'gostin_rozetka',
    // '14': 'kuhnya_rozetka',
    // '15': 'spalnya_rozetka',
    // '16': 'home_lock_status',
    // '17': 'sensor_water',
    // '18': 'door_closed',
    // '19': 'window',
    // '20': 'eco_mode',
    // '21': 'home_lock_status',
    // '22': 'motor',
    // '23': 'water',
    // '24': 'propeller',
    // '25': 'warm',
    // '26': 'all_light_off',
    // '27': 'elect_on',
    // '28': 'normal_warm',
};

export const EVENTS_VARIANTS = {
    gostin: 'on/off', // Свет в гостинной
    kuhnya: 'on/off', // Свет в кухне
    spalnya: 'on/off', // Свет в спальне
    vanna: 'on/off', // Свет в ванной
    ventilyaciya: 'on/off', // Вентиляция
    otopl: 'on/off', // Отопление
    protechki: 'on/off', // ротечка
    gostin_kondic: 'on/off', // Кондиционер в гостинной
    spalnya_kondic: 'on/off', // Кондиционер в спальне
    window: 'on/off', // Окна
    door: 'on/off', // Дверь
    okno: 'on/off', // Окно
    gostin_rozetka: 'on/off', // Розетка в гостинной
    kuhnya_rozetka: 'on/off', // Розетка кухня
    spalnya_rozetka: 'on/off', // Розетка спальня
    elect_on: 'on/off', // Все розетки
};

export const INFO_VARIANTS = {
    all_light: 'on/off', // Весь свет
    gostin: 'on/off', // Свет в гостинной
    kuhnya: 'on/off', // Свет в кухне
    spalnya: 'on/off', // Свет в спальне
    home_lock_status: 'on/off', // Дом закрыт\открыт
    okno: 'on/off', // Окно
    okna: 'on/off', // Окна
    gostin_kondic: 'on/off', // Кондиционер в гостинной
    spalnya_kondic: 'on/off', // Кондиционер в спальне
    sensor_water: 'on', // Датчик влажности
    water: 'on', // Датчик протечки
    gostin_rozetka: 'on/off', // Розетка в гостинной
    kuhnya_rozetka: 'on/off', // Розетка кухня
    spalnya_rozetka: 'on/off', // Розетка спальня
    otopl: 'on/off', // Отопление
    elect_on: 'on/off'
};

export const STATUS_VARIANTS = [
    'door', // Двери закрыты
    'window', // Окна закрыты'
    'eco_mode', // Эко-режим отопления
    'house_locked', // Дом поставлен на охрану
    'house_unlocked', // Дом снят с охраны
    'motor', // Насос выключен
    'water_off', // Подача воды перекрыта
    'propeller_off', // Вытяжной вентилятор включен
    'warm_off', // Котел выключен
    'motor_on', // Насос включен
    'warm_on', // Котел включен
    'light_off', // Свет включен
    'elect_on', // Розетки включены
    'normal_warm' // Обычный режим отопления
];
