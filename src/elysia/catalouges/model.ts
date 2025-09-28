import { db } from './../database';

export function findAllPublished() {
	return db
		.query("SELECT * FROM catalogue WHERE status_publish = 'Y' ORDER BY created_at DESC")
		.all();
}

export function insertCatalogue(
	package_name: string,
	description: string,
	price: number,
	status_publish: string,
	user_id: number
) {
	return db
		.query(
			`INSERT INTO catalogue 
        (package_name, description, price, status_publish, user_id, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))`
		)
		.run(package_name, description, price, status_publish, user_id);
}

export function updateCatalogue(
	id: number,
	package_name: string,
	description: string,
	price: number,
	status_publish: string
) {
	return db
		.query(
			`UPDATE catalogue
         SET package_name = ?, description = ?, price = ?, status_publish = ?, updated_at = datetime('now')
         WHERE catalogue_id = ?`
		)
		.run(package_name, description, price, status_publish, id);
}

export function deleteCatalogue(id: number) {
	return db.query('DELETE FROM catalogue WHERE catalogue_id = ?').run(id);
}
