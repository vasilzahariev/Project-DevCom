import React from 'react';

const UserContext = React.createContext({
    user: null,
    login: (userObj) => {},
    logout: () => {}
});

export default UserContext;
