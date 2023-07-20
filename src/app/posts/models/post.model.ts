const PostView = {
  OPEN: 'open',
  CLOSED: 'closed',
} as const;

const PostStatus = {
  PENDING: 'pending',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
} as const;

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];
export type PostView = (typeof PostView)[keyof typeof PostView];

export type PostData = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Post = {
  data: PostData;
  state: PostView;
};

export type PostState = {
  posts: Post[];
  error: string | null;
  status: PostStatus;
};
