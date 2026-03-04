import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {

  errorMessage = signal<string | null>(null);

  handle(error: any) {
    const message =
      error?.error?.message ||
      'Ha ocurrido un error inesperado';

    this.errorMessage.set(message);

    setTimeout(() => {
      this.errorMessage.set(null);
    }, 4000);
  }
}