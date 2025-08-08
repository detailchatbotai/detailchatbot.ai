from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_project_url: str
    supabase_jwt_secret: str
    supabase_anon_key: str
    supabase_service_role_key: str
    database_url: str
    openai_api_key: str
    backend_url: str = "http://localhost:8000"

    class Config:
        env_file = ".env"


settings = Settings()