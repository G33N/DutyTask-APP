import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { TaskProvider } from '../../providers/task';

import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemCreatePage } from '../item-create/item-create';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: any;
  category: any;

  constructor(public navCtrl: NavController, public TaskProvider: TaskProvider, public modalCtrl: ModalController, UserProvider: UserProvider, private storage: Storage) {
    // Or to get a key/value pair
    storage.get('_id').then((val) => {
      this.getTaks(val);
    });
  }

  getTaks(user) {
    this.TaskProvider.get(user)
      .then(data => {
        this.tasks = data;
        console.log(data);
      });
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addTask() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(task => {
      if (task) {
        this.TaskProvider.add(task).then(data => {
          this.storage.get('_id').then((val) => {
            this.getTaks(val);
          });
        });
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteTask(task) {
    this.TaskProvider.delete(task).
      then(data => {
        this.storage.get('_id').then((val) => {
          this.getTaks(val);
        });
      });
  }

  /**
   * This open a task detail.
   */
  openTask(task: TaskProvider) {
    this.navCtrl.push(ItemDetailPage, {
      task: task
    });
  }

}
