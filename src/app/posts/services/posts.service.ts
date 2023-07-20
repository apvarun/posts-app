import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PostData } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostsService {
  private postsUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  public getPosts() {
    return this.http.get<PostData[]>(this.postsUrl);
  }
}
