import {
  Carousel,
  ImageSlider,
  NextIcon,
  PrevIcon,
  Progress,
} from "react-glide-carousel";
import './App.css';

const IMAGES = [
  "https://picsum.photos/seed/glide1/1200/600",
  "https://picsum.photos/seed/glide2/1200/600",
  "https://picsum.photos/seed/glide3/1200/600",
  "https://picsum.photos/seed/glide4/1200/600",
];

function BasicCarousel() {
  return (
    <div>
      <h2 className="test-label">Default slider (autoPlay off)</h2>
      <Carousel items={IMAGES} autoPlay={false} className="w-[600px] h-[400px]">
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <Progress />
        </div>
        <div className="absolute inset-y-0 left-3 flex items-center z-20">
          <PrevIcon />
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center z-20">
          <NextIcon />
        </div>
      </Carousel>
    </div>
  );
}

const Upcoming = () => {
  return (
  <Carousel items={IMAGES} navigation autoPlay className="w-[600px] h-[400px]">
    <Carousel.Slider algin='center'/>
    <Carousel.Progress algin="bottom"/>
    <Carousel.Preview algin="right"/> 
  </Carousel>
  )
}

function AutoPlayCarousel() {
  return (
    <div>
      <h2 className="test-label">AutoPlay (5 s interval)</h2>
      <Carousel items={IMAGES} autoPlay interval={5000} className="w-[600px] h-[400px]">
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <Progress />
        </div>
        <div className="absolute inset-y-0 left-3 flex items-center z-20">
          <PrevIcon />
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center z-20">
          <NextIcon />
        </div>
      </Carousel>
    </div>
  );
}

function CustomSliderCarousel() {
  return (
    <div>
      <h2 className="test-label">defaultSlider=false — custom slide content</h2>
      
      <Carousel 
      className="w-[600px] h-[400px]"
        defaultSlider={false}
        items={IMAGES}
        autoPlay
        interval={5000}
      >
        <ImageSlider 
          className="w-full h-[calc(100%-45px)] border border-gray-600" 
        />
        <div 
          className="flex flex-row justify-center items-center 
          w-full pt-5 gap-5"
        >
          <PrevIcon className="w-6 h-6 p-1" />
          <div className="bg-zinc-800 rounded-full px-3 p-2 w-1/3">
            <Progress className="w-full" />
          </div>
          <NextIcon className="w-6 h-6 p-1" />
        </div>
      </Carousel>
    </div>
  );
}

 

function CustomSliderProgressBelow() {
  return (
    <div className="w-[600px] h-[350px]">
      <Carousel
        items={IMAGES}
        autoPlay
        interval={5000}
        className="w-full h-full"
      >
        <PrevIcon 
          className="w-8 h-8 p-1.5 absolute left-5 top-1/2 
          -translate-y-1/2 bg-white/30 rounded-full" 
        />
        <NextIcon className="w-8 h-8 p-1.5 absolute right-5 top-1/2 
          -translate-y-1/2 bg-white/30 rounded-full" />
        <div 
          className="absolute flex items-center justify-center 
          bottom-8 w-full"
        >
          <Progress className="w-1/3" />
        </div>
      </Carousel>
    </div>
  );
}

export default function App() {
  return (
    <main className="test-wrapper">
      <h1>react-glide-carousel — test app</h1>
      <BasicCarousel />
      <AutoPlayCarousel />
      <CustomSliderCarousel />
      <CustomSliderProgressBelow/>
    </main>
  );
}
