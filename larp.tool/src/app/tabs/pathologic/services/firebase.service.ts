import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { docData } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface AppConfig {
  today: number;
  lastUpdated: Date;
}

@Injectable({ providedIn: 'root' })
export class FireBaseService {
  private configDoc;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router, private auth: AngularFireAuth) {
    this.initializeAuthListener();
  }

  private initializeAuthListener(): void {
    this.auth.authState
      .pipe(
        switchMap((firebaseUser) => {
          return [firebaseUser];
        })
      )
      .subscribe({
        next: (user) => {
          this.currentUserSubject.next(user);
          console.log('User state changed:', user);
        },
        error: (error) => {
          console.error('Auth listener error:', error);
          this.currentUserSubject.next(null);
        },
      });
  }

  getConfig(): Observable<AppConfig> {
    return docData(this.configDoc) as Observable<AppConfig>;
  }

  async updateConfig(newConfig: Partial<AppConfig>): Promise<void> {
    await updateDoc(this.configDoc, {
      ...newConfig,
      lastUpdated: new Date(),
    });
  }

  // Регистрация по логину и паролю
  async register(login: string, password: string): Promise<boolean> {
    try {
      const email = this.loginToEmail(login);
      await this.auth.createUserWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }

  // Вход по логину и паролю
  async login(login: string, password: string): Promise<boolean> {
    try {
      const email = this.loginToEmail(login);
      const res = await this.auth.signInWithEmailAndPassword(email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  isAuthenticated(): boolean {
    return !!this.auth?.currentUser;
  }

  getCurrentUser() {
    return this.auth.authState;
  }

  // Преобразуем логин в email-подобный формат для Firebase
  private loginToEmail(login: string): string {
    return `${login}@morapp.local`;
  }

  // Получаем логин из email
  getLoginFromEmail(email: string): string {
    return email.replace('@morapp.local', '');
  }
}
