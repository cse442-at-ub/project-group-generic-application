interface Props {
    profilePicture: string;
    username: string;
    background_choice: number;
}


function Profile({profilePicture, username, background_choice}: Props) {
    // detect if mobile view
    let isMobile = window.screen.width <= 1000

    let profileBackgroundGradientList = ["linear-gradient(0.35turn,#ffffff, #c1d0f8)", "linear-gradient(0.35turn,#ffffff, #c1f8e2)", "linear-gradient(0.35turn,#ffffff, #f8f2c1)", "linear-gradient(0.35turn,#ffffff, #c1c3f8)", "linear-gradient(0.35turn,#ffffff, #f8c1f3)", "linear-gradient(0.35turn,#ffffff, #f8c1c1)", "linear-gradient(0.35turn,#ffffff, #e6c1f8)"]

    if (isMobile) {
        return (
            <>
            <div className="profile">
                <div className="container">
                <img src={profilePicture}></img>

                </div>
                <p>@{username}</p>

            </div>
        </>
        )
    } else {
        return (
            <>
                <div className="profile"       
                    style={{
                        background: profileBackgroundGradientList[background_choice],
                    }}>

                <div className="container">
                    <img style={{ border: '5px solid #ffffff'}} src={profilePicture}></img>
                </div>
                    
                    <p>@{username}</p>
                </div>
            
            </>
        )
    }
}

export default Profile;