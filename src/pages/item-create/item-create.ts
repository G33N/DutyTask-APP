import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';

import { TaskProvider } from '../../providers/task';
import { CategoryProvider } from '../../providers/category/category';


@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  categories: any;
  task: any;
  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public CategoryProvider: CategoryProvider) {
    this.form = formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      detail: ['', Validators.required],
      state: [''],
      date: new Date
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    // List cateories for select
    this.getCategories()

  }

  ionViewDidLoad() {

  }
  // List cateories for select
  getCategories() {
    this.CategoryProvider.get()
      .then(data => {
        this.categories = data;
        });
  }
  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
