export const sampleDigests = [
  {
    id: "digest-1",
    user: {
      id: "user-1",
      username: "john.doe",
      email: "john.doe@example.com",
    },
    startDate: "2024-07-01",
    endDate: "2024-07-07",
    version: "1.0",
    summaries: [
      {
        id: "summary-1",
        content: "Refactored authentication module to use OAuth2. Major changes in `auth.py` and `user_manager.py`. Improved token refresh mechanism.",
        commit: {
          id: "commit-1",
          subject: "Refactor: OAuth2 integration for authentication",
          author: "john.doe",
          date: "2024-07-05",
          gerritLink: "https://gerrit.example.com/c/project/+/12345",
        },
      },
      {
        id: "summary-2",
        content: "Fixed a critical bug in the data serialization logic affecting large payloads. Patch applied to `serializer.py`.",
        commit: {
          id: "commit-2",
          subject: "Fix: Data serialization issue with large payloads",
          author: "john.doe",
          date: "2024-07-06",
          gerritLink: "https://gerrit.example.com/c/project/+/12346",
        },
      },
    ],
  },
  {
    id: "digest-2",
    user: {
      id: "user-2",
      username: "jane.smith",
      email: "jane.smith@example.com",
    },
    startDate: "2024-07-01",
    endDate: "2024-07-07",
    version: "1.0",
    summaries: [
      {
        id: "summary-3",
        content: "Implemented new API endpoints for user profile management. Added `UserProfile` model and CRUD operations.",
        commit: {
          id: "commit-3",
          subject: "Feat: User profile API endpoints",
          author: "jane.smith",
          date: "2024-07-04",
          gerritLink: "https://gerrit.example.com/c/project/+/12347",
        },
      },
    ],
  },
];
