import { Database } from 'bun:sqlite';
// --- DB Init ---
export const db = new Database('app.sqlite');

// --- Schema Setup ---
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        user_id     INTEGER PRIMARY KEY AUTOINCREMENT,
        name        VARCHAR(50) NOT NULL,
        username    VARCHAR(30) NOT NULL UNIQUE,
        password    VARCHAR(128) NOT NULL,
        created_at  DATETIME NOT NULL DEFAULT (datetime('now')),
        updated_at  DATETIME
    );
    `);

db.run(`
    CREATE TABLE IF NOT EXISTS catalogue (
        catalogue_id    INTEGER PRIMARY KEY AUTOINCREMENT,
        image           TEXT NOT NULL DEFAULT '',
        package_name    VARCHAR(30) NOT NULL,
        description     TEXT NOT NULL,
        price           INTEGER NOT NULL,
        status_publish  TEXT NOT NULL CHECK(status_publish IN ('Y','N')),
        user_id         INTEGER NOT NULL,
        created_at      DATETIME NOT NULL DEFAULT (datetime('now')),
        updated_at      DATETIME,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    );
    `);

db.run(`
    CREATE TABLE IF NOT EXISTS orders (
        order_id     INTEGER PRIMARY KEY AUTOINCREMENT,
        catalogue_id INTEGER NOT NULL,
        name         VARCHAR(50) NOT NULL,
        email        VARCHAR(60) NOT NULL,
        phone_number VARCHAR(16) NOT NULL,
        wedding_date DATE NOT NULL,
        status       TEXT NOT NULL CHECK(status IN ('requested','approved')),
        user_id      INTEGER NOT NULL,
        created_at   DATETIME NOT NULL DEFAULT (datetime('now')),
        updated_at   DATETIME,
        FOREIGN KEY(catalogue_id) REFERENCES catalogue(catalogue_id),
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    );
    `);

db.run(`
    CREATE TABLE IF NOT EXISTS settings (
        id_setting          INTEGER PRIMARY KEY AUTOINCREMENT,
        website_name        VARCHAR(100) NOT NULL,
        phone_number1       VARCHAR(16) NOT NULL,
        phone_number2       VARCHAR(16),
        email1              VARCHAR(80) NOT NULL,
        email2              VARCHAR(80),
        address             TEXT NOT NULL,
        maps                TEXT,
        logo                BLOB NOT NULL,
        facebook_url        VARCHAR(256),
        instagram_url       VARCHAR(256),
        youtube_url         VARCHAR(256),
        header_bussines_hour VARCHAR(160) NOT NULL,
        time_bussines_hour   TEXT NOT NULL,
        created_at          DATETIME NOT NULL DEFAULT (datetime('now')),
        updated_at          DATETIME
    );
    `);
console.log('Tables Created');
