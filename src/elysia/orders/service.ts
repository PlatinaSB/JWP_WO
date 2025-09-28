import {
    findAllOrders,
    insertOrder,
    updateOrderStatus,
    deleteOrder,
} from "./model";

export async function getOrdersService(jwt: any, cookie: any, set: any) {
    if (!cookie.auth?.value) {
        set.status = 401;
        return { error: "Unauthorized" };
    }

    const payload = await jwt.verify(cookie.auth.value as string);
    if (!payload || !("id" in payload)) {
        set.status = 401;
        return { error: "Unauthorized" };
    }

    const orders = findAllOrders();
    return { success: true, orders };
}

export async function postOrderService(body: any, jwt: any, cookie: any, set: any) {
    if (!cookie.auth?.value) {
        set.status = 401;
        return { error: "Unauthorized" };
    }

    const payload = await jwt.verify(cookie.auth.value as string);
    if (!payload || !("id" in payload)) {
        set.status = 401;
        return { error: "Unauthorized" };
    }

    const { catalogue_id, name, email, phone_number, wedding_date } = body;
    if (!catalogue_id || !name || !email || !phone_number || !wedding_date) {
        set.status = 400;
        return { error: "Missing required fields" };
    }

    insertOrder({
        catalogue_id,
        name,
        email,
        phone_number,
        wedding_date,
        user_id: payload.id as number,
        status: "requested",
    });

    return { success: true, message: "Order created" };
}

export async function putOrderService(body: any, jwt: any, cookie: any, set: any) {
    if (!cookie.auth?.value) {
        set.status = 401;
        return { error: "Unauthorized" };
    }

    const payload = await jwt.verify(cookie.auth.value as string);
    if (!payload || !("id" in payload)) {
        set.status = 401;
        return { error: "Unauthorized" };
    }

    const { order_id, status } = body;
    if (!order_id) {
        set.status = 400;
        return { error: "order_id required" };
    }

    updateOrderStatus(order_id, status ?? null);
    return { success: true, message: "Order updated" };
}

export async function deleteOrderService(body: any, set: any) {
    const { order_id } = body;
    if (!order_id) {
        set.status = 400;
        return { error: "order_id required" };
    }

    deleteOrder(order_id);
    return { success: true, message: "Order deleted" };
}
