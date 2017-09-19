import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { CategoryProvider } from '../../providers/category/category';
import { Storage } from '@ionic/storage';

import { Task } from '../../models/task';
import { Category } from '../../models/category';

import { FirebaseObjectObservable, FirebaseListObservable,  AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-item-modify',
  templateUrl: 'item-modify.html',
})
export class ItemModifyPage {
  task = {} as Task;
  category = {} as Category;
  categoryListRef$: FirebaseListObservable<Category[]>
  taskItemRef$: FirebaseObjectObservable<Task>

  constructor(private database: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {

    //Capture TaskItemId
    const taskItemId = this.navParams.get('taskItemId');
    // Pointing categoryListRef$
    this.categoryListRef$ = this.database.list('category-list');
    // Set the scope  of uor firebase object
    this.taskItemRef$ = this.database.object(`task-list/${taskItemId}`);
    // Suscribe to the object to assingthe result to this.task
    this.taskItemRef$.subscribe(task => this.task = task)

  }

  ionViewWillLoad() {
  }
  // Update our firebase node with the new item data.
  modifyTask(task: Task){
    this.taskItemRef$.update(task);
    this.navCtrl.pop();
  }
/**
 * The user cancelled, so we dismiss without sending data back.
 */
cancel() {
  this.viewCtrl.dismiss();
}


}
