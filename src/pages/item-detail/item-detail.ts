import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TaskProvider } from '../../providers/task';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  task: any;

  constructor(public navCtrl: NavController, navParams: NavParams, tasks: TaskProvider) {
    this.task = navParams.get('task') || [];
  }

}
