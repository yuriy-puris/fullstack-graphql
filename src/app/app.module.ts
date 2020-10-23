import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink  } from 'apollo-angular-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpLinkModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }