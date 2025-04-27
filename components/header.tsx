// @ts-nocheck

import { Box, Button, Heading, } from 'theme-ui'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation';
 import {
    signInWithGoogle,
    signOut,
    onIdTokenChanged,
  } from "#/lib/firebase/auth.js";
const inter = Inter({  
    subsets: ['latin'] })

function Header() {
  const router = useRouter(); // Initialize the router

  //funcnction for signing out, from auth.js
  const handleSignOut = (event) => {
    event.preventDefault();
    signOut();
    router.push('/');
  };
  const handleHome = (event) => {
    event.preventDefault();
    router.push('/');
  };
  const handleLeaderboard = (event) => {
    event.preventDefault();
    router.push('/leaderboard');
  };
  const handlePastTasks = (event) => {
    event.preventDefault();
    router.push('/tasks');
  };

  return (
    <Box className={inter.className} bg = "primary" sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    }}>
        {/* logo button */}
        <Button id = "home" sx = {{
            marginY: '1vh',
            variant: 'buttons.flush',
            display: 'flex',
            flexDirection: 'row',
            }}>

        </Button>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'right',
            marginY: '1vh',

            justifyContent: 'right',
            fontSize: '2',
            backgroundColor: 'primary',
            color: 'white',
        }}>
        {/* home button */}
        <Button id = "home" sx = {{variant: 'buttons.flush'}} onClick={handleHome}>
            <Heading sx = {{fontWeight: 'body'}}>home</Heading>
        </Button>
        {/* leaderboard button */}
        {/* <Button id = "leaderboard" sx = {{variant: 'buttons.flush'}}>
        <Heading sx = {{fontWeight: 'body'}}>leaderboard</Heading>
        </Button> */}
        <Button id = "my tasks" sx = {{variant: 'buttons.flush'}} onClick={handlePastTasks}>
        <Heading sx = {{fontWeight: 'body'}}>past tasks</Heading>
        {/* signout button */}
        </Button>
        <Button id = "sign out" sx = {{variant: 'buttons.flush'}} onClick={handleSignOut}>
        <Heading sx = {{fontWeight: 'body'}}>sign out</Heading>
        </Button>


        </Box>
    </Box>
)
}

export default Header

function useUserSession(initialUser) {
    useEffect(() => {
      return onIdTokenChanged(async (user) => {
        if (user) {
          const idToken = await user.getIdToken();
          await setCookie("__session", idToken);
        } else {
          await deleteCookie("__session");
        }
        if (initialUser?.uid === user?.uid) {
          return;
        }
        window.location.reload();
      });
    }, [initialUser]);
  
    return initialUser;
  }