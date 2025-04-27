// @ts-nocheck
"use client"

import { Box, Button, Heading, } from 'theme-ui'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation';
const inter = Inter({  
    subsets: ['latin'] })

function HeaderSignin() {
    const router = useRouter(); // Initialize the router
    const handleSignIn = (event) => {
    // event.preventDefault();
    // signInWithGoogle();
    router.push('/signin');
  };
  const home = (event) => { 
    router.push('/');
  }
  

  return (
<Box className={inter.className} bg = "primary" sx={{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
}}>

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
    

    <Button id = "home" sx = {{variant: 'buttons.flush'}} onClick={home} >
    <Heading sx = {{fontWeight: 'body'}}>home</Heading>
    </Button>

    </Box>
</Box>
)
}

export default HeaderSignin

