import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/throw';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { RegistrationModule } from './registration/registration.module';
import { GameModule } from './game/game.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      CoreModule,
      AuthModule,
      RegistrationModule,
      GameModule,
      AdminModule
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule {}