import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { ApiService } from '../core/api.service';
import * as authActions from './auth.actions';
import { getLoginForm } from './auth.reducer';

@Injectable()
export class AuthEffects {
  @Effect()
  login = this.actions
    .ofType(authActions.LOGIN)
    .withLatestFrom(this.store.select(getLoginForm))
    .switchMap(([action, loginForm]) => this.apiService
      .post('/login', {
        name: loginForm.username,
        pw: loginForm.password,
        stayloggedin: loginForm.stayLoggedIn
      })
      .map(res => res.json())
      .map(res => {
        if (res.code === 200) {
          return new authActions.LoginSuccess({ uid: res.uid, authKey: res.key });
        }
        return new authActions.LoginFailed();
      })
    );

  @Effect()
  loadUser = this.actions
    .ofType(authActions.LOAD_USER)
    .throttleTime(5000)
    .switchMap((action) => this.apiService
      .get('/user/$self?nohistory=true')
      .map(res => res.json())
      .map(res => new authActions.ReceiveUser(res.data))
    )
  
  @Effect()
  loginSuccess = this.actions
    .ofType(authActions.LOGIN_SUCCESS)
    .do(() => this.router.navigateByUrl('dashboard'))
    .map(() => new authActions.LoadUser());
  
  @Effect({ dispatch: false })
  loginFailed = this.actions
    .ofType(authActions.LOGIN_FAILED)
    .do(() => alert('Wrong username or password'));
  
  @Effect()
  logout = this.actions
    .ofType(authActions.LOGOUT)
    .mergeMap(() => this.apiService
      .post('/logout', {})
      .map(res => res.json())
      .map(res => {
        if (res.code === 200) {
          return new authActions.LogoutSuccess();
        }
      })
    );

  @Effect({ dispatch: false })
  logoutSuccess = this.actions
    .ofType(authActions.LOGOUT_SUCCESS)
    .do(() => this.router.navigateByUrl('login'));
  
  @Effect()
  register = this.actions
    .ofType(authActions.REGISTER)
    .switchMap((action: authActions.Register) => this.apiService
      .post(
        '/register',
        action.payload
      )
      .map(res => res.json())
      .map(res => {
        if (res.code === 200) {
          return new authActions.LoginSuccess({ uid: res.uid, authKey: res.key });
        }
        return new authActions.RegistrationFailed();
      })
    );

  constructor(
    private actions: Actions,
    private store: Store<any>,
    private apiService: ApiService,
    private router: Router
  ) {}
}