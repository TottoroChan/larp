import { Resource } from 'src/app/shared/models/resource.model';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less'],
})
export class ItemComponent implements OnInit {
  public character!: Character;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {
    //this.id = 'a896820b-af15-45ea-b0cd-88d18f7927a5';
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.characterService.getOne(this.id).subscribe((response: Character) => {
      this.character = response;
    });
  }

  getResourceBar(resource: Resource) {
    let points = resource.max / resource.step;
    const resourceBar = [];
    let i = 0;
    while (i < points) {
      const point = i * resource.step <= resource.value;
      resourceBar.push(point);
      i++;
    }

    return resourceBar;
  }
}
