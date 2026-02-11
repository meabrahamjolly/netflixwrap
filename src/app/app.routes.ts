import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Browse } from './pages/browse/browse';
import { Wrapped } from './pages/wrapped/wrapped';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: '', component: Home, canActivate: [authGuard] },
    { path: 'tv-shows', component: Browse, canActivate: [authGuard] },
    { path: 'movies', component: Browse, canActivate: [authGuard] },
    { path: 'new-popular', component: Browse, canActivate: [authGuard] },
    { path: 'my-list', component: Browse, canActivate: [authGuard] },
    { path: 'wrapped', component: Wrapped, canActivate: [authGuard] }
];
