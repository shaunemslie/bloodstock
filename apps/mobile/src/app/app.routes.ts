import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@bloodstock/mobile/home/feature/home').then(
        (m) => m.HomeComponentModule
      ),
  },
  {
    path: 'browse',
    loadChildren: () =>
      import('@bloodstock/mobile/browse/feature/browse').then(
        (m) => m.BrowseComponentModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutes {}
