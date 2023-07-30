import { Tab } from './tab.models';

export interface AppSettings {
  title: string;
  tabs: Tab[];
  repo: string;
  doctorsToolImagePath: string;
}
