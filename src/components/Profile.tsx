import { Verified, BugReport, Whatshot, Mood, EmojiEvents, Person } from '@mui/icons-material';


interface Props {
    profilePicture: string;
    username: string;
    background_choice: number;
    arrayIndex: number;
}


function Profile({profilePicture, username, background_choice, arrayIndex}: Props) {

    let profileBackgroundGradientList = ["linear-gradient(0.35turn,#ffffff, #c1d0f8)", "linear-gradient(0.35turn,#ffffff, #c1f8e2)", "linear-gradient(0.35turn,#ffffff, #f8f2c1)", "linear-gradient(0.35turn,#ffffff, #c1c3f8)", "linear-gradient(0.35turn,#ffffff, #f8c1f3)", "linear-gradient(0.35turn,#ffffff, #f8c1c1)", "linear-gradient(0.35turn,#ffffff, #e6c1f8)"]

    // icon list (mui icons)
    let profileEmoji

    if (arrayIndex == 0) {
        profileEmoji = <EmojiEvents />;
    } else if (arrayIndex == 1 || arrayIndex == 2) {
        profileEmoji = <Verified />;
    } else if (arrayIndex == 3) {
        profileEmoji = <BugReport />;
    } else if (arrayIndex == 4) {
        profileEmoji = <Whatshot />;
    } else {
        profileEmoji = <Mood />;  
    }



    return (
        <>
            <figure className="profile"       
                style={{
                    background: profileBackgroundGradientList[background_choice],
                }}>

                <div className="container">
                    <img src={profilePicture}></img>
                </div>
                <figcaption className='usernameContainer'>
                    <p><Person /> {username}</p>   
                </figcaption>
            </figure>
        
        </>
    )
}

export default Profile;