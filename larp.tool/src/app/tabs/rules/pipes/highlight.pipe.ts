import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, searchQuery: string): string {
    if (!searchQuery) {
      return text;
    }

    if (!text.includes(searchQuery)) {
      return text;
    }

    return text.replace(searchQuery, `<span class='highlight'>${searchQuery}</span>`);
  }
}
