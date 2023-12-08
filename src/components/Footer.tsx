// import { useState } from "react";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import axios from 'axios';
import Confetti from "./Confetti";

interface Props {
    studentNumber: number;
    setStudentNumber: Function;
}


function Footer({studentNumber, setStudentNumber}: Props) {

    const [isVisible, setIsVisible] = useState(false);

    // detect if mobile view
    let isMobile = window.screen.width <= 1000

    let images = ['https://i.imgur.com/wzZBYA6.png', "https://samuelearp.com/wp-content/uploads/2023/06/Rugged-Mountains-Samuel-Earp-landscape-painting-1024x1024.jpg", "https://i.imgur.com/3ZAWLhe.png", "https://i.imgur.com/99CjDf2.png", "https://i.imgur.com/W5YZQRv.jpg", 'https://media.discordapp.net/attachments/946645410108305478/1149528482448150528/IMG_3637.png?ex=6584f153&is=65727c53&hm=3e96a556aaa620c4554d52702c998f0bb2f8b466b4a13525d026cdf28b4e0e13&=&format=webp&quality=lossless&width=523&height=608', "https://img.freepik.com/premium-photo/landscape-nature-wallpaper_882954-925.jpg", "https://www.serengeti.com/assets/img/serengeti-landscape-vegetation-riverine-forest-small.jpg","https://media.discordapp.net/attachments/946651095281860649/1150590884757373058/biden.png?ex=657f9443&is=656d1f43&hm=bb472c585700fada85c0200cab5dea501ac94d729cc052d15e2eb9edf755fbda&=&format=webp&quality=lossless&width=639&height=608","https://us-tuna-sounds-images.voicemod.net/d9f44e36-3c28-4903-ac12-6947fde79d65-1663067562585.jpg"]

    // sound function
    let soundArray = ["joinSoundBounce.wav","joinSoundBubble.wav","joinSoundChime.wav","joinSoundCoin.wav", "joinSoundDing.wav", "joinSoundPop.wav", "joinSoundRetro.wav", "joinSoundWhir.wav"]

    function playSound(sound: number) {
        // make pop the default and have other sounds rarer
        if (Math.random() <= .7) {
            sound = 5
        }

        const audio = new Audio("./soundEffects/" + soundArray[sound]);
        audio.play();
    }
    const [studentArray, setStudentArray] = useState<string[]>([]);



    // running this function repeatedly should ideally be a toggle
    function fetchStudents () {
        // playSound(Math.floor(Math.random() * soundArray.length))
        // should really be moved somewhere else if this function will be repeatedly called

        axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/Profmainstudentarray.php')
            .then(response => { 
                

                let data = response.data.slice(8)


                const studentList = JSON.parse(data)
                let tempArray = []

                for (let i in studentList.usernames) {
                    let student = studentList.usernames[i][0].toString()
                    tempArray.push(student)
                }

                setStudentArray([...tempArray]) 

            })
            .catch(error => {
                console.error('Error submitting data', error);
            });

            setStudentNumber(studentArray.length)
      }

    let studentNameList =["daveDog","abbyd98","hertzFan22","ubparking","billsmafia","yoooo2","genericUser672","helloworld","cse331"]

    function handleAddStudentClick(this: any) {
        // playSound(Math.floor(Math.random() * soundArray.length))
        let length = studentArray.length
        if (length < studentNameList.length) {
            setStudentArray([...studentArray, studentNameList[length]])
        } else {
            setStudentArray([...studentArray, "name" + (length + 1)])
        }
        setStudentNumber(studentArray.length)
    }

    useEffect(() => {
        // console.log(studentArray)
        // console.log("length: " + studentArray.length)
        setStudentNumber(studentArray.length)
        if (studentArray.length > 0) [
            playSound(Math.floor(Math.random() * soundArray.length))
        ]
        setIsVisible(true)  
      }, [studentArray]); // Specify "value" as the dependency
    

    function handleResetStudentClick() {
        setStudentArray([])
        setStudentNumber(0)
    }

    function renderDivs(){
        let count = studentNumber
        let uiItems = []

        // possibly change student array to array of arrays
        // or keep separate array for each customization option (pictures, colors, sound)
        
        while(count--)
           uiItems.unshift(
                <Profile profilePicture={"https://cdn-icons-png.flaticon.com/512/9385/9385289.png"} username={studentArray[count]} background_choice={0} arrayIndex={count}></Profile>
            )
            // if count = 1 playsound from array?
        return uiItems;
    }


    if (isMobile) {
        return (
            <>
            </>
        )
    } else {
        if (studentNumber <= 0) {
            return (
                <>
                    <div className="center">
                        <div className="footerDebug">
                            <button type="button" className="btn btn-primary" onClick={handleAddStudentClick} >Add Student</button>
                            &nbsp;
                            <button type="button" className="btn btn-secondary" onClick={handleResetStudentClick} >Reset Students</button>
                            &nbsp;
                            <button type="button" className="btn btn-success" onClick={fetchStudents} >Fetch Backend</button>
                        </div>
                    </div>
                    <div className="footer" style={{textAlign: 'center', alignItems: 'center', justifyContent:'center',  gridTemplateColumns:'auto'}}>
                        <h1 style={{fontSize:'4vh', fontStyle:"italic", color:'#161b1c'}}>{"No students have joined yet."}</h1>
                    </div>
                </>
            )
        }
        return (
            <>  
                <div className="center">
                    <div className="footerDebug">
                        <button type="button" className="btn btn-primary" onClick={handleAddStudentClick} >Add Student</button>
                        &nbsp;
                        <button type="button" className="btn btn-danger" onClick={handleResetStudentClick} >Reset Students</button>
                        &nbsp;
                        <button type="button" className="btn btn-success" onClick={fetchStudents} >Fetch Backend</button>
                    </div>
                </div>
                <div className="footer" style={{textAlign: 'center'}}>        
                    {renderDivs()}
                </div>
            </>
        )
    }




}

export default Footer;