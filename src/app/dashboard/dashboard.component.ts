import { CursosData } from './cursos-data';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cursos = CursosData

  constructor() { }

  ngOnInit(): void {
  }

}
