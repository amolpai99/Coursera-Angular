import { Component, OnInit } from '@angular/core';
import { faAddressCard, faHome, faInfoCircle, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faHome = faHome;
  faInfo = faInfoCircle;
  faList = faList;
  faAddressCard = faAddressCard;

  constructor() { }

  ngOnInit(): void {
  }

}
