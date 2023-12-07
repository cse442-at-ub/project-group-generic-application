import 'bootstrap/dist/css/bootstrap.css'
import Footer from "../components/Footer";
import { useState } from 'react';
import '/src/App.css'
import axios from 'axios';
import NavBar from '../components/NavBar';
import ProfProfile from './ProfProfile';

function MainPage(this: any) {

    // detect if mobile view
    let isMobile = window.screen.width <= 1000


    // function for handling sending the attendance code to backend
    function sendAttendanceCode (inputCode: String) {


        if (token1 == "") {
            setToken("ABCD")
            console.log("No token found, setting backup token to ABCD")
        }

        console.log({
            inputCode, token1
        });
    
        const code = {
            code: inputCode,
            classcode: token1,
        };
        
        axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/Profmain.php', code, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
                console.log('Data submitted successful', response.data);
            })
            .catch(error => {
                console.error('Error submitting data', error);
            });
      };



    const [studentNumberTemp, setStudentNumberTemp] = useState(0);
    const [mainPageView, setMainPageView] = useState(0);
    let [attendanceCode, setAttendanceCodeUpdater] = useState("");
    const [token1, setToken] = useState<string>('');

    function handleAttendanceButtonClick() {
        if (mainPageView == 0) {
            setMainPageView(mainPageView + 1)
            let tempCode = makeid(5)
            setAttendanceCodeUpdater(tempCode)
            sendAttendanceCode(tempCode)
            
        } else {
            setMainPageView(mainPageView - 1)
            setStudentNumberTemp(0)
        }
    }

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

    let pluralStudent = "s"
    // detect plurality
    if (studentNumberTemp == 1) {
        pluralStudent = ""
    } else {
        pluralStudent = "s"
    }    

    if (isMobile) {
        if (mainPageView == 0) {
            return (
                <>
                <NavBar />
                <div className="mobileDiv" style={{textAlign: 'center', padding:'3vh'}}>
                    {/* Add NavBar here */}
                    <h1 style={{fontWeight:"bold", fontSize:'5vh'}}>Professor View</h1>

                    <ProfProfile token1={token1} setToken={setToken}/>
                    
                    <br></br>
                    <button type="button" onClick={handleAttendanceButtonClick} className="btn btn-success" >Open Attendance</button>
                </div>
                </>
            )
        } else {
            return (
                <>
                <NavBar />
                <div className="mobileDiv" style={{textAlign: 'center'}}>
                    <h1 style={{fontSize:'3vh'}}>Attendance Code:</h1>
                    <h1 style={{fontSize:'10vh', fontWeight:"bold", textShadow:"5px 10px 10px #0000001e"}}>{attendanceCode}</h1>
                    <h1 style={{fontSize:'2vh', fontStyle:"italic"}}>Please go to <b>bit.ly/cseattend</b> and enter the code</h1>
                    <h1 style={{fontWeight:"bold", fontSize:'3vh'}}>{studentNumberTemp} student{pluralStudent}</h1>
                    <button type="button" onClick={handleAttendanceButtonClick} className="btn btn-success" >Close Attendance</button>
                    
                </div>
                </>
            )
        }
        
    } else {
        //desktop view
        if (mainPageView == 0) {
            return (
                <>
                <NavBar />
                <div className="mainDiv" style={{textAlign: 'center'}}> 
               
                  <div className="pad" style={{padding:'5vh'}}></div>
                    <h1 style={{fontWeight:"bold", fontSize:'5vh'}}>Professor View</h1>

                    <ProfProfile token1={token1} setToken={setToken}/>
                    <br></br>
                    <button type="button" onClick={handleAttendanceButtonClick} className="btn btn-success" >Open Attendance</button>
                </div>
                </>
            )
        } else { 
            return (
            <>
            <NavBar />
                <div className="mainDiv" style={{textAlign: 'center'}}>
                  
                    <button type="button" onClick={handleAttendanceButtonClick} className="btn btn-success attendanceExit" >Close Attendance</button>
                    <h1 style={{fontSize:'3vh'}}>Attendance Code:</h1>
                    <h1 style={{fontSize:'20vh', fontWeight:"bold", textShadow:"5px 10px 10px #0000001e"}}>{attendanceCode}</h1>
                    <h1 style={{fontSize:'3vh', fontStyle:"italic"}}>Please go to <b>bit.ly/cseattend</b> and enter the code</h1>
                    <h1 style={{fontWeight:"bold", fontSize:'5vh'}}>{studentNumberTemp} student{pluralStudent}</h1>
                </div>
                <Footer studentNumber={studentNumberTemp} setStudentNumber={setStudentNumberTemp}></Footer>
            
            </>
            )
        }
    }
}

export default MainPage;