import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss'],
})
export class ProjetosComponent  implements OnInit {
  constructor() { }
  
  ngOnInit() {}
  
  @Input() nome!:any
  @Input() img!:any
  @Input() sobre!:any
  @Input() link!:any
}
