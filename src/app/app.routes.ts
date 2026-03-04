import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/posts/pages/posts-list.page')
        .then(m => m.PostsListPage)
  },
  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./features/posts/pages/post-detail.page')
        .then(m => m.PostDetailPage)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./features/posts/pages/post-form.page')
        .then(m => m.PostFormPage)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./features/posts/pages/post-form.page')
        .then(m => m.PostFormPage)
  }
];