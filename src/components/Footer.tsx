import Profile from "./Profile";



function Footer() {
    



    return (
        <>
            <div className="footer">
                <Profile profilePicture={"https://www.artst.org/wp-content/uploads/2021/12/Broadway-Boogie-Woogie-Piet-Mondrian.jpg"} username={"jonah"}></Profile>
                <Profile profilePicture={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/daily-painting-4-jane-davies.jpg"} username={"helloworld"}></Profile>
                <Profile profilePicture={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/flanneur-square-sylvie-demers.jpg"} username={"longusernametest"}></Profile>
                <Profile profilePicture={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/ancient-sound-paul-klee.jpg"} username={"user"}></Profile>

            </div>
        
        </>
    )
}

export default Footer;