import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from 'app/shared/data.service';


@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {
  @Input() _messages;
  prospectsName = '';
  sessionStarted = false;
  nameEntered = false;

  constructor(public activeModal: NgbActiveModal, private dataService: DataService) {  }

  ngOnInit(): void {
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




//   this.dataService.getMessages().subscribe((_messages => {
//         this.loadedMessages = _messages;
//     }))


//     this.updatedSession = localStorage.getItem('session_id');
//     console.log(this.updatedSession);
      
}


}
