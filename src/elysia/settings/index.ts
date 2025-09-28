import { Elysia } from 'elysia';
import {
	getSettingsService,
	postSettingsService,
	putSettingsService,
	deleteSettingsService
} from './service';
import { jwt } from '@elysiajs/jwt';

export const settingController = new Elysia({ prefix: '/settings' })
	.use(
		jwt({
			name: 'jwt',
			secret: process.env.SECRET_JWT!,
			exp: '90d'
		})
	)
	.get('/', async ({ cookie, set, jwt }) => {
		if (!cookie.auth?.value) {
			set.status = 401;
			return { error: 'Unauthorized' };
		}
		const payload = await jwt.verify(cookie.auth.value as string);
		if (!payload || !('id' in payload)) {
			set.status = 401;
			return { error: 'Unauthorized' };
		}
		return getSettingsService();
	})
	.post('/', async ({ cookie, set, jwt, body }) => {
		if (!cookie.auth?.value) {
			set.status = 401;
			return { error: 'Unauthorized' };
		}
		const payload = await jwt.verify(cookie.auth.value as string);
		if (!payload || !('id' in payload)) {
			set.status = 401;
			return { error: 'Unauthorized' };
		}
		return postSettingsService(body);
	})
	.put('/', async ({ cookie, set, jwt, body }) => {
		if (!cookie.auth?.value) {
			set.status = 401;
			return { error: 'Unauthorized' };
		}
		const payload = await jwt.verify(cookie.auth.value as string);
		if (!payload || !('id' in payload)) {
			set.status = 401;
			return { error: 'Unauthorized' };
		}
		return putSettingsService(body);
	})
	.delete('/', async ({ cookie, set, jwt, body }) => {
		if (!cookie.auth?.value) {
			set.status = 401;
			return { error: 'Unauthorized' };
		}
		const payload = await jwt.verify(cookie.auth.value as string);
		if (!payload || !('id' in payload)) {
			set.status = 401;
			return { error: 'Unauthorized' };
		}
		return deleteSettingsService(body.Id_setting);
	});
