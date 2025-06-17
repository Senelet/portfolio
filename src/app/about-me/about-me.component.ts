import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  animations: [
    trigger('fadeInUp', [
      state('initial', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('final', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('initial => final', animate('0.5s ease-out'))
    ]),
    trigger('staggerFadeIn', [
      state('initial', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('final', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('initial => final', animate('0.5s ease-out'))
    ])
  ]
})
export class AboutMeComponent {
  titleState = 'initial';
  contentState = 'initial';
  skillsState = 'initial';

  ngOnInit() {
    setTimeout(() => {
      this.titleState = 'final';
    }, 100);
    setTimeout(() => {
      this.contentState = 'final';
    }, 300);
    setTimeout(() => {
      this.skillsState = 'final';
    }, 500);
  }
}
