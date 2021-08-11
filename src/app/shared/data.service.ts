import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Message } from './message.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private _messages: Message[];

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
}
