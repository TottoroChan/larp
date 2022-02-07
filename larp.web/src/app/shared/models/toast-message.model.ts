export class ToastMessage {
  severity!: ToastSeverities;
  summary!: string;
  detail!: string;

  constructor(severity: ToastSeverities, summary: string, detail: string) {
    this.severity = severity;
    this.summary = summary;
    this.detail = detail;
  }
}

export enum ToastSeverities {
  Success = 'success',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Custom = 'custom',
}
