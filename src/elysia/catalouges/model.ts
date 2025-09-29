// model.ts
import { db } from './../database';

export function findAll() {
	return db.query('SELECT * FROM catalogue ORDER BY created_at DESC').all();
}

export function findAllPublished() {
	return db
		.query("SELECT * FROM catalogue WHERE status_publish = 'Y' ORDER BY created_at DESC")
		.all();
}

export function findCatalogueById(id: number) {
	return db.query('SELECT * FROM catalogue WHERE catalogue_id = ?').get(id);
}
export function findPublishedCatalogueById(id: number) {
	return db
		.query('SELECT * FROM catalogue WHERE catalogue_id = ? AND status_publish = "Y"')
		.get(id);
}

export function insertCatalogue(
	package_name: string,
	description: string,
	price: number,
	status_publish: string,
	user_id: number,
	image: string // added image
) {
	console.log(image);
	return db
		.query(
			`INSERT INTO catalogue 
        (package_name, description, price, status_publish, user_id, image, created_at)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
		)
		.run(package_name, description, price, status_publish, user_id, image);
}

export function updateCatalogue(
	id: number,
	package_name: string,
	description: string,
	price: number,
	status_publish: string,
	image: string // added image
) {
	console.log(image);
	return db
		.query(
			`UPDATE catalogue
         SET package_name = ?, description = ?, price = ?, status_publish = ?, image = ?, updated_at = datetime('now')
         WHERE catalogue_id = ?`
		)
		.run(package_name, description, price, status_publish, image, id);
}

export function deleteCatalogue(id: number) {
	return db.query('DELETE FROM catalogue WHERE catalogue_id = ?').run(id);
}
