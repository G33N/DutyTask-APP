import { Component } from '@angular/core';
import { Platform, NavController, ModalController, ToastController, ActionSheetController, AlertController } from 'ionic-angular';

import { Task } from '../../models/task';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemModifyPage } from '../item-modify/item-modify';
import { ItemCreatePage } from '../item-create/item-create';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  task = {} as Task;
  taskListRef$: FirebaseListObservable<Task[]>

  constructor(private alert: AlertController, private platform: Platform, private database: AngularFireDatabase, private AngularFireAuth: AngularFireAuth, public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController, private actionSheet: ActionSheetController) {

    //Pointing taskItemRef$ at firebase -> 'task-list'
    this.taskListRef$ = this.database.list('task-list');
    this.onNotificacion();

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.AngularFireAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        this.toastCtrl.create({
          message: `Welcome to DutyTask, ${data.email}`,
          duration: 2000,
          position: 'top'
        }).present();
      }
      else {
        this.toastCtrl.create({
          message: `Could not find authentication details`,
          duration: 3000,
          position: 'top'
        }).present();
      }
    });
  }
  /**
  * Notifications push
  */
  async onNotificacion(){
    if(typeof(FCMPlugin) != 'undefined') {
      try{
          await this.platform.ready();
          FCMPlugin.onNotificacion((data) => {
            this.alert.create({
              message: data.message
            }).present();
          }, (result) => console.log(result));
      }
      catch(e){
        console.log(e);
      }
   }
  }
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addTask() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(task => {
      if (task) {

      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteTask(task) {

  }

  displayOptions(task){
    this.actionSheet.create({
      title: `${task.title}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            //Send the user to the edit page and pass the key as a parameter
            this.navCtrl.push(ItemModifyPage, { taskItemId: task.$key });
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.taskListRef$.remove(task.$key);
          },
        },
        {
          text: 'Share',
          handler: () => {
            // The user share yours task and another user can see or take it
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          },
        }
      ]
    }).present();
  }
  /**
   * This open a task detail.
   */
  openTask(task: Task) {
    this.navCtrl.push(ItemDetailPage, {
      task: task
    });
  }
  modifyTask(task: Task) {
    this.navCtrl.push(ItemModifyPage, {
      task: task
    });
  }

}
