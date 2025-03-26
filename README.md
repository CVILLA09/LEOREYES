# Leo Reyes Website

A 3D website built with Three.js that displays a metallic "LEO REYES" logo in a space-themed environment.

## Features

- Interactive 3D scene with a star-filled background
- Metallic 3D text logo
- Responsive design
- Navigation and social media links

## Technologies

- Three.js - 3D library
- Vite - Build tool and development server
- Vanilla JavaScript, HTML, and CSS

## Project Structure

```
/
├── public/                  # Static assets
├── src/
│   ├── assets/              # 3D models, textures, and fonts
│   │   ├── models/
│   │   ├── textures/
│   │   └── fonts/
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   └── js/
│       ├── main.js          # Application entry point
│       ├── SceneManager.js  # Three.js scene setup
│       ├── BackgroundManager.js  # Star background
│       └── LogoManager.js   # 3D logo handling
├── index.html               # Main HTML file
├── package.json             # Project dependencies
└── README.md                # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/leo-reyes-website.git
cd leo-reyes-website
```

2. Install dependencies
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

This will start a local server at `http://localhost:5173`.

### Building for Production

Build the project for production:
```bash
npm run build
```

This will generate a production-ready build in the `dist` directory.

Preview the production build:
```bash
npm run preview
```

## Customization

### Modifying the Logo

To change the logo, edit `src/js/LogoManager.js`. You can modify the text, size, material, or replace it with a custom 3D model.

### Background

The space background can be customized in `src/js/BackgroundManager.js`. You can adjust parameters like particle count, size, and color.

### UI Elements

UI elements are defined in `index.html` and styled in `src/css/style.css`.

## License

MIT 