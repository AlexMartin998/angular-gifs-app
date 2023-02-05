import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gif-card',
  templateUrl: './card.component.html',
})
export class GifsCardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  // @Override <- se ejecuta cuando se inicializa el component
  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required');
  }
}
