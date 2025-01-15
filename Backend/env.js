import dotenv from 'dotenv';
dotenv.config();

const {
    PORT,
    MYSQL_URL,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_APIKEY,
    JWT_SECRET,
    JWT_EXP,
    UPLOADS_DIR,
    CLIENT_URL,
} = process.env;

export {
    PORT,
    MYSQL_URL,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_APIKEY,
    JWT_SECRET,
    JWT_EXP,
    UPLOADS_DIR,
    CLIENT_URL,
};
