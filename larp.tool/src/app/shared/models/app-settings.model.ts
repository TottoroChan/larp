import { Tab } from '@app/shared/models/tab.models';

export interface AppSettings {
  isMobileApp: boolean;
  title: string;
  tabs: Tab[];
  repo: string;
  doctorsToolImagePath: string;
  hasMasterMode: boolean;
  hasHeader: boolean;
}
