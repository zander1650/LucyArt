# Art Portfolio Website

A React-based art portfolio website built with Vite, designed to showcase artwork and attract commissions.

## Features

- Homepage with a responsive gallery of artwork
- Navigation between Home, About, and Contact pages
- Easy to add new artwork by editing the `artworks` array in `src/pages/Home.jsx`

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5174](http://localhost:5174) in your browser.

## Adding Your Artwork

1. Place your image files in the `public/art/` folder.
2. Edit `src/pages/Home.jsx` and add entries to the `artworks` array:
   ```javascript
   { id: 4, src: '/art/your-image.jpg', title: 'Your Artwork Title', description: 'Medium, Year' }
   ```

## Customizing Pages

- **Home**: Edit `src/pages/Home.jsx` and `src/pages/Home.css`
- **About**: Edit `src/pages/About.jsx`
- **Contact**: Edit `src/pages/Contact.jsx`
- **Navigation**: Edit `src/App.jsx` and `src/App.css`

## Building for Production

```bash
npm run build
```

## Deploying

After building, deploy the `dist` folder to your hosting service (e.g., Netlify, Vercel, GitHub Pages).
