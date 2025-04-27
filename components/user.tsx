// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client"
//not a component, but allows other components to access the user data
import {useState, useEffect, createContext, useContext} from 'react';
import { onIdTokenChanged } from '#/lib/firebase/auth.js';
import { setCookie, deleteCookie } from "cookies-next";
import { ref, set, get } from "firebase/database";
import { database } from "#/lib/firebase.ts";
const UserContext = createContext(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        //function that runs when a user signs in or out
        return onIdTokenChanged(async (user) => {
        //if a user signed in
        if (user) {
            //gets a reference to the database
            const usersRef = ref(database, "users");
            //gets the database
            const snapshot = await get(usersRef);
            //gets teh date
            let date = new Date();
            const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const dd = String(date.getDate()).padStart(2, '0');
            const yyyy = date.getFullYear();
            date = `${mm}${dd}${yyyy}`
            //if user exists in the DB
            if(snapshot.val().hasOwnProperty(user.uid)){
            }else{
                set(ref(database, 'users/' + user.uid), {
                    streak: 0,
                    challenges: {
                        [date]: {
                            challengeID: 0,
                            completed: false,
                        }
                    }
                });
            }
            //sets session cookie
            const idToken = await user.getIdToken();
            await setCookie("__session", idToken);
            setUser(user);

        } else {
            await deleteCookie("__session");
            setUser(null);

        }
     
        // window.location.reload();
        });
    }, []);
    
    return (
        <UserContext.Provider value={user}>
          {children}
        </UserContext.Provider>
      );
}
export function useUser() {
    //returns the user
    return useContext(UserContext);
  }