// @ts-nocheck
'use client';
//landing page for users not signed in
import { Box, Button, Heading, Image, Text } from 'theme-ui'

function Landing() {
    return (
        <Box sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f7f1dc' }}>
            {/* Main Title */}
            <Heading sx={{
                marginTop: '45px',
                fontSize: '60px',
            }}>
                beSustainable
            </Heading>

            {/* Image */}
            <Image
                src="/earth-hands.jpg" // replace with your actual image path
                alt="Earth held by hands"
                sx={{
                    width: '500px',
                    height: 'auto',
                    margin: '40px auto',
                    borderRadius: '10px',
                }}
            />

            {/* Mission and How It Works */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
                maxWidth: '700px',
                margin: '0 auto',
            }}>
                <Box>
                    <Heading sx={{ fontSize: '30px' }}>our mission</Heading>
                    <Text sx={{ marginTop: '10px', fontSize: '16px' }}>
                        We believe small actions lead to big change. Our goal is to help everyone make the world a little greener — one day, one task at a time.
                    </Text>
                </Box>

                <Box>
                    <Heading sx={{ fontSize: '30px' }}>how it works</Heading>
                    <Text sx={{ marginTop: '10px', fontSize: '16px' }}>
                        Every day, we give you a simple, doable task that helps the planet. <br />
                        It could be saving water, using less plastic, planting something, supporting local farmers — easy things you can actually fit into your life.
                    </Text>
                </Box>
            </Box>

            {/* Big Button */}
            <Button sx={{
                marginTop: '50px',
                backgroundColor: '#fce76c',
                color: 'black',
                fontSize: '20px',
                padding: '15px 30px',
                fontWeight: 'bold',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                ':hover': {
                    backgroundColor: '#f8da2f'
                }
            }}>
                start being sustainable!
            </Button>
        </Box>
    )
}

export default Landing;
