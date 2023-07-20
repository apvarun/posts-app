import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display header text', () => {
    const heading = fixture.debugElement.query(By.css('h1'));

    expect(heading.nativeElement.textContent.trim()).toBe('All posts');
  });

  it('should emit the column count cnages', () => {
    spyOn(component.columnCountChange, 'emit');
    component.changeCount(10);

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 4;
    input.dispatchEvent(new Event('change'));

    expect(component.columnCountChange.emit).toHaveBeenCalledWith(4);
  });
});
