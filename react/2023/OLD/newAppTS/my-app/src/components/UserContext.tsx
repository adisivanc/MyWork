import { createContext } from "react";

interface UserContextType {
  
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
