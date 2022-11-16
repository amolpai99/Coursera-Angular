import { Component, OnInit, ViewChild } from '@angular/core';
import { faSketch, faSkype } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFax, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { expand, flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  faPhone = faPhone
  faFax = faFax
  faEnvelope = faEnvelope
  faSkype = faSkype

  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy: Feedback;
  errMsg: string;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective: NgForm;

  visibility: boolean = true;
  showFeedback: boolean = false;

  formErrors: {[key: string]: string} = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages: {[key: string]: any} = {
    'firstname': {
      'required': 'First name is required',
      'minlength': 'First name must be atleast 2 characters',
      'maxlength': 'First name cannot be more than 25 characters'
    },
    'lastname': {
      'required': 'Last name is required',
      'minlength': 'Last name must be atleast 2 characters',
      'maxlength': 'Last name cannot be more than 25 characters'
    },
    'telnum': {
      'required': 'Telnum is required',
      'pattern': 'Telnum must contain only numbers'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format'
    }
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }

    const form = this.feedbackForm;
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
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);

    this.visibility = false;

    this.feedbackService.submitFeedback(this.feedback)
      .subscribe({
        next: (feedback) => {this.feedbackCopy = feedback; this.showFeedback = true; this.visibility = true; setTimeout(() => {
          this.showFeedback = false;
        }, 5000); return},
        error: (errMsg) => this.errMsg = errMsg
      })

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
