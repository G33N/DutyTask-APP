import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// Models
import { Task } from '../../models/task';
import { Category } from '../../models/category';
import { State } from '../../models/state';
// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable, FirebaseListObservable,  AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-item-modify',
  templateUrl: 'item-modify.html',
})
export class ItemModifyPage {
  UID: string;
  task = {} as Task;
  category = {} as Category;
  state = {} as State;
  categoryListRef$: FirebaseListObservable<Category[]>
  stateListRef$: FirebaseListObservable<State[]>
  taskItemRef$: FirebaseObjectObservable<Task>

  constructor(private AngularFireAuth: AngularFireAuth, private database: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    // Get user ID to query
    this.AngularFireAuth.authState.subscribe(user => {
      if (user) {
        this.taskItemRef$ = this.database.object(`task-list/${user.uid}/${taskItemId}`);
        this.taskItemRef$.subscribe(snapshoot => {
          if(snapshoot)
            this.task = snapshoot;
        });
      }
    });
    //Capture TaskItemId
    const taskItemId = this.navParams.get('taskItemId');
    // Pointing categoryListRef$
    this.categoryListRef$ = this.database.list('category-list');
    // Pointing stateListRef$
    this.stateListRef$ = this.database.list('state-list');
    // Set the scope  of uor firebase object
    this.taskItemRef$ = this.database.object(`task-list/${this.UID}/${taskItemId}`);
    // Suscribe to the object to assingthe result to this.task
    this.taskItemRef$.subscribe(snapshoot => {
    });
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
