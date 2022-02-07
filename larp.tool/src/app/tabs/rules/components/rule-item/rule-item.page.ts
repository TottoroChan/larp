import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rule-item',
  templateUrl: 'rule-item.page.html',
  styleUrls: ['rule-item.page.scss'],
})
export class RuleItemPage {

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
}
