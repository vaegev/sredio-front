import { Routes } from '@angular/router';
import {GithubIntegration} from './github-integration/github-integration';
import {DataViewComponent} from './data-view/data-view';

export const routes: Routes = [
  { path: 'data', component: DataViewComponent },
  { path: 'integration-success', component: GithubIntegration },
  { path: '**', redirectTo: '/integration-success' },
];
