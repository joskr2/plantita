export type Usuario = {
	id: string;
	nombre: string;
	avatarUrl: string;
};

export const USUARIO_MOCK: Usuario = {
	id: "1",
	nombre: "Usuario",
	avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=usuario",
};

export type MockUser = {
	id: string;
	nombre: string;
	email: string;
	password: string;
	avatarUrl: string;
};

export const MOCK_USERS: MockUser[] = [
	{
		id: "1",
		nombre: "Juan",
		email: "juan@example.com",
		password: "password123",
		avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=juan",
	},
	{
		id: "2",
		nombre: "Maria",
		email: "maria@example.com",
		password: "password123",
		avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
	},
];
