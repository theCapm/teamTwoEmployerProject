import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Session } from './session.model';
import { Message } from './message.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private _messages: Message[];
    private _session: Session;

    constructor(private http: HttpClient) {}

    public get messages() {
        return this._messages;
    }

    getMessages(sessionId: number) {
        //loads the messages array with the
        //API response for a given sessionId
        this.http
            .get(environment.apiUrl + '/retrieve_messages', {
                params: { session_id: `${sessionId}` }
            })
            .subscribe(
                (response) => {
                    if (response['success']) {
                        this._messages = response['payload'] as Message[];
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

    private handleCreateSession(response: Session) {
        this._session = response;
        //TODO: store session in local storage
        console.log(this._session);
    }
}
