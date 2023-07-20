
const PostStatus = {
  PENDING: 'pending',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];

export type PostData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Post = {
  data: PostData;
  key: keyof PostData;
};

export type PostState = {
  posts: Post[];
  error: string | null;
  status: PostStatus;
};
