import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';

import { DataService } from 'app/shared/data.service';
import { Message } from 'app/shared/message.model';

@Component({
    selector: 'app-launch-chat-button',
    templateUrl: './launch-chat-button.component.html',
    styleUrls: ['./launch-chat-button.component.scss']
})
export class LaunchChatButtonComponent implements OnInit {
 updatedSession = '';
loadedMessages = Message[] = [];

    constructor(private modalService: NgbModal, private dataService: DataService) {}

    ngOnInit() {

        this.dataService.getMessages().subscribe((_messages => {
            this.loadedMessages = _messages;
        }))
    }

    openFormModal(content) {
        this.modalService.open(content);
        
        /*Open the modal component*/
        // const modalRef = this.modalService.open(
        //     /*Component name here*/
        // );

        // modalRef.result
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        console.log('openFormModal()!');
    }

    onSendMessage(chatForm) {
        // is this a good place for the create session call?
        this.dataService.createSession(chatForm.name, chatForm.message);
      
        this.updatedSession = localStorage.getItem('session_id');
        console.log(this.updatedSession);
        // how do I get the session id here? @viewChild?
       
        
    }
}
