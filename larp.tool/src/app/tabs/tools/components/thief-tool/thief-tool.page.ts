import { ThiefItem, ThiefTool } from './models/thief-tool.model';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilesService } from 'src/app/shared/services/files.service';

@Component({
  selector: 'app-thief-tool',
  templateUrl: 'thief-tool.page.html',
  styleUrls: ['thief-tool.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThiefToolPage implements OnInit {
  thiefTool: ThiefTool = null;
  result: { successRate: ThiefItem; effect: ThiefItem } = null;

  constructor(private router: Router, private filesService: FilesService) {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    try {
      this.filesService
        .readLocalData<ThiefTool>('tools', 'thiefTool.json')
        .then((response) => {
          this.thiefTool = response[0];
        });
    } catch (error) {}
  }

  ionViewDidLeave() {
    this.result = null;
    this.thiefTool = null;
  }

  getResult() {
    const successRateIndex = this.randomIntFromInterval(
      0,
      this.thiefTool.successRate.length - 1
    );
    const effectIndex = this.randomIntFromInterval(
      0,
      this.thiefTool.effects.length - 1
    );

    this.result = {
      successRate: this.thiefTool.successRate[successRateIndex],
      effect: this.thiefTool.effects[effectIndex],
    };
  }

  goBack() {
    this.router.navigate(['tabs/tools']);
  }

  private randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
