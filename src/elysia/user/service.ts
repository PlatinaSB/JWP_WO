import { findUserByUsername, insertUser } from "./model";

export async function loginService(
    username: string,
    password: string,
    jwt: any,
    cookie: any,
    set: any
) {
    if (!username || !password) {
        set.status = 400;
        return { error: "Username and password required" };
    }

    const userdata = findUserByUsername(username);
    if (!userdata) {
        set.status = 401;
        return { error: "Invalid credential" };
    }

    const isMatch = await Bun.password.verify(password, userdata.password);
    if (!isMatch) {
        set.status = 401;
        return { error: "Invalid credential" };
    }

    const token = await jwt.sign({
        id: userdata.user_id,
        username: userdata.username,
        updated_at: userdata.updated_at,
    });

    cookie.auth.set({
        value: token,
        httpOnly: true,
        maxAge: 90 * 24 * 60 * 60,
        path: "/",
    });

    return { success: true, message: "Logged in", token };
}

export async function registerService(
    name: string,
    username: string,
    password: string,
    set: any
) {
    if (!name || !username || !password) {
        set.status = 400;
        return { error: "name, username, and password required" };
    }

    try {
        const hashed = await Bun.password.hash(password);
        insertUser(name, username, hashed);
        return { success: true, message: "User registered" };
    } catch (err: any) {
        if (err.message.includes("UNIQUE constraint")) {
            set.status = 409;
            return { error: "Username already exists" };
        }
        set.status = 500;
        return { error: "Internal server error" };
    }
}
