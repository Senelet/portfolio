import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { CardListComponent } from './card-list/card-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SkillsComponent } from './skills/skills.component';

export const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutMeComponent },
  { path: 'work', component: CardListComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: '**', component: AboutMeComponent }
];
