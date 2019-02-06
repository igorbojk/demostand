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

export const EVENTS = {
  'gostin_light_on': {
      rooms: {
          gostin: 'on'
      },
      info: {
          gostin: 'on'
      }
  }
};
