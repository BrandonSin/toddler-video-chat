//Logic From https://www.youtube.com/watch?v=oxFr7we3LC8 JavaScript Mastery
//Component Deals with handling Notification
import React, { useContext } from 'react'
import {Button} from '@material-ui/core';
import {SocketContext} from '../SocketContext';

//Function retrieves answerCall, call, callAccepted from SocketContext
const Notifications = () => {

    const { answerCall, call, callAccepted} = useContext(SocketContext);
    return (
        <div>
            {call.isReceivingCall && !callAccepted && (
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <h1>Who Could It Be? </h1>
                    <Button variant="contained" color="primary" onClick={answerCall}>
                        Pick Up 
                    </Button>

                </div>
            )}
        </div>
    )
}

export default Notifications