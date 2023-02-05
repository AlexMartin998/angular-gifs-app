import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Search:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Search gifs..."

      (keyup.enter)="searchTag()"
      #txtTagInput

      autofocus
    />
  `,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput') // solo a ref locales
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private readonly gifsService: GifsService) {}

  // (keyup.enter)="searchTag(txtTagInput.value)"
  // searchTag(newTag: string) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
