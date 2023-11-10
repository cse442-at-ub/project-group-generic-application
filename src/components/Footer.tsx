import Profile from "./Profile";
import axios from 'axios';

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

    // function for repeatedly updating the student list


    function renderDivs(){
        let count = studentNumber
        let uiItems = []

        

        while(count--)
           uiItems.unshift(
                <Profile profilePicture={images[count % 7]} username={"username" + String(count)} background_choice={count % 10}></Profile>
            )
        return uiItems;
    }










    if (isMobile) {
        return (
            <>
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