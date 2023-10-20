import Profile from "./Profile";



function Footer() {

    // detect if mobile view
    let isMobile = window.screen.width <= 1000

    if (isMobile) {
        return (
            <>
            <div className="footerMobile" style={{textAlign: 'center'}}>
                <Profile profilePicture={"https://www.artst.org/wp-content/uploads/2021/12/Broadway-Boogie-Woogie-Piet-Mondrian.jpg"} username={"username"}></Profile>
                <Profile profilePicture={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/daily-painting-4-jane-davies.jpg"} username={"helloworld"}></Profile>
                <Profile profilePicture={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/flanneur-square-sylvie-demers.jpg"} username={"longusername"}></Profile>
                <Profile profilePicture={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/ancient-sound-paul-klee.jpg"} username={"user"}></Profile>
                <Profile profilePicture={"https://images.fineartamerica.com/images-medium-large-5/partridge-family-abstract-3-c-square-andee-design.jpg"} username={"anotheruser"}></Profile>
                <Profile profilePicture={"https://sothebys-com.brightspotcdn.com/dims4/default/a3a0279/2147483647/strip/false/crop/360x360+140+0/resize/900x900!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot-migration.s3.amazonaws.com%2Fea%2F35%2F58%2Fb43cc2f76a059370a937cf82cec8b43ca7c32c49c0fcd70a7e274648da%2Fpointilism-recircxos-3432943.jpg"} username={"user3"}></Profile>

            </div>
        
        </>
        )
    } else {
        return (
            <>
                <div className="footer" style={{textAlign: 'center'}}>
                    <Profile profilePicture={"https://www.artst.org/wp-content/uploads/2021/12/Broadway-Boogie-Woogie-Piet-Mondrian.jpg"} username={"username"}></Profile>
                    <Profile profilePicture={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/daily-painting-4-jane-davies.jpg"} username={"helloworld"}></Profile>
                    <Profile profilePicture={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/flanneur-square-sylvie-demers.jpg"} username={"longusername"}></Profile>
                    <Profile profilePicture={"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/ancient-sound-paul-klee.jpg"} username={"user"}></Profile>
                    <Profile profilePicture={"https://images.fineartamerica.com/images-medium-large-5/partridge-family-abstract-3-c-square-andee-design.jpg"} username={"anotheruser"}></Profile>
                    <Profile profilePicture={"https://sothebys-com.brightspotcdn.com/dims4/default/a3a0279/2147483647/strip/false/crop/360x360+140+0/resize/900x900!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot-migration.s3.amazonaws.com%2Fea%2F35%2F58%2Fb43cc2f76a059370a937cf82cec8b43ca7c32c49c0fcd70a7e274648da%2Fpointilism-recircxos-3432943.jpg"} username={"user3"}></Profile>
    
                </div>
            
            </>
        )
    }




}

export default Footer;