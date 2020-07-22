import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Settings } from '../../models/settings.model';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settings: Settings = this.settingsService.settingsValue;
  constructor(
    public navCtrl: NavController,
    private settingsService: SettingsService
  ) {
    this.settings = this.settingsService.settingsValue || new Settings();
  }

  store(event: any) {
    this.settingsService.settingsValue = this.settings;
    try {
      window.localStorage.settings = JSON.stringify(this.settingsService.settingsValue);
    } catch (err) {}
  }

  clearDefaults() {
    this.settings = this.settingsService.settings_defaults;
    for (let i in this.settingsService.settings_defaults) {
      this.settings[i] = this.settingsService.settings_defaults[i]
    }
    this.settingsService.settingsValue = this.settings;
    try {
      window.localStorage.settings = JSON.stringify(this.settingsService.settingsValue);
    } catch (err) {}
  }

}
