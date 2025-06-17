import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillComponent } from '../skill/skill.component';

interface Skill {
  name: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, SkillComponent],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('initial', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('final', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('initial => final', animate('0.5s ease-out')),
    ]),
    trigger('expandAnimation', [
      state('expanded', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('collapsed', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),
      transition('expanded => collapsed', animate('0.35s cubic-bezier(.4,2,.6,1)')),
      transition('collapsed => expanded', animate('0.35s cubic-bezier(.4,2,.6,1)')),
    ]),
    trigger('imageHover', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('hovered', style({
        transform: 'scale(1.05)'
      })),
      transition('normal <=> hovered', animate('0.3s ease-in-out'))
    ])
  ]
})
export class ProjectCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() githubUrl: string = '';
  @Input() skills: Skill[] = [];
  @Input() index: number = 0;
  @Input() expanded: boolean = false;
  @Input() expandAnimState: 'expanded' | 'collapsed' = 'expanded';
  @Output() closeCard = new EventEmitter<void>();
  @Output() expand = new EventEmitter<void>();

  cardState = 'initial';
  imageState = 'normal';

  ngOnInit() {
    setTimeout(() => {
      this.cardState = 'final';
    }, this.index * 100);
  }

  onImageHover(state: string) {
    this.imageState = state;
  }

  onCloseCard(event?: MouseEvent) {
    this.expandAnimState = 'collapsed';
    setTimeout(() => {
      this.closeCard.emit();
    }, 350);
    if (event) event.stopPropagation();
  }

  onExpand() {
    if (!this.expanded) this.expand.emit();
  }
} 