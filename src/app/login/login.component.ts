import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('openClose', [
    state('open', style({
      opacity: 1,
      transform: 'rotateY(0deg) rotateZ(360deg)'
    })),

    state('closed', style({
      opacity: 0,
    })),

    transition('open => closed', [
      animate('1s')
    ]),

    transition('closed => open', [
      animate('1s')
    ]),
  ])

  ]
})

export class LoginComponent implements OnInit {
  navigateOption: string;
  constructor(private routes: ActivatedRoute) {
  }
  isOpen = true;
  toggle2() {
    this.isOpen = !this.isOpen;
  }
  toggle() {
    this.toggle2();
    this.navigateOption = this.navigateOption === '1' ? '2' : '1';
  }
  ngOnInit() {
    this.routes.params.subscribe(parameters => {
      this.navigateOption = parameters.status;
  });

}
}
