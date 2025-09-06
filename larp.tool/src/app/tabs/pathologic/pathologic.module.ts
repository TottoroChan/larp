import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from '@app/tabs/pathologic/pathologic-routing.module';
import { PathologicPageComponent } from '@app/tabs/pathologic/pathologic.page';
import { MaskitoDirective } from '@maskito/angular';
import { SymptomsTableComponent } from '@app/tabs/pathologic/components/symptoms-table/symptoms-table.component';
import { MedicineComponent } from '@app/tabs/pathologic/components/medicine/medicine.component';
import { PreviewComponent } from '@app/tabs/pathologic/components/preview/preview.component';
import { ResultComponent } from '@app/tabs/pathologic/components/result/result.component';
import { ModalComponent } from './components/modal/modal.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FireBaseService } from './services/firebase.service';

const firebaseMor = {
  apiKey: 'AIzaSyAzilofCoDTGFsFn-cZE-rVGIPUXPiU9yk',
  authDomain: 'larp-mor-2025.firebaseapp.com',
  projectId: 'larp-mor-2025',
  storageBucket: 'larp-mor-2025.firebasestorage.app',
  messagingSenderId: '547632797794',
  appId: '1:547632797794:web:bb3f3f03908ef30de3993b',
};

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    MaskitoDirective,
    AngularFireModule.initializeApp(firebaseMor),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  declarations: [
    PathologicPageComponent,
    SymptomsTableComponent,
    MedicineComponent,
    PreviewComponent,
    ResultComponent,
    ModalComponent,
  ],
  providers: [FireBaseService],
})
export class PathologicPageModule {}
