import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
  standalone: true
})
export class DatePipe implements PipeTransform {
    transform(value: any) {
      if (value) {
          const date = value instanceof Date ? value : new Date(value);
          return date.toLocaleDateString('pt', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
      return null;
  }
}
