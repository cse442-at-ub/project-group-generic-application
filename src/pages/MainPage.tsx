import Footer from "../components/Footer";
import React from "react";
import { useState } from 'react';
import '../App.css'

interface Props {
    attendanceCode: string;
    studentNumber: number;
}


function MainPage({attendanceCode, studentNumber}: Props) {

    //debug
    attendanceCode
    studentNumber

    // temp code to make the attendance code randomized
    function makeid(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    let tempCode = makeid(5)

    // temp code for student number

    const [studentNumberTemp, setStudentNumberTemp] = useState(0);

    function handleClick() {
        if (studentNumberTemp < 100) {
            setStudentNumberTemp(studentNumberTemp + 1)
        }
    }



    return (
        <>
            <div className="mainDiv">
                <button type="button" onClick={handleClick} className="btn btn-primary attendanceExit" >Close Attendance (debug)</button>
                <h1 style={{fontSize:'3vh'}}>Attendance Code:</h1>
                <h1 style={{fontSize:'20vh', fontWeight:"bold", textShadow:"5px 10px 10px #0000001e"}}>{tempCode}</h1>
                <h1 style={{fontSize:'3vh', fontStyle:"italic"}}>{"Please go to <sitename.com> and enter the code"}</h1>
                <h1 style={{fontWeight:"bold", fontSize:'5vh'}}>{studentNumberTemp}/100 students</h1>


            </div>
            <Footer></Footer>
        
        </>
    )
}

export default MainPage;