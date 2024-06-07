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
    ["HTML", "./assets/img/habilidades/html.svg"],
    ["CSS", "./assets/img/habilidades/css.svg"],
    ["SCSS", "./assets/img/habilidades/scss.svg"],
    ["Tailwind", "./assets/img/habilidades/tailwind.svg"],
    ["Bootstrap", "./assets/img/habilidades/bootstrap.svg"],
    ["Javascript", "./assets/img/habilidades/js.svg"],
    ["Typescript", "./assets/img/habilidades/ts.svg"],
    ["Angular", "./assets/img/habilidades/angular.svg"],
    ["MySql", "./assets/img/habilidades/mysql.svg"],
    ["PHP", "./assets/img/habilidades/php.svg"],
    ["Ionic", "./assets/img/habilidades/ionic.svg"],
    ["Markdown", "./assets/img/habilidades/md.svg"],
    ["Laravel", "./assets/img/habilidades/laravel.svg"],
    ["Firebase", "./assets/img/habilidades/firebase.svg"],
    ["Python", "./assets/img/habilidades/python.svg"]
  ];

  ferramentas: any = [
    ["Figma", "./assets/img/habilidades/figma.svg"],
    ["Photoshop", "./assets/img/habilidades/photoshop.svg"],
    ["Linux", "./assets/img/habilidades/linux.svg"],
    ["GitHub", "./assets/img/habilidades/github.svg"],
    ["Gimp", "./assets/img/habilidades/gimp.svg"],
    ["Selenium", "./assets/img/habilidades/selenium.svg"],
    ["Git", "./assets/img/habilidades/git.svg"]
  ];

  skills: any = [
    ["HTML", "./assets/img/habilidades/html.svg"],
    ["CSS", "./assets/img/habilidades/css.svg"],
    ["SCSS", "./assets/img/habilidades/scss.svg"],
    ["Tailwind", "./assets/img/habilidades/tailwind.svg"],
    ["Bootstrap", "./assets/img/habilidades/bootstrap.svg"],
    ["Javascript", "./assets/img/habilidades/js.svg"],
    ["Typescript", "./assets/img/habilidades/ts.svg"],
    ["Angular", "./assets/img/habilidades/angular.svg"],
    ["MySql", "./assets/img/habilidades/mysql.svg"],
    ["PHP", "./assets/img/habilidades/php.svg"],
    ["Ionic", "./assets/img/habilidades/ionic.svg"],
    ["Markdown", "./assets/img/habilidades/md.svg"],
    ["Laravel", "./assets/img/habilidades/laravel.svg"],
    ["Firebase", "./assets/img/habilidades/firebase.svg"],
    ["Python", "./assets/img/habilidades/python.svg"],
    ["Figma", "./assets/img/habilidades/figma.svg"],
    ["Photoshop", "./assets/img/habilidades/photoshop.svg"],
    ["Linux", "./assets/img/habilidades/linux.svg"],
    ["GitHub", "./assets/img/habilidades/github.svg"],
    ["Gimp", "./assets/img/habilidades/gimp.svg"],
    ["Selenium", "./assets/img/habilidades/selenium.svg"],
    ["Git", "./assets/img/habilidades/git.svg"]
  ];


  projetos: any = [
    [
      'APP - Delivery',
      'Aplicativo de delivery.',
      './assets/img/delivery.png',
      'https://github.com/RomuuloGoncalves/TCC-Delivery'
    ],
    [
      'ATOMOX',
      'Sistema de monitoramento de qualidade do ar',
      './assets/img/atomox.png',
      'https://github.com/RomuuloGoncalves/Projeto-Integrador-ATOMOX'
    ],
    [
      'GEOLAB',
      'Aplicativo educacional com realidade aumentada',
      './assets/img/geolab.png',
      'https://github.com/RomuuloGoncalves/GeoLab'
    ],
    [
      'TO DO',
      'App para criar e planejar tarefas.',
      './assets/img/todo.jpg',
      'https://romuulogoncalves.github.io/todo-app/'
    ],
    [
      'Clone do site do Discord',
      'Site do Discord usando Tailwind',
      './assets/img/discord_clone.png',
      'https://github.com/RomuuloGoncalves/discord_clone'
    ],
    [
      'Calculadora',
      'Calculadora.',
      './assets/img/calculadora.png',
      'https://romuulogoncalves.github.io/calculator/'
    ],
    [
      'Países',
      'API para coletar dados de países.',
      './assets/img/rest-api.png',
      'https://github.com/RomuuloGoncalves/countries_api'
    ],
    // [
    //   'Gerador de senha',
    //   'Sistema para gerar senhas aleatórias',
    //   './assets/img/gerador_senha.png',
    //   'https://romuulogoncalves.github.io/password-generator/'
    // ],
    // [
    //   'Jogo da velha',
    //   'Jogo da velha',
    //   './assets/img/velha.png',
    //   'https://romuulogoncalves.github.io/tic-tac-toe/'
    // ],
    [
      'Pedra, papel ou tesoura',
      'Jogo: Pedra, papel ou tesoura',
      './assets/img/pedra-papel-tesoura.png',
      'https://romuulogoncalves.github.io/rock-paper-scissors/'
    ]
  ]
}
