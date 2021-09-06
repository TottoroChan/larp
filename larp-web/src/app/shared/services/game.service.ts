import { Game, Guid } from '../models/game.model';

export class GameService {
  private games: Game[] = [
    new Game('test', 'test game', new Date(), 4),
    new Game('test 2', 'test game adj r dfsf fdksfjl fsfsj lk dggjsg sdjfslfs  sdjfs kdfsjfs lfd fldlsshdghs hsdghsgks  sbgskbg kshskjshkkhkshkjdhsdhk', new Date(), 4),
    new Game('test', 'test game', new Date(), 4),
    new Game('test 2', 'test game adj r dfsf fdksfjl fsfsj lk dggjsg sdjfslfs  sdjfs kdfsjfs lfd fldlsshdghs hsdghsgks  sbgskbg kshskjshkkhkshkjdhsdhk', new Date(), 4),
    new Game('test', 'test game', new Date(), 4),
    new Game('test 2', 'test game adj r dfsf fdksfjl fsfsj lk dggjsg sdjfslfs  sdjfs kdfsjfs lfd fldlsshdghs hsdghsgks  sbgskbg kshskjshkkhkshkjdhsdhk', new Date(), 4),
    new Game('test', 'test game', new Date(), 4),
    new Game('test 2', 'test game adj r dfsf fdksfjl fsfsj lk dggjsg sdjfslfs  sdjfs kdfsjfs lfd fldlsshdghs hsdghsgks  sbgskbg kshskjshkkhkshkjdhsdhk', new Date(), 4),
    new Game('test', 'test game', new Date(), 4),
    new Game('test 2', 'test game adj r dfsf fdksfjl fsfsj lk dggjsg sdjfslfs  sdjfs kdfsjfs lfd fldlsshdghs hsdghsgks  sbgskbg kshskjshkkhkshkjdhsdhk', new Date(), 4),
    new Game('test', 'test game', new Date(), 4),
    new Game('test 2', 'test game adj r dfsf fdksfjl fsfsj lk dggjsg sdjfslfs  sdjfs kdfsjfs lfd fldlsshdghs hsdghsgks  sbgskbg kshskjshkkhkshkjdhsdhk', new Date(), 4),
  ];

  create(game: Game) {
    this.games.push(game);
  }

  update(updatedGame: Game) {
    const indexOfGame = this.games.findIndex(
      (game) => game.id == updatedGame.id
    );

    this.games[indexOfGame] = updatedGame;
  }

  delete(id: Guid) {
    const indexOfGame = this.games.findIndex((game) => game.id == id);

    this.games.slice(indexOfGame, 1);
  }

  get() {
    return this.games;
  }

  getById(id: Guid) {
    const indexOfGame = this.games.findIndex((game) => game.id == id);

    return this.games[indexOfGame];
  }
}
