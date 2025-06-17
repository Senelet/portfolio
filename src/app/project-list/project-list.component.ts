import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { PortfolioService, Project } from '../services/portfolio.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  expandedIndex: number | null = null;
  expandedAnimState: 'collapsed' | 'expanded' = 'collapsed';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    console.log('ProjectListComponent: Initializing...');
    this.portfolioService.getPortfolioData().subscribe({
      next: (data) => {
        console.log('ProjectListComponent: Data received:', data);
        this.projects = data.projects;
      },
      error: (error) => {
        console.error('ProjectListComponent: Error loading data:', error);
      }
    });
  }

  expandProject(index: number) {
    this.expandedIndex = index;
    this.expandedAnimState = 'collapsed';
    setTimeout(() => {
      this.expandedAnimState = 'expanded';
    }, 10);
  }

  closeExpandedProject() {
    this.expandedIndex = null;
  }
} 