import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { Materia } from 'src/app/materias/materias';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MateriaIdService } from '../services/materia-id.service';


@Component({
  selector: 'app-materia-id',
  templateUrl: './materia-id.component.html',
  styleUrls: ['./materia-id.component.scss']
})
export class MateriaIdComponent implements OnInit {
  materia1: Materia | any;
  vezesIniciadas: number = 0;
  safeURL! : any
  materias: any;
  videoUrl!: SafeResourceUrl;
  videoURL = 'https://www.youtube.com/watch?v=1ozGKlOzEVc'
  materiaId!: number;
  semAtividades!: any


  @ViewChild('youtubeVideo', { static: true }) youtubeVideo: ElementRef;

  constructor(private homeService: HomeService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private materiaService: MateriaIdService,
   private _sanitizer: DomSanitizer
    ) { 
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
      this.youtubeVideo = {} as ElementRef;

    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.materiaId = +params['id'];
    });

    
    this.materiaService.getVerificaAtividadeNaoReposdidas().subscribe(data => {
      this.semAtividades = data
    })

    // this.route.data.subscribe(data => {
    //   this.materia = data['materia']; // Assume-se que o resolvedor está configurado para fornecer um objeto Curso
    // })
    // const id = this.route.snapshot.paramMap.get('id');

    this.materiaService.getMaterias().subscribe(data => {
      this.materias = data;
    });
    
  }
  iniciarQuestao() {
    if (this.vezesIniciadas < 2) {
      this.vezesIniciadas++;
      // this.router.navigate(['questao'], { relativeTo: this.route });
      this.router.navigate(['aluno/materia', this.materiaId, 'questoes']);
      
    } else {
      alert('Você já iniciou as questões duas vezes.');
    }
  }
  verificarCliqueNoVideo() {
        console.log('Vídeo clicado!');
        // Adicione aqui a lógica que você deseja executar quando o vídeo for clicado
    }
}