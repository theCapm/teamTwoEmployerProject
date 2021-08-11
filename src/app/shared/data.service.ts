import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment';
import { Session } from './session.model';
import { Message } from './message.model';
import { interval, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService implements OnDestroy {
    private _messages: Message[];
    private _session: Session;
    private _timerSub: Subscription;

    constructor(private http: HttpClient) {}

    public get messages() {
        return this._messages;
    }

    getMessages(session: Session) {
        //loads the messages array with the
        //API response for a the current session
        this.http
            .get(environment.apiUrl + '/retrieve_messages', {
                params: { session_id: `${session.session_id}` }
            })
            .subscribe(
                (response) => {
                    if (response['success']) {
                        this._messages = response['payload'] as Message[];
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
            this.getMessages;
        });
    }

    private stopMessageTimer() {
        this._timerSub.unsubscribe();
    }

    private handleCreateSession(response: Session) {
        this._session = response;
        this.writeToLocalStorage('session', JSON.stringify(this._session));
        this.startMessageTimer();
    }

    private writeToLocalStorage(key: string, value: string) {
        console.log('Writing to local storage...');
        console.log(`key: ${key}\r\nvalue:${value}`);

        localStorage.setItem(key, value);
    }

    ngOnDestroy() {
        this.stopMessageTimer;
    }
}
