import '../App.css'


function HomePage() {
    return (
        <div className="mainDiv">
            <h1 style={{fontSize:50,fontWeight:"bold", margin:10 }}>Links For Testing Purposes</h1>
            <a style={{fontSize:20}} href={"/main"}>Click here to go to the Main Page</a>
            <br></br>
            <a style={{fontSize:20}} href={"/login"}>Click here to go to the Login Page</a>


    </div>
    )

}

export default HomePage