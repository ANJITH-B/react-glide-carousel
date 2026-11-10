'use client'
import { Carousel } from 'react-glide-carousel';
import 'react-glide-carousel/index.css';

export default function Home() {
  return (
    <Carousel items={['https://picsum.photos/seed/glide1/1200/600','https://picsum.photos/1200/600','https://picsum.photos/seed/glide1/1200/600']} autoPlay navigation className="w-[800px] h-[500px]">
      <Carousel.Bottom align="center">
        <Carousel.Caption titles={['Mountain peaks', 'Ocean depths', 'Forest trails']} variant="blur" />
        <Carousel.Progress />
      </Carousel.Bottom>
    </Carousel>
  );
}
