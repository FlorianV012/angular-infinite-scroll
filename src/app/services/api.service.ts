import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IResponse } from '../interfaces/api-response';
import { IPhoto } from '../interfaces/photo';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private apiKey = environment.apiKey;
  private baseUrl = 'https://api.unsplash.com';

  getPhotos(
    query: string,
    pageIndex: number
  ): Observable<{ total_pages: number; results: IPhoto[] }> {
    const url = `${this.baseUrl}/search/photos?page=${pageIndex}&per_page=30&query=${query}&client_id=${this.apiKey}`;

    return this.http.get<IResponse>(url).pipe(
      map((response) => ({
        total_pages: response.total_pages,
        results: response.results.map((photo) => ({
          id: photo.id,
          url: photo.urls.regular,
          description: photo.alt_description,
        })),
      })),

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
