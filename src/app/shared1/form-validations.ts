import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export class FormValidations {

    static  requiredMinCheckbox(min = 1) {
        const validator: ValidatorFn = (formArray: AbstractControl) => {
          if (formArray instanceof FormArray) {
          const totalChecked = formArray.controls
            .map((v) => v.value)
            .reduce((total, current) => (current ? total + current : total), 0);
          return totalChecked >= min ? null : { required: true };
        }
    
        throw new Error('formArray is not an instance of FormArray');
      };
    
      return validator;
    }

    static cepValidator(control: FormControl) {
      const cep = control.value;
      if (cep && cep !== '') {
        const validacep = /^[0-9]{5}-?[0-9]{3}$/;
        return validacep.test(cep) ? null : { cepInvalido: true };
      }
      return null;
    }
    
  

    static equalsTo(otherField: string) {
      function validator(formControl: AbstractControl) {
        if (otherField == null) {
          throw new Error('E necessario informar um campo.');
        }

        if (!formControl.root || !(<FormGroup>formControl.root).controls) {
          return null;
        }

        const field = (<FormGroup>formControl.root).get(otherField);

        if (!field) {
          throw new Error('E necessario informar um campo válido.');
        }

        if (field.value !== formControl.value) {
          return { equalTo: otherField };
        }

        return null;
      }
      return validator
    }


      static getErrorMsg(fieldName: string, validatorName: keyof typeof FormValidations.config, validatorValue?: any) {
          const config = {
              'required': `${fieldName} é obrigatório.`,
              'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
              'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
              'cepInvalido': 'CEP inválido.',
              'emailInvalido': 'Email já cadastrado!',
              'equalsTo': 'Campos não são iguais',
              'pattern': 'Campo inválido'
          };
  
          return config[validatorName];
      }
      
      static config = {
        'required': 'Campo obrigatório.',
        'minlength': 'Campo precisa ter no mínimo {{requiredLength}} caracteres.',
        'maxlength': 'Campo pode ter no máximo {{requiredLength}} caracteres.',
        'cepInvalido': 'CEP inválido.',
        'emailInvalido': 'Email já cadastrado!',
        'equalsTo': 'Campos não são iguais',
        'pattern': 'Campo inválido'
          // ... other messages
      };
  }
  
