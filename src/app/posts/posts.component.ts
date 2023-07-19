import { Component } from '@angular/core';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  posts$ = this.postsService.posts$;

  constructor(private postsService: PostsService) {}
}
