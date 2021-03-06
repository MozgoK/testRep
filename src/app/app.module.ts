import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DesktopComponent } from './desktop/desktop.component';

import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard.service';

import { MainService } from './service/main.service';
import { MessagesComponent } from './messages/messages.component';
import { MsgComponent } from './msg/msg.component';
import { MsgInListComponent } from './msg.in.list/msg.in.list.component';
import { EditlabelComponent } from './editlabel/editlabel.component';

const appRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'desk', component: DesktopComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }
];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DesktopComponent,
    MessagesComponent,
    MsgComponent,
    MsgInListComponent,
    EditlabelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MainService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
