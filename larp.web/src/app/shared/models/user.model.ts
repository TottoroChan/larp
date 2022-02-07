import { Character } from './character.model';

export class User {
  id!: string | ' ';
  login: string;
  name: string;
  surname: string;
  password: string;
  salt: string;
  roles!: string | '';
  characters!: Character[];

  constructor(
    id: string,
    login: string,
    name: string,
    surname: string,
    password: string,
    salt: string,
    roles: string,
    characters: Character[]
  ) {
    this.id = id ?? '';
    this.login = login;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.salt = salt ?? 'aaaa';
    this.roles = roles ?? '';
    this.characters = characters;
  }
}

export enum UserRole {
  Admin,
  Master,
  Player,
}

export class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
