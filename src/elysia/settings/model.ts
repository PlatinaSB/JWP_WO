import { db } from '../database';
import type { Setting } from '../types.database';

export const findSettings = () => {
	return db.query('SELECT * FROM settings LIMIT 1').get();
};

export const insertSettings = (data: Omit<Setting, 'Id_setting' | 'created_at' | 'updated_at'>) => {
	db.query(
		`INSERT INTO settings 
    (website_name, phone_number1, email1, address, logo, header_bussines_hour, time_bussines_hour, created_at) 
    VALUES ($website_name, $phone_number1, $email1, $address, $logo, $header_bussines_hour, $time_bussines_hour, CURRENT_TIMESTAMP)`
	).run(data);
};

export const updateSettings = (id: number, data: Partial<Setting>) => {
	db.query(
		`UPDATE settings 
     SET website_name=?, phone_number1=?, phone_number2=?, 
         email1=?, email2=?, address=?, maps=?, logo=?, 
         facebook_url=?, instagram_url=?, youtube_url=?, 
         header_bussines_hour=?, time_bussines_hour=?, 
         updated_at=CURRENT_TIMESTAMP
     WHERE Id_setting=?`
	).run(
		data.website_name ?? null,
		data.phone_number1 ?? null,
		data.phone_number2 ?? null,
		data.email1 ?? null,
		data.email2 ?? null,
		data.address ?? null,
		data.maps ?? null,
		data.logo ?? null,
		data.facebook_url ?? null,
		data.instagram_url ?? null,
		data.youtube_url ?? null,
		data.header_bussines_hour ?? null,
		data.time_bussines_hour ?? null,
		id
	);
};

export const deleteSettings = (id: number) => {
	db.query('DELETE FROM settings WHERE Id_setting=$Id_setting').run({ $Id_setting: id });
};
