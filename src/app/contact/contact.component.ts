import { Component, OnInit, ViewChild } from '@angular/core';
import { faSkype } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFax, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  faPhone = faPhone
  faFax = faFax
  faEnvelope = faEnvelope
  faSkype = faSkype

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective: NgForm;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: ['', Validators.required],
      email: ['', Validators.required],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
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
