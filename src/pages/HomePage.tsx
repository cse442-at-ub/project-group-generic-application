import '/src/App.css'
import NavBar from '../components/NavBar';


function HomePage() {
    return (
        <><NavBar /><div className="mainDiv" style={{ textAlign: 'center', padding: '4vh' }}>

            <h1 style={{ fontSize: 50, fontWeight: "bold", margin: 10 }}>Links For Testing Purposes</h1>
            <a style={{ fontSize: 20 }} href={"./#/main"}>Click here to go to the Main Page</a>
            <br></br>
            <a style={{ fontSize: 20 }} href={"./#/login"}>Click here to go to the Login Page</a>
            <br></br>
            <a style={{ fontSize: 20 }} href={"./#/function"}>Click here to go to the Function Page</a>
            <br></br>
            <a style={{ fontSize: 20 }} href={"./#/signup"}>Click here to go to the Signup Page</a>
            <br></br>
            <a style={{ fontSize: 20 }} href={"./#/profile"}>Click here to go to the Profile Page</a>
            <br></br>
            <a style={{ fontSize: 20 }} href={"./#/profprofile"}>Click here to go to the Professor Profile Page</a>

        </div></>
    )

}

export default HomePage