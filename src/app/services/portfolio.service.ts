import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Skill {
  name: string;
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  skills: { name: string }[];
}

export interface Project {
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  githubUrl: string;
  skills: { name: string }[];
}

export interface PortfolioData {
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor(private http: HttpClient) {}

  getPortfolioData(): Observable<PortfolioData> {
    console.log('PortfolioService: Fetching data...');
    return this.http.get<PortfolioData>('assets/data/portfolio.json').pipe(
      tap({
        next: (data) => console.log('PortfolioService: Data fetched successfully:', data),
        error: (error) => console.error('PortfolioService: Error fetching data:', error)
      })
    );
  }
} 