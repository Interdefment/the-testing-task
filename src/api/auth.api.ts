import axios from 'axios';

interface Credentials {
    username: string;
    password: string;
}

export const login = async (credentials: Credentials): Promise<{ access: string, refresh: string }> => {
    await axios.post('https://jsonplaceholder.typicode.com/users/');

    return { access: 'access', refresh: 'refresh' };

    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         // eslint-disable-next-line
    //         console.log(`Logged as ${credentials.username}`);
    //         resolve({ access: 'access', refresh: 'refresh' });
    //     }, 800);
    // });
};
