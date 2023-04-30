import { Component, OnInit } from '@angular/core';
import { serviceMocks} from 'src/mocks/service-section.mock';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

 
  serviceSlideShowMocks = serviceMocks.vendors;
  slideMocks = serviceMocks.serviceSlides;

  vendors = this.serviceSlideShowMocks;
  slides = this.slideMocks;

  constructor() {}

  ngOnInit(): void {}


}
