import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Game } from 'src/app/shared/models/game.model';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
})
export class GameComponent implements OnInit {
  games: Game[] = [];
  columns: { field: string; header: string }[] = [];

  loading: boolean = true;

  @ViewChild('dt') table: Table | undefined;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.games = this.gameService.get();
    this.loading = false;

    this.columns = [
      { field: 'name', header: 'Название' },
      { field: 'description', header: 'Описание' },
      { field: 'startDate', header: 'Дата начала' },
      { field: 'duration', header: 'Длительность' },
    ];
  }
}
