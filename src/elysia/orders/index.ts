import { Elysia, t } from 'elysia';
import { getOrdersService, postOrderService } from './service';
import { jwt } from '@elysiajs/jwt';
import { bearer } from '@elysiajs/bearer';

export const ordersController = new Elysia({ prefix: '/orders' })
	.use(
		jwt({
			name: 'jwt',
			secret: process.env.SECRET_JWT!,
			exp: '90d'
		})
	)
	.use(bearer())

	.get('/', () => {})

	.get('/:email', ({ params }) => getOrdersService(String(params.email)), {
		detail: { description: 'Get all orders', tags: ['Orders'] }
	})
	.post('/', ({ body, set, jwt }) => postOrderService(body, set, jwt, bearer), {
		body: t.Object({
			catalogue_id: t.Number(),
			name: t.String(),
			email: t.String(),
			phone_number: t.String(),
			wedding_date: t.String()
		}),
		detail: { description: 'Create order', tags: ['Orders'] }
	});
