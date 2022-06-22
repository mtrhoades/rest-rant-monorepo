
import { useEffect, createContext, useState } from "react";


export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = await fetch('http://localhost:5000/authentication/profile', {
               headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
                    // Note that we've prepended the word "Bearer" to the JWT here. This is not really required for the authentication to work, but it is conventional when sending authorization tokens to an API.
            })
            let user = await response.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
};


export default CurrentUserProvider;