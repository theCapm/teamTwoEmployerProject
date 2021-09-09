import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    _messages: Message[];
    prospectsName = '';
    sessionStarted = false;
    nameEntered = false;
    private _messageSub: Subscription;

    constructor(public activeModal: NgbActiveModal, private dataService: DataService) {}

    ngOnInit(): void {
        this._messageSub = this.dataService.messagesChanged.subscribe(
            
            (messages: Message[]) => {
                this._messages = messages;            
                this.prospectsName = JSON.parse(localStorage.getItem('name'));
                this.sessionStarted = true;
                console.log(`this._messages = ${this._messages}`);
                console.log(this._messages);
            }
            );
                  
    }

    sendMessage(chatForm: any, form: NgForm) {
        this.sessionStarted = true;
        this.dataService.sendMessage(chatForm.name, chatForm.message);
        this.prospectsName = chatForm.name;
        form.resetForm()
        
        
    }

    ngOnDestroy(): void {
        this._messageSub.unsubscribe();
    }
}

