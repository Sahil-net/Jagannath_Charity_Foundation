from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import _DUMMY_PASSWORD_HASH, create_access_token, verify_password, get_current_admin
from app.database import get_db
from app.models import AdminUser
from app.schemas import LoginRequest, TokenResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(AdminUser).filter(AdminUser.username == payload.username).first()
    password_hash = user.password_hash if user else _DUMMY_PASSWORD_HASH
    password_matches = verify_password(
        payload.password if len(payload.password.encode("utf-8")) <= 72 else "invalid-password-length",
        password_hash,
    )
    if not user or not password_matches:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
    token = create_access_token(user.username)
    return TokenResponse(access_token=token)


@router.get("/me")
def me(current=Depends(get_current_admin)):
    return {"username": current.username}
