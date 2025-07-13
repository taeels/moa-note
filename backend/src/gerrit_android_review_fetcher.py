import paramiko
import json
from typing import List, Optional
from datetime import datetime
from pydantic import ValidationError

from .gerrit_interface import GerritAPI, GerritChangeInfo, GerritDiffInfo, GerritTopicInfo

class AndroidReviewGerritFetcher(GerritAPI):
    """
    Demo implementation of GerritAPI for android-review.googlesource.com using SSH.
    This version uses placeholder SSH connection details and mock data for demonstration.
    Real implementation would involve actual SSH connections and parsing Gerrit's SSH command output.
    """

    def __init__(
        self,
        host: str,
        port: int,
        username: str,
        private_key_path: Optional[str] = None,
        password: Optional[str] = None,
    ):
        self.host = host
        self.port = port
        self.username = username
        self.private_key_path = private_key_path
        self.password = password
        self.client = paramiko.SSHClient()
        self.client.load_system_host_keys()
        self.client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    async def _execute_ssh_command(self, command: str) -> str:
        """
        Executes an SSH command on the Gerrit host and returns the stdout.
        """
        try:
            # In a real async application, this would need to be run in a thread pool
            # or use an async SSH library if available, as paramiko is blocking.
            # For demonstration, we'll keep it simple.
            self.client.connect(
                hostname=self.host,
                port=self.port,
                username=self.username,
                key_filename=self.private_key_path,
                password=self.password,
            )
            stdin, stdout, stderr = self.client.exec_command(command)
            output = stdout.read().decode('utf-8')
            error = stderr.read().decode('utf-8')
            if error:
                # Log error or raise a custom exception
                print(f"SSH Command Error: {error}")
                raise Exception(f"SSH command failed: {error}")
            return output
        except paramiko.AuthenticationException:
            raise Exception("SSH Authentication failed. Check username and private key/password.")
        except paramiko.SSHException as e:
            raise Exception(f"Could not establish SSH connection: {e}")
        except Exception as e:
            raise Exception(f"Failed to execute SSH command: {e}")
        finally:
            self.client.close()

    async def get_change_details(self, change_id: str) -> Optional[GerritChangeInfo]:
        """
        Fetches detailed information for a specific Gerrit change using gerrit query.
        """
        # In a real scenario, you'd query with more options like --commit-message, --files
        command = f"gerrit query --format=JSON --commit-message --files change:{change_id}"
        try:
            output = await self._execute_ssh_command(command)
            # Gerrit query returns multiple JSON objects, one per line, plus a final stats line.
            # We need to parse each line and ignore the stats line.
            for line in output.strip().split('\n'):
                if line.startswith('{') and line.endswith('}'):
                    data = json.loads(line)
                    if data.get('type') == 'stats':
                        continue
                    # Convert owner.name and owner.email from nested structure if present
                    owner_name = data.get('owner', {}).get('name')
                    owner_email = data.get('owner', {}).get('email')

                    # Mocking datetime conversion for now, real data needs careful parsing
                    created_at = datetime.now() # Placeholder
                    updated_at = datetime.now() # Placeholder

                    return GerritChangeInfo(
                        id=data.get('id'),
                        project=data.get('project'),
                        branch=data.get('branch'),
                        subject=data.get('subject'),
                        status=data.get('status'),
                        owner_name=owner_name,
                        owner_email=owner_email,
                        created_at=created_at,
                        updated_at=updated_at,
                        # Add other fields from data as needed
                    )
            return None
        except (json.JSONDecodeError, ValidationError) as e:
            print(f"Error parsing Gerrit query output: {e}")
            return None
        except Exception as e:
            print(f"Error in get_change_details: {e}")
            return None

    async def get_change_diff(self, change_id: str, patchset_number: int) -> Optional[GerritDiffInfo]:
        """
        Fetches the diff content for a specific patchset of a Gerrit change using SSH.
        This is a placeholder as direct diff command via SSH needs further investigation.
        """
        # In a real scenario, you might use 'gerrit cat' to get file contents and then diff them,
        # or if Gerrit provides a direct diff command via SSH.
        # For now, returning mock data.
        print(f"Fetching diff for change {change_id}, patchset {patchset_number} via SSH (mocked).")
        if change_id == "12345" and patchset_number == 1:
            return GerritDiffInfo(
                change_id="12345",
                patchset_number=1,
                diff_content="""--- a/src/main/java/android/app/SystemService.java
+++ b/src/main/java/android/app/SystemService.java
@@ -10,6 +10,10 @@
 public class SystemService {
     public void doSomething() {
         // existing code
     }
+
+    public void doNewThing() {
+        // new API implementation
+    }
}
"""
            )
        return None

    async def get_changes_by_topic(self, topic_name: str) -> List[GerritChangeInfo]:
        """
        Fetches all changes associated with a specific topic using gerrit query.
        Handles pagination.
        """
        all_changes: List[GerritChangeInfo] = []
        start = 0
        limit = 100 # Gerrit default limit is often 25 or 50, but we can request more

        while True:
            command = f"gerrit query --format=JSON --commit-message --files topic:{topic_name} limit:{limit} start:{start}"
            try:
                output = await self._execute_ssh_command(command)
                changes_in_batch: List[GerritChangeInfo] = []
                stats_line_found = False

                for line in output.strip().split('\n'):
                    if line.startswith('{') and line.endswith('}'):
                        data = json.loads(line)
                        if data.get('type') == 'stats':
                            stats_line_found = True
                            # The stats line contains 'rowCount' which is the number of results in this batch
                            # If rowCount is less than limit, it means we've reached the end.
                            if data.get('rowCount', 0) < limit:
                                break # Exit inner loop, then outer loop
                            continue

                        owner_name = data.get('owner', {}).get('name')
                        owner_email = data.get('owner', {}).get('email')

                        created_at = datetime.now() # Placeholder
                        updated_at = datetime.now() # Placeholder

                        changes_in_batch.append(
                            GerritChangeInfo(
                                id=data.get('id'),
                                project=data.get('project'),
                                branch=data.get('branch'),
                                subject=data.get('subject'),
                                status=data.get('status'),
                                owner_name=owner_name,
                                owner_email=owner_email,
                                created_at=created_at,
                                updated_at=updated_at,
                                # Add other fields from data as needed
                            )
                        )
                
                all_changes.extend(changes_in_batch)

                # If no stats line or rowCount is less than limit, we've fetched all.
                if not stats_line_found or len(changes_in_batch) < limit:
                    break

                start += limit

            except (json.JSONDecodeError, ValidationError) as e:
                print(f"Error parsing Gerrit query output for topic {topic_name}: {e}")
                break # Stop fetching on error
            except Exception as e:
                print(f"Error in get_changes_by_topic for topic {topic_name}: {e}")
                break # Stop fetching on error

        return all_changes