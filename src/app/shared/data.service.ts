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

    constructor(private http: HttpClient) {
        this.messagesChanged = new Subject<Message[]>();
    }

    public get messages() {
        return this._messages;
    }

    //public method to be used by the component to send a message
    public sendMessage(name: string, message: string) {
        console.log(`DataService.sendMessage(${name}, ${message})`);

        //if we don't have a session we need to get one
        if (!this._session) {
            //try to load a session from localstorage
            if (!this.restoreStoredSession()) {
                //if it didn't work, just make one
                this.createSession(name, message);
            }
        }

        //send the message to the server
        this.newMessage(message, this._session.session_id);
    }

    private getMessages() {
        //loads the messages array with the
        //API response for a the current session
        console.log('DataService.getMessages()');
        this.http
            .get(environment.apiUrl + '/retrieve_messages', {
                params: { session_id: `${this._session.session_id}` }
            })
            .subscribe(
                (response) => {
                    if (response['success']) {
                        const messages = response['payload'];
                        console.log('response recieved...');
                        if (this._messages != messages) {
                            this._messages = messages;
                            this.messagesChanged.next(this._messages);
                            console.log(
                                `message collection now contains ${
                                    Object.keys(this._messages).length
                                } items`
                            );
                        } else {
                            console.log('ignoring message response!');
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

    private newMessage(message: string, sessionId: number) {
        console.log(`DataService.newMessage(${message}, ${sessionId})`);
        this.http
            .post(environment.apiUrl + '/new_message', {
                message: message,
                session_id: sessionId
            })
            .subscribe(
                (response) => {
                    if (response['success']) {
                        console.log('message sent!');
                        this.getMessages();
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

    private createSession(name: string, message: string) {
        console.log(`DataService.createSession(${name}, ${message})`);
        if (!this._session) {
            console.log('creating session...');
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
            console.log(`session ${this._session.session_id} already exists!`);
        }
    }

    private restoreStoredSession(): boolean {
        console.log('DataService.restoreStoredSession()');
        if (localStorage.getItem('session')) {
            console.log('restoring session...');
            this._session = JSON.parse(localStorage.getItem('session'));
            if (!this._timerSub) {
                this.getMessages();
                this.startMessageTimer();
            }
            return true;
        } else {
            console.log('no session exists!');
            return false;
        }
    }

    private startMessageTimer() {
        console.log('DataService.startMessageTimer()');
        this._timerSub = interval(5000).subscribe(() => {
            this.getMessages();
        });
    }

    private stopMessageTimer() {
        console.log('DataService.stopMessageTimer()');
        this._timerSub.unsubscribe();
    }

    private handleCreateSession(response: Session) {
        console.log(`DataService.handleCreateSession(${response})`);
        this._session = response[0];
        this.writeToLocalStorage('session', JSON.stringify(this._session));
        this.startMessageTimer();
    }

    private writeToLocalStorage(key: string, value: string) {
        console.log(`DataService.writeToLocalStorage(${key}, ${value})`);
        // console.log(`key: ${key}\r\nvalue:${value}`);

        localStorage.setItem(key, value);
    }

   
    checkSession() {
        this.restoreStoredSession();
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
