import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDarkMode = signal<boolean>(localStorage.getItem('scout-dark-mode') === 'true');

  constructor() {
    effect(() => {
      const dark = this.isDarkMode();
      document.body.classList.toggle('dark-theme', dark);
      localStorage.setItem('scout-dark-mode', String(dark));
    });
    document.body.classList.toggle('dark-theme', this.isDarkMode());
  }

  toggle(): void {
    this.isDarkMode.update(v => !v);
  }
}
