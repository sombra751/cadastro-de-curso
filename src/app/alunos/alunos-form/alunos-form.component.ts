import { CursosService } from './../../cursos/service/cursos.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { EMPTY, Observable, catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { Curso } from 'src/app/cursos/cursos';
import { Alunos2Service } from '../service/alunos2.service';
import { AlunosService } from '../service/alunos.service';
import { FormValidations } from 'src/app/shared1/form-validations';
import { DropdownService } from 'src/app/shared1/services/dropdown.service';
import { ConsultaCepService } from 'src/app/shared1/services/consulta-cep.service';
import { EstadoBr } from 'src/app/shared1/models/estado-br.model';
import { Cidade } from 'src/app/shared1/models/cidade';
import { Aluno } from '../alunos';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.scss']
})
export class AlunosFormComponent implements OnInit {

  form!: FormGroup
  submitted: boolean = false;
  cursos: Curso[] = [];
  selected = '';
  title: string = 'Adição de aluno'

  estados!: EstadoBr[] | any;
  cidades!: Cidade[];
  
  constructor(
    private fb: FormBuilder,
    private alunosService: Alunos2Service,
    private router: Router,
    private alertService: AlertModalService,
    private route: ActivatedRoute,
    private alunos1Service: AlunosService,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,

  ) { }

  ngOnInit(): void {
    this.dropdownService
    .getEstadosBr()
    .subscribe((dados) => (this.estados = dados));


    if (this.router.url.includes('editar')) {
      this.title = 'Edição de aluno'
    }

    const aluno: Aluno  = this.route.snapshot.data['aluno'];

    this.form = this.fb.group({
      id: [aluno.id,],
      nome: [
        aluno.nome,
        [
          Validators.required,
          Validators.minLength(3),
          // Validators.maxLength(35),
        ],
      ],
      telefone: [aluno.telefone, Validators.compose([
        Validators.required,
        Validators.pattern(/(\([0-9]{2}\))[0-9]{4}[-][0-9]{4}$/)
      ])],
      email: [aluno.email, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      endereco: this.fb.group({
        cep: [aluno.endereco.cep, [Validators.required, Validators.pattern(/^[0-9]{5}-?[0-9]{3}$/)]],
        numero: [aluno.endereco.numero, Validators.required],
        complemento: [aluno.endereco.complemento],
        rua: [aluno.endereco.rua, Validators.required],
        bairro: [aluno.endereco.bairro, Validators.required],
        cidade: [aluno.endereco.cidade, Validators.required],
        estado: [aluno.endereco.estado, Validators.required],
      }),
      curso: [ aluno.curso, [Validators.required]]
    });

    console.log(aluno.endereco);


    this.alunos1Service.getTodosCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });


    const cepControl = this.form.get('endereco.cep');

    cepControl?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap((value) => console.log('Status CEP:', value)),
        switchMap((status) =>
          status === 'VALID'
            ? this.cepService.consultaCEP(cepControl.value)
            : EMPTY
        )
      )
      .subscribe((dados) => (dados ? this.populaDadosForm(dados) : {}));
    this.form
      .get('endereco.estado')
      ?.valueChanges.pipe(
        tap((estado) => console.log('Novo estado: ', estado)),
        map((estado) => this.estados.filter((e: any) => e.sigla === estado)),
        map((estados) =>
          estados && estados.length > 0 ? estados[0].id : EMPTY
        ), // Use um valor padrão ou um valor que faça sentido
        switchMap((estadoId: number) =>
          this.dropdownService.getCidades(estadoId)
        ),
        tap(console.log)
      )
      .subscribe((cidades =>this.cidades = cidades));
  }


  consultaCEP() {
    const cep = this.form.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }


  populaDadosForm(dados: any) {
    this.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  resetDadosForm() {
    this.form.patchValue({
      endereco: {
        rua: null,
        cep: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.valid) {
      console.log('submit');
      let msgSuccess = 'Aluno criado com sucesso!';
      let msgError = 'Erro ao criar aluno, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Aluno atualizado com sucesso!';
        msgError = 'Erro ao atualizar aluno, tente novamente!';
      }
      this.alunosService.save(this.form.value).subscribe(
        () => {
          this.alertService.showAlertSuccess(msgSuccess)
          this.router.navigate(['alunos']);
          this.form.reset();
        },
        (error: any) => {
          this.alertService.showAlertDanger(msgError);
        }
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['alunos']);
  }
}

