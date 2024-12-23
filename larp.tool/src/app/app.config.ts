import { AppSettings } from './shared/models/app-settings.model';

var arbor2022: AppSettings = {
  title: 'Арбор',
  tabs: [
    {
      id: 'home',
      title: 'Домашняя',
      route: 'home',
      isDefault: true,
    },
    {
      id: 'rules',
      title: 'Правила',
      route: 'rules',
      isDefault: false,
    },
    {
      id: 'tools',
      title: 'Инструменты',
      route: 'tools',
      isDefault: false,
    },
  ],
  repo: 'arbor2022',
  doctorsToolImagePath:
    './../../../../../assets/images/arbor2022/doctors-tool/',
  hasMasterMode: true,
  hasHeader: true,
};

var fallout2024: AppSettings = {
  title: 'Fallout',
  tabs: [
    {
      id: 'home',
      title: 'Домашняя',
      route: 'home',
      isDefault: true,
    },
    {
      id: 'rules',
      title: 'Правила',
      route: 'rules',
      isDefault: false,
    },
  ],
  repo: 'arbor2022',
  doctorsToolImagePath: '',
  hasHeader: true,
  hasMasterMode: true,
};

export var appSettings: AppSettings = arbor2022;
