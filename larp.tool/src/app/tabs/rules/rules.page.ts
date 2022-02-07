import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppMode, environment } from 'src/environments/environment';
import { RuleContent, RulesFile } from './models/rulesFile.model';

@Component({
  selector: 'app-rules',
  templateUrl: 'rules.page.html',
  styleUrls: ['rules.page.scss'],
})
export class RulesPage {
  listOfRules: RulesFile[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listOfRules = [
      new RulesFile('Magic', [
        new RuleContent('1', 'dsfsfs'),
        new RuleContent('2', 'dsfsfs'),
      ]),
      new RulesFile('Madness', [
        new RuleContent('1', 'adadadsa'),
        new RuleContent('2', 'dsfsfsdddd'),
      ]),
    ];
  }

  showItem(rules: RulesFile){

  }

  private getRulesPath(): string {
    let path = null;
    switch (environment.appMode) {
      case AppMode.master:
        path = '/assets/content/master';
      case AppMode.player:
        path = '/assets/content/player';
    }

    return path;
  }
}
