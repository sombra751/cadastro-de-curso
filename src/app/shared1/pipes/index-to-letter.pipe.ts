import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexToLetter'
})
export class IndexToLetterPipe implements PipeTransform {
  transform(index: number): string {
    return String.fromCharCode(97 + index).toUpperCase(); // Converte índice para letra (a, b, c...)
  }
}
