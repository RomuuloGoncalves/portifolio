import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {  RouterModule, Routes } from '@angular/router';


import { HomePageRoutingModule } from './home-routing.module';
import { ProjetosComponent } from 'src/app/components/projetos/projetos.component';
import { HeaderComponent } from 'src/app/components/common/header/header.component';
import { SkillsComponent } from 'src/app/components/skills/skills.component';
import { ContatoComponent } from 'src/app/components/contato/contato.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, ProjetosComponent, HeaderComponent, SkillsComponent, ContatoComponent]
})
export class HomePageModule {}
