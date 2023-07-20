import { TestBed } from "@angular/core/testing";
import { PostEffects } from "./post.effects";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { PostsService } from "src/app/posts/services/posts.service";
import { Subject, of } from "rxjs";
import { loadPosts } from "./post.actions";

describe('Post Effects', () => {

  let effects: PostEffects;

  let actions$: Subject<any>;
  let postsService: jasmine.SpyObj<PostsService>;

  beforeEach(() => {
    actions$ = new Subject();
    postsService = jasmine.createSpyObj('PostsService', ['getPosts']);

    TestBed.configureTestingModule({
      providers: [
        PostEffects,
        { provide: Actions, useValue: actions$ },
        { provide: Store, useValue: { select: () => { }, dispatch: () => { } } },
        { provide: PostsService, useValue: postsService },
      ]
    });
  });

  it('should initialize PostEffects', () => {
    effects = TestBed.inject(PostEffects);

    expect(effects).toBeTruthy();
  });

  it('should trigger load posts from api when loadPosts is dispatched', (done) => {
    effects = TestBed.inject(PostEffects);

    postsService.getPosts.and.returnValue(of([]));

    effects.loadPosts$.subscribe(() => {
      expect(postsService.getPosts).toHaveBeenCalled();
      done()
    });

    actions$.next(loadPosts());
  });

});