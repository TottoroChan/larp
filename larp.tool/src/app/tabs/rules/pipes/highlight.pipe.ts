import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, searchQuery: string): string {
    if (!searchQuery) {
      return text;
    }

    const regex = new RegExp(searchQuery, 'gi');
    const match = text.match(regex);

    if (!match) {
      return text;
    }

    return text.replace(regex, `<span class='highlight'>${match[0]}</span>`);
  }
}
