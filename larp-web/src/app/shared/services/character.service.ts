import { Character } from './../models/character.model';
import { Resource } from './../models/resource.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  create(character: Character) {
    const result = this.http.post<Character>('/api/characters', character).pipe(
      catchError(this.handleError<Character>('create')),
      map((character) => new Character(character.id, character.name, []))
    );

    return result;
  }

  update(updatedCharacter: Character) {
    const result = this.http
      .put<Character>(
        `/api/characters/${updatedCharacter.id}`,
        updatedCharacter
      )
      .pipe(catchError(this.handleError<Character>('create')));

    return result;
  }

  delete(id: string) {
    const result = this.http
      .delete<Character>(`/api/characters/${id}`)
      .pipe(catchError(this.handleError<Character>('create')));

    return result;
  }

  get(): Observable<Character[]> {
    const result = this.http.get<Character[]>('/api/characters').pipe(
      catchError(this.handleError<Character[]>('get')),
      map((characters) =>
        characters.map((character) => this.convertCharacter(character))
      )
    );

    return result;
  }

  getOne(id: string) {
    const result = this.http.get<Character>(`/api/characters/${id}`).pipe(
      catchError(this.handleError<Character>('get')),
      map((character) => this.convertCharacter(character))
    );

    return result;
  }

  private convertCharacter(character: any) {
    const resources = character.resources
      ? character.resources.map(
          (resource: any) =>
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
      : [];

    const result = new Character(character.id, character.name, resources);

    return result;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);

      return of(result as T);
    };
  }
}
