import {Component, OnInit} from '@angular/core';

import * as moment from 'moment/moment';
import { ActionSheetController } from '@ionic/angular';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pigCount = 1345;
  groupAge = 7;
  groupId = 20190214;
  startDate = '2018-09-01';
  team: any[] = [];
  displayMember;
  displayAll = false;

  alerts = [
    {
      title: 'Water cons. alert',
      message: '0.48 gal avg. per day',
      timestamp: new Date(moment().subtract(Math.floor(Math.random() * 24), 'hour').format())
    }
  ];

  constructor(
      public actionSheetCtrl: ActionSheetController,
      private httpService: HttpServiceService
  ) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Add Pigs',
          handler: () => console.log('Add pigs clicked')
        },
        {
          text: 'Move Pigs',
          handler: () => console.log('Move pigs clicked')
        },
        {
          text: 'Sale Pigs',
          handler: () => console.log('Sale pigs clicked')
        }
      ]
    });
    await actionSheet.present();
  }

  toggleMembers() {
    this.displayAll = !this.displayAll;
  }

  ngOnInit(): void {
    // this.httpService.getTeamMember()
    //   .subscribe(data => {
    //     console.log('team', data.results);
    //     this.team = data.results;
    //     this.generateCheckInTimes();
    //     console.log('member after checkin generation', this.team);
    //     this.displayMember = this.team[0];
    //   });
  }

  ionViewWillEnter() {
    this.httpService.getTeamMember()
      .subscribe(data => {
        this.team = data.results;
        this.generateCheckInTimes();
        this.displayMember = this.team[0];
      });
  }



  generateCheckInTimes() {
    this.team = this.team.map(member => {
      member.login.last = new Date(moment().subtract(Math.floor(Math.random() * 24), 'hour').format());
      return member;
    });
  }

}
