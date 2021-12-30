import { Resource } from './resource.model';

export class Character {
  id!: string | ' ';
  name: string;
  resources!: Resource[];

  constructor(id: string, name: string, resources: Resource[]) {
    this.id = id;
    this.name = name;
    this.resources = resources;
  }
}
