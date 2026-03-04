import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>{{ isEdit() ? 'Editar Post' : 'Crear Post' }}</h2>

    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="title" placeholder="Título" />
      <div *ngIf="form.get('title')?.invalid && form.get('title')?.touched">
        Mínimo 3 caracteres
      </div>

      <textarea formControlName="body" placeholder="Contenido"></textarea>

      <input formControlName="author" placeholder="Autor" />

      <button type="submit" [disabled]="form.invalid">
        Guardar
      </button>
    </form>
  `,
})
export class PostFormPage implements OnInit {

  api = 'http://localhost:3000';

  isEdit = signal(false);
  postId: string | null = null;

  // ✅ SOLO DECLARAR
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {
    // ✅ INICIALIZAR AQUÍ
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');

          if (!id) return of(null);

          this.isEdit.set(true);
          this.postId = id;

          return this.http.get<any>(`${this.api}/posts/${id}`);
        }),
        tap((res) => {
          if (res) {
            this.form.patchValue(res.data);
          }
        }),
      )
      .subscribe();
  }

  submit() {
    if (this.form.invalid) return;

    const request = this.isEdit()
      ? this.http.put(`${this.api}/posts/${this.postId}`, this.form.value)
      : this.http.post(`${this.api}/posts`, this.form.value);

    request
      .pipe(tap(() => this.router.navigate(['/'])))
      .subscribe();
  }
}