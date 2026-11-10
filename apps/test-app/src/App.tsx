import { Carousel } from "react-glide-carousel";
import './App.css';

const SLIDES = [
  { src: "https://picsum.photos/seed/glide1/1200/600", caption: "Mountain peaks wrapped in morning mist" },
  { src: "https://picsum.photos/seed/glide2/1200/600", caption: "Golden hour over the coastal cliffs" },
  { src: "null", caption: "Ancient forest paths in autumn light" },
  { src: "https://picsum.photos/seed/glide4/1200/600", caption: "" },
  { src: "https://picsum.photos/seed/glide5/1200/600", caption: "Desert dunes at the edge of twilight" },
  { src: "https://picsum.photos/seed/glide6/1200/600", caption: "Frozen lake reflecting a winter sky" },
];

const IMAGES = SLIDES.map(s => s.src);
const CAPTIONS = SLIDES.map(s => s.caption);

function CaptionCarousel() {
  return (
    <div className="p-5">
      <h2 className="test-label">Caption — blur variant</h2>
      <Carousel items={IMAGES} animation="scale" autoPlay navigation className="w-[600px] h-[400px]">
        <Carousel.Bottom align="left" gradient="bg-gradient-to-t from-black/40 to-transparent">
          <Carousel.Caption titles={CAPTIONS} variant="slide-up1" className="w-1/2" />
          <Carousel.Progress />
        </Carousel.Bottom>
      </Carousel>

    </div>
  );
}

function CaptionSlideUpCarousel() {
  return (
    <div>
      <h2 className="test-label">Caption — slide-up variant</h2>
      <Carousel items={IMAGES} navigation autoPlay interval={4000} className="w-[600px] h-[400px]">
        <Carousel.Caption
          titles={CAPTIONS}
          variant="random"
          align="center"
          className="text-white text-2xl w-2/3 font-extralight"
        />
      </Carousel>
    </div>
  );
}

function BasicCarousel() {
  return (
    <div>
      <h2 className="test-label">Default slider (autoPlay off)</h2>
      <Carousel animation="scale" items={IMAGES} hoverToSlide navigation className="w-[600px] h-[400px]">
        <Carousel.Progress align="bottom" />
      </Carousel>
    </div>
  );
}

function AutoPlayCarousel() {
  return (
    <div>
      <h2 className="test-label">AutoPlay (5 s interval)</h2>
      <Carousel items={IMAGES} autoPlay interval={5000} navigation className="w-[600px] h-[400px]">
        <Carousel.Progress align="bottom" />
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
        <Carousel.ScaleSlider className="w-full h-[calc(100%-45px)] border border-gray-600" />
        <div className="flex flex-row justify-center items-center w-full pt-5 gap-5">
          <div className="backdrop-blur-3xl bg-gray-100 rounded-full px-3 p-2">
            <Carousel.Progress trackColor="#d1d5db" fillColor="#111827" />
          </div>
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
        navigation
        className="w-full h-full"
      >
        <Carousel.Progress align="left" className="bottom-5 w-1/3 gap-1" />
      </Carousel>
    </div>
  );
}

export default function App() {
  return (
    <main className=" max-w-fit mx-auto flex flex-col gap-10">
      <h1>react-glide-carousel — test app</h1>
      <CaptionCarousel />
      {/* <CaptionSlideUpCarousel /> */}
      {/* <CustomSliderCarousel /> */}
      {/* <BasicCarousel /> */}
      {/* <AutoPlayCarousel /> */}
      {/* <CustomSliderProgressBelow /> */}
    </main>
  );
}
