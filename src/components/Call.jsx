//Logic From https://www.youtube.com/watch?v=oxFr7we3LC8 JavaScript Mastery
//
import React, { useContext, useState } from 'react'
import {Button, TextField, Grid, Typography, Container, Paper} from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled} from '@material-ui/icons';


import { SocketContext } from '../SocketContext';




const Options = ({children}) => {
    const {me, callAccepted, name, setName, callEnded, leaveCall, callUser, setAnimalButton, setAnimalType } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
        <Container className="container">
            <Paper elevation={10} className="paper2">
                <form className="root" noValidate autoComplete="off">
                    <Grid container className="gridContainer">
                        <Grid item xs={12} md={6} className="padding">
                        <Typography gutterBottom variant="h6">Copy ID to Call User</Typography>
                        <CopyToClipboard text={me} className="margin">
                            <Button variant="contained" color="secondary" fullWidth startIcon={<Assignment fontSize="large"/>}>Copy ID</Button>
                        </CopyToClipboard>
                        </Grid>
                    </Grid> 

                    <Grid container className="gridContainer">
                        <Grid item xs={12} md={6} className="padding">
                        <TextField label="Paste Call ID" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                        {callAccepted && !callEnded ?(
                          <Button 
                          variant="contained" 
                          color="secondary" 
                          startIcon={<PhoneDisabled fontSize="large" />}
                          fullWidth
                          onClick={leaveCall}
                          className="margin">GoodBye</Button>  
                        ) : (
                          <Button 
                          variant="contained" 
                          color="primary" 
                          startIcon={<Phone fontSize="large" />}
                          fullWidth
                          onClick={() => callUser(idToCall)}
                          className="margin">Call</Button>
                    
                        )}
                        </Grid>
                    </Grid> 
                </form>
                {children}
            </Paper>
        </Container>
           

        
    )
}

export default Options