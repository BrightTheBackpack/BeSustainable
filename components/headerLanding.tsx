// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client"

import { Box, Button, Heading, } from 'theme-ui'
import { Inter } from 'next/font/google'
import { ref, set, get, child, update } from "firebase/database";
import {
    signInWithGoogle,
    signOut,
    onIdTokenChanged,
  } from "#/lib/firebase/auth.js";
import { database } from "#/lib/firebase.ts";
import { useEffect, useState } from 'react';
import { setCookie, deleteCookie } from "cookies-next";
import { useUser } from '#/components/user.tsx';
const inter = Inter({  
    subsets: ['latin'] })
function HeaderLanding() {
    //function from user.tsx that grabs user data if a user is signed in
    const userData = useUser();


    //function to handle signin with google, from auth.js
  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithGoogle();
  };


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
        <Button id = "sign out" sx = {{variant: 'buttons.flush'}} onClick={handleSignIn}>
        <Heading sx = {{fontWeight: 'body'}}>sign up</Heading>
        </Button>
        <Button id = "sign out" sx = {{variant: 'buttons.flush'}} onClick={handleSignIn}>
        <Heading sx = {{fontWeight: 'body'}}>{userData?.email}</Heading>
        </Button>

        </Box>
    </Box>
)
}

export default HeaderLanding

