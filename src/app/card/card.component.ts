import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillComponent } from '../skill/skill.component';

interface Skill {
  name: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, SkillComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
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
    ])
  ]
})
export class CardComponent {
  @Input() title: string = '';
  @Input() company: string = '';
  @Input() period: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() skills: Skill[] = [];
  @Input() expanded: boolean = false;
  @Input() expandAnimState: 'expanded' | 'collapsed' = 'expanded';
  @Output() closeCard = new EventEmitter<void>();
  @Output() expand = new EventEmitter<void>();

  onExpand() {
    if (!this.expanded) this.expand.emit();
  }

  onCloseCard(event?: MouseEvent) {
    this.expandAnimState = 'collapsed';
    setTimeout(() => {
      this.closeCard.emit();
    }, 350);
    if (event) event.stopPropagation();
  }
}
