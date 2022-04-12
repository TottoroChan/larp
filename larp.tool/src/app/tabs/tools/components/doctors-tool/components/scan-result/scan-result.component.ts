import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'scan-result',
  templateUrl: './scan-result.component.html',
  styleUrls: ['./scan-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScanResultComponent implements OnInit {
  @Output() onCheckDisiase = new EventEmitter<string>();
  @Output() onDisiaseChange = new EventEmitter<boolean>();
  @Output() onGoBack = new EventEmitter();
  @Input() disiaseChecked: boolean;
  @Input() successResult: boolean;
  disiaseName: string;

  constructor() {}

  ngOnInit() {}

  checkDisiase() {
    this.onCheckDisiase.emit(this.disiaseName);
  }

  disiaseChange() {
    this.disiaseChecked = false;
    this.onDisiaseChange.emit(this.disiaseChecked);
  }

  goBack() {
    this.onGoBack.emit();
  }
}
