import { Elysia, t } from 'elysia';
import { loginService, registerService } from './service';
import { jwt } from '@elysiajs/jwt';

export const userController = new Elysia({ prefix: '/user' })
	.use(
		jwt({
			name: 'jwt',
			secret: process.env.SECRET_JWT!,
			exp: '90d'
		})
	)
	.post(
		'/login',
		async ({ body, jwt, set, cookie }) =>
			loginService(body.username, body.password, jwt, cookie, set),
		{
			body: t.Object({
				username: t.String(),
				password: t.String()
			}),
			detail: { description: 'User login', tags: ['User'] }
		}
	)
	.post(
		'/register',
		async ({ body, set }) => registerService(body.name, body.username, body.password, set),
		{
			body: t.Object({
				name: t.String(),
				username: t.String(),
				password: t.String()
			}),
			detail: { description: 'User registration', tags: ['User'] }
		}
	);
