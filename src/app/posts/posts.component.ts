import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPosts } from '../state/posts/post.selectors';
import { AppState } from '../state/app.state';
import { loadPosts, togglePost } from '../state/posts/post.actions';
import { PostData } from './models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  posts$ = this.store.select(selectAllPosts);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadPosts());
  }

  public togglePost(postId: number, key: keyof PostData) {
    this.store.dispatch(togglePost({ id: postId, key }));
  }
}
