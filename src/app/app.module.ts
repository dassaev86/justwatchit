import { Route } from '@angular/router/src';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { InfoComponent } from './components/info/info.component';
import { APP_ROUTING } from './app.routes';
import { ImagesPipe } from './pipes/images.pipe';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotpagefoundComponent } from './components/notpagefound/notpagefound.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { FooterComponent } from './components/footer/footer.component';
import { ImagesHomePipe } from './pipes/images-home.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SearchComponent,
    InfoComponent,
    ImagesPipe,
    RegisterComponent,
    LoginComponent,
    NotpagefoundComponent,
    PerfilComponent,
    FooterComponent,
    ImagesHomePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    APP_ROUTING,
    JsonpModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-left',
      preventDuplicates: false
    })
   ],
  providers: [
   AuthService,
   AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
