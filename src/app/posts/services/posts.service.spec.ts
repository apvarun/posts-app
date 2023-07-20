import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PostsService } from "src/app/posts/services/posts.service";
import { environment } from "src/environments/environment";

describe('Posts Service', () => {

  let service: PostsService;
  let httpController: HttpTestingController;

  let url = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService],
    });
    service = TestBed.inject(PostsService);
    httpController = TestBed.inject(HttpTestingController);
  });


  it('should call getPosts and return an array of posts', () => {

    const mockPosts = [
      {
        id: 1,
        userId: 1,
        title: 'Title 1',
        body: 'Body 1',
      },
    ];

    service.getPosts().subscribe((res) => {
      expect(res).toEqual(mockPosts);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/posts`,
    });

    req.flush(mockPosts);
  });

});