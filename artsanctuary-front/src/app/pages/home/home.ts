import { Component } from '@angular/core';
import { Hero } from '../../components/home/hero/hero';
import { Intro } from '../../components/home/intro/intro';

@Component({
  selector: 'app-home',
  imports: [Hero, Intro],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}