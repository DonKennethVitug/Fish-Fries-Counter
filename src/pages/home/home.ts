import {
  Component
} from '@angular/core';
import {
  NavController,
  LoadingController
} from 'ionic-angular';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera';
import {
  SettingsService
} from '../../services/settings.service'
import * as pix from 'pixfinder';
import {
  ImagePicker,
  ImagePickerOptions
} from '@ionic-native/image-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image_captured: string;
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }
  browseOptions: ImagePickerOptions = {
    quality: 100,
    maximumImagesCount: 1
  }
  count: number;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private settingsService: SettingsService,
    private imagePicker: ImagePicker,
    public loadingCtrl: LoadingController
  ) {}

  async capture() {
    let loading = this.loadingCtrl.create({
      content: 'Processing Image...'
    });
    try {
      let img: string;
      if ((img = (await this.camera.getPicture(this.cameraOptions))) !== '') {
        this.image_captured = 'data:image/jpeg;base64,' + img;
        loading.present();
        setTimeout(
          () => {
            const img = document.getElementById('image_captured');
            pix.util.dom.onload(img, () => {
              var fishes = pix.findAll({
                img: img,
                distance: this.settingsService.settingsValue.distance ? this.settingsService.settingsValue.distance : this.settingsService.settings_defaults.distance,
                colors: this.settingsService.settingsValue.colors.length ? this.settingsService.settingsValue.colors : this.settingsService.settings_defaults.colors,
                clearNoise: this.settingsService.settingsValue.clearNoise ? this.settingsService.settingsValue.clearNoise : this.settingsService.settings_defaults.clearNoise,
                accuracy: this.settingsService.settingsValue.accuracy ? this.settingsService.settingsValue.accuracy : this.settingsService.settings_defaults.accuracy,
                tolerance: this.settingsService.settingsValue.tolerance ? this.settingsService.settingsValue.tolerance : this.settingsService.settings_defaults.tolerance
              });
              this.count = fishes.length;
              loading.dismiss();
            });
          }, 500
        )
      }
    } catch (err) {
      this.count = 0;
      loading.dismiss();
    }
  }

  async browseFiles() {
    let loading = this.loadingCtrl.create({
      content: 'Processing Image...'
    });
    try {
      let img: string;
      if ((img = (await this.imagePicker.getPictures(this.browseOptions))).length) {
        this.image_captured = img;
        loading.present();
        setTimeout(
          () => {
            const img = document.getElementById('image_captured');
            pix.util.dom.onload(img, () => {
              var fishes = pix.findAll({
                img: img,
                distance: this.settingsService.settingsValue.distance ? this.settingsService.settingsValue.distance : this.settingsService.settings_defaults.distance,
                colors: this.settingsService.settingsValue.colors.length ? this.settingsService.settingsValue.colors : this.settingsService.settings_defaults.colors,
                clearNoise: this.settingsService.settingsValue.clearNoise ? this.settingsService.settingsValue.clearNoise : this.settingsService.settings_defaults.clearNoise,
                accuracy: this.settingsService.settingsValue.accuracy ? this.settingsService.settingsValue.accuracy : this.settingsService.settings_defaults.accuracy,
                tolerance: this.settingsService.settingsValue.tolerance ? this.settingsService.settingsValue.tolerance : this.settingsService.settings_defaults.tolerance
              });
              this.count = fishes.length;
              loading.dismiss();
            });
          }, 500
        )
      }
    } catch (err) {
      this.count = 0;
      loading.dismiss();
    }
  }

}
