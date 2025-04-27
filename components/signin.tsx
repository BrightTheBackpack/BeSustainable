// @ts-nocheck
'use client';
//sign in page
import { Box, Button, Heading, ThemeProvider, Input } from 'theme-ui'
import { Inter } from 'next/font/google'
import HeaderSignin from './headerSignIn.tsx'
import theme from '#/lib/theme'

const inter = Inter({  
    subsets: ['latin'] })

function Signin() {


        return (
            <ThemeProvider theme={theme}>
        <Box className={inter.className} sx={{ padding: '20px', textAlign: 'center'}}>
            {/* Main Title */}
            <HeaderSignin/>
            <Heading sx={{
                marginTop: '45px',
                fontSize: '60px',
            }}>
                sign in
            </Heading>
            <text></text>
        </Box>            
        </ThemeProvider>
)
    }
 


export default Signin
