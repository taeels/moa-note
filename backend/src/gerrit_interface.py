from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from datetime import datetime
from pydantic import BaseModel, Field

class GerritChangeInfo(BaseModel):
    """Represents a simplified Gerrit change/commit information."""
    id: str
    project: str
    branch: str
    subject: str
    status: str
    owner_name: str = Field(None, alias="owner.name") # Use Field for nested JSON keys
    owner_email: str = Field(None, alias="owner.email")
    created_at: datetime
    updated_at: datetime
    # Add other fields as needed by the application
    # Example for files: files: Optional[Dict[str, Any]] = None

class GerritDiffInfo(BaseModel):
    """Represents diff content for a Gerrit patchset."""
    change_id: str
    patchset_number: int
    diff_content: str
    # Add other diff-related fields as needed

class GerritTopicInfo(BaseModel):
    """Represents information about a Gerrit topic."""
    name: str
    changes: List[GerritChangeInfo] # List of changes associated with the topic


class GerritAPI(ABC):
    """
    Abstract Base Class for a common Gerrit API interface.
    Defines the contract for interacting with different Gerrit instances/versions.
    """

    @abstractmethod
    async def get_change_details(self, change_id: str) -> Optional[GerritChangeInfo]:
        """
        Fetches detailed information for a specific Gerrit change.

        Args:
            change_id: The ID of the Gerrit change (e.g., change number, change-id).

        Returns:
            A GerritChangeInfo object if found, None otherwise.
        """
        pass

    @abstractmethod
    async def get_change_diff(self, change_id: str, patchset_number: int) -> Optional[GerritDiffInfo]:
        """
        Fetches the diff content for a specific patchset of a Gerrit change.

        Args:
            change_id: The ID of the Gerrit change.
            patchset_number: The patchset number.

        Returns:
            A GerritDiffInfo object if found, None otherwise.
        """
        pass

    @abstractmethod
    async def get_changes_by_topic(self, topic_name: str) -> List[GerritChangeInfo]:
        """
        Fetches all changes associated with a specific topic.

        Args:
            topic_name: The name of the Gerrit topic.

        Returns:
            A list of GerritChangeInfo objects.
        """
        pass

    # Add more abstract methods as your application requires more Gerrit interactions
    # e.g., get_account_details, search_changes, etc.
