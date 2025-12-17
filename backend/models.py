from pydantic import BaseModel, Field
from typing import Optional, List


class ChatRequest(BaseModel):
    """Request model for chat endpoint"""
    message: str = Field(..., description="User message or query")
    user_id: str = Field(default="guest", description="User identifier")

    class Config:
        json_schema_extra = {
            "example": {
                "message": "What is embodied intelligence?",
                "user_id": "user@example.com"
            }
        }


class ChatResponse(BaseModel):
    """Response model for chat endpoint"""
    response: str = Field(..., description="AI assistant response")
    citations: Optional[List[str]] = Field(default=None, description="List of citations or sources")

    class Config:
        json_schema_extra = {
            "example": {
                "response": "Embodied intelligence is...",
                "citations": ["Chapter 1: Introduction to Physical AI"]
            }
        }


class HealthResponse(BaseModel):
    """Response model for health check endpoint"""
    status: str = Field(..., description="Health status")

    class Config:
        json_schema_extra = {
            "example": {
                "status": "ok"
            }
        }
