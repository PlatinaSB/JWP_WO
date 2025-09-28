// User table
export interface User {
	user_id: number;
	name: string;
	username: string;
	password: string;
	created_at: string;
	updated_at?: string | null;
}

// Catalogue table
export interface Catalogue {
	catalogue_id: number;
	image: Uint8Array;
	package_name: string;
	description: string;
	price: number;
	status_publish: 'Y' | 'N';
	user_id: number;
	created_at: string;
	updated_at?: string | null;
}

// Orders table
export interface Order {
	order_id: number;
	catalogue_id: number;
	name: string;
	email: string;
	phone_number: string;
	wedding_date: string;
	status: 'requested' | 'approved';
	user_id: number;
	created_at: string;
	updated_at?: string | null;
}

// Settings table
export interface Setting {
	id_setting: number;
	website_name: string;
	phone_number1: string;
	phone_number2?: string | null;
	email1: string;
	email2?: string | null;
	address: string;
	maps?: string | null;
	logo: Uint8Array;
	facebook_url?: string | null;
	instagram_url?: string | null;
	youtube_url?: string | null;
	header_bussines_hour: string;
	time_bussines_hour: string;
	created_at: string;
	updated_at?: string | null;
}
