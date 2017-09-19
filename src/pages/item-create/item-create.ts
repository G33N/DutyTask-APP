import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';

import { CategoryProvider } from '../../providers/category/category';
import { Task } from '../../models/task';
import { Category } from '../../models/category';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {

  categories: any;
  task = {} as Task;
  taskItemRef$: FirebaseListObservable<Task[]>
  categoryListRef$: FirebaseListObservable<Category[]>

  constructor(private AngularFireAuth: AngularFireAuth, private database: AngularFireDatabase, public navCtrl: NavController, public toastCtrl: ToastController, public viewCtrl: ViewController, public CategoryProvider: CategoryProvider) {

    this.taskItemRef$ = this.database.list('task-list');
    this.categoryListRef$ = this.database.list('category-list');
  }

  ionViewDidLoad() {
    this.AngularFireAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        this.task.user = data.uid;
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

  addTask(task: Task) {
    this.taskItemRef$.push({
      title: this.task.title,
      category: this.task.category,
      time: this.task.time,
      detail: this.task.detail,
      location: 'default',
      state: 'Doing',
      user: this.task.user,
      date: new Date,
    });

    // Reset task Item
    task = {} as Task;
    // Go back to HomePage
    this.navCtrl.pop();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
