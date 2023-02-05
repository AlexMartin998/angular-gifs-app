import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interface';

// providedIn: accesible desde Toda la App. Ya no hace falta declararlo en los  `providers`, export/inport en donde se lo requiera inyectar
@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifsList: Gif[] = [];
  private _tagsHistory: string[] = ['Saitama'];
  private apiKey: string = '';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (!tag) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    // Es un Observable
    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifsList = resp.data;
      });

    /* // // // con fetch
    const resp = await fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=&q=saitama&limit=3'
    );
    const data = await resp.json();
    console.log(data); */
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag))
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
  }
}
