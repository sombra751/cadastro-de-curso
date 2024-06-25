import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Admin2Service } from '../service/admin2.service';
import { EMPTY, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { DropdownService } from 'src/app/shared1/services/dropdown.service';
import { ConsultaCepService } from 'src/app/shared1/services/consulta-cep.service';
import { EstadoBr } from 'src/app/shared1/models/estado-br.model';
import { Cidade } from 'src/app/shared1/models/cidade';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  title: string = 'Adição de administrador'
  estados!: EstadoBr[] | any;
  cidades!: Cidade[];
  // roles: Testes[] = []
  hide = true;


  constructor(
    private fb: FormBuilder,
    private adminService: Admin2Service,
    private router: Router,
    private alertService: AlertModalService,
    private route: ActivatedRoute,
    // private docenteService: DocenteService,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.title = 'Edição de administrador';
    }
  
    const admin = this.route.snapshot.data['admin'];
    console.log(admin)
  
    this.form = this.fb.group({
      id: [admin.id],
      nome: [admin.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
      telefone: [admin.telefone, Validators.compose([Validators.required, Validators.pattern(/(\([0-9]{2}\))[0-9]{5}[-][0-9]{4}$/)])],
      email: [admin.email, Validators.compose([Validators.required, Validators.email])],
      cep: [admin.cep, [Validators.required, Validators.pattern(/^[0-9]{5}-?[0-9]{3}$/)]],
      numero: [admin.numero],
      complemento: [admin.complemento],
      rua: [admin.rua, Validators.required],
      bairro: [admin.bairro, Validators.required],
      cidade: [admin.cidade, Validators.required],
      estado: [admin.estado, Validators.required],
      password: [admin.password, [Validators.required]],
            confirmPassword: ['', Validators.required],

      // testes: this.fb.array([]),  // Use FormArray instead of FormGroup
    },
    {
      validators: this.MustMatch('password', 'confirmPassword', 'As senhas não coincidem!')
    });


    const testesArray = this.form.get('testes') as FormArray;

    if (admin.testes && admin.testes.length > 0) {
      admin.testes.forEach((teste: any) => {
        const testeGroup = this.fb.group({
          roleId: [teste.roleId, Validators.required],
        });
        testesArray.push(testeGroup);
      });
    }

    // this.adminService.getRoles().subscribe((roles) => {
    //   this.roles = roles;
    // });

    if (this.router.url.includes('editar')) {
      this.title = 'Edição de administrador'

      // Verifica se há testes e se pelo menos um roleId não está vazio
      const hasTestes = admin.testes && admin.testes.length > 0;
      const hasNonEmptyRoleId = hasTestes && admin.testes.some((teste: any) => teste.roleId !== null && teste.roleId !== '');

      if (!hasNonEmptyRoleId) {
        this.addTeste();
      }
    } else {
      this.addTeste()
    }

    console.log("roles", testesArray === null)


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
    console.log(this.form.value);

    if (this.form.valid) {
      console.log('submit');
      let msgSuccess = 'Docente criado com sucesso!';
      let msgError = 'Erro ao criar docente, tente novamente!';
      if (this.form.value.id) {
        msgSuccess = 'Docente atualizado com sucesso!';
        msgError = 'Erro ao atualizar docente, tente novamente!';
      }
      this.adminService.save(this.form.value).subscribe(
        () => {
          this.alertService.showAlertSuccess(msgSuccess)
          this.router.navigate(['docentes']);
          this.form.reset();
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
    this.form.reset();
    this.router.navigate(['docentes'])
  }
}
