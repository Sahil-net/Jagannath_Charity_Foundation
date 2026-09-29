from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    cors_origins: str = ""
    environment: str = "development"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @field_validator("jwt_secret")
    @classmethod
    def validate_jwt_secret(cls, value: str) -> str:
        if len(value) < 32 or value in {"replace-with-a-long-random-secret-before-running", "dev-secret-change-me"}:
            raise ValueError("JWT_SECRET must be a unique random secret of at least 32 characters")
        return value

    @model_validator(mode="after")
    def validate_production_settings(self):
        if self.environment.lower() == "production":
            if self.database_url.startswith("sqlite"):
                raise ValueError("Production deployments require a persistent database, not SQLite")
            if not self.cors_origin_list:
                raise ValueError("CORS_ORIGINS must contain the production frontend origin")
        return self

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
