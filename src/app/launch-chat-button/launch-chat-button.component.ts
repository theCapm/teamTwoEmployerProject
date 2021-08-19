import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ChatModalComponent } from 'app/chat-modal/chat-modal.component';

@Component({
    selector: 'app-launch-chat-button',
    templateUrl: './launch-chat-button.component.html',
    styleUrls: ['./launch-chat-button.component.scss']
})
export class LaunchChatButtonComponent implements OnInit {


    constructor(private modalService: NgbModal) {}

    ngOnInit() {
       
    }

    openFormModal() {
        this.modalService.open(ChatModalComponent);
        
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

  
}
