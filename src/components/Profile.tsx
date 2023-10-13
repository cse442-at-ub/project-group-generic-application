interface Props {
    profilePicture: string;
    username: string;
}


function Profile({profilePicture, username}: Props) {
    // detect if mobile view
    let isMobile = window.screen.width <= 1280

    if (isMobile) {
        return (
            <>
            <div className="profile">
                <div className="container">
                <img src={profilePicture}></img>

                </div>
            </div>
        </>
        )
    } else {
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
    }
}

export default Profile;