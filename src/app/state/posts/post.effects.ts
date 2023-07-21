import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadPosts, loadPostsSuccess, loadPostsFailure } from './post.actions';
import { AppState } from '../app.state';
import { PostsService } from 'src/app/posts/services/posts.service';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private postService: PostsService
  ) {}

  // Load posts from API
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => loadPostsSuccess({ posts })),
          catchError((error) => of(loadPostsFailure({ error: error.message })))
        )
      )
    )
  );
}
