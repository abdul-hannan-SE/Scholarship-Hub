// AuthProvider.js

import  { createContext } from "react";

export const AuthContext = createContext({
    user: null,
    setLogin: () => {},
    setUser : ()=> {} ,
    socketRef : null
});



