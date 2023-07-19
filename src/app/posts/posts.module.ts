import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsService } from './services/posts.service';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, PostsRoutingModule],
  providers: [PostsService],
})
export class PostsModule {}
