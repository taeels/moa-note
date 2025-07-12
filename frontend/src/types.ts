export interface Commit {
  id: string;
  subject: string;
  author: string;
  date: string;
  gerritLink: string;
  diff: string;
}

export interface CommitSummary {
  id: string;
  content: string;
  commit: Commit;
  topicId?: string; // Optional topic ID for grouping
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Digest {
  id: string;
  user: User;
  startDate: string;
  endDate: string;
  cw: string;
  version: string;
  summaries: CommitSummary[];
}
