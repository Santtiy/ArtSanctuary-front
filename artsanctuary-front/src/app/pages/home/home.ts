import { Component } from '@angular/core';
import { Hero } from '../../components/home/hero/hero';
import { Intro } from '../../components/home/intro/intro';

// [JUAN-5] import { ToolsSection } from '../../components/home/tools-section/tools-section';

// [MANUEL-6] import { Categories } from '../../components/home/categories/categories';

// [JUAN-7] import { RecentWorks } from '../../components/home/recent-works/recent-works';

// [SAMUEL-11] import { WorkspaceBanner } from '../../components/home/workspace-banner/workspace-banner';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    Intro,

    // [JUAN-5] ToolsSection,

    // [MANUEL-6] Categories,

    // [JUAN-7] RecentWorks,

    // [SAMUEL-11] WorkspaceBanner,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}