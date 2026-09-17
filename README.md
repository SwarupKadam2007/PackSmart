# PackSmart - Food Packaging Engine 🌾📦

> **Interactive Awwwards-Style Scroll Animation Website & AI-Driven Barrier Physics Platform for Food Commodities**

PackSmart is a state-of-the-art web application designed for farmers, food suppliers, and packaging engineers. It combines a 60 FPS HTML5 canvas frame scroll experience with physics-driven shelf-life calculations and multi-language support (English, Marathi, Hindi, Punjabi, Gujarati).

![GitHub Repository](https://img.shields.io/badge/GitHub-PackSmart-blue?logo=github)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?logo=tailwindcss)

---

## ✨ Features

- **🌐 Multi-Language Vernacular Support**:
  - English (`en`)
  - मराठी (`mr`) *(Default for local farmers)*
  - हिंदी (`hi`)
  - ਪੰਜਾਬੀ (`pa`)
  - ગુજરાતી (`gu`)
- **🎞️ HTML5 Canvas Parallax Scroll Engine**:
  - Smooth 60 FPS canvas scrubbing through high-resolution frame image sequences.
  - Parallax scale/zoom background effects and floating atmospheric particles.
- **🛸 Translucent Futuristic Glassmorphic Bottom Dock**:
  - Quick navigation pills: `Persona`, `Film Materials`, `Shelf-Life Sim`, `Barrier Physics`, `TOPSIS Score`, `Launch Engine`.
- **🌾 Farmer-Friendly Simple View**:
  - Visual side-by-side crop freshness comparison cards (*Normal Bag vs Special AI Packaging Bag*).
  - Easy-to-understand freshness gauge meters for non-technical users.
- **🔬 Scientist Analyst Mode**:
  - Real-time 30-day Euler mass balance permeation decay graph using Recharts.
  - OTR (Oxygen Transmission Rate) & WVTR (Water Vapor Transmission Rate) metrics.
  - TOPSIS multi-criteria polymer laminate optimization (Met-PET, EVOH, Al Foil, Cellulose, LDPE).

---

## 🚀 Flexible Deployment Options

### Option 1: Deploy on Vercel (1-Click)
1. Push this repo to GitHub.
2. Go to [Vercel.com](https://vercel.com) -> New Project -> Select `PackSmart`.
3. Build Settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**.

### Option 2: Deploy on Virtual Server / VPS (Docker Compose)
To run on any Ubuntu/Linux VPS, AWS EC2, or DigitalOcean droplet:
```bash
# Clone repository
git clone https://github.com/SwarupKadam2007/PackSmart.git
cd PackSmart

# Build and start container on port 80
docker-compose up -d --build
```

### Option 3: Local Setup
```bash
# Clone repository
git clone https://github.com/SwarupKadam2007/PackSmart.git
cd PackSmart

# Install dependencies
npm install

# Run local development server
npm run dev
```

---

## 📁 Project Structure

```
PackSmart/
├── public/
│   └── frames/          # High-resolution image sequence frames
├── src/
│   ├── components/
│   │   ├── CanvasScroll.jsx   # HTML5 canvas scroll scrubbing engine
│   │   ├── TopNav.jsx         # Glass top navigation with language dropdown
│   │   ├── HeroOverlay.jsx    # Everest-style typography overlay
│   │   ├── Hotspots.jsx       # Pinned canvas radar markers
│   │   ├── BottomDock.jsx     # Translucent futuristic bottom dock
│   │   ├── RightDotNav.jsx    # Vertical frame progress indicators
│   │   ├── ShelfLifeModal.jsx # Farmer simple mode & decay graph
│   │   ├── LaminateVisualizerModal.jsx # Micro-layer film stack view
│   │   └── PersonaSelectorModal.jsx   # Role-based access control
│   ├── data/
│   │   ├── framesData.js      # Frame metadata & hotspots mapping
│   │   └── i18n.js            # Multi-language translation dictionary
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Dockerfile           # Production Docker multi-stage build
├── docker-compose.yml   # Docker compose configuration
├── vercel.json          # SPA routing configuration
└── vite.config.js       # Vite build configuration
```

---

## 🤝 License
Distributed under the MIT License.
