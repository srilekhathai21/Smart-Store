import { Component, OnInit } from '@angular/core';
import { footerInformation } from 'src/mocks/footer.mock';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  facebookIcon = footerInformation.facebookImage;
  instagramIcon = footerInformation.instagramImage;
  twitterIcon = footerInformation.twitterImages;
  constructor(private route: Router) {}

  ngOnInit(): void {}
  addFeedback(): any {
   {
      this.route.navigateByUrl('feedback');
    }
  }
  redirect(): any {
    if (localStorage.getItem('isVendor') === 'true') {
      this.route.navigateByUrl('/vendor');
    } else {
      this.route.navigateByUrl('');
    }
  }
}
