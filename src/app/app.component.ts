import { Component, Input, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

interface sideNavToogle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dashboard';
  screenWidth = 0;
  isSideNavCollapsed = false

constructor(
  private paginatorIntl: MatPaginatorIntl
  ) {
}

ngOnInit(): void {
  this.paginatorIntl.itemsPerPageLabel = 'Itens por página:';
  this.paginatorIntl.nextPageLabel = 'Próxima Página';
  this.paginatorIntl.previousPageLabel = 'Página Anterior';

}

onToggleSideNav(data: sideNavToogle): void {
  this.screenWidth = data.screenWidth;
  this.isSideNavCollapsed = data.collapsed;
}

}
