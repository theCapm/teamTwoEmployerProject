import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'app/shared/data.service';


@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {
  updatedSession = '';
  // loadedMessages = Message[] = [];

  constructor(public activeModal: NgbActiveModal, private dataService: DataService) { }

  ngOnInit(): void {
  }


  onSendMessage(chatForm) {
    // is this a good place for the create session call?
    this.dataService.createSession(chatForm.name, chatForm.message);


//   this.dataService.getMessages().subscribe((_messages => {
//         this.loadedMessages = _messages;
//     }))


//     this.updatedSession = localStorage.getItem('session_id');
//     console.log(this.updatedSession);
//     // how do I get the session id here? @viewChild?
   
    
}
}
