import {
  MadScience,
  testMadScience,
  MadScienceItem
} from '@app/tabs/tools/components/mad-science-tool/models/mad-science.model';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from '@app/shared/services/files.service';

@Component({
  selector: 'app-mad-science-tool',
  templateUrl: 'mad-science-tool.page.html',
  styleUrls: ['mad-science-tool.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MadScienceToolPage implements OnInit {
  madScience: MadScience = null;
  result: { successRate: MadScienceItem; effect: MadScienceItem } = null;
  madScienceAllowed = false;

  constructor(private router: Router, private filesService: FilesService) {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    try {
      this.filesService
        .readLocalData<MadScience>('tools', 'madScience.json')
        .then((response) => {
          this.madScience = response[0];
        });
    } catch (error) {}
  }

  ionViewDidLeave() {
    this.result = null;
    this.madScience = null;
    this.madScienceAllowed = false;
  }

  checkboxClick(event) {
    this.madScienceAllowed = this.madScience.checkList
      .filter((entry) => !entry.isOptional)
      .every((entry) => entry.isChecked);
  }

  getResult() {
    const successRateIndex = this.randomIntFromInterval(
      0,
      this.madScience.successRate.length - 1
    );
    const effectIndex = this.randomIntFromInterval(
      0,
      this.madScience.effects.length - 1
    );

    this.result = {
      successRate: this.madScience.successRate[successRateIndex],
      effect: this.madScience.effects[effectIndex],
    };
  }

  goBack() {
    this.router.navigate(['tabs/tools']);
  }

  private randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
