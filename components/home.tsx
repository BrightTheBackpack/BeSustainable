// @ts-nocheck
'use client';
//Home page 
import { Box, Button, Heading, ThemeProvider } from 'theme-ui'
import Header from '#/components/header'
import Task from '#/components/task'
import HeaderLanding from '#/components/headerLanding'
import User from '#/components/user'
import theme from '#/lib/theme'
import Landing from '#/components/landing'
import { ref, set, get, child, update } from "firebase/database";
import {database} from "#/lib/firebase.ts";
import { useUser } from '#/components/user.tsx';
import { useEffect, useState } from 'react';
//random taskID generator
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
function Home() {
    //sets some hooks to set the task and data
    const [data, setData] = useState(null);
    const [task, setTask] = useState(null);
    const [completed, setCompleted] = useState(null)
    const [streak, setStreak] = useState(null);
    //gets user data from user.tsx
    const userData = useUser();
    //sets a reference to the users "directory" of the DB
    const databaseRef = ref(database, "users");


    useEffect(() => {
        //function to fetch data
        const fetchData = async () => {
        //if user is signed in
        if (userData) {
            try {
            //gets the user's data from the db
            const snapshot = await get(child(databaseRef, userData?.uid));
            if (snapshot.exists()) {

                setData(snapshot.val());
                //gets the date
                let date = new Date();
                const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                const dd = String(date.getDate()).padStart(2, '0');
                const yyyy = date.getFullYear();
                date = `${mm}${dd}${yyyy}`
                //gets the list of challenges
                const challenges = ref(database, "challenges");
                const challengeSnapshot = await get(challenges);
                const challengeData = challengeSnapshot.val();

                //if a challenge has been set for the user for today
                if(snapshot.val()['challenges'][date]){
                    //gets the challenge id
                    let id = snapshot.val()['challenges'][date]['challengeID'];
                    //gets the challenge description from the ID
                    const dailyChallenge = challengeData[id];
                    //gets completion status
                    let complete = snapshot.val()['challenges'][date]['completed'];
                    console.log(snapshot.val()['challenges'][date])
                    setTask(dailyChallenge);
                    setCompleted(complete);
                

                }else{//challenge has not been set for today
                    //gets a random taskID
                    let id = getRandomIntInclusive(0, 62);
                    //sets todays challenge in the db
                    set(ref(database, 'users/' + userData.uid + '/challenges/' + date), {
                        challengeID: id,
                        completed: false,
                    });
                    //gets the challenge description from the id
                    const dailyChallenge = challengeData[id];
                    //sets the task using the hook setup earlier
                    setTask(dailyChallenge);
                    setCompleted(false);



                }
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const mm2 = String(yesterday.getMonth() + 1).padStart(2, '0'); // Months are 0-based
                const dd2 = String(yesterday.getDate()).padStart(2, '0');
                const yyyy2 = yesterday.getFullYear();
                yesterday = `${mm2}${dd2}${yyyy2}`
                //checks if the challenge for yesterday was completed
                if(snapshot.val()['challenges'][yesterday]){
                    //if it was completed, increase the streak by 1
                    console.log(snapshot.val()['challenges'][yesterday]['completed'])
                    console.log(snapshot.val()["streak"])
                    if(snapshot.val()['challenges'][yesterday]['completed'] == true){
                        console.log("completed")
                      let streaktemp = snapshot.val()['streak'];
                      console.log(streaktemp)
                      setStreak(streaktemp)
                    }else{//if it was not completed, set the streak to 0
                        
                      
                    }
                }else{//if there was no challenge for yesterday, set the streak to 0
                    if (snapshot.val()['challenges'][date]['completed'] == true) {
                        console.error("Today's challenge was completed, but yesterday's was not.");
                        // If today's challenge was completed, keep the streak as is
                        let streaktemp = snapshot.val()['streak'];
                        console.log(streaktemp);
                        setStreak(streaktemp);
                    } else {
                        console.log("Neither yesterday's nor today's challenge was completed.");
                        // if neither yesterday's nor today's challenge was completed, set streak to 0
                        setStreak(0);
                        update(ref(database, 'users/' + userData.uid), {
                            streak: 0,
                        });
                    }
               
                    
                }
            } else {
                console.log("No data available for this user.");
            }
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        }
        };

        fetchData(); // Call the async function
    }, [userData]);
    console.log(data)
    // if the user is not signed in, show the landing page
    if(!userData) {

        return (
            <ThemeProvider theme={{theme}}>

            <Box sx={{
                backgroundColor: 'background',
                height: '100vh',
            }}>
                <HeaderLanding  />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}>
                <Landing />
            
                </Box>
            </Box>
            </ThemeProvider>
            )
    }else{//if user is signed in, show the home page 
        return (
            <ThemeProvider theme={{theme}}>

            <Box sx={{
                backgroundColor: 'background',
                height: '100vh',
            }}>
                <Header  />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90%',
                }}>
                <Task task={task} done={completed} streak = {streak}/>
            
                </Box>
            </Box>
            </ThemeProvider>

            )
    }

    }

export default Home
