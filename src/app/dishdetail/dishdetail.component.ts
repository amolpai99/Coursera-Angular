import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string; 
  next: string;

  faLeft = faChevronLeft;
  faRight = faChevronRight;
  @ViewChild('cform') commentFormDirective: NgForm;

  commentForm: FormGroup
  comment: Comment

  formErrors: {[key: string]: string} = {
    'author': '',
    'comment': ''
  };

  validationMessages: {[key: string]: any} = {
    'author': {
      'required': 'Author name is required',
      'minlength': 'Name must be atleast 2 characters',
    },
    'comment': {
      'required': 'Comment is required',
    }
  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe((ids) => this.dishIds = ids);
    this.route.params
      .pipe(switchMap((params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => {this.dish = dish; this.setPrevNext(dish.id)});
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  setPrevNext(dishId: string) {
    var index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }


  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }

    const form = this.commentForm;
    for (const field in this.formErrors) {
      
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    this.commentFormDirective.resetForm();

    const date = new Date().toISOString();
    this.comment.date = date;
    
    this.dish.comments.push(this.comment);
  }
}
