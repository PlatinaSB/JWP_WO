import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { openapi } from '@elysiajs/openapi';
import { cors } from '@elysiajs/cors';
import { userController } from './user';
import { catalogueController } from './catalouges';
import { ordersController } from './orders';
import { settingController } from './settings';

// index
export const app = new Elysia()
	.use(
		jwt({
			name: 'jwt',
			secret: process.env.SECRET_JWT!,
			exp: '90d'
		})
	)
	.use(openapi())
	.use(
		cors({
			origin: '*', // or ["http://localhost:5173"] for stricter
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
		})
	)
	.use(userController)
	.use(catalogueController)
	.use(ordersController)
	.use(settingController)
	.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
