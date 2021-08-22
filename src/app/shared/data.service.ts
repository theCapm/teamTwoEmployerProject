import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment';
import { Session } from './session.model';
import { Message } from './message.model';
import { interval, Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService implements OnDestroy {
    private _session: Session;
    private _messages: Message[];
    private _timerSub: Subscription;

    messagesChanged: Subject<Message[]>;

    constructor(private http: HttpClient) {}

    public get messages() {
        return this._messages;
    }

    getMessages() {
        //loads the messages array with the
        //API response for a the current session
        console.log('DataService.getMessages()')
        this.http
            .get(environment.apiUrl + '/retrieve_messages', {
                params: { session_id: `${this._session.session_id}` }
            })
            .subscribe(
                (response) => {
                    if (response['success']) {
                        const messages = response['payload'] as Message[];
                        if (this._messages != messages) {
                            this._messages = messages;
                            this.messagesChanged.next(this._messages);
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
        console.log(`DataService.createSession(${name}, ${message})`)
        if(!this._session){
            console.log('creating session...')
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
        } else {
            console.log(`session ${this._session.session_id} already exists!`)
        }
        
    }

    restoreStoredSession() {
        console.log('DataService.restoreStoredSession()')
        if(localStorage.getItem('session'))
        {
            console.log('restoring session...')
            this._session = JSON.parse(localStorage.getItem('session'));
            if(!this._timerSub){
                this.startMessageTimer();
            }
        } else {
            console.log('no session exists!')
        }
    }

    private startMessageTimer() {
        console.log('DataService.startMessageTimer()')
        this._timerSub = interval(5000).subscribe(() => {
            this.getMessages();
        });
    }

    private stopMessageTimer() {
        console.log('DataService.stopMessageTimer()')
        this._timerSub.unsubscribe();
    }

    private handleCreateSession(response: Session) {
        console.log(`DataService.handleCreateSession(${response})`)
        this._session = response[0];
        this.writeToLocalStorage('session', JSON.stringify(this._session));
        this.startMessageTimer();
    }

    private writeToLocalStorage(key: string, value: string) {
        console.log(`DataService.writeToLocalStorage(${key}, ${value})`)
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
