import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { startWith, take } from 'rxjs/operators';

@Injectable()
export class PostsService {
  private postsUrl = `${environment.apiUrl}/posts`;

  private readonly _posts$: BehaviorSubject<Post[]> = new BehaviorSubject(
    [] as Post[]
  );

  constructor(private http: HttpClient) {}

  public get posts$() {
    const posts = this._posts$.getValue();

    if (posts.length === 0) {
      this.loadPosts();
    }

    return this._posts$;
  }

  private loadPosts() {
    this.http
      .get<Post[]>(this.postsUrl)
      .pipe(take(1))
      .subscribe((posts) => {
        this._posts$.next(posts);
      });
  }
}
