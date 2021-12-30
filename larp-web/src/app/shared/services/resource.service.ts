import { Character } from './../models/character.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../models/resource.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private http: HttpClient) {}

  create(resource: Resource) {
    const result = this.http.post<Resource>('/api/resources', resource).pipe(
      catchError(this.handleError<Resource>('create')),
      map(
        (resource) =>
          new Resource(
            resource.id,
            resource.name,
            resource.description,
            resource.min,
            resource.max,
            resource.step,
            resource.value
          )
      )
    );

    return result;
  }

  update(updatedResource: Resource) {
    const result = this.http
      .put<Resource>(`/api/resources/${updatedResource.id}`, updatedResource)
      .pipe(catchError(this.handleError<Resource>('create')));

    return result;
  }

  delete(id: string) {
    const result = this.http
      .delete<Resource>(`/api/resources/${id}`)
      .pipe(catchError(this.handleError<Resource>('create')));

    return result;
  }

  get(): Observable<Resource[]> {
    const result = this.http.get<Resource[]>('/api/resources').pipe(
      catchError(this.handleError<Resource[]>('get')),
      //map((resources) => resources.map((resource) => this.convertResource(resource)))
    );

    return result;
  }

  getOne(id: string) {
    const result = this.http.get<Resource>(`/api/resources/${id}`).pipe(
      catchError(this.handleError<Resource>('get'))
    );

    return result;
  }

  private convertResource(resource: any) {
    const characters = resource.characters
      ? resource.characters.map(
          (character: any) => new Character(character.id, character.name, [])
        )
      : [];

    const result = new Resource(
      resource.id,
      resource.name,
      resource.description,
      resource.min,
      resource.max,
      resource.step,
      resource.value
    );

    return result;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      
      return of(result as T);
    };
  }
}
