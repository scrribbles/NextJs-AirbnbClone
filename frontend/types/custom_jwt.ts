export interface JWTPayload {
  user_id: string;
  email: string;
  exp: number;
  iat: number;
  language: string;
  currency: string;
  timezone: string;
  full_name: string;
  jti: string;
}
