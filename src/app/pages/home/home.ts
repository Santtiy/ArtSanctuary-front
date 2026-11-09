
import { Component } from '@angular/core';
import { Hero } from '../../components/home/hero/hero';
import { Intro } from '../../components/home/intro/intro';

import { ToolsSection } from '../../components/home/tools-section/tools-section';

import { Categories } from '../../components/home/categories/categories';

import { RecentWorks } from '../../components/home/recent-works/recent-works';

import { WorkspaceBanner } from '../../components/home/workspace-banner/workspace-banner';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Intro,

    ToolsSection,

    Categories,

    RecentWorks,

    WorkspaceBanner,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
