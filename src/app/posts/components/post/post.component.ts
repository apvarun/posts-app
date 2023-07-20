import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PostData } from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  private keys: (keyof PostData)[] = ['title', 'userId', 'id', 'body'];

  @Input() post: PostData | null = null;

  @Input() key: keyof PostData = 'title';

  @Output() togglePost = new EventEmitter<keyof PostData>();

  get isId() {
    return this.key === 'id' || this.key === 'userId';
  }

  toggle() {
    const nextKey = this.keys[
      (this.keys.indexOf(this.key) + 1) % this.keys.length
    ];

    this.togglePost.emit(nextKey)
  }
}
