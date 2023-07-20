import { loadPosts, loadPostsFailure, loadPostsSuccess, togglePost } from "./post.actions";
import { initialState, postReducer } from "./post.reducer";

const generateMockPostData = (count: number) => {
  const posts = [];
  for (let i = 0; i < count; i++) {
    posts.push({
      id: i,
      title: `Post ${i}`,
      body: `Post ${i} body`,
      userId: i
    });
  }
  return posts;
}

describe('Post Reducer', () => {
  it('should set state to loading when posts are being loaded', () => {
    const reducer = postReducer(initialState, loadPosts());

    expect(reducer).toEqual({
      posts: [],
      error: null,
      status: 'loading'
    })
  });

  it('should set state to success when posts are loaded', () => {
    const mockPosts = generateMockPostData(5);

    const reducer = postReducer(initialState, loadPostsSuccess({ posts: mockPosts }));

    expect(reducer).toEqual({
      posts: mockPosts.map(post => ({ data: post, key: 'title' })),
      error: null,
      status: 'success'
    })
  });

  it('should set state to errpr when posts loading fails', () => {
    const error = 'Loading failed';

    const reducer = postReducer(initialState, loadPostsFailure({ error }));

    expect(reducer).toEqual({
      posts: [],
      error: error,
      status: 'error'
    })
  });

  it('should toggle post view key to body when triggered', () => {
    const mockPosts = generateMockPostData(5);

    const loadedState = postReducer(initialState, loadPostsSuccess({ posts: mockPosts }));

    const reducer = postReducer(loadedState, togglePost({ id: 1, key: 'body' }));

    expect(reducer).toEqual({
      posts: mockPosts.map((post, index) => ({ data: post, key: index === 1 ? 'body' : 'title' })),
      error: null,
      status: 'success'
    })
  });

  it('should toggle post view key to userId when triggered', () => {
    const mockPosts = generateMockPostData(5);

    const loadedState = postReducer(initialState, loadPostsSuccess({ posts: mockPosts }));

    const reducer = postReducer(loadedState, togglePost({ id: 3, key: 'userId' }));

    expect(reducer).toEqual({
      posts: mockPosts.map((post, index) => ({ data: post, key: index === 3 ? 'userId' : 'title' })),
      error: null,
      status: 'success'
    })
  });

});