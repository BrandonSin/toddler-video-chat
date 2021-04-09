//Main Video Call Logic is From https://www.youtube.com/watch?v=oxFr7we3LC8 JavaScript Mastery
//File Responsible for Receiving and Sending acknowledgements to Server

import React, { createContext, useState, useRef, useEffect} from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';


const SocketContext = createContext();

const socket = io.connect('https://toddler-video-chat.herokuapp.com/');

const ContextProvider = ({ children }) => {
    const [animalType, setAnimalType] = useState('');
    const [animalAnimation, setAnimalAnimation] = useState();
    const [animalButton, setAnimalButton] = useState('');
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState(null);
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
  
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    
    const [animalSound, setAnimalSound] = useState();
    const [userAnimalSound, setUserAnimalSound] = useState();

  //Determining Animal Sound and Animation to Send to Server
    switch(animalSound) {
      case 1:
        console.log("Sending Lion to Server: " + animalSound);
        socket.emit("animalCreated", {animal : animalSound, anim: 1});
        break;
    
      case 2:
        console.log("Sending Pig to Server: " + animalSound);
        socket.emit("animalCreated", {animal : animalSound, anim: 2});
        break;

      case 4:
        console.log("Sending Cow to Server: " + animalSound);
        socket.emit("animalCreated", {animal : animalSound, anim: 4});
        break;

      case 5:
        console.log("Sending Monkey to Server: " + animalSound);
        socket.emit("animalCreated", {animal : animalSound, anim: 5});
        break;
    }

   //retrieving Animal Sound and Animation from Server
    socket.once("createAnimal",({animal, anim}) => {
        setUserAnimalSound(animal); 
        setAnimalAnimation(anim);

        console.log("Client Acknowledges Animal Sound: " + animal);
        
    });

  //Connecting to Video And Audio
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
  
          myVideo.current.srcObject = currentStream;
        });
  
      socket.on('me', (id) => setMe(id));
  
      socket.on('callUser', ({ from, name: callerName, signal }) => {
        setCall({ isReceivingCall: true, from, name: callerName, signal });
      });
    }, []);
  
    //Answering Call
    const answerCall = () => {
        setCallAccepted(true);
  
        const peer = new Peer({ initiator: false, trickle: false, stream });
    
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });
    
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
    
        peer.signal(call.signal);

        peer.on("callEnded", () => {
        setCallEnded(true);
    })
    
        connectionRef.current = peer;
    };
    
    //Get Caller 
    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
  
        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
    
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
    
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
    
            peer.signal(signal);
        });

            peer.on("callEnded", () => {
            setCallEnded(true);
            })
  
        connectionRef.current = peer;
    };
  
    //Leave Call Function
    const leaveCall = () => {
      setCallEnded(true);
      socket.emit("hangUp");
      connectionRef.current.destroy();
      
    //Refreshes the Page After Leaving Call
    //Used for retrieving New Caller ID
      window.location.reload();
    };

    
  
    return (
      // Sending Variables to Other Components
      <SocketContext.Provider value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        setAnimalButton,
        setAnimalType,
        setAnimalSound,
        userAnimalSound,
        animalAnimation,
        setAnimalAnimation
        

      }}
      >
        {children}
      </SocketContext.Provider>
    );
  };
  
  export { ContextProvider, SocketContext };