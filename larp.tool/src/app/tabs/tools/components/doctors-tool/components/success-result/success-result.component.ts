import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Disease } from '../../models/disease.model';
import { appSettings } from 'src/app/app.config';

@Component({
  selector: 'success-result',
  templateUrl: './success-result.component.html',
  styleUrls: ['./success-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SuccessResultComponent implements OnInit {
  @Input() realDisiase: Disease;
  cardBackImage = `${appSettings.doctorsToolImagePath}card_back.jpg`;
  cardFrontImage = appSettings.doctorsToolImagePath;

  constructor() {}

  ngOnInit() {
    this.cardFrontImage += this.realDisiase.image;
  }

  flipCard(event) {
    var element = event.currentTarget;

    if (element.className === 'card') {
      if (element.style.transform == 'rotateY(180deg)') {
        element.style.transform = 'rotateY(0deg)';
      } else {
        element.style.transform = 'rotateY(180deg)';
      }
    }
  }
}
