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
    cw: "CW27",
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
          diff: `--- a/auth.py\n+++ b/auth.py\n@@ -1,5 +1,6 @@\n class Authenticator:\n-    def login(self, username, password):\n-        # simple password check\n-        if password == "secret":\n-            return True\n-        return False\n+    def login_with_oauth2(self, token):\n+        # OAuth2 logic here\n+        print("Logging in with OAuth2")\n+        if token:\n+            return True\n+        return False\n+`
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
          diff: `--- a/serializer.py\n+++ b/serializer.py\n@@ -10,7 +10,7 @@\n     def serialize(self, data):\n-        if len(data) > 1024:\n-            raise ValueError("Payload too large")\n         # complex serialization logic\n+        if len(data) > 8192:\n+            raise ValueError("Payload too large for serialization")\n         return json.dumps(data)\n`
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
    cw: "CW27",
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
          diff: `--- /dev/null\n+++ b/src/models/user_profile.py\n@@ -0,0 +1,10 @@\n+from pydantic import BaseModel\n+\n+class UserProfile(BaseModel):\n+    id: int\n+    username: str\n+    full_name: str\n+    email: str\n+    is_active: bool = True\n+\n+`
        },
      },
    ],
  },
  {
    id: "digest-3",
    user: {
      id: "user-1",
      username: "john.doe",
      email: "john.doe@example.com",
    },
    startDate: "2024-07-08",
    endDate: "2024-07-14",
    cw: "CW29",
    version: "1.0",
    summaries: [
      {
        id: "summary-4",
        content: "Added new feature for user preferences. Implemented in `preferences.py`.",
        commit: {
          id: "commit-4",
          subject: "Feat: User preferences",
          author: "john.doe",
          date: "2024-07-09",
          gerritLink: "https://gerrit.example.com/c/project/+/12348",
          diff: `--- /dev/null\n+++ b/src/preferences.py\n@@ -0,0 +1,5 @@\n+class UserPreferences:\n+    def __init__(self, user_id):\n+        self.user_id = user_id\n+        self.settings = {}\n+`
        },
      },
    ],
  },
  {
    id: "digest-4",
    user: {
      id: "user-3",
      username: "alice.wonder",
      email: "alice.wonder@example.com",
    },
    startDate: "2024-07-15",
    endDate: "2024-07-21",
    cw: "CW29",
    version: "1.0",
    summaries: [
      {
        id: "summary-5",
        content: "Initial implementation of the new search algorithm. Focus on performance for large datasets.",
        commit: {
          id: "commit-5",
          subject: "Feat: Implement new search algorithm (Part 1)",
          author: "alice.wonder",
          date: "2024-07-15",
          gerritLink: "https://gerrit.example.com/c/project/+/12349",
          diff: `--- /dev/null\n+++ b/src/search/algorithm.py\n@@ -0,0 +1,10 @@\n+def new_search(data, query):\n+    # Placeholder for new search algorithm\n+    return [item for item in data if query in item]\n+`
        },
        topicId: "new-search-feature",
      },
      {
        id: "summary-6",
        content: "Optimized search algorithm for edge cases and improved result relevance. Added unit tests.",
        commit: {
          id: "commit-6",
          subject: "Feat: Optimize search algorithm (Part 2)",
          author: "alice.wonder",
          date: "2024-07-16",
          gerritLink: "https://gerrit.example.com/c/project/+/12350",
          diff: `--- a/src/search/algorithm.py\n+++ b/src/search/algorithm.py\n@@ -5,4 +5,8 @@\n def new_search(data, query):\n     # Placeholder for new search algorithm\n-    return [item for item in data if query in item]\n+    results = []\n+    for item in data:\n+        if query.lower() in item.lower():\n+            results.append(item)\n+    return results\n+`
        },
        topicId: "new-search-feature",
      },
      {
        id: "summary-7",
        content: "Integrated the new search feature into the main application UI. Updated search bar component.",
        commit: {
          id: "commit-7",
          subject: "Feat: Integrate new search into UI (Part 3)",
          author: "alice.wonder",
          date: "2024-07-17",
          gerritLink: "https://gerrit.example.com/c/project/+/12351",
          diff: `--- a/src/ui/search_bar.js\n+++ b/src/ui/search_bar.js\n@@ -1,5 +1,6 @@\n import { new_search } from '../search/algorithm';\n \n function SearchBar() {\n     // ... existing code ...\n+    const results = new_search(data, query);\n     // ... display results ...\n }\n`
        },
        topicId: "new-search-feature",
      },
    ],
  },
  {
    id: "digest-5",
    user: {
      id: "user-1",
      username: "john.doe",
      email: "john.doe@example.com",
    },
    startDate: "2024-07-22",
    endDate: "2024-07-28",
    cw: "CW30",
    version: "1.0",
    summaries: Array.from({ length: 11 }).map((_, i) => ({
      id: `summary-topic-large-${i + 1}`,
      content: `This is commit ${i + 1} of a large topic. It focuses on part ${i + 1} of the feature development.`,
      commit: {
        id: `commit-topic-large-${i + 1}`,
        subject: `Large Feature Development (Part ${i + 1})`,
        author: "john.doe",
        date: `2024-07-22`,
        gerritLink: `https://gerrit.example.com/c/project/+/large-topic-${i + 1}`,
        diff: `--- a/src/feature/large_feature.py\n+++ b/src/feature/large_feature.py\n@@ -1,5 +1,6 @@\n # Content for part ${i + 1}\n`,
      },
      topicId: "large-feature-topic",
    })),
  },
];