import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { MemoizedSelector } from '@ngrx/store';
import {
  selectAllPosts,
  selectPostStatus,
} from '../state/posts/post.selectors';
import { Post, PostState, PostStatus } from './models/post.model';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { togglePost } from '../state/posts/post.actions';

@Component({
  selector: 'app-grid',
  template: '<ng-content></ng-content>',
})
export class MockGridComponent {
  @Input() columns?: number;
}

@Component({
  selector: 'app-posts-header',
  template: '',
})
export class MockHeaderComponent {
  @Input() columnCount?: number;
}

@Component({
  selector: 'app-post',
  template: '',
})
export class MockPostComponent {
  @Input() post?: Post;
  @Input() key?: keyof Post;
}

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  let mockStore: MockStore;
  let mockAllPostsSelector: MemoizedSelector<PostState, Post[]>;
  let mockPostsStatusSelector: MemoizedSelector<
    PostState,
    {
      status: PostStatus;
      error: string | null;
    }
  >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostsComponent,
        MockGridComponent,
        MockPostComponent,
        MockHeaderComponent,
      ],
      providers: [provideMockStore()],
    });

    mockStore = TestBed.inject(MockStore);
    mockAllPostsSelector = mockStore.overrideSelector(selectAllPosts, []);
    mockPostsStatusSelector = mockStore.overrideSelector(selectPostStatus, {
      status: 'pending',
      error: null,
    });

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display all posts', () => {
    mockAllPostsSelector.setResult([
      {
        data: {
          userId: 1,
          id: 1,
          title: 'title',
          body: 'body',
        },

        key: 'title',
      },
    ]);

    mockPostsStatusSelector.setResult({
      status: 'success',
      error: null,
    });

    mockStore.refreshState();
    fixture.detectChanges();

    const appPosts = fixture.debugElement.queryAll(By.css('app-post'));
    expect(appPosts.length).toBe(1);
  });

  it('should dispatch an action when togglePost is invoked', () => {
    mockAllPostsSelector.setResult([
      {
        data: {
          userId: 1,
          id: 1,
          title: 'title',
          body: 'body',
        },

        key: 'title',
      },
    ]);

    mockPostsStatusSelector.setResult({
      status: 'success',
      error: null,
    });

    mockStore.refreshState();
    fixture.detectChanges();

    const appPost = fixture.debugElement.query(By.css('app-post'));

    spyOn(mockStore, 'dispatch');
    appPost.triggerEventHandler('togglePost', 'title');

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      togglePost({ id: 1, key: 'title' })
    );
  });

  it('should show loading state when posts are being loaded', () => {
    mockPostsStatusSelector.setResult({
      status: 'loading',
      error: null,
    });

    mockStore.refreshState();
    fixture.detectChanges();

    const appPost = fixture.debugElement.queryAll(By.css('app-post'));

    expect(appPost.length).toEqual(0);

    const loadingSkeleton = fixture.debugElement.queryAll(
      By.css('div[class="space-y-4"] > div')
    );

    expect(loadingSkeleton.length).toEqual(5);
  });
});
