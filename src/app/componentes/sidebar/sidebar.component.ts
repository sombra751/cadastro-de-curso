import { AuthGuard } from '../../login/guards/auth.guard';
import { transition, trigger, style, animate, keyframes } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../login/service/login.service';
import { environment } from 'src/environments/environment';
import { AutenticacaoService } from 'src/app/login/service/autenticacao.service';
import { UserService } from 'src/app/login/service/user.service';


interface sideNavToogle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms',
          style({ opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms',
          style({ opacity: 0 })
        ),
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  users!: any[];

  mostrarMenu: boolean = false
  collapsed = false;
  screenWidth = 0;
  @Output() onToggleSideNav: EventEmitter<sideNavToogle> = new EventEmitter


  allMoments: any[] = []
  moments: any[] = []
  baseApiUrl = environment.API
  usuarioAual!: any

  constructor(
    private loginService: LoginService, 
    private authService: AutenticacaoService, 
    private userService: UserService,) {

  }

  ngOnInit(): void {
    
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
      )
      this.usuarioAual = this.authService.usuario 
      console.log('usuario sidebar',this.usuarioAual )
      

    // this.loginService.getUsers().subscribe((items) => {
    //   const data = items.data

    //   data.map((item) => {
    //     item.created_at = new Date(item)
    //   })
    // })


  }

  

  temPermissao(roles: string[]): boolean {
    return this.authService.temPermissao(roles);
  }
  
  toogleCollapse(): void {
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  closeSidenav(): void {
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  logout() {
    this.loginService.logout()
  }
}
