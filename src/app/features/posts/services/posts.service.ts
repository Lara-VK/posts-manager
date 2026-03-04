import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, retry } from 'rxjs';

export interface Post {
  _id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private api = 'http://localhost:3000';

  posts = signal<Post[]>([]);
  search = signal<string>('');

  filteredPosts = computed(() =>
    this.posts().filter((p) => p.title.toLowerCase().includes(this.search().toLowerCase())),
  );

  constructor(private http: HttpClient) {}

  currentPage = signal(1);
  lastPage = signal(1);

  loadPosts() {
    return this.http.get<any>(`${this.api}/posts?page=${this.currentPage()}&limit=5`).pipe(
      retry(1),
      tap((res) => {
        this.posts.set(res.data.data);
        this.lastPage.set(res.data.lastPage);
      }),
    );
  }

  deletePost(id: string) {
    return this.http.delete(`${this.api}/posts/${id}`);
  }
}
