import { AppSettings } from './shared/models/app-settings.model';

var arbor2022: AppSettings = {
  title: 'Арбор',
  tabs: [
    {
      id: 'home',
      title: 'Домашняя',
      route: 'home',
    },
    {
      id: 'rules',
      title: 'Правила',
      route: 'rules',
    },
    {
      id: 'tools',
      title: 'Инструменты',
      route: 'tools',
    },
  ],
  repo: 'arbor2022',
};

export var appSettings: AppSettings = arbor2022;
