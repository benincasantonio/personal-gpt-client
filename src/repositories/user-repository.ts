export default class UserRepository {
    public readonly baseUrl: string = import.meta.env.VITE_USER_BASE_URL;
    
    
    public async login(email: string, password: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const { token } = await response.json();
        return token;
    }
}