import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';

import { TaskProvider } from '../../providers/task';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  task: any;

  constructor(public navCtrl: NavController, navParams: NavParams, tasks: TaskProvider, private modal: ModalController) {
    this.task = navParams.get('task') || [];
  }
  openModal(){
    const myModal = this.modal.create('ItemModifyPage', this.task);
    myModal.present();
  }

}
