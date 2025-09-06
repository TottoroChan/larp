import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FireBaseService } from '../../services/firebase.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-pathologic-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  login: string;
  password: string;
  currentUser: User;

  constructor(
    private modalCtrl: ModalController,
    private firebaseService: FireBaseService
  ) {}

  ngOnInit(): void {
    this.firebaseService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })
  }

  onLogin() {
    this.firebaseService.login(this.login, this.password)
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
