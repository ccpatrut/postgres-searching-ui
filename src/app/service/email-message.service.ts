import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmailMessageService {
    private readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    constructor(private httpClient: HttpClient) { }

    searchEmails(text: string, page: number, size: number): Observable<any[]> {
        return this.httpClient.get<any[]>("/emails?text=" + text + "&page=" + page + "&size=" + size);
    }
}