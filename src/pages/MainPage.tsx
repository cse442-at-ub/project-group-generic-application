import 'bootstrap/dist/css/bootstrap.css'
import Footer from "../components/Footer";
import { useState } from 'react';
import '/src/App.css'
import Form from 'react-bootstrap/Form';


interface Props {
    attendanceCode: string;
    studentNumber: number;
}


function MainPage(this: any, {attendanceCode, studentNumber}: Props) {

    // detect if mobile view
    let isMobile = window.screen.width <= 1000


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
        console.log(result)
        return result;
    }

    // function for retrieving the student list array from backend
    // - this should just run a php file and do things based on the return value
    // - should update an array var
    // - should be run every x seconds


    // function for sending attendance code + other prof info to the backend

    const [studentNumberTemp, setStudentNumberTemp] = useState(0);
    const [mainPageView, setMainPageView] = useState(0);
    const [attendanceCodeUpdater, setAttendanceCodeUpdater] = useState("");

    function handleStudentDebugClick() {
        if (studentNumberTemp < 100) {
            setStudentNumberTemp(studentNumberTemp + 1)
        }
    }

    
    function handleResetDebugClick() {
        setStudentNumberTemp(0)

    }

    function handleAttendanceButtonClick() {
        if (mainPageView == 0) {
            setMainPageView(mainPageView + 1)
            setAttendanceCodeUpdater(makeid(5))
            
        } else {
            setMainPageView(mainPageView - 1)
            setStudentNumberTemp(0)
        }
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
                <div className="mobileDiv" style={{textAlign: 'center', padding:'3vh'}}>
    
                    
                    <h1 style={{fontWeight:"bold", fontSize:'4vh'}}>Class Name Here</h1>
                    <Form>
                        <Form.Group className="centerForm mb-3">
                        <Form.Control className='w-50' type="text" placeholder="Enter Class Name" />
                            <Form.Text className="text-muted">
                            Update Your Class Name.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    
                    {/* <h1 style={{fontSize:'3vh'}}>View Attendance Data</h1>
                    <div className="mb-3">
                        
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>10/8/23</option>
                            <option>10/9/23</option>
                            <option>10/10/23</option>
                            <option>10/12/23</option>
                            <option>10/14/23</option>
                            <option>10/17/23</option>
                        </select>
                        <Form.Text className="text-muted">
                            Download attendance data from a given date.
                            </Form.Text>
                        <button type="button" className="btn btn-primary" >Download Data</button>
                    </div> */}
                    
                    <h1 style={{fontSize:'3vh'}}>Attendance Controls</h1>
                    <button type="button" onClick={handleAttendanceButtonClick} className="btn btn-success" >Open Attendance</button>
                </div>
                </>
            )
        } else {
            return (
                <>
                <div className="mobileDiv" style={{textAlign: 'center'}}>
    
                    <h1 style={{fontSize:'3vh'}}>Attendance Code:</h1>
                    <h1 style={{fontSize:'10vh', fontWeight:"bold", textShadow:"5px 10px 10px #0000001e"}}>{attendanceCodeUpdater}</h1>
                    <h1 style={{fontSize:'2vh', fontStyle:"italic"}}>{"Please go to <sitename.com> and enter the code"}</h1>
                    <h1 style={{fontWeight:"bold", fontSize:'3vh'}}>{studentNumberTemp} student{pluralStudent}</h1>
                    <button type="button" onClick={handleAttendanceButtonClick} className="btn btn-success" >Close Attendance</button>
                    
                </div>
                {/* <Footer></Footer> */}
                </>
            )
        }
        
    } else {
        //desktop view
        if (mainPageView == 0) {
            return (
                <>
                
                <div className="mainDiv" style={{textAlign: 'center', padding:'10vh'}}>   
                    <h1 style={{fontWeight:"bold", fontSize:'4vh'}}>Class Name Here</h1>
                    <Form >
                        <Form.Group className="centerForm">
                        <Form.Control className='w-50' type="text" placeholder="Enter Class Name" />
                        <Form.Text className="text-muted">
                            Update Your Class Name.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    
                    <h1 style={{fontSize:'3vh'}}>Attendance Controls</h1>
                    <button type="button" onClick={handleAttendanceButtonClick} className="btn btn-success" >Open Attendance</button>
                </div>
                </>
            )
        } else { 
            return (
            <>
                <div className="mainDiv" style={{textAlign: 'center'}}>
                    <button type="button" onClick={handleAttendanceButtonClick} className="btn btn-success attendanceExit" >Close Attendance</button>
                    <h1 style={{fontSize:'3vh'}}>Attendance Code:</h1>
                    <h1 style={{fontSize:'20vh', fontWeight:"bold", textShadow:"5px 10px 10px #0000001e"}}>{attendanceCodeUpdater}</h1>
                    <h1 style={{fontSize:'3vh', fontStyle:"italic"}}>{"Please go to <sitename.com> and enter the code"}</h1>
                    <h1 style={{fontWeight:"bold", fontSize:'5vh'}}>{studentNumberTemp} student{pluralStudent}</h1>

                    {/* <h1 style={{fontSize:'3vh'}}>{"Debug Buttons"}</h1> */}
                    <button type="button" onClick={handleStudentDebugClick} className="btn btn-primary" >Add Student</button>
                    <button type="button" onClick={handleResetDebugClick} className="btn btn-danger" >Reset Students</button>

                </div>
                <Footer studentNumber={studentNumberTemp}></Footer>
            
            </>
            )
        }
    }
}

export default MainPage;