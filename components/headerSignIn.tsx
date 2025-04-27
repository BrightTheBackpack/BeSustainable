// @ts-nocheck
"use client"

import { Box, Button, Heading, } from 'theme-ui'
import { Inter } from 'next/font/google'
const inter = Inter({  
    subsets: ['latin'] })

function HeaderSignin() {
  

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
    
    <Button id = "your account" sx = {{variant: 'buttons.flush'}}>
    <Heading sx = {{fontWeight: 'body'}}>sign in</Heading>

    </Button>
    <Button id = "home" sx = {{variant: 'buttons.flush'}} >
    <Heading sx = {{fontWeight: 'body'}}>home</Heading>
    </Button>

    </Box>
</Box>
)
}

export default HeaderSignin

