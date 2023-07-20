import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  togglePost,
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
} from './post.actions';
import { selectAllPosts } from './post.selectors';
import { AppState } from '../app.state';
import { PostsService } from 'src/app/posts/services/posts.service';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private postService: PostsService
  ) { }

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
