### Overview 
A lightweight React carousel built on the **Web Animation API** ·
<a href="https://glide.anjithb.space"> Live demo</a> ·
  <a href="https://github.com/ANJITH-B/react-glide-carousel">GitHub</a>
  <br />

- Slide transitions: parallax `slide` and scale+blur `scale`
- `useCarousel` hook for custom controls 
- Animated captions — word-by-word with `blur`, `slide-up`, and `random` variants
- Components — `Carousel.Progress`, `Carousel.Caption`, `Carousel.Bottom`, and more
- `hoverToSlide` — plays on hover, pauses on leave
- Responsive text sizing via container query units
- TypeScript support


### Quick start
---

```tsx
import { Carousel } from 'react-glide-carousel';
import 'react-glide-carousel/index.css';

export default function Example() {
  return (
    <Carousel items={['img.jpg','img2.jpg','img3.jpg']} autoPlay navigation className="w-full h-[500px]">
      <Carousel.Bottom align="center">
        <Carousel.Caption titles={['Mountain peaks', 'Ocean depths', 'Forest trails']} variant="blur" />
        <Carousel.Progress />
      </Carousel.Bottom>
    </Carousel>
  );
}
```

<br/>

#### Root component `Carousel`


| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | required | Image URLs |
| `alts` | `string[]` | — | Alt text for each image. Falls back to `"Slide 1"`, `"Slide 2"`, … |
| `autoPlay` | `boolean` | `false` | Auto-advance slides |
| `interval` | `number` | `3000` | Ms between slides |
| `animation` | `"slide" \| "scale"` | `"slide"` | Slide transition style |
| `navigation` | `boolean` | `false` | Show prev/next buttons |
| `hoverToSlide` | `boolean` | `false` | Play only while hovered — overrides `autoPlay` |
| `defaultSlider` | `boolean` | `true` | Render the built-in slider. Set `false` to use `Carousel.ImageSlider` or `Carousel.ScaleSlider` manually |
| `className` | `string` | — | Classes for the root wrapper (width, height, border-radius) |
| `style` | `CSSProperties` | — | Inline styles for the root wrapper |


---
<br/>

#### Progress Indicator `Carousel.Progress`


| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"bottom" \| "left" \| "right"` | — | Absolutely positions inside the carousel |
| `trackColor` | `string` | `"#9ca3af"` | Background track color (any CSS color) |
| `fillColor` | `string` | `"#ffffff"` | Fill/active color |
| `className` | `string` | — | Additional classes |


<br/>

#### Caption `Carousel.Caption`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `titles` | `string[]` | required | One title string per slide |
| `variant` | `"blur" \| "slide-up" \| "random"` | `"blur"` | Animation style |
| `align` | `"left" \| "center" \| "right"` | — | Absolutely positions inside the carousel |
| `maxWords` | `number` | `18` | Truncate long titles |
| `shadow` | `string` | text-shadow utility class | CSS class applied to each word span |
| `className` | `string` | — | Additional classes |

<br/>

#### Customization 

Can Access the carousel state directly for building custom components using `useCarousel` hook 
<br/>

| Value | Type | Description |
|-------|------|-------------|
| `currentIndex` | `number` | Active slide index |
| `totalItems` | `number` | Total slide count |
| `direction` | `number` | `1` = forward, `-1` = backward |
| `items` | `string[]` | The image URLs array |
| `interval` | `number` | Current interval setting |
| `isPlaying` | `boolean` | Whether auto-advance is active |
| `goTo` | `(dir: "next" \| "prev") => void` | Navigate programmatically |

<br/>


#### `Carousel.Bottom`

Layout  that positions children at the bottom of the carousel over a gradient overlay.

| Prop | Type | Default | Description |
|---------|---------|---------|---------|
| `align` | `"left" \| "center" \| "right"` | `"left"` | Horizontal alignment of children |
| `gradient` | `string \| null` | `"bg-gradient-to-t from-black/40 to-transparent"` | Tailwind gradient class. Pass `null` to remove |
| `className` | `string` | — | Additional classes |

```tsx
<Carousel.Bottom align="center">
  <Carousel.Caption titles={titles} variant="slide-up" />
  <Carousel.Progress />
</Carousel.Bottom>
```

<br/>

#### `Carousel.ImageSlider` / `Carousel.ScaleSlider`


The slider renderers. Only needed when `defaultSlider={false}`.

```tsx
<Carousel defaultSlider={false} items={images} animation="scale">
  <Carousel.ScaleSlider className="w-full h-[calc(100%-48px)]" />
  <div className="flex justify-center pt-3">
    <Carousel.Progress />
  </div>
</Carousel>
```

<br/>
<br/>

<div align="center">
  <img src="https://img.shields.io/npm/v/react-glide-carousel?style=flat-square&color=blue" alt="npm version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/react-%3E%3D18-blue?style=flat-square&logo=react" alt="react" />
  <img src="https://img.shields.io/badge/typescript-%5E5.0-blue?style=flat-square&logo=typescript" alt="typescript" />
</div>
