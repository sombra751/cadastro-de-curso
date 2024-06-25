import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { DocenteService } from '../service/docente.service';
import { EstadoBr } from 'src/app/shared1/models/estado-br.model';
import { Cidade } from 'src/app/shared1/models/cidade';
import { EMPTY, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { DropdownService } from 'src/app/shared1/services/dropdown.service';
import { ConsultaCepService } from 'src/app/shared1/services/consulta-cep.service';
import { Testes } from 'src/app/alunos/alunos';

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.scss']
})
export class DocenteFormComponent implements OnInit {
  formDocente!: FormGroup;
  submitted: boolean = false;
  title: string = 'Adição de docente'
  estados!: EstadoBr[] | any;
  cidades!: Cidade[];
  roles: Testes[] = []
  hide = true;

  constructor(
    private fb: FormBuilder,
    private docenteService: DocenteService,
    private router: Router,
    private alertService: AlertModalService,
    private route: ActivatedRoute,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,

  ) { }

  ngOnInit(): void {

    this.dropdownService
      .getEstadosBr()
      .subscribe((dados) => (this.estados = dados));



    const docente = this.route.snapshot.data['docente'];


    this.formDocente = this.fb.group({
      id: [docente.id],
      nome: [docente.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      telefone: [docente.telefone, Validators.compose([Validators.required, Validators.pattern(/(\([0-9]{2}\))[0-9]{5}[-][0-9]{4}$/)])],
      email: [docente.email, Validators.compose([Validators.required, Validators.email])],
      cep: [docente.cep, [Validators.required, Validators.pattern(/^[0-9]{5}-?[0-9]{3}$/)]],
      numero: [docente.numero],
      complemento: [docente.complemento],
      rua: [docente.rua, Validators.required],
      bairro: [docente.bairro, Validators.required],
      cidade: [docente.cidade, Validators.required],
      estado: [docente.estado, Validators.required],
      password: [docente.password, [Validators.required]],
            confirmPassword: ['', Validators.required],

      // testes: this.fb.array([]),  // Use FormArray instead of FormGroup
    },
    {
      validators: this.MustMatch('password', 'confirmPassword', 'As senhas não coincidem!')
    });


    const testesArray = this.formDocente.get('testes') as FormArray;

    if (docente.testes && docente.testes.length > 0) {
      docente.testes.forEach((teste: any) => {
        const testeGroup = this.fb.group({
          roleId: [teste.roleId, Validators.required],
        });
        testesArray.push(testeGroup);
      });
    }

    this.docenteService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });

    if (this.router.url.includes('editar')) {
      this.title = 'Edição de docente'

    //   // Verifica se há testes e se pelo menos um roleId não está vazio
    //   const hasTestes = docente.testes && docente.testes.length > 0;
    //   const hasNonEmptyRoleId = hasTestes && docente.testes.some((teste: any) => teste.roleId !== null && teste.roleId !== '');

    //   if (!hasNonEmptyRoleId) {
    //     this.addTeste();
    //   }
    // } else {
    //   this.addTeste()
     }

    // console.log("roles", testesArray === null)


    const cepControl = this.formDocente.get('cep');

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

    this.formDocente
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
  


  getTestesControls(): AbstractControl[] {
    return (this.formDocente.get('testes') as FormArray)?.controls || [];
  }

  addTeste() {
    const novoControle = this.fb.group({
      roleId: [null, Validators.required], // Exemplo com uma validação
      // Outros controles necessários
    });

    (this.formDocente.get('testes') as FormArray).push(novoControle);
  }

  consultaCEP() {
    const cep = this.formDocente.get('cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {
    this.formDocente.patchValue({
      rua: dados.logradouro,
      cep: dados.cep,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }

  resetDadosForm() {
    this.formDocente.patchValue({
      rua: null,
      cep: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null,
    });
  }

  hasError(field: string) {
    return this.formDocente.get(field)?.errors;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.formDocente.value);

    if (this.formDocente.valid) {
      console.log('submit');
      let msgSuccess = 'Docente criado com sucesso!';
      let msgError = 'Erro ao criar docente, tente novamente!';
      if (this.formDocente.value.id) {
        msgSuccess = 'Docente atualizado com sucesso!';
        msgError = 'Erro ao atualizar docente, tente novamente!';
      }
      this.docenteService.save(this.formDocente.value).subscribe(
        () => {
          this.alertService.showAlertSuccess(msgSuccess)
          this.router.navigate(['docentes']);
          this.formDocente.reset();
        },
        (error: any) => {
          console.log(error)
          this.alertService.showAlertDanger(msgError);
        }
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.formDocente.reset();
    this.router.navigate(['docentes'])
  }
}
