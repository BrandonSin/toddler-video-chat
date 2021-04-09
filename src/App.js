//Staging Components
import React, {useState, useRef, useEffect} from 'react'
import { Typography, AppBar, Icon, Paper, Button} from '@material-ui/core';
import Board from './components/Board';
import Call from './components/Call';
import Notification from './components/Notification';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';


function App(){
    
    const[hideintro, sethideintro] = useState("block");
    const[hidemain, sethidemain] = useState("none");
    function hide(){
        sethidemain("grid");
        sethideintro("none");

    }

    return(
        <>
        <div className="intro" style={{display:hideintro}}>
        <Paper elevation={10} className="paper2">
            <Typography variant="h4" align="left">Welcome to</Typography>
            <Typography variant="h2" align="center" color="Primary">Chat4Toddler</Typography>
            <h3 style={{padding: "1em"}}>An Interactive Video Chat for Toddlers</h3>
            <Button
            
            variant="contained" 
            color="primary" 
            startIcon={<ArrowForwardRoundedIcon fontSize="large" />}
            fullWidth
            onClick={() => hide()} 
            >
                         
            </Button>
            </Paper>
        </div>
         
        <div class="wrapper" style={{display: hidemain}}>
            <div class="vidWrap">
            <Board/>
            </div>
            <div class= "optionWrap">
            <Call>
                <Notification/>
            </Call>
            </div>
            
        </div>
        </>
    );
}

export default App;