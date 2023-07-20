import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent]
    }).overrideComponent(PostComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isId to true when key is id', () => {
    component.key = 'id';

    expect(component.isId).toBeTrue();
  });

  it('should set isId to true when key is userId', () => {
    component.key = 'userId';

    expect(component.isId).toBeTrue();
  });

  it('should emit next key when toggle is triggered', () => {
    spyOn(component.togglePost, 'emit')

    component.key = 'title';
    component.toggle();
    expect(component.togglePost.emit).toHaveBeenCalledWith(
      'userId'
    )

    component.key = 'userId';
    component.toggle();
    expect(component.togglePost.emit).toHaveBeenCalledWith(
      'id'
    )

    component.key = 'id';
    component.toggle();
    expect(component.togglePost.emit).toHaveBeenCalledWith(
      'body'
    )

    component.key = 'body';
    component.toggle();
    expect(component.togglePost.emit).toHaveBeenCalledWith(
      'title'
    )
  });

  it('should trigger toggle when button is clicked', () => {
    component.key = 'title';
    component.post = {
      id: 1,
      userId: 1,
      title: 'title',
      body: 'body'
    };

    fixture.detectChanges();

    spyOn(component, 'toggle');

    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    expect(component.toggle).toHaveBeenCalled();
  });

  it('should display value of key when modified', () => {
    component.post = {
      id: 1,
      userId: 1,
      title: 'title',
      body: 'body'
    };

    component.key = 'title';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));

    expect(button.nativeElement.textContent.trim()).toEqual('title');

    component.key = 'userId';
    fixture.detectChanges();
    expect(button.nativeElement.textContent.trim()).toEqual('1');

    component.key = 'id';
    fixture.detectChanges();
    expect(button.nativeElement.textContent.trim()).toEqual('1');

    component.key = 'body';
    fixture.detectChanges();
    expect(button.nativeElement.textContent.trim()).toEqual('body');
  });

});
