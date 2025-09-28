import { findAllPublished, insertCatalogue, updateCatalogue, deleteCatalogue } from './model';

export async function getCataloguesService() {
	const catalogues = findAllPublished();
	return { success: true, catalogues };
}

export async function postCatalogueService(body: any, jwt: any, cookie: any, set: any) {
	try {
		const token = cookie.auth.value;
		const payload = await jwt.verify(token);
		if (!payload) {
			set.status = 401;
			return { success: false, message: 'Unauthorized' };
		}

		const { package_name, description, price, status_publish } = body;
		insertCatalogue(package_name, description, price, status_publish, payload.id);

		return { success: true, message: 'Catalogue created successfully' };
	} catch (error) {
		console.error(error);
		set.status = 500;
		return { success: false, message: 'Internal server error' };
	}
}

export async function putCatalogueService(id: number, body: any, jwt: any, cookie: any, set: any) {
	try {
		const token = cookie.auth.value;
		const payload = await jwt.verify(token);
		if (!payload) {
			set.status = 401;
			return { success: false, message: 'Unauthorized' };
		}

		const { package_name, description, price, status_publish } = body;
		updateCatalogue(id, package_name, description, price, status_publish);

		return { success: true, message: 'Catalogue updated successfully' };
	} catch (error) {
		console.error(error);
		set.status = 500;
		return { success: false, message: 'Internal server error' };
	}
}

export async function deleteCatalogueService(id: number, jwt: any, cookie: any, set: any) {
	try {
		const token = cookie.auth.value;
		const payload = await jwt.verify(token);
		if (!payload) {
			set.status = 401;
			return { success: false, message: 'Unauthorized' };
		}

		deleteCatalogue(id);

		return { success: true, message: 'Catalogue deleted successfully' };
	} catch (error) {
		console.error(error);
		set.status = 500;
		return { success: false, message: 'Internal server error' };
	}
}
