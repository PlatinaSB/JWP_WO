import { db } from "./../database";
import type { User } from "./../types.database";

export function findUserByUsername(username: string): User | undefined {
    return db
        .query("SELECT * FROM users WHERE username = $username")
        .get({ $username: username }) as User | undefined;
}

export function insertUser(name: string, username: string, password: string) {
    return db
        .query(
            "INSERT INTO users (name, username, password) VALUES ($name, $username, $password)"
        )
        .run({ $name: name, $username: username, $password: password });
}
