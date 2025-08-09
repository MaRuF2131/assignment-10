
import { Fade, Slide, Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Herosection from '../herosection/herosection';

const spanStyle = {
  position:'absolute',
  padding: '20px',
  background: '#efefef',
  color: '#000000',
  bottom:'0px'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize:'100% 100%',
  height: '420px',
}
const slideImages = [
  {
    url: 'https://i.ibb.co/5xfTc4fc/image-2025-05-23-225407956.png',
    caption: 'Slide 1'
  },
  {
    url: 'https://i.ibb.co/rRZ7VLwM/image-2025-05-23-225815032.png',
    caption: 'Slide 2'
  },
  {
    url: 'https://i.ibb.co/gbSfZTYr/image-2025-05-23-225927468.png',
    caption: 'Slide 3'
  },
];

const Slideshow = () => {
    return (
      <div className="slide-container w-full max-w-screen-xl relative h-fit">
        <h1 className='absolute  top-0 bottom-0 h-full  left-0 right-0 z-50'><Herosection></Herosection></h1>
        <Slide pauseOnHover={true} duration={2100} transitionDuration={700} autoplay={true} infinite>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div className='object-cover' style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
               {/*  <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
} 

export default Slideshow;