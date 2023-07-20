import { createReducer, on } from '@ngrx/store';
import {
  togglePost,
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
} from './post.actions';
import { PostState } from 'src/app/posts/models/post.model';

export const initialState: PostState = {
  posts: [],
  error: null,
  status: 'pending',
};

export const postReducer = createReducer(
  initialState,
  // Toggle view of a post
  on(
    togglePost,
    (state, { id }): PostState => ({
      ...state,
      posts: state.posts.map((post) =>
        post.data.id === id
          ? { ...post, state: post.state === 'open' ? 'closed' : 'open' }
          : post
      ),
    })
  ),
  // Loading state for posts
  on(loadPosts, (state): PostState => ({ ...state, status: 'loading' })),

  on(
    loadPostsSuccess,
    (state, { posts }): PostState => ({
      ...state,
      posts: posts.map((post) => ({ data: post, state: 'closed' })),
      error: null,
      status: 'success',
    })
  ),

  on(
    loadPostsFailure,
    (state, { error }): PostState => ({
      ...state,
      error: error,
      status: 'error',
    })
  )
);
