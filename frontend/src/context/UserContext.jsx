import { createContext, useState } from "react"

export const UserDataContext=createContext();

const UserContext = ({children}) => {
  const [user, setUser] = useState({
    email:'abc',
    fullName:{
      firstName:'',
      lastname:''
    }
  })

  const value = {
    user,
    setUser
  };

  return (
    <div>
        <UserDataContext.Provider value={value}>
          {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext;