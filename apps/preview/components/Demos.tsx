'use client';
import { Carousel } from 'react-glide-carousel';
import 'react-glide-carousel/index.css';

// const IMAGES = [
//   'https://picsum.photos/seed/glide/1200/700',
//   'https://picsum.photos/seed/glide2/1200/700',
//   'https://picsum.photos/seed/glide3/1200/700',
//   'https://picsum.photos/seed/glide4/1200/700',
// ];

const IMAGES = [
     "https://i.pinimg.com/1200x/8a/62/a9/8a62a9370a9741436b2cba927957e18e.jpg",
     "https://i.pinimg.com/1200x/b1/27/b6/b127b6d25e166249e444ae7395e3de45.jpg",
     "https://i.pinimg.com/1200x/0d/01/8c/0d018c4c39777b61710d8b74c46aa4fb.jpg",
     "https://i.pinimg.com/1200x/3c/e1/8f/3ce18fc6d67c415833eb9f6f724b3185.jpg",
     "https://i.pinimg.com/1200x/b1/18/8d/b1188d701c94fc88eef663384594e9ce.jpg",
];

const CAPTIONS = [
  'Mountain peaks at dawn',
  'Ocean depths at golden hour',
  'Forest trails in morning mist',
  'Forest trails in morning mist',
  'Desert dunes under open sky',
];

export function DefaultDemo() {
  return (
    <Carousel items={IMAGES} autoPlay navigation className="w-[600px] h-[380px] rounded-xl overflow-hidden">
      <Carousel.Bottom align="left">
        <Carousel.Caption titles={CAPTIONS} variant="blur" />
        <Carousel.Progress />
      </Carousel.Bottom>
    </Carousel>
  );
}

export function ScaleDemo() {
  return (
    <Carousel items={IMAGES} autoPlay animation="scale" className="w-[600px] h-[380px] rounded-xl overflow-hidden">
      <Carousel.Bottom align="center">
        <Carousel.Caption titles={CAPTIONS} variant="slide-up" />
        <Carousel.Progress />
      </Carousel.Bottom>
    </Carousel>
  );
}

export function BelowNavDemo() {
  return (
    <Carousel defaultSlider={false} items={IMAGES} autoPlay interval={5000} className="w-[600px] h-[380px]">
      <Carousel.ImageSlider className="w-full h-[calc(100%-44px)] rounded-xl overflow-hidden" />
      <div className="flex justify-center items-center w-full pt-4">
        <Carousel.Progress />
      </div>
    </Carousel>
  );
}

export function HoverDemo() {
  return (
    <Carousel items={IMAGES} hoverToSlide className="w-[600px] h-[380px] rounded-xl overflow-hidden">
      <Carousel.Bottom align="right">
        <Carousel.Caption titles={CAPTIONS} variant="random" />
        <Carousel.Progress />
      </Carousel.Bottom>
    </Carousel>
  );
}
