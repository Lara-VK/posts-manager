import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap, combineLatest, tap } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-post-detail',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div *ngIf="loading()">Cargando...</div>

    <div *ngIf="post()">

      <h2>{{ post()?.title }}</h2>
      <p>{{ post()?.body }}</p>
      <small>{{ post()?.author }}</small>

      <hr>

      <h3>Comentarios</h3>

      <div *ngIf="comments().length === 0">
        No hay comentarios
      </div>

      <div *ngFor="let comment of comments()">
        <strong>{{ comment.name }}</strong>
        <p>{{ comment.body }}</p>
      </div>

      <hr>

      <h3>Agregar comentario</h3>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <input formControlName="name" placeholder="Nombre" />
        <input formControlName="email" placeholder="Email" />
        <textarea formControlName="body" placeholder="Comentario"></textarea>
        <button type="submit" [disabled]="form.invalid">
          Enviar
        </button>
      </form>

    </div>
  `
})
export class PostDetailPage implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  api = 'http://localhost:3000';

  post = signal<any>(null);
  comments = signal<any[]>([]);
  loading = signal(true);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    body: ['', Validators.required],
  });

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');

        return combineLatest([
          this.http.get<any>(`${this.api}/posts/${id}`),
          this.http.get<any>(`${this.api}/comments?postId=${id}`)
        ]);
      }),
      tap(([postRes, commentsRes]) => {
        this.post.set(postRes.data);
        this.comments.set(commentsRes.data);
        this.loading.set(false);
      })
    ).subscribe();
  }

  submit() {
    if (!this.post()) return;

    const payload = {
      ...this.form.value,
      postId: this.post()._id
    };

    this.http.post<any>(`${this.api}/comments`, payload)
      .pipe(
        tap(res => {
          this.comments.set([res.data, ...this.comments()]);
          this.form.reset();
        })
      )
      .subscribe();
  }
}