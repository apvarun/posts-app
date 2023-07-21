import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPosts, selectPostStatus } from '../state/posts/post.selectors';
import { AppState } from '../state/app.state';
import { loadPosts, togglePost } from '../state/posts/post.actions';
import { PostData } from './models/post.model';
import { ColumnCount } from '../shared/types/grid.type';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent {
  posts$ = this.store.select(selectAllPosts);
  status$ = this.store.select(selectPostStatus);

  columnCount: ColumnCount = 10; // number of columns in the grid

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadPosts());
  }

  public togglePost(postId: number, key: keyof PostData) {
    this.store.dispatch(togglePost({ id: postId, key }));
  }
}
