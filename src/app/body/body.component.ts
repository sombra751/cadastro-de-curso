import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  @Input() collapsed = false
  @Input() screenWidth = 0


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
  }

  getBodyClass(): string {
    let styleClass = '';

    if (this.router.url.includes('login')) {
      styleClass = 'login'; // Não aplicar estilos se a rota for 'login'
    }
  
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-trimmed';
    }
    
    return styleClass; // Retornar as classes CSS corretas
  }

  getBodyClass1(): any {
    let styleClass1 = '';
    
    if (this.router.url.includes('login')) {
      styleClass1 = 'login'; // Não aplicar estilos se a rota for 'login'
    } 
    return styleClass1;
  }
}
