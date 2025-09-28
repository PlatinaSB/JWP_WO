import { Elysia, t } from 'elysia';
import { getOrdersService, postOrderService, putOrderService, deleteOrderService } from './service';
import { jwt } from '@elysiajs/jwt';

export const ordersController = new Elysia({ prefix: '/orders' })
	.use(
		jwt({
			name: 'jwt',
			secret: process.env.SECRET_JWT!,
			exp: '90d'
		})
	)

	.get('/', ({ jwt, cookie, set }) => getOrdersService(jwt, cookie, set), {
		detail: { description: 'Get all orders', tags: ['Orders'] }
	})
	.post('/', ({ body, jwt, cookie, set }) => postOrderService(body, jwt, cookie, set), {
		body: t.Object({
			catalogue_id: t.Number(),
			name: t.String(),
			email: t.String(),
			phone_number: t.String(),
			wedding_date: t.String()
		}),
		detail: { description: 'Create order', tags: ['Orders'] }
	})
	.put('/', ({ body, jwt, cookie, set }) => putOrderService(body, jwt, cookie, set), {
		body: t.Object({
			order_id: t.Number(),
			status: t.Optional(t.String())
		}),
		detail: { description: 'Update order status', tags: ['Orders'] }
	})
	.delete('/', ({ body, set }) => deleteOrderService(body, set), {
		body: t.Object({
			order_id: t.Number()
		}),
		detail: { description: 'Delete order', tags: ['Orders'] }
	});
