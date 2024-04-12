import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private apiKey = environment.apiKey;
  private baseUrl = 'https://api.unsplash.com';

  getPhotos(query: string, pageIndex: number): Observable<IResponse> {
    const url = `${this.baseUrl}/search/photos?page=${pageIndex}&per_page=30&query=${query}&client_id=${this.apiKey}`;

    return this.http.get<IResponse>(url).pipe(
      catchError((error) => {
        let errorMessage = 'An error occurred';
        console.error(
          `status :${error.status}, error message :${error.error.errors}`
        );

        return throwError(errorMessage);
      })
    );
  }
}
