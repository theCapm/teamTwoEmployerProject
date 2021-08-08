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
        // const params = new HttpParams();
        // params.set('session_id', `${sessionId}`);
        // params.set('token', `${environment.apiKey}`);
        // debugger;
        // this.http
        //     .get(environment.apiUrl + '/retrieve_messages', { params: params })
        //     .subscribe((responseData) => {
        //         debugger;
        //         if (responseData['success']) {
        //             console.log(responseData);
        //         } else {
        //             console.log('getMessages ERROR');
        //             console.log(responseData['message']);
        //         }
        //     });
        let params = new HttpParams()
            .set('session_id', `${sessionId}`);
            // .set('token', `${environment.apiKey}`);

        debugger;
        // apiKey: 'HALUAH08houahs08208hodnoun08n08n08n02naufnaofuna08';
        // this.http
        //     .get(environment.apiUrl + '/retrieve_messages?session_id=10&token=' + environment.apiKey)
        //     .subscribe((r) => console.log(r));
        this.http
            .get(environment.apiUrl + '/retrieve_messages', { params: params })
            .subscribe((r) => {
                if (r['success']) {
                    console.log(r);
                } else {
                    console.log('oops');
                    console.log(r['message']);
                }
            });
    }
}
