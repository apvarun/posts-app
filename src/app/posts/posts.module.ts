import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsService } from './services/posts.service';
import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './components/post/post.component';

import { postReducer } from './../state/posts/post.reducer';
import { PostEffects } from './../state/posts/post.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [PostsComponent, PostComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    PostsRoutingModule,
    SharedModule,
    StoreModule.forFeature('post', postReducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  providers: [PostsService],
})
export class PostsModule {}
