import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent  implements OnInit {
  constructor() { }
  
  ngOnInit() {}
  
  @Input() nome!:string
  @Input() img!:string
  @Input() sobre!:string
  @Input() link!:string
}
