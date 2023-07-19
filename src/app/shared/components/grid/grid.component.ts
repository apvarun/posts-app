import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColumnCount } from '../../types/grid.type';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  @Input() columns: ColumnCount = 1;
}
