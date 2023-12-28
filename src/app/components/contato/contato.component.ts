import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
})
export class ContatoComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
  @Input() nome!: string
  @Input() link!: string
  @Input() img!: string
}
