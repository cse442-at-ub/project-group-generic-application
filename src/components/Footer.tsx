import Profile from "./Profile";

interface Props {
    studentNumber: number;
}

function Footer({studentNumber}: Props) {

    // detect if mobile view
    let isMobile = window.screen.width <= 1000

    // detect if there are no students in attendance
    if (studentNumber <= 0) {
        return (
            <div className="footer" style={{textAlign: 'center', alignItems: 'center', justifyContent:'center',  gridTemplateColumns:'auto'}}>
                    <h1 style={{fontSize:'4vh', fontStyle:"italic", color:'#161b1c'}}>{"No students have joined yet."}</h1>
            </div>
        )
    }

    let images = ['https://www.nps.gov/common/uploads/cropped_image/secondary/FAB0F317-9673-A7A2-8078F4B600A52F6F.jpg?width=640&quality=90&mode=crop', "https://samuelearp.com/wp-content/uploads/2023/06/Rugged-Mountains-Samuel-Earp-landscape-painting-1024x1024.jpg", "https://www.cityofredlands.org/sites/main/files/imagecache/lightbox/main-images/e0198d157dbc85383b6dfbd9e33b6c2d--low-maintenance-yard-landscape-front-yards.jpg", "https://www.boredpanda.com/blog/wp-content/uuuploads/landscape-photography/landscape-photography-3.jpg", "https://landezine.com/wp-content/uploads/2022/10/landscape_architecture_f26820ee-6f03-4b98-b86d-b9ed0bf63d51-630x630.jpg", 'https://monticello-www.s3.amazonaws.com/files/pages/square-xsml-vegetable-garden-terrace-1-1270-10142010-048.jpg', "https://img.freepik.com/premium-photo/landscape-nature-wallpaper_882954-925.jpg", "https://www.serengeti.com/assets/img/serengeti-landscape-vegetation-riverine-forest-small.jpg", "https://www.nps.gov/common/uploads/grid_builder/culturallandscapes/crop1_1/48C23B78-1DD8-B71B-0B497F159E15A370.jpg?width=640&quality=90&mode=crop"]



    // potential things to pass in for profile customization
    // - border color
    // - profile picture (stored in backend)
    // - username
    // - icon

    function renderDivs(){
        let count = studentNumber
        let uiItems = []

        while(count--)
           uiItems.unshift(
                <Profile profilePicture={images[count%7]} username={"username" + String(count)}></Profile>
            )
        return uiItems;
    }










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
                    {renderDivs()}
                </div>
            
            </>
        )
    }




}

export default Footer;