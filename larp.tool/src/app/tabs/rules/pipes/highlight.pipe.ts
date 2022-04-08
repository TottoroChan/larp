import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, searchQuery: string): string {
    if (!searchQuery) {
      return text;
    }

    searchQuery = this.escapeHtml(searchQuery);

    if (!text.includes(searchQuery)) {
      return text;
    }

    return text.replace(
      searchQuery,
      `<span class='highlight'>${searchQuery}</span>`
    );
  }

  private escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/“/g, '&ldquo;')
      .replace(/”/g, '&rdquo;')
      .replace(/'/g, '&#039;');
  }
}
