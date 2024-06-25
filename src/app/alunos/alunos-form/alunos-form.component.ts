import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { EMPTY, catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { Curso } from 'src/app/cursos/cursos';
import { Alunos2Service } from '../service/alunos2.service';
import { AlunosService } from '../service/alunos.service';
import { FormValidations } from 'src/app/shared1/form-validations';
import { DropdownService } from 'src/app/shared1/services/dropdown.service';
import { ConsultaCepService } from 'src/app/shared1/services/consulta-cep.service';
import { EstadoBr } from 'src/app/shared1/models/estado-br.model';
import { Cidade } from 'src/app/shared1/models/cidade';
import { Aluno, Testes } from '../alunos';

@Component({
  selector: 'app-alunos-form',
  templateUrl: './alunos-form.component.html',
  styleUrls: ['./alunos-form.component.scss']
})
export class AlunosFormComponent implements OnInit {

  form!: FormGroup;
  cursos: Curso[] = [];
  roles: Testes[] = [];
  estados!: EstadoBr[] | any;
  cidades!: Cidade[];
  hide = true;
  submitted: boolean = false;
  title: string = 'Adição de aluno';

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



    const aluno: Aluno = this.route.snapshot.data['aluno'];

    this.form = this.fb.group({
      id: [aluno.id],
      nome: [aluno.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      telefone: [aluno.telefone, Validators.compose([Validators.required, Validators.pattern(/(\([0-9]{2}\))[0-9]{5}[-][0-9]{4}$/)])],
      email: [aluno.email, Validators.compose([Validators.required, Validators.email])],
      cep: [aluno.cep, [Validators.required, Validators.pattern(/^[0-9]{5}-?[0-9]{3}$/)]],
      numero: [aluno.numero],
      complemento: [aluno.complemento],
      rua: [aluno.rua, Validators.required],
      bairro: [aluno.bairro, Validators.required],
      cidade: [aluno.cidade, Validators.required],
      estado: [aluno.estado, Validators.required],
      password: [aluno.password, [Validators.required]],
      confirmPassword: ['', Validators.required],

      // testes: this.fb.array([]),  // Use FormArray instead of FormGroup
      matriculas: this.fb.array([])
    },
      {
        validators: this.MustMatch('password', 'confirmPassword', 'As senhas não coincidem!')
      });



    if (this.router.url.includes('editar')) {
      this.title = 'Edição de aluno';

      const hasMatriculas = aluno.matriculas && aluno.matriculas.length > 0;
      const hasNonEmptyMatriculaId = hasMatriculas && aluno.matriculas.some((matricula: any) => matricula.curso_id !== null && matricula.curso_id !== '');

      if (!hasNonEmptyMatriculaId) {
        this.addMatricula()
      }
    } else {
      this.addMatricula()
    }



    // const testesArray = this.form.get('testes') as FormArray;

    // if (aluno.testes && aluno.testes.length > 0) {
    //   aluno.testes.forEach((teste: any) => {
    //     const testeGroup = this.fb.group({
    //       roleId: [teste.roleId, Validators.required],
    //     });
    //     testesArray.push(testeGroup);
    //   });
    // }

    const matriculasArray = this.form.get('matriculas') as FormArray;

    if (aluno.matriculas && aluno.matriculas.length > 0) {
      aluno.matriculas.forEach((matricula: any) => {
        const matriculaGroup = this.fb.group({
          curso_id: [matricula.curso_id, [Validators.required]]
        })
        matriculasArray.push(matriculaGroup)
      })
    }


    this.alunos1Service.getRoles().subscribe((roles) => {
      this.roles = roles;
    });

    this.alunos1Service.getTodosCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });

    const cepControl = this.form.get('cep');

    cepControl?.statusChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((status) =>
          status === 'VALID'
            ? this.cepService.consultaCEP(cepControl.value)
            : EMPTY
        )
      )
      .subscribe((dados) => (dados ? this.populaDadosForm(dados) : {}));

    this.form
      .get('estado')
      ?.valueChanges.pipe(
        map((estado) => this.estados.filter((e: any) => e.sigla === estado)),
        map((estados) =>
          estados && estados.length > 0 ? estados[0].id : EMPTY
        ),
        switchMap((estadoId: number) =>
          this.dropdownService.getCidades(estadoId)
        ),
        tap(console.log)
      )
      .subscribe((cidades => this.cidades = cidades));
  }

  MustMatch(controlName: string, matchingControlName: string, errorMessage: string) {
    return (formgroup: FormGroup) => {
      const control = formgroup.controls[controlName];
      const matchingControl = formgroup.controls[matchingControlName];
  
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return;
      }
  
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true, message: errorMessage });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  

  getMatriculasControls(): AbstractControl[] {
    return (this.form.get('matriculas') as FormArray)?.controls || []
  }


  addMatricula() {
    const novaMatricula = this.fb.group({
      curso_id: [null, [Validators.required]]
    });
    (this.form.get('matriculas') as FormArray).push(novaMatricula)
  }

  getTestesControls(): AbstractControl[] {
    return (this.form.get('testes') as FormArray)?.controls || [];
  }

  addTeste() {
    const novoControle = this.fb.group({
      roleId: [null, Validators.required], // Exemplo com uma validação
      // Outros controles necessários
    });

    (this.form.get('testes') as FormArray).push(novoControle);
  }


  consultaCEP() {
    const cep = this.form.get('cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.form.patchValue({
      rua: dados.logradouro,
      cep: dados.cep,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }

  resetDadosForm() {
    this.form.patchValue({
      rua: null,
      cep: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null,
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      const testes = this.form.get('testes')?.value.map((teste: any) => {
        return { roleId: teste.roleId };
      });
      console.log('form enviado:', this.form.value)

      const alunoData = { ...this.form.value, testes };

      let msgSuccess = 'Aluno criado com sucesso!';
      let msgError = 'Erro ao criar aluno, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Aluno atualizado com sucesso!';
        msgError = 'Erro ao atualizar aluno, tente novamente!';
      }

      this.alunosService.save(alunoData).subscribe(
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
