import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { InfoComponent } from './components/info/info.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotpagefoundComponent } from './components/notpagefound/notpagefound.component';
import { AuthGuard } from './guards/auth.guard';
import { PerfilComponent } from './components/perfil/perfil.component';


export const APP_ROUTES: Routes =  [
    {path: 'home', component: HomeComponent },
    {path: 'search', canActivate: [AuthGuard], component: SearchComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil/:idUsuario', component: PerfilComponent},
    {path: 'info/:id/:origen', component: InfoComponent},
    {path: 'info/:id/:origen/:word', component: InfoComponent},
    {path: 'search/:word', component: SearchComponent},
    {path: '**', component: NotpagefoundComponent}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
