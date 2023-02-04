import { Injectable } from '@angular/core';

// providedIn: accesible desde Toda la App. Ya no hace falta declararlo en los  `providers`, export/inport en donde se lo requiera inyectar
@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = ['Saitama', 'Death Note'];

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (!tag) return;
    this.organizeHistory(tag);
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
  }
}
