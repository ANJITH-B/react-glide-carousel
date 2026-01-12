# React Glide Carousel 

<div align="center">
<a href="https://www.react-glide-carousel.anjith.in">🔗 Preview</a>
   <h3>
  <a href="https://www.react-glide-carousel.anjith.in">
     🔴 Live Demo 
  </a>
  </h3>
  <br />
  <a href="https://github.com/ANJITH-B/react-glide-carousel">
    <img src="https://img.shields.io/npm/v/react-glide-carousel?style=flat-square&color=blue" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/react-%3E%3D16.8.0-blue?style=flat-square&logo=react" alt="react version" />
  <img src="https://img.shields.io/badge/typescript-%5E5.0.0-blue?style=flat-square&logo=typescript" alt="typescript" />
  <br />
  <br />

  <h3 align="center">A lightweight, smooth easing parallax carousel for React.</h3>

  <p align="center">
    Built for modern web applications with performance and aesthetics in mind.
  </p>
</div>

---

## ✨ Features

- **🚀 Smooth Parallax Effects**: High-performance, jank-free sliding animations.
- **📱 Fully Responsive**: Adapts perfectly to any screen size.
- **🎨 Customizable**: Use the built-in controls or build your own with our flexible hook.
- **⚡ Lightweight**: Minimal footprint, optimizing your bundle size.
- **🧩 TypeScript Support**: Full type definitions included.
- **🖼️ Image Preloading**: Smart preloading for seamless user experience.

## 📦 Installation

```bash
npm install react-glide-carousel
# or
yarn add react-glide-carousel
# or
pnpm add react-glide-carousel
```

## 🛠 Usage

### Basic Usage

The simplest way to use the carousel is to pass an array of image URLs and use the built-in control components.

```tsx
import { Carousel, NextIcon, PrevIcon, Progress } from 'react-glide-carousel';

const images = [
  "https://images.unsplash.com/photo-1...",
  "https://images.unsplash.com/photo-2...",
  "https://images.unsplash.com/photo-3...",
];

const App = () => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Carousel items={images} autoPlay={true} interval={4000}>
        <PrevIcon />
        <NextIcon />
        <Progress />
      </Carousel>
    </div>
  );
};
```

### Advanced Customization

Want full control? Use the `useCarousel` hook (exposed via context) to build your own custom controls. Note: Your custom controls must be children of the `Carousel` component.

```tsx
import { Carousel, useCarousel } from 'react-glide-carousel';

const CustomControls = () => {
  const { goTo, currentIndex, totalItems, direction } = useCarousel();

  return (
    <div className="custom-controls">
      <button onClick={() => goTo('prev')}>Previous</button>
      <span>{currentIndex + 1} / {totalItems}</span>
      <button onClick={() => goTo('next')}>Next</button>
    </div>
  );
};

const App = () => {
    // ...
    return (
        <Carousel items={images}>
            <CustomControls />
        </Carousel>
    )
}
```

## ⚙️ Props

### `Carousel`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | **Required** | Array of image URLs to display. |
| `children` | `ReactNode` | `undefined` | Components to render as overlays (controls, indicators, etc.). |
| `autoPlay` | `boolean` | `false` | Enables automatic sliding. |
| `interval` | `number` | `3000` | Time in ms between slides when `autoPlay` is enabled. |
| `className` | `string` | `undefined` | Additional CSS class for the root container. |
| `defaultSlider` | `boolean` | `false` | Enables the default slider. |


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/ANJITH-B">Anjith B</a>
</div>
