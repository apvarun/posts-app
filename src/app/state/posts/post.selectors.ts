import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PostState } from 'src/app/posts/models/post.model';

export const selectPosts = (state: AppState) => state.post;

export const selectAllPosts = createSelector(
  selectPosts,
  (state: PostState) => state.posts
);
