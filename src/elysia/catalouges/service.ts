/* eslint-disable @typescript-eslint/no-explicit-any */
// service.ts
import {
	findAllPublished,
	insertCatalogue,
	updateCatalogue,
	deleteCatalogue,
	findAll,
	findCatalogueById,
	findPublishedCatalogueById
} from './model';

export async function getCataloguesService(jwt: any, bearer: any) {
	console.log(bearer);
	try {
		console.log(bearer);
		if (bearer) {
			console.log(bearer);
			try {
				const payload = await jwt.verify(bearer); // bearer is string
				console.log(payload);
				if (payload) {
					const catalogues = await findAll(); // return all for valid token
					return { success: true, catalogues };
				}
			} catch {
				// Invalid token, fall through to published only
			}
		}

		// No token or invalid token → return only published catalogues
		const catalogues = await findAllPublished();
		return { success: true, catalogues };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Internal server error' };
	}
}

export async function getCatalogueService(id: number, jwt: any, bearer: any) {
	console.log(bearer);
	try {
		console.log(bearer);
		if (bearer) {
			console.log(bearer);
			try {
				const payload = await jwt.verify(bearer); // bearer is string
				console.log(payload);
				if (payload) {
					const catalogues = await findCatalogueById(id); // return all for valid token
					return { success: true, catalogues };
				}
			} catch {
				// Invalid token, fall through to published only
			}
		}

		// No token or invalid token → return only published catalogues
		const catalogues = await findPublishedCatalogueById(id);
		return { success: true, catalogues };
	} catch (error) {
		console.error(error);
		return { success: false, message: 'Internal server error' };
	}
}

// POST /catalogues
export async function postCatalogueService(body: any, jwt: any, bearer: any, set: any) {
	const token = bearer;
	const payload = await jwt.verify(token);
	if (!payload) {
		set.status = 401;
		return { success: false, message: 'Unauthorized' };
	}

	const { package_name, description, price, status_publish, image } = body;
	if (!package_name || !description || price == null || !status_publish) {
		set.status = 400;
		return { success: false, message: 'All fields are required' };
	}

	try {
		await insertCatalogue(package_name, description, price, status_publish, payload.id, image);
		return { success: true, message: 'Catalogue created successfully' };
	} catch (err) {
		console.error(err);
		set.status = 500;
		return { success: false, message: 'Internal server error' };
	}
}

// PUT /catalogues/:id
export async function putCatalogueService(id: number, body: any, jwt: any, bearer: any, set: any) {
	const token = bearer;
	const payload = await jwt.verify(token);
	if (!payload) {
		set.status = 401;
		return { success: false, message: 'Unauthorized' };
	}

	const { package_name, description, price, status_publish, image } = body;
	console.log('iamge: ', image);
	if (!package_name || !description || price == null || !status_publish) {
		set.status = 400;
		return { success: false, message: 'All fields are required' };
	}

	try {
		await updateCatalogue(id, package_name, description, price, status_publish, image);
		return { success: true, message: 'Catalogue updated successfully' };
	} catch (err) {
		console.error(err);
		set.status = 500;
		return { success: false, message: 'Internal server error' };
	}
}

// DELETE /catalogues/:id
export async function deleteCatalogueService(id: number, jwt: any, bearer: any, set: any) {
	const token = bearer;
	console.log(token);
	const payload = await jwt.verify(token);
	console.log(payload);
	if (!payload) {
		set.status = 401;
		return { success: false, message: 'Unauthorized' };
	}

	try {
		await deleteCatalogue(id);
		return { success: true, message: 'Catalogue deleted successfully' };
	} catch (err) {
		console.error(err);
		set.status = 500;
		return { success: false, message: 'Internal server error' };
	}
}
