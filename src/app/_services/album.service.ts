import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Album } from '../_shared/album';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private api_url = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  private _refreshAlbums$ = new Subject<void>();

  get refreshAlbum$(){
    return this._refreshAlbums$;
  }

  getAlbums(): Observable<Album[]>{
    return this.http.get<Album[]>('http://localhost:8000/api/getalbums')
    .pipe(
      catchError(this.handleError)
    );
 }

 addAlbum(album: any) {
   return this.http.post('http://localhost:8000/api/addalbum', album, httpOptions)
   .pipe(
     tap(() => {
        this._refreshAlbums$.next();
     })
    // catchError(this.handleError)
   );
 }


private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};

}
