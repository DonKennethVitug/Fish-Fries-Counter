import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';
import {
  Settings
} from '../models/settings.model';

@Injectable()
export class SettingsService {
  public settings_defaults: Settings = {
    distance: 4,
    clearNoise: 1,
    accuracy: 2,
    tolerance: 45,
    colors: [
      // Brown
      // '968979', 
      // 'b4a495', 
      // '938874', 
      // 'a89881', 
      // '7f725f', 
      // '8b8273',
      // '9e9181',
      // '948c79',
      // 'b1a28d',
      // '9e9c8f',
      // '998e6e',
      // '968569',
      // '99886a',
      // '9f8a6d',
      // '7c6d46',
      // '847e5e',
      // '8b7e5e',
      // '8a8369',
      // '8f7753'

      // Black
      '000000', 
      '010101', 
      '020202', 
      '030303', 
      '040404', 
      '050505',
      '060606',
      '070707',
      '080808',
      '090909',
      '0A0A0A',
      '0B0B0B',
      '0C0C0C',
      '0D0D0D',
      '0E0E0E',
      '0F0F0F',
      '101010',
      '111111',
      '121212',
      '131313',
      '141414'
    ]
  };
  public settingsValue: Settings = {
    distance: 4,
    clearNoise: 1,
    accuracy: 2,
    tolerance: 45,
    colors: [
      // Brown
      // '968979', 
      // 'b4a495', 
      // '938874', 
      // 'a89881', 
      // '7f725f', 
      // '8b8273',
      // '9e9181',
      // '948c79',
      // 'b1a28d',
      // '9e9c8f',
      // '998e6e',
      // '968569',
      // '99886a',
      // '9f8a6d',
      // '7c6d46',
      // '847e5e',
      // '8b7e5e',
      // '8a8369',
      // '8f7753'

      // Black
      '000000', 
      '010101', 
      '020202', 
      '030303', 
      '040404', 
      '050505',
      '060606',
      '070707',
      '080808',
      '090909',
      '0A0A0A',
      '0B0B0B',
      '0C0C0C',
      '0D0D0D',
      '0E0E0E',
      '0F0F0F',
      '101010',
      '111111',
      '121212',
      '131313',
      '141414'
    ]
  };
  private Settings: BehaviorSubject < Settings > = new BehaviorSubject < Settings > (this.settingsValue);

  constructor() {
    if (window.localStorage.settings === undefined || window.localStorage.settings === null) {
      window.localStorage.settings = JSON.stringify(this.settingsValue);
    } else {
      this.settingsValue = JSON.parse(window.localStorage.settings);
    }
  }

  public getSettings(): Observable < Settings > {
    return this.Settings.asObservable();
  }

  public setSettings(Settings: Settings): void {
    this.settingsValue = Settings;
    this.Settings.next(Settings);
  }

}
