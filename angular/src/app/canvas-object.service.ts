import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CanvasObject } from './canvas-object';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CanvasObjectService {

  private canvasObjectsUrl = 'api/canvasObjects';  // URL to web api

  constructor(
    private http: HttpClient) { }

  /** GET canvasObjects from the server */
  getCanvasObjects (): Observable<CanvasObject[]> {
    return this.http.get<CanvasObject[]>(this.canvasObjectsUrl)
      .pipe(
        catchError(this.handleError('getCanvasObjects', []))
      );
  }

  /** GET canvasObject by id. Return `undefined` when id not found */
  getCanvasObjectNo404<Data>(id: number): Observable<CanvasObject> {
    const url = `${this.canvasObjectsUrl}/?id=${id}`;
    return this.http.get<CanvasObject[]>(url)
      .pipe(
        map(canvasObjects => canvasObjects[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<CanvasObject>(`getCanvasObject id=${id}`))
      );
  }

  /** GET canvasObject by id. Will 404 if id not found */
  getCanvasObject(id: number): Observable<CanvasObject> {
    const url = `${this.canvasObjectsUrl}/${id}`;
    return this.http.get<CanvasObject>(url).pipe(
      catchError(this.handleError<CanvasObject>(`getCanvasObject id=${id}`))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}