import { createContext } from 'react';

export const UserContext = createContext({
    user: {
        access_id: 0,
        user_id: null,
        username: null,
    },
});
