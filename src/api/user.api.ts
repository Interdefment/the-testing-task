import { UserProfile } from 'src/@types/user';

export const fetchProfile = async (): Promise<UserProfile> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ username: 'username' });
        }, 800);
    });
};

export const resetPassword = async (username: string): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // eslint-disable-next-line
            console.log(`Reset password for ${username}`);
            resolve();
        }, 800);
    });
};
