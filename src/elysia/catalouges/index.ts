import { Elysia, t } from 'elysia';
import {
	getCataloguesService,
	postCatalogueService,
	putCatalogueService,
	deleteCatalogueService
} from './service';
import { jwt } from '@elysiajs/jwt';

export const catalogueController = new Elysia({ prefix: '/catalogues' })
	.use(
		jwt({
			name: 'jwt',
			secret: process.env.SECRET_JWT!,
			exp: '90d'
		})
	)

	.get('/', () => getCataloguesService(), {
		detail: { description: 'Get published catalogues', tags: ['Catalogue'] }
	})

	.post('/', ({ body, jwt, cookie, set }) => postCatalogueService(body, jwt, cookie, set), {
		body: t.Object({
			package_name: t.String(),
			description: t.String(),
			price: t.Number(),
			status_publish: t.String()
		}),
		detail: { description: 'Create catalogue', tags: ['Catalogue'] }
	})

	.put('/', ({ body, jwt, cookie, set }) => putCatalogueService(body.id, body, jwt, cookie, set), {
		body: t.Object({
			id: t.Number(),
			package_name: t.String(),
			description: t.String(),
			price: t.Number(),
			status_publish: t.String()
		}),
		detail: { description: 'Update catalogue', tags: ['Catalogue'] }
	})

	.delete('/', ({ body, jwt, cookie, set }) => deleteCatalogueService(body.id, jwt, cookie, set), {
		body: t.Object({
			id: t.Number()
		}),
		detail: { description: 'Delete catalogue', tags: ['Catalogue'] }
	});
