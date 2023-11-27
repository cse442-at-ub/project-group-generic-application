import '/src/App.css'
import NavBar from '../components/NavBar';


function HomePage() {
    return (
        <>
        <NavBar /><div className="mainDiv" style={{ padding: '6vh', margin: "auto" }}>

            <h1 className="gradient-text" style={{ fontSize: 57, fontWeight: "bold", margin: 10, textAlign: 'center'}}>Generic Attendance</h1>
            <div style={{ fontSize: 22}}>
            Looking for a <b>better</b>, more <b>engaging</b> way to keep track of your classes attendance?
            
            </div>
            <div style={{ padding: "5vh", fontSize: 22, background: "linear-gradient(0.35turn,#ffffff63, #bfddff65)"}}>
            <button className="button-5" role="button">Click here to get started!</button>
            
            </div>
            <br></br>

        </div></>
    )

}

export default HomePage