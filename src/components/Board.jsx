//Board Component is Responsible for Staging Playing Board and Video Feed
//Retrieves animal Sound from server and plays correct Sound

import React, { useContext,useEffect, useState } from 'react'
import { SocketContext } from '../SocketContext';
import useSound from 'use-sound';
import Pigsound from '../res/sounds/snort.mp3';
import Lionsound from '../res/sounds/leopard3.mp3';
import Cowsound from '../res/sounds/cow.mp3';
import Monkeysound from '../res/sounds/SQMonkey.mp3';
import styles from '../styles.css';



const VideoPlayer = () => {
    const {name, callAccepted, myVideo, userVideo, stream, callEnded, call, 
        setAnimalSound, userAnimalSound, animalAnimation, setAnimalAnimation } = useContext(SocketContext);
    
    // Pig Sound
    const [piggySound] = useSound(
        Pigsound,
        { volume: 0.05}
    );
    function playPigSound(){
       piggySound(); 
       console.log(cowAnim);
    }
    // Lion Sound
    const [lionSound] = useSound(
        Lionsound,
        { volume: 0.1}
    );

    function playLionSound(){
       lionSound(); 
    }

    // Cow Sound
    const [cowSound] = useSound(
        Cowsound,
        { volume: .5}
    );
    

    function playCowSound(){
       cowSound(); 
    }

    // Monkey Sound
    const [monkeySound] = useSound(
        Monkeysound,
        { volume: .2}
    );
    

    function playMonkeySound(){
       monkeySound(); 
    }
//takes Animal Sound from Context Provider and Checks for Correct Animal Sound
    useEffect(() => {
        switch(userAnimalSound){
            case 1:
                console.log("Lion Sound from User: " + userAnimalSound);
                lionSound();
                setLionAnim(1);
                break;
            case 2:
                console.log("Pig Sound from User: " + userAnimalSound)
                piggySound();
                setPigAnim(1);
                break;
            case 4:
                console.log("Cow Sound from User: " + userAnimalSound);
                cowSound();
                setCowAnim(1);
                break;
            case 5:
                console.log("Monkey Sound from User: " + userAnimalSound);
                monkeySound();
                setMonkeyAnim(1);
                break;
        }

    },[userAnimalSound, animalAnimation])

    //Animation States

    const[monkeyAnim, setMonkeyAnim] = useState(0);
    const[cowAnim, setCowAnim] = useState(0);
    const[lionAnim, setLionAnim] = useState(0);
    const[pigAnim, setPigAnim] = useState(0);



    return (
        
        <div class="grid">
            {/* host Video */}
            {stream && (
               <div class ="hostpic">
                    <video className = "hosting" playsInline muted ref={myVideo} autoPlay/>
                </div>
              

            )}
            
            {/* Users Video */}
            {/* {callAccepted && !callEnded ? ( */}
            <div class="userpic">
            <video className = "hosting2" playsInline ref={userVideo} autoPlay/>

            </div>
                <div className="p2Video">
                    <div class="animalContainer">
                    <div id = "1" class="cell cell-1">
                        {/* https://www.cleanpng.com/png-lionhead-rabbit-tiger-felidae-lion-face-891765/
                            by: Ashtiani */}
                        <button class="lion" onClick= {() => {playLionSound(); setAnimalSound(1); setLionAnim(1)}}
                        onAnimationEnd={() => setLionAnim(0)}
                        lionAnim={lionAnim}></button>
                    </div>
                    <div id = "2" class="cell cell-2">
                        <button class="pig" onClick= {() => {playPigSound(); setAnimalSound(2); setPigAnim(1)}}
                        onAnimationEnd={() => setPigAnim(0)}
                        pigAnim={pigAnim}
                        ></button>

                        {/* https://www.cleanpng.com/png-domestic-pig-clip-art-pig-vector-229214/ */}
                    </div>
                    <div id = "3" class="cell cell-3"></div>
                    <div id = "4" class="cell cell-4">
                    {/* https://www.cleanpng.com/png-cattle-cartoon-drawing-clip-art-cow-738252/
                    By Wecu */}
                        <button class="cow" onClick= {() => {playCowSound(); setAnimalSound(4); setCowAnim(1)}}
                        onAnimationEnd={() => setCowAnim(0)}
                        cowAnim={cowAnim}></button>

                    </div>
                    <div id = "5" class="cell cell-5">
                        {/* https://www.clipartmax.com/middle/m2i8b1b1i8K9H7m2_ape-clipart-transparent-background-monkey-clipart/ */}
                        <button class="monkey" onClick= {() => {playMonkeySound(5); setAnimalSound(5); setMonkeyAnim(1) }}
                        onAnimationEnd={() => setMonkeyAnim(0)}
                        monkeyAnim={monkeyAnim}></button>

                    </div>
                    <div id = "6" class="cell cell-6"></div>
                    </div> 
            </div>

        </div>
    )
}

export default VideoPlayer;
