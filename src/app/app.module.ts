import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';



const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'bookapi' },
  { path: 'bookapi', component: BookComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
