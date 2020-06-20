import { createContext } from 'react';

const UserContext = createContext({
    user: {
        access_id: 0,
        user_id: null,
        username: null,
    },
});

export default UserContext;
