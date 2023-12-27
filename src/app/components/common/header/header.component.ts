import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  constructor( private el: ElementRef) { }


  ngOnInit() {}
  @Output() linkClicked: EventEmitter<string> = new EventEmitter<string>();

  direcionar(rota: string) {
    this.linkClicked.emit(rota);
  }

  // public direcionar (rota: string) {
  //   const fragment = this.el.nativeElement.querySelector(rota);
  //   if (fragment) fragment.scrollIntoView({ behavior: 'smooth' });
  // }


}
