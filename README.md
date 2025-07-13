# Spotify Clone 

A modern full-stack Spotify clone featuring a vibrant pink aesthetic. This project lets users browse, play, and manage music tracks, albums, and playlists.

---

## 🎨 **Color & Design Overview**

### **Primary Color Palette**
- **Primary Accent:** Pink (`#e75480`)
- **Backgrounds:** Black (`#121212`), Dark Gray (`#181818`)
- **Text:** White, Light Gray (`#b3b3b3`)
- **Gradients:** Use pink for overlays, buttons, and highlights (replace all green accents with pink).

### **UI Elements**
- **Navigation & Buttons:** Pink for hover, active, and accent states
- **Player Bar:** Pink progress bar, play button, and volume slider
- **Cards & Playlists:** Pink borders, backgrounds, or overlays
- **Links:** Pink underline or highlight on hover

### **Sample Pink Usage**
- Replace all `background: #1DB954;` (green) with `background: #e75480;` (pink)
- Button example:
  ```css
  .btn-pink {
    background: #e75480;
    color: #fff;
    border: none;
    border-radius: 500px;
    padding: 12px 32px;
    font-weight: 700;
    transition: background 0.2s ease;
  }
  .btn-pink:hover {
    background: #f4719a;
  }
  ```

---

## 🛠️ **Tech Stack**

- **Frontend:** React.js, Tailwind CSS (customized for pink)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, OAuth
- **Music Streaming:** Spotify API or mock data

---

## 📦 **Project Structure**

```
frontend/
  src/
    components/      # UI elements, themed with pink
    pages/           # Main layouts
    assets/          # Images, icons, fonts
    styles/          # CSS/SCSS (use pink variables)
    index.css        # Global styles (add: --spotify-pink: #e75480;)
  public/
server/
  ...                # Backend code
```

---

## 🚀 **Getting Started**

1. **Clone the repo:**
   ```bash
   git clone https://github.com/WsHussain/Spotify.git
   cd Spotify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development servers:**
   - **Frontend:** `npm start`
   - **Backend:** `npm run server`

4. **Customize Colors:**
   - Add in `:root` of your CSS:
     ```css
     --spotify-pink: #e75480;
     ```
   - Replace green with pink in main components.

---

## ✨ **Features**

- Pink-themed UI throughout
- User authentication and profile
- Browse/search songs, albums, artists, playlists
- Create/manage playlists
- Responsive music player
- Mobile friendly

---

## 💡 **Contributing**

Pull requests welcome !

---

## 📄 **License**

MIT
