from pydantic_settings import BaseSettings
import os

# Determine the path to the .env file relative to this config file's location
# This makes the settings loading independent of the current working directory
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')

class Settings(BaseSettings):
    SECRET_KEY: str
    OPENROUTER_API_KEY: str
    AI_MODEL: str = "z-ai/glm-4.5-air"

    class Config:
        env_file = env_path

settings = Settings()
