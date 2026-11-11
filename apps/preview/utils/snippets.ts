export const installCode = `npm install react-glide-carousel`;

export const defaultExample = `import { Carousel } from 'react-glide-carousel';
import 'react-glide-carousel/index.css';

const images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
const captions = ['Mountain peaks at dawn', 'Ocean depths at golden hour', 'Forest trails in mist'];

export default function App() {
  return (
    <Carousel items={images} autoPlay navigation className="w-full h-[400px] rounded-xl">
      <Carousel.Bottom align="left">
        <Carousel.Caption titles={captions} variant="blur" />
        <Carousel.Progress />
      </Carousel.Bottom>
    </Carousel>
  );
}`;

export const scaleExample = `<Carousel items={images} autoPlay animation="scale" className="w-full h-[400px] rounded-xl">
  <Carousel.Bottom align="center">
    <Carousel.Caption titles={captions} variant="slide-up" />
    <Carousel.Progress />
  </Carousel.Bottom>
</Carousel>`;

export const belowNavExample = `<Carousel defaultSlider={false} items={images} autoPlay className="w-full h-[400px]">
  <Carousel.ImageSlider className="w-full h-[calc(100%-44px)] rounded-xl" />
  <div className="flex justify-center pt-4">
    <Carousel.Progress />
  </div>
</Carousel>`;

export const hoverExample = `<Carousel items={images} hoverToSlide className="w-full h-[400px] rounded-xl">
  <Carousel.Bottom align="right">
    <Carousel.Caption titles={captions} variant="random" />
    <Carousel.Progress />
  </Carousel.Bottom>
</Carousel>`;
