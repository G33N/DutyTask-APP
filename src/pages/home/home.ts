import { Component } from '@angular/core';
import { Platform, NavController, ModalController, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
// Models
import { Task } from '../../models/task';
import { Profile } from '../../models/profile';
// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
// Pages
import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemModifyPage } from '../item-modify/item-modify';
import { ItemCreatePage } from '../item-create/item-create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  task = {} as Task;
  profile = {} as Profile;
  items: any;
  UID: string;
  profileRef$: FirebaseObjectObservable<Profile>
  taskListRef$: FirebaseListObservable<Task[]>

  constructor(private alert: AlertController, private platform: Platform, private database: AngularFireDatabase, private AngularFireAuth: AngularFireAuth, public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController, private actionSheet: ActionSheetController) {

    // Get user ID to query
    this.AngularFireAuth.authState.subscribe(user => {
      if(user) this.UID = user.uid
    });
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
          position: 'bottom'
        }).present();
        this.profileRef$ = this.database.object(`profile/${data.uid}`)
      }
      else {
        this.toastCtrl.create({
          message: `Could not find authentication details`,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    });
    this.getUserTasks();
  }
  // Get all task of a user
  getUserTasks(): FirebaseListObservable<Task[]> {
    if (!this.UID) return;
    this.taskListRef$ = this.database.list(`task-list/${this.UID}`);
    this.taskListRef$.subscribe( snapshot => {
      this.items = snapshot;
    });
    return this.taskListRef$
  }
  // Searchbar this filter the tasks
  searchItems(ev: any) {
    // Reset items back to all of the items
    this.getUserTasks();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    console.log(this.items);
  }

  snapshotToArray(snapshot) {
      var returnArr = [];

      snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;

          returnArr.push(item);
      });

      return returnArr;
    };
  // Notifications push
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
