import { Post } from 'src/app/posts/models/post.model';
import { selectAllPosts, selectPostStatus } from './post.selectors';

const generateMockPost = (count: number) => {
  const posts = [];
  for (let i = 0; i < count; i++) {
    posts.push({
      id: i,
      title: `Post ${i}`,
      body: `Post ${i} body`,
      userId: i,
    });
  }
  return posts.map((post): Post => ({ data: post, key: 'title' }));
};

describe('Post Selector', () => {
  it('should select all posts from the state', () => {
    const mockPosts = generateMockPost(5);

    const data = selectAllPosts.projector({
      posts: mockPosts,
      error: null,
      status: 'success',
    });

    expect(data).toEqual(mockPosts);
  });

  it('should select posts status from the state', () => {
    const mockPosts = generateMockPost(5);

    const data = selectPostStatus.projector({
      posts: mockPosts,
      error: null,
      status: 'success',
    });

    expect(data).toEqual({ status: 'success', error: null });
  });
});
