import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) {}

    getMessages(sessionId: number) {
        this.http.get(environment.apiUrl + '/retrieve_messages', {
            params: { session_id: `${sessionId}` }
        }).subscribe((response) => console.log(response))
    }
}
