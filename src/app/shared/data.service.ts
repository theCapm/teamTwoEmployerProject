import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, Output } from '@angular/core';
import { environment } from 'environments/environment';
import { Session } from './session.model';
import { Message } from './message.model';
import { interval, Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataService implements OnDestroy {
    id: any;
    @Output() _messages: Message[];
    private _session: Session;
    private _timerSub: Subscription;
    messagesRecieved = new EventEmitter<Message[]>();

    constructor(private http: HttpClient) {}

    public get messages() {
        return this._messages;
    }

    getMessages() {
        //loads the messages array with the
        //API response for a the current session
        console.log('getMessages()')
        this.http
            .get(environment.apiUrl + '/retrieve_messages', {
                params: { session_id: `${this._session.session_id}` }
            })
            .subscribe(
                (response) => {
                    if (response['success']) {
                        const m = response['payload'] as Message[];
                        if (this._messages != m){
                            this._messages = m;
                            this.messagesRecieved.next(this._messages);
                        }                       
                    } else {
                        console.log(response);
                    }
                },
                (error) => {
                    //TODO: handle errors
                    console.log(error);
                }
            );
    }

    createSession(name: string, message: string) {
        this.http
            .post(environment.apiUrl + '/new_session', {
                name: name,
                message: message
            })
              .subscribe(
                (response) => {
                    if (response['success']) {                       
                        this.handleCreateSession(response['payload'] as Session);
                    }
                },
                (error) => {
                    //TODO: handle errors
                    console.log(error);
                }
            );
    }

    private startMessageTimer() {
        this._timerSub = interval(5000).subscribe(() => {
            this.getMessages();
        });
    }

    private stopMessageTimer() {
        this._timerSub.unsubscribe();
    }

    private handleCreateSession(response: Session) {
        this._session = response[0];
        this.writeToLocalStorage('session', JSON.stringify(this._session));
        this.startMessageTimer();
    }

    private writeToLocalStorage(key: string, value: string) {
        console.log('Writing to local storage...');
        console.log(`key: ${key}\r\nvalue:${value}`);

        localStorage.setItem(key, value);
    }

    sendAndReceive() {
        this.getMessages;
    }

    ngOnDestroy() {
        this.stopMessageTimer;
    }

    
}

// temporarily removed from onCreateSession() method



// .subscribe(response => {
//     this.id = response.payload[0].session_id
//     localStorage.setItem('session_id', response.payload[0].session_id);
//     console.log(response);
// }
// )