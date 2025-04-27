// @ts-nocheck
'use client';
//sign in page
import { Box, Button, Heading, ThemeProvider, Input } from 'theme-ui'
import { Inter } from 'next/font/google'
import HeaderSignin from './headerSignIn.tsx'
import theme from '#/lib/theme'
import { signInWithGoogle } from '#/lib/firebase/auth.js'   
import { useRouter } from "next/navigation"; // Import useRouter
const inter = Inter({  
    subsets: ['latin'] })

function Signup() {
    const router = useRouter(); // Initialize the router
    const handleSignIn = (event) => {
        event.preventDefault();
        signInWithGoogle();
        router.push('/');
      };
     


        return (
            <ThemeProvider theme={{theme}}>
        <Box className={inter.className} sx={{ 
            background: 'background',
            textAlign: 'center', 
            height: '100vh',
            }}>
            {/* Main Title */}
            <HeaderSignin/>
            <Heading sx={{
                fontSize: '60px',
            }}>
                sign up
            </Heading>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
            {/* <Input
                type="email"
                placeholder="Email"
                sx={{
                    width: '300px',
                    margin: '10px auto',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <Input
                type="password"
                placeholder="Password"
                sx={{
                    width: '300px',
                    margin: '10px auto',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <Input
                type="name"
                placeholder="Name"
                sx={{
                    width: '300px',
                    margin: '10px auto',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
                >
                
            </Input>
            <Button
                variant="primary"
                sx={{
                    marginTop: '20px auto',
                    padding: '10px 20px',
                    width: '300px',
                    borderRadius: '5px',
                    display: 'block'
                }}
            >
                Sign In
            </Button> */}
            <Button
                variant="primary"
                sx={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    width: '300px',
                    borderRadius: '5px',
                }}
                onClick={handleSignIn}
            >
                sign up with Google
            </Button>
        </Box>
        </Box>
        
        </ThemeProvider>
)
    }
 


export default Signup
