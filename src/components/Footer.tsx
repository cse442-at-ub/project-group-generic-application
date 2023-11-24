// import { useState } from "react";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import axios from 'axios';

interface Props {
    studentNumber: number;
    setStudentNumber: Function;
}

function Footer({studentNumber, setStudentNumber}: Props) {

    // detect if mobile view
    let isMobile = window.screen.width <= 1000

    let images = ['https://www.nps.gov/common/uploads/cropped_image/secondary/FAB0F317-9673-A7A2-8078F4B600A52F6F.jpg?width=640&quality=90&mode=crop', "https://samuelearp.com/wp-content/uploads/2023/06/Rugged-Mountains-Samuel-Earp-landscape-painting-1024x1024.jpg", "https://www.cityofredlands.org/sites/main/files/imagecache/lightbox/main-images/e0198d157dbc85383b6dfbd9e33b6c2d--low-maintenance-yard-landscape-front-yards.jpg", "https://www.boredpanda.com/blog/wp-content/uuuploads/landscape-photography/landscape-photography-3.jpg", "https://landezine.com/wp-content/uploads/2022/10/landscape_architecture_f26820ee-6f03-4b98-b86d-b9ed0bf63d51-630x630.jpg", 'https://monticello-www.s3.amazonaws.com/files/pages/square-xsml-vegetable-garden-terrace-1-1270-10142010-048.jpg', "https://img.freepik.com/premium-photo/landscape-nature-wallpaper_882954-925.jpg", "https://www.serengeti.com/assets/img/serengeti-landscape-vegetation-riverine-forest-small.jpg", "https://www.nps.gov/common/uploads/grid_builder/culturallandscapes/crop1_1/48C23B78-1DD8-B71B-0B497F159E15A370.jpg?width=640&quality=90&mode=crop"]

    // sound function
    let soundArray = ["joinSoundBounce.wav","joinSoundBubble.wav","joinSoundChime.wav","joinSoundCoin.wav", "joinSoundDing.wav", "joinSoundPop.wav", "joinSoundRetro.wav", "joinSoundWhir.wav"]

    function playSound(sound: number) {
        const audio = new Audio("./soundEffects/" + soundArray[sound]);
        audio.play();
    }
    const [studentArray, setStudentArray] = useState<string[]>([]);


    // running this function repeatedly should ideally be a toggle
    function fetchStudents () {
        playSound(Math.floor(Math.random() * soundArray.length))
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


    function handleAddStudentClick(this: any) {
        playSound(Math.floor(Math.random() * soundArray.length))
        let length = studentArray.length
        setStudentArray([...studentArray, "name" + (length + 1)])
        setStudentNumber(studentArray.length)
    }

    useEffect(() => {
        console.log(studentArray)
        console.log("length: " + studentArray.length)
        setStudentNumber(studentArray.length)
      }, [studentArray]); // Specify "value" as the dependency
    

    function handleResetStudentClick() {
        setStudentArray([])
        setStudentNumber(0)
    }

    function renderDivs(){
        let count = studentNumber
        let uiItems = []

        // move playsound to here?
        // possibly change student array to array of arrays
        // or keep separate array for each customization option (pictures, colors, sound)

        while(count--)
           uiItems.unshift(
                <Profile profilePicture={images[count % 7]} username={studentArray[count]} background_choice={count % 5}></Profile>
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