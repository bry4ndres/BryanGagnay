import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    if (typeof value !== 'string') {
      return { 'invalidDate': true };
    }

    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      return { futureDate: 'La fecha debe ser igual o mayor a la fecha actual' };
    }

    return null;
  };
}

