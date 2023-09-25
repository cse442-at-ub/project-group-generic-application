interface Props {
    profilePicture: string;
    username: string;
}


function Profile({profilePicture, username}: Props) {

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

export default Profile;