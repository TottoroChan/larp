import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.component.html',
  styleUrls: ['./scan-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScanResultComponent implements OnInit {
  @Output() checkDisiase = new EventEmitter<string>();
  @Output() disiaseChange = new EventEmitter<boolean>();
  @Output() goBack = new EventEmitter();
  @Input() disiaseChecked: boolean;
  @Input() successResult: boolean;
  disiaseName: string;

  constructor() {}

  ngOnInit() {}

  onCheckDisiase() {
    this.checkDisiase.emit(this.disiaseName);
  }

  onDisiaseChange() {
    this.disiaseChecked = false;
    this.disiaseChange.emit(this.disiaseChecked);
  }

  onGoBack() {
    this.goBack.emit();
  }
}
