import type { Setting } from '../types.database';
import { findSettings, insertSettings, updateSettings, deleteSettings } from './model';

export const getSettingsService = () => {
	const settings = findSettings();
	return { success: true, settings };
};

export const postSettingsService = (
	body: Omit<Setting, 'Id_setting' | 'created_at' | 'updated_at'>
) => {
	if (
		!body.website_name ||
		!body.phone_number1 ||
		!body.email1 ||
		!body.address ||
		!body.logo ||
		!body.header_bussines_hour ||
		!body.time_bussines_hour
	) {
		return { error: 'Missing required fields' };
	}
	insertSettings(body);
	return { success: true, message: 'Settings saved' };
};

export const putSettingsService = (body: Partial<Setting>) => {
	if (!body.id_setting) return { error: 'Id_setting required' };
	updateSettings(body.id_setting, body);
	return { success: true, message: 'Settings updated' };
};

export const deleteSettingsService = (id?: number) => {
	if (!id) return { error: 'Id_setting required' };
	deleteSettings(id);
	return { success: true, message: 'Settings deleted' };
};
