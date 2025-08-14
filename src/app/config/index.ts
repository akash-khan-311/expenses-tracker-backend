import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  node_env: process.env.NODE_ENV,
  expires_in_refresh_token: process.env.REFRESH_TOKEN_EXPIRES,
  expires_in_access_token: process.env.ACCESS_TOKEN_EXPIRES,
  base_url: process.env.BASE_URL,
  smtp_username: process.env.SMTP_USERNAME,
  smtp_password: process.env.SMTP_PASSWORD,
};
