import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsService } from './services/posts.service';
import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [PostsComponent, PostComponent],
  imports: [CommonModule, PostsRoutingModule, SharedModule],
  providers: [PostsService],
})
export class PostsModule {}
