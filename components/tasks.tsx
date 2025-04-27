// @ts-nocheck
//starter component
'use client';

import { Box, Button, Heading, ThemeProvider } from 'theme-ui'
import theme from '#/lib/theme'
import { ref, set, get, child, update } from "firebase/database";
import {database} from "#/lib/firebase.ts";
import { useUser } from '#/components/user.tsx';
import { useEffect, useState } from 'react';
import { preconnect } from 'next/dist/server/app-render/entry-base';
import Header from '#/components/header'
import { Inter } from 'next/font/google';

const inter = Inter({  
    subsets: ['latin'] })
function Tasks() {

    const userData = useUser();
    const [dates, setDates] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [completed, setCompleted] = useState(null)

    //sets a reference to the users "directory" of the DB
    console.log(userData)

    const databaseRef = ref(database, "users");
    //function to fetch data
    console.log('why')
    useEffect(() => {
        console.log('no run')
        const fetchData = async () => {
            console.log('run')
            console.log(userData)

        if (userData) {
            console.log('signed in')
            try {
            //gets the user's data from the db
            const snapshot = await get(child(databaseRef, userData?.uid));
            if (snapshot.exists()) {
                //grab the list of ids and challlenges
                const challengesRef = ref(database, 'challenges');
                const challengesSnapshot = await get(challengesRef);
                const allChallenges = challengesSnapshot.val();
                
                //gets the user's challneges
                let challenges =snapshot.val()['challenges'];
                let tempDates = []
                let tempTasks = []
                let tempCompleted = []
                console.log(challenges);
                //loop through the challenges
                for(let challenge in challenges){
                    //format and add dates
                    const formattedDate = `${challenge.slice(0, 2)}/${challenge.slice(2, 4)}/${challenge.slice(4)}`;

                    tempDates.push(formattedDate)
                    //format and ad tasks
                    const challengeID = challenges[challenge]['challengeID'];

                    const dailyChallenge = allChallenges[challengeID];

                    tempTasks.push(dailyChallenge)
                    //add status
                    tempCompleted.push(challenges[challenge]['completed'])

                }
                setDates(tempDates)
                setTasks(tempTasks)
                setCompleted(tempCompleted)
                console.log(tasks)

             
                console.log(snapshot.val())

            } else {
                console.log("No data available");
            }
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        }
        };
        fetchData();

       

    }, [userData]);
    useEffect(() => {
        console.log(completed)
        console.log(tasks)
        console.log(dates)

    }, [completed])
    

        return (
        <ThemeProvider theme={{theme}}>
            <Box className={inter.className} sx={{
                backgroundColor: '#F4EDDA',
                height: '100vh',
               
            }}>
                            <Header />

                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <Box
                        key={index}
                        sx={{
                          margin: '10px 0',
                          padding: '10px',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          backgroundColor: completed[index] ? 'lightgreen' : 'lightcoral',
                        }}
                      >
                        <p>Task ID: {task}</p>
                        <p>Date: {dates[index]}</p>
                        <p>Completed: {completed[index] ? 'Yes' : 'No'}</p>
                      </Box>
                    ))
                ) :(<Box>no tasks found</Box>)}
            </Box>     
        </ThemeProvider>       
)
}
 


export default Tasks
