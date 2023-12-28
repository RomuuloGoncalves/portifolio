import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }

  public direcionar(rota: string) {
    alert()
    const fragment = this.el.nativeElement.querySelector(rota);
    if (fragment) fragment.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToSection(sectionId: string) {
    const element = document.querySelector(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }


  tecnologias: any = [
    ["HTML", "./assets/img/habilidades/html.svg" || "./assets/img/habilidades/html.svg"],
    ["CSS", "./assets/img/habilidades/css.svg" || "./assets/img/habilidades/css.svg"],
    ["SCSS", "./assets/img/habilidades/scss.svg" || "./assets/img/habilidades/scss.svg"],
    ["Tailwind", "./assets/img/habilidades/tailwind.svg" || "./assets/img/habilidades/tailwind.svg"],
    ["Bootstrap", "./assets/img/habilidades/bootstrap.svg" || "./assets/img/habilidades/bootstrap.svg"],
    ["Javascript", "./assets/img/habilidades/js.svg" || "./assets/img/habilidades/js.svg"],
    ["Typescript", "./assets/img/habilidades/ts.svg" || "./assets/img/habilidades/ts.svg"],
    ["Angular", "./assets/img/habilidades/angular.svg" || "./assets/img/habilidades/angular.svg"],
    ["MySql", "./assets/img/habilidades/mysql.svg" || "./assets/img/habilidades/mysql.svg"],
    ["PHP", "./assets/img/habilidades/php.svg" || "./assets/img/habilidades/php.svg"],
    ["Ionic", "./assets/img/habilidades/ionic.svg" || "./assets/img/habilidades/ionic.svg"],
    ["Markdown", "./assets/img/habilidades/md.svg" || "./assets/img/habilidades/md.svg"],
    ["Laravel", "./assets/img/habilidades/laravel.svg" || "./assets/img/habilidades/laravel.svg"],
    ["Firebase", "./assets/img/habilidades/firebase.svg" || "./assets/img/habilidades/firebase.svg"],
    ["Python", "./assets/img/habilidades/python.svg" || "./assets/img/habilidades/python.svg"],
  ]

  ferramentas: any = [
    ["Figma", "./assets/img/habilidades/figma.svg" || "./assets/img/habilidades/figma.svg"],
    ["Photoshop", "./assets/img/habilidades/photoshop.svg" || "./assets/img/habilidades/photoshop.svg"],
    ["Linux", "./assets/img/habilidades/linux.svg" || "./assets/img/habilidades/linux.svg"],
    ["GitHub", "./assets/img/habilidades/github.svg" || "./assets/img/habilidades/github.svg"],
    ["Gimp", "./assets/img/habilidades/gimp.svg" || "./assets/img/habilidades/gimp.svg"],
    ["Selenium", "./assets/img/habilidades/selenium.svg" || "./assets/img/habilidades/selenium.svg"],
    ["Git", "./assets/img/habilidades/git.svg" || "./assets/img/habilidades/git.svg"],
  ]


  skills: any = [
    ["HTML", "./assets/img/habilidades/html.svg" || "./assets/img/habilidades/html.svg"],
    ["CSS", "./assets/img/habilidades/css.svg" || "./assets/img/habilidades/css.svg"],
    ["SCSS", "./assets/img/habilidades/scss.svg" || "./assets/img/habilidades/scss.svg"],
    ["Tailwind", "./assets/img/habilidades/tailwind.svg" || "./assets/img/habilidades/tailwind.svg"],
    ["Bootstrap", "./assets/img/habilidades/bootstrap.svg" || "./assets/img/habilidades/bootstrap.svg"],
    ["Javascript", "./assets/img/habilidades/js.svg" || "./assets/img/habilidades/js.svg"],
    ["Typescript", "./assets/img/habilidades/ts.svg" || "./assets/img/habilidades/ts.svg"],
    ["Angular", "./assets/img/habilidades/angular.svg" || "./assets/img/habilidades/angular.svg"],
    ["MySql", "./assets/img/habilidades/mysql.svg" || "./assets/img/habilidades/mysql.svg"],
    ["PHP", "./assets/img/habilidades/php.svg" || "./assets/img/habilidades/php.svg"],
    ["Ionic", "./assets/img/habilidades/ionic.svg" || "./assets/img/habilidades/ionic.svg"],
    ["Markdown", "./assets/img/habilidades/md.svg" || "./assets/img/habilidades/md.svg"],
    ["Laravel", "./assets/img/habilidades/laravel.svg" || "./assets/img/habilidades/laravel.svg"],
    ["Firebase", "./assets/img/habilidades/firebase.svg" || "./assets/img/habilidades/firebase.svg"],
    ["Python", "./assets/img/habilidades/python.svg" || "./assets/img/habilidades/python.svg"],
    ["Figma", "./assets/img/habilidades/figma.svg" || "./assets/img/habilidades/figma.svg"],
    ["Photoshop", "./assets/img/habilidades/photoshop.svg" || "./assets/img/habilidades/photoshop.svg"],
    ["Linux", "./assets/img/habilidades/linux.svg" || "./assets/img/habilidades/linux.svg"],
    ["GitHub", "./assets/img/habilidades/github.svg" || "./assets/img/habilidades/github.svg"],
    ["Gimp", "./assets/img/habilidades/gimp.svg" || "./assets/img/habilidades/gimp.svg"],
    ["Selenium", "./assets/img/habilidades/selenium.svg" || "./assets/img/habilidades/selenium.svg"],
    ["Git", "./assets/img/habilidades/git.svg" || "./assets/img/habilidades/git.svg"],
  ]

}
