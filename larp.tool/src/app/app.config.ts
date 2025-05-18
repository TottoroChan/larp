import { AppSettings } from '@app/shared/models/app-settings.model';

const arbor2022: AppSettings = {
  isMobileApp: true,
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

const fallout2024: AppSettings = {
  isMobileApp: true,
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

const pathologic2025: AppSettings = {
  isMobileApp: false,
  title: 'Fallout',
  tabs: [
    {
      id: 'pathologic',
      title: 'Pathologic',
      route: 'pathologic',
      isDefault: true,
    },
  ],
  repo: '',
  doctorsToolImagePath: '',
  hasHeader: false,
  hasMasterMode: false,
};

export const appSettings: AppSettings = pathologic2025;
