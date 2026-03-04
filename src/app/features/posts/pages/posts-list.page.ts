import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../services/posts.service';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-posts-list',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h1>Posts</h1>

      <input
        type="text"
        placeholder="Buscar..."
        (input)="postsService.search.set($any($event.target).value)"
      />

      <a routerLink="/create">Crear Post</a>

      <div *ngIf="postsService.posts().length === 0">No hay posts todavía</div>

      <div *ngFor="let post of postsService.filteredPosts()">
        <h3>{{ post.title }}</h3>
        <p>{{ post.author }}</p>
        <a [routerLink]="['/posts', post._id]">Ver</a>
        <button (click)="deletePost(post._id)">Eliminar</button>
        <a [routerLink]="['/edit', post._id]">Editar</a>
      </div>
    </div>
  `,
})
export class PostsListPage {
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.loadPosts().subscribe();
  }

  deletePost(id: string) {
    if (!confirm('¿Seguro que deseas eliminar?')) return;

    this.postsService.deletePost(id).subscribe(() => {
      this.postsService.loadPosts().subscribe();
    });
  }
}
