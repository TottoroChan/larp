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
  doctorsToolImagePath:
    './../../../../../assets/images/arbor2022/doctors-tool/',
};

var fallout2024: AppSettings = {
  title: 'Fallout',
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
  ],
  repo: 'arbor2022',
  doctorsToolImagePath: '',
};

var pathalogic2025: AppSettings = {
  title: 'Fallout',
  tabs: [
    {
      id: 'home',
      title: 'Домашняя',
      route: 'home',
    },
  ],
  repo: 'pathalogic2025',
  doctorsToolImagePath: '',
};

export var appSettings: AppSettings = pathalogic2025;
