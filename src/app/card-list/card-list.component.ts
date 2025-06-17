import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Experience, PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
  animations: [
    trigger('slideIn', [
      state('initial', style({
        opacity: 0,
        transform: 'translateX(-20px)'
      })),
      state('final', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('initial => final', animate('0.5s ease-out'))
    ])
  ]
})
export class CardListComponent implements OnInit {
  experiences: Experience[] = [];
  cardStates: string[] = [];
  expandedIndex: number | null = null;
  expandedAnimState: 'collapsed' | 'expanded' = 'collapsed';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    console.log('CardListComponent: Initializing...');
    this.portfolioService.getPortfolioData().subscribe({
      next: (data) => {
        console.log('CardListComponent: Data received:', data);
        this.experiences = data.experiences;
        this.cardStates = this.experiences.map((_, index) => 'initial');
        this.animateCards();
      },
      error: (error) => {
        console.error('CardListComponent: Error loading data:', error);
      }
    });
  }

  animateCards() {
    this.cardStates.forEach((_, index) => {
      setTimeout(() => {
        this.cardStates[index] = 'final';
      }, index * 200);
    });
  }

  expandExperience(index: number) {
    this.expandedIndex = index;
    this.expandedAnimState = 'collapsed';
    setTimeout(() => {
      this.expandedAnimState = 'expanded';
    }, 10);
  }

  closeExpandedExperience() {
    this.expandedIndex = null;
  }
}
