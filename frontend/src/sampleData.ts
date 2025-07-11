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
          diff: `--- a/auth.py
+++ b/auth.py
@@ -1,5 +1,6 @@
 class Authenticator:
-    def login(self, username, password):
-        # simple password check
-        if password == "secret":
-            return True
-        return False
+    def login_with_oauth2(self, token):
+        # OAuth2 logic here
+        print("Logging in with OAuth2")
+        if token:
+            return True
+        return False
+`
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
          diff: `--- a/serializer.py
+++ b/serializer.py
@@ -10,7 +10,7 @@
     def serialize(self, data):
-        if len(data) > 1024:
-            raise ValueError("Payload too large")
         # complex serialization logic
+        if len(data) > 8192:
+            raise ValueError("Payload too large for serialization")
         return json.dumps(data)
`
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
          diff: `--- /dev/null
+++ b/src/models/user_profile.py
@@ -0,0 +1,10 @@
+from pydantic import BaseModel
+
+class UserProfile(BaseModel):
+    id: int
+    username: str
+    full_name: str
+    email: str
+    is_active: bool = True
+
+`
        },
      },
    ],
  },
];
