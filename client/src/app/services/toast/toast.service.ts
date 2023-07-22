import { Injectable, TemplateRef } from '@angular/core';

export interface ToastInfo {
classname: any;
textOrTpl: TemplateRef<any>|null;
  header: string;
  body: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: ToastInfo[] = [];

	show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.toasts.push({ textOrTpl, ...options });
	}

	remove(toast: ToastInfo) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}

  constructor() { }
}
