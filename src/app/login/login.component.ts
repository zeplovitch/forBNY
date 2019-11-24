import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  navigateOption: string;
  constructor(private routes: ActivatedRoute) {
  }
  toggle() {
    this.navigateOption = this.navigateOption === '1' ? '2' : '1';
  }
  ngOnInit() {
    this.routes.params.subscribe(parameters => {
      this.navigateOption = parameters.status;
  });

}
}
