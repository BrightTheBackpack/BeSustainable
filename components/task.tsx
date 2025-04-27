// @ts-nocheck
"use client"
//on the home page, displays the task, date, and streak
import { Box, Button, Heading, } from 'theme-ui'
import Header from '#/components/header'
import { useState } from 'react';
import { ref, set, get, child, update } from "firebase/database";
import {database} from "#/lib/firebase.ts";
function Task({task, done}) {
    //gets todays date
    const [completed, setCompleted] = useState(done);
    let date = new Date();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    date = `${mm}/${dd}/${yyyy}`
    const complete = (event) => {
        console.log("complete")
        let newDate = new Date();
        const mm = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const dd = String(newDate.getDate()).padStart(2, '0');
        const yyyy = newDate.getFullYear();
        newDate = `${mm}/${dd}/${yyyy}`
        if(newDate != date){
            console.log("not the same date")
        }else{
            setCompleted(true);
            let dateString = `${mm}${dd}${yyyy}`
            const databaseRef = ref(database, "users");
            const snapshot = get(child(databaseRef, userData?.uid));
         
            //sets the completed task to true in the database


        }
        //set database
      };

  return (
  
    <Box sx={{
        backgroundColor: 'background',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        {/* "your task:" */}
        <Heading>your task:</Heading>
        {/* task */}
        <Heading as = "h2" sx={{
            fontSize: '3',
        }}>{task}</Heading>
        {/* complete button */}
        <Button id = "complete" sx = {{
            marginTop: '50px',
            backgroundColor: completed ?  '#d3d3d3': '#fce76c',
            color: 'black',
            fontSize: '20px',
            padding: '15px 30px',
            fontWeight: 'bold',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
            cursor: 'pointer',
           
            }}
            disabled={completed}
            >
            <Heading sx = {{fontWeight: 'body'}} onClick={complete}>complete</Heading>
        </Button>
        {/* streak */}
        <Box sx={{
            alignContent: 'end',
            alignItems: 'end',
            display: 'flex',
            position: 'absolute',
            bottom: '0',
            left: '0',
            flexDirection: 'row',
            justifyContent: 'end',
        }}>
            <Heading sx={{
                fontSize: '4',
                marginRight: '10px',
                marginBottom: '10px',
            }}>
                Streak:
            </Heading>
            <Heading sx={{
                fontSize: '4',
                marginRight: '10px',
                marginBottom: '10px',
            }}>
                0
            </Heading>
        </Box>
       {/* date */}
        <Box sx={{
            alignContent: 'end',
            alignItems: 'end',
            display: 'flex',
            position: 'absolute',
            bottom: '0',
            right: '0',
            flexDirection: 'row',
            justifyContent: 'end',
        }}>
        <Heading sx={{
            fontSize: '4',
            marginRight: '10px',
            marginBottom: '10px',
        }}>
            {date}
        </Heading>
        
    </Box>

</Box>

    
)
}

export default Task
