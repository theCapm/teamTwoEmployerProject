import { Component, OnInit } from '@angular/core';
import { Message } from ''

@Component({
  selector: 'app-welcome-form',
  templateUrl: './welcome-form.component.html',
  styleUrls: ['./welcome-form.component.scss']
})
export class WelcomeFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
onCreateMessage(postData: Message){

}

}