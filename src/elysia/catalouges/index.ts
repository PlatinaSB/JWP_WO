// index.ts
import { Elysia, t } from 'elysia';
import {
	getCataloguesService,
	postCatalogueService,
	putCatalogueService,
	deleteCatalogueService,
	getCatalogueService
} from './service';
import { jwt } from '@elysiajs/jwt';
import { bearer } from '@elysiajs/bearer';

export const catalogueController = new Elysia({ prefix: '/catalogues' })
	.use(
		jwt({
			name: 'jwt',
			secret: process.env.SECRET_JWT!,
			exp: '90d'
		})
	)
	.use(bearer())

	// GET /catalogues
	.get('/', ({ jwt, bearer }) => getCataloguesService(jwt, bearer), {
		detail: { description: 'Get published catalogues', tags: ['Catalogue'] }
	})
	.get(
		'/:id',
		({ params, jwt, bearer }) => {
			return getCatalogueService(Number(params.id), jwt, bearer);
		},
		{
			detail: { description: 'Get single catalogue by ID', tags: ['Catalogue'] }
		}
	)

	// POST /catalogues
	.post('/', ({ body, jwt, bearer, set }) => postCatalogueService(body, jwt, bearer, set), {
		body: t.Object({
			package_name: t.String(),
			description: t.String(),
			price: t.Number(),
			status_publish: t.String(),
			image: t.String()
		}),
		detail: { description: 'Create catalogue', tags: ['Catalogue'] }
	})

	// PUT /catalogues/:id
	.put(
		'/:id',
		({ params, body, jwt, bearer, set }) => {
			console.log('PUT /catalogues/:id called');
			console.log('Params:', params);
			console.log('Body:', body);
			return putCatalogueService(Number(params.id), body, jwt, bearer, set);
		},
		{
			body: t.Object({
				package_name: t.String(),
				description: t.String(),
				price: t.Number(),
				status_publish: t.String(),
				image: t.String()
			}),
			detail: { description: 'Update catalogue', tags: ['Catalogue'] }
		}
	)

	// DELETE /catalogues/:id
	.delete(
		'/:id',
		({ params, jwt, bearer, set }) => deleteCatalogueService(Number(params.id), jwt, bearer, set),
		{
			detail: { description: 'Delete catalogue', tags: ['Catalogue'] }
		}
	);
