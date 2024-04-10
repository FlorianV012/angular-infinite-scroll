import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  apiKey = environment.apiKey;

  getPhotos(query: string, pageIndex: number): Observable<any> {
    return this.http.get<any>(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${query}&client_id=${this.apiKey}`
    );
  }
}
