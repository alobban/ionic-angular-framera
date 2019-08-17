import { Component } from '@angular/core';

import * as moment from 'moment/moment';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pigCount = 1345;
  groupAge = 7;
  groupId = 20190214;
  startDate = '09/01/2018';

  constructor(public actionSheetCtrl: ActionSheetController) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'add pigs',
          handler: () => console.log('Add pigs clicked')
        },
        {
          text: 'move pigs',
          handler: () => console.log('Move pigs clicked')
        },
        {
          text: 'sale pigs',
          handler: () => console.log('Sale pigs clicked')
        }
      ]
    });
    await actionSheet.present();
  }

}
