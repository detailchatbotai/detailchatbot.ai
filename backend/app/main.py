from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.shops import router as shops_router
from app.api.v1.subscriptions import router as subscriptions_router
from app.api.v1.services import router as services_router
from app.api.v1.faqs import router as faqs_router
from app.api.v1.chat_config import router as chat_config_router
from app.api.v1.widget import router as widget_router
from app.api.v1.chat import router as chat_router
from app.api.v1.users import router as users_router

app = FastAPI(title="Chatbot.ai API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:63343",  # IDE server
        "http://localhost:8080",   # Common dev server
        "http://localhost:5173",   # Vite dev server
        "file://",                 # Local file access
        "https://detailchatbot.ai",
        "https://www.detailchatbot.ai",
        "https://detailchatbot-ai.vercel.app",  # Vercel deployment
        "https://*.railway.app",   # Railway domains
        "*"  # Allow all origins for widget embedding
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(shops_router, prefix="/api/v1")
app.include_router(subscriptions_router, prefix="/api/v1/subscriptions", tags=["subscriptions"])
app.include_router(services_router, prefix="/api/v1")
app.include_router(faqs_router, prefix="/api/v1")
app.include_router(chat_config_router, prefix="/api/v1")
app.include_router(widget_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")


@app.get("/health")
async def health():
    return {"status": "ok", "version": "1.0.1"}