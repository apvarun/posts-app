import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnCount } from 'src/app/shared/types/grid.type';

@Component({
  selector: 'app-posts-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() columnCount: ColumnCount = 10;

  @Output() columnCountChange = new EventEmitter<ColumnCount>();


  public changeCount(count: ColumnCount) {
    this.columnCountChange.emit(count);
  }

}
