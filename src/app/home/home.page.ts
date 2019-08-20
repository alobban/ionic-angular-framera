import { Component, OnInit } from '@angular/core';
import {animate, animateChild, query, state, style, transition, trigger} from '@angular/animations';

import * as moment from 'moment/moment';
import { ActionSheetController } from '@ionic/angular';

import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
      trigger('initState', [
        state('collapse', style({
          transform: 'rotate(0)'
        })),
        state('expand', style({
          transform: 'rotate(-180deg)'
        })),
        transition('collapse => expand', [
          animate(400, style({
            transform: 'rotate(-180deg)'
          }))
        ]),
        transition('expand => collapse', [
          animate(400, style({
            transform: 'rotate(0)'
          }))
        ])
      ]),
      trigger('returnState', [
        state('collapse', style({
          transform: 'rotate(180deg)'
        })),
        state('expand', style({
          transform: 'rotate(0)'
        })),
        transition('collapse => expand', [
          animate(400, style({
            transform: 'rotate(0)'
          }))
        ]),
        transition('expand => collapse', [
          animate(400, style({
            transform: 'rotate(180deg)'
          }))
        ])
      ]),
      trigger('memberCard', [
          state('collapse', style({
            transform: 'scale(1)'
          })),
          state( 'expand', style({
            transform: 'scale(0)',
            display: 'none'
          })),
          transition('collapse => expand', [
            query('@initState', [
                animateChild({ delay: '400' })
            ]),
            animate('700ms linear', style({
              transform: 'scale(0)'
            }))
          ]),
          transition('expand => collapse', [
            query('@initState', [
              animateChild({ delay: '400' })
            ]),
            animate('700ms linear', style({
              transform: 'scale(1)'
            }))
          ])
      ]),
      trigger('membersCard', [
          state('collapse', style({
            transform: 'scale(0)',
            display: 'none'
          })),
          state( 'expand', style({
            transform: 'scale(1)'
          })),
          transition('collapse => expand', [
            query('@returnState', [
              animateChild()
            ]),
            animate('700ms linear', style({
              transform: 'scale(1)'
            }))
          ]),
          transition('expand => collapse', [
            query('@returnState', [
              animateChild()
            ]),
            animate('700ms linear', style({
              transform: 'scale(0)'
            }))
          ])
      ]),
      trigger('alertCard', [
          state('collapse', style({
            transform: 'translate(0, 0)'
          })),
          state('expand', style({
            transform: 'translate(0, 0)'
          })),
          transition('collapse => expand', [
              animate('700ms linear', style({
                transform: 'translate(0, 0)'
              }))
          ]),
          transition('expand => collapse', [
              animate('700ms linear', style({
                transform: 'translate(0, 0)'
              }))
          ])
      ])
  ]
})
export class HomePage implements OnInit {
  pigCount = 1345;
  groupAge = 7;
  groupId = 20190214;
  startDate = '2018-09-01';
  team: any[] = [];
  displayMember;
  displayAll = false;
  state = 'collapse';
  reverseState = 'collapse';

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
    this.state === 'collapse' ? this.state = 'expand' : this.state = 'collapse';
    this.reverseState === 'collapse' ? this.reverseState = 'expand' : this.reverseState = 'collapse';
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
