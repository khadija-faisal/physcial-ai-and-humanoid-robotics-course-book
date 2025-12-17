from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import HealthResponse
from router import router
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Physical AI RAG Chatbot API",
    description="RAG-powered chatbot for Physical AI & Humanoid Robotics curriculum",
    version="1.0.0"
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://physcial-ai-and-humanoid-robotics-c.vercel.app"  # Production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router)


@app.get("/", response_model=HealthResponse)
async def root():
    """
    Root endpoint - health check

    Returns:
        HealthResponse: Status of the API
    """
    logger.info("Root endpoint accessed")
    return HealthResponse(status="ok")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
