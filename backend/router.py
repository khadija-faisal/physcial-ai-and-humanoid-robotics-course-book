from fastapi import APIRouter, HTTPException
from models import ChatRequest, ChatResponse, HealthResponse
from agents import Runner
from rag_agent import agent
import logging

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/api", tags=["chat"])


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """
    Health check endpoint for monitoring server status

    Returns:
        HealthResponse: Status of the service
    """
    logger.info("Health check requested")
    return HealthResponse(status="ok")


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    """
    Chat endpoint for RAG-powered responses

    Accepts a ChatRequest with a user message and optional user_id,
    processes it through the RAG agent, and returns a ChatResponse
    with the generated answer.

    Args:
        request: ChatRequest containing user message and optional user_id

    Returns:
        ChatResponse: AI response with optional citations

    Raises:
        HTTPException: If processing fails with detailed error messages
    """
    try:
        # Validate request
        if not request.message or request.message.strip() == "":
            raise HTTPException(
                status_code=400,
                detail="Message cannot be empty"
            )

        logger.info(f"Chat request from user: {request.user_id}")
        logger.info(f"Message: {request.message[:100]}...")

        # Run the RAG agent with the user's message
        result = Runner.run_sync(agent, input=request.message)

        # Extract the final output from the agent result
        response_text = result.final_output

        logger.info(f"Response generated successfully: {str(response_text)[:100]}...")

        return ChatResponse(
            response=response_text,
            citations=None
        )

    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise

    except Exception as e:
        # Log the error and return a 500 response
        logger.error(f"Error processing chat request: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )
