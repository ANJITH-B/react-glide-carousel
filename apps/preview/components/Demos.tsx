'use client';
import { Carousel } from 'react-glide-carousel';
import 'react-glide-carousel/index.css';

const IMAGES = [
  'https://picsum.photos/seed/glide1/1200/700',
  'https://picsum.photos/seed/glide2/1200/700',
  'https://picsum.photos/seed/glide3/1200/700',
  'https://picsum.photos/seed/glide4/1200/700',
];

const CAPTIONS = [
  'Mountain peaks at dawn',
  'Ocean depths at golden hour',
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
