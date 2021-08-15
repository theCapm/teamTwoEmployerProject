import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-launch-chat-button',
    templateUrl: './launch-chat-button.component.html',
    styleUrls: ['./launch-chat-button.component.scss']
})
export class LaunchChatButtonComponent implements OnInit {
    constructor(private modalService: NgbModal) {}

    ngOnInit(): void {}

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
}
// , { windowClass: 'dark-modal' }