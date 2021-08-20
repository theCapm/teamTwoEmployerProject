import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from 'app/shared/data.service';
import { Message } from 'app/shared/message.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit, OnDestroy {
  private _messages: Message[];
  prospectsName = '';
  sessionStarted = false;
  nameEntered = false;
  private _messageSub: Subscription;

  constructor(public activeModal: NgbActiveModal, private dataService: DataService) {  }

  ngOnInit(): void {
    this._messageSub = this.dataService.messagesRecieved.subscribe((messages: Message[]) => {
      this._messages = messages;
    })
  }


  onSendMessage(chatForm) {
    if (!this.sessionStarted) {
    this.dataService.createSession(chatForm.name, chatForm.message);
    this.prospectsName = chatForm.name;
    this.dataService.sendAndReceive();
    this.sessionStarted = true;
    } else {
      this.dataService.sendAndReceive();
    }      
}

ngOnDestroy(): void {
  this._messageSub.unsubscribe();
}

}
