import { createAction, props } from '@ngrx/store';
import { PostData } from '../../posts/models/post.model';

export const togglePost = createAction(
  '[Posts Page] Toggle a Post',
  props<{ id: number, key: keyof PostData }>()
);

export const loadPosts = createAction('[Posts Page] Load Posts');

export const loadPostsSuccess = createAction(
  '[Post API] Post Load Success',
  props<{ posts: PostData[] }>()
);

export const loadPostsFailure = createAction(
  '[Post API] Post Load Failure',
  props<{ error: string }>()
);
