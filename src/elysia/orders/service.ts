/* eslint-disable @typescript-eslint/no-explicit-any */
import { findAllOrdersByemail, insertOrder } from './model';

export async function getOrdersService(email: string) {
	const orders = findAllOrdersByemail(email);
	return { success: true, orders };
}

export async function postOrderService(body: any, set: any, jwt: any, bearer: any) {
	const payload = jwt.verify(bearer);

	const { catalogue_id, name, email, phone_number, wedding_date } = body;
	if (!catalogue_id || !name || !email || !phone_number || !wedding_date) {
		set.status = 400;
		return { error: 'Missing required fields' };
	}

	insertOrder({
		catalogue_id,
		name,
		email,
		phone_number,
		wedding_date,
		user_id: payload.id as number | 0,
		status: 'requested'
	});

	return { success: true, message: 'Order created' };
}
