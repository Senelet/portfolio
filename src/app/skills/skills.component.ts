import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PortfolioService, Skill } from '../services/portfolio.service';
import { SkillComponent } from '../skill/skill.component';

interface SkillGroup {
  category: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SkillComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillGroups: SkillGroup[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getPortfolioData().subscribe(data => {
      // Grouper les skills par catégorie
      const groups = new Map<string, Skill[]>();
      data.skills.forEach(skill => {
        if (!groups.has(skill.category)) {
          groups.set(skill.category, []);
        }
        groups.get(skill.category)?.push(skill);
      });

      // Convertir en tableau pour l'affichage
      this.skillGroups = Array.from(groups.entries()).map(([category, skills]) => ({
        category,
        skills
      }));

      // Trier les groupes par ordre alphabétique
      this.skillGroups.sort((a, b) => a.category.localeCompare(b.category));
    });
  }
} 