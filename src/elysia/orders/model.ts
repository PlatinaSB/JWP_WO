import { db } from "./../database";
import type { Order } from "./../types.database";

export function findAllOrdersByemail(email:string) {
    return db
        .query("SELECT * FROM orders WHERE email = ? ORDER BY created_at DESC")
        .all(email) as Order[];
}

export function insertOrder(order: Omit<Order, "order_id" | "created_at" | "updated_at">) {
    return db.query(
        `INSERT INTO orders 
        (catalogue_id, name, email, phone_number, wedding_date, user_id, status, created_at) 
        VALUES ($catalogue_id, $name, $email, $phone_number, $wedding_date, $user_id, $status, CURRENT_TIMESTAMP)`
    ).run({
        $catalogue_id: order.catalogue_id,
        $name: order.name,
        $email: order.email,
        $phone_number: order.phone_number,
        $wedding_date: order.wedding_date,
        $status: order.status ?? "requested",
        $user_id: order.user_id ?? 0,
    });
}
