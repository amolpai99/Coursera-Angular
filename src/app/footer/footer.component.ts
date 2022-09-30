import { Component, OnInit } from '@angular/core';
import { faPhone, faFax, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { faGooglePlusG, faFacebookF, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faPhone = faPhone;
  faFax = faFax;
  faEnvelope = faEnvelope;
  faGooglePlus = faGooglePlusG;
  faFacebook = faFacebookF;
  faLinkedIn = faLinkedinIn;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faEnvelopeOpen = faEnvelopeOpen;

  constructor() { }

  ngOnInit(): void {
  }

}
