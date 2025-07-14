// angular import
import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// project import
import { environment } from 'src/environments/environment';
import { User } from '../components/_helpers/user';

// Import the 'map' operator from 'rxjs/operators'
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import { Base64 } from 'js-base64';
import { from, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { error } from 'console';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private router = inject(Router);
  private http = inject(HttpClient);

  private currentUserSignal = signal<User | null>(null);
  isLogin: boolean = false;

  constructor() {
    // Initialize the signal with the current user from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSignal.set(JSON.parse(storedUser) as User);
      this.isLogin = true;
    }
  }

  public get currentUserValue(): User | null {
    // Access the current user value from the signal
    return this.currentUserSignal();
  }

  public get currentUserName(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.user.name : null;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/api/auth/login`, { username, password }).pipe(
      map((user: User) => {
        // Explicitly define the type for 'user'
        // Store user details and JWT token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.isLogin = true;
        // Update the signal with the new user
        this.currentUserSignal.set(user);
        return user;
      })
    );
  }

  isLoggedIn() {
    return this.isLogin;
  }

  logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.isLogin = false;
    // Update the signal to null
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  async encryptPasswordAESGCM(password: string, keyBase64: string, nonceBase64: string): Promise<string> {
    const keyRaw = this.base64ToUint8Array(keyBase64);
    const nonce = this.base64ToUint8Array(nonceBase64);
  
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyRaw,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
  
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: nonce },
      cryptoKey,
      new TextEncoder().encode(password)
    );
  
    // return Base64.fromUint8Array(new Uint8Array(encryptedBuffer));
    return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));

  }

  base64ToUint8Array(base64: string): Uint8Array {
    base64 = base64.replace(/-/g, '+').replace(/_/g, '/'); // fix url-safe base64
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  
  // login2(username: string, password: string): Observable<any> {
  //   return this.http.get<any>(`${environment.apiUrl}/api/auth/challange?username=${username}`).pipe(
  //     concatMap((res) => {
  //       const { key, nonce, sessionToken } = res;
  //       return from(this.encryptPasswordAESGCM(password, key, nonce)).pipe(
  //         map((encryptedPassword) => ({
  //           username,
  //           sessionToken,
  //           encryptedPassword
  //         }))
  //       );
  //     }),
  //     tap(body => console.log('body to login :' + JSON.stringify(body))),
  //     concatMap((body) =>
       
  //       this.http.post(`${environment.apiUrl}/api/auth/login`, body).pipe(
  //         map((res : any)=> res),
  //         tap((result) => {
  //           console.log('Login response:', JSON.stringify(result))
  //           localStorage.setItem('currentUser', JSON.stringify(result));
  //           this.isLogin = true;
  //           this.currentUserSignal.set(result);
  //         })
  //       )
  //     )
  //   );
  // }
  
  login2(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/challange?username=${username}`).pipe(
      concatMap((res) => {
        const { key, nonce, sessionToken } = res;
        return from(this.encryptPasswordAESGCM(password, key, nonce)).pipe(
          map((encryptedPassword) => ({
            username,
            sessionToken,
            encryptedPassword
          }))
        );
      }),
      tap(body => console.log('body to login:', body)),
      concatMap((body) =>
        this.http.post(`${environment.apiUrl}/api/auth/login`, body).pipe(
          map((res: any) => res),
          tap((result) => {
            console.log('Login response:', result);
            localStorage.setItem('currentUser', JSON.stringify(result));
            this.isLogin = true;
            this.currentUserSignal.set(result);
          }),
          catchError((err) => {
            console.error('Login failed:', err);
            Swal.fire ('Error','Login gagal: ' + (err.error?.message || 'Silakan cek username/password'), "error");
            return throwError(() => err); // re-throw supaya bisa ditangkap di .subscribe() caller jika perlu
          })
        )
      )
    );
  }
  

}
