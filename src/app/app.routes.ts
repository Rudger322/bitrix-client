import { Routes } from '@angular/router';
import {MainLayout} from './core/layouts/main-layout/main-layout';
import {LoginPage} from './core/pages/login-page/login-page';
import {Courses} from './core/pages/courses/courses';
import {TasksPage} from './core/pages/tasks-page/tasks-page';

export const routes: Routes = [
  {
  path: '',
  component: MainLayout,
  children: [
    { path: '', component: LoginPage },
    { path: 'courses', component: Courses },
    { path: 'tasks/:id', component: TasksPage },
  ]
  }
];
