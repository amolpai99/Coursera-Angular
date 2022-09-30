import { Component, OnInit } from '@angular/core';
import { faSkype } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFax, faPhone } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
