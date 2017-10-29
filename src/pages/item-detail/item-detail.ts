import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  task: any;

  constructor(public navCtrl: NavController, navParams: NavParams, private modal: ModalController) {
    this.task = navParams.get('task') || [];
  }
  openModal(){
    const myModal = this.modal.create('ItemModifyPage', this.task);
    myModal.present();
  }

}
