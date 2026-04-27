# SAAI Intelligent Terminal - Static Demo (GitHub Pages Ready)

This is a **High-Fidelity Static Demonstration** of the SAAI Project. It is designed to provide a pixel-perfect preview of the application's core UI/UX without requiring a complex backend server or Next.js development environment.

## 📂 Project Structure
- `index.html`: The main entry point. It contains the complete HTML5 structure, Tailwind CSS (via CDN), and the original React logic translated into vanilla JavaScript.
- `mockData.js`: A specialized mock API store. it simulates real-time responses from the Python backend, supporting multi-language (ZH/EN) and Membership (Free/Pro) toggles.

## 🚀 Quick Start
1. **Local Preview**: Simply double-click `index.html` or use the "Live Server" extension in VS Code.
2. **Deploy to GitHub Pages**:
   - Create a new repository on GitHub.
   - Upload the contents of this folder.
   - Go to **Settings > Pages** and set the source to your main branch.
   - Your live terminal will be accessible via the generated URL.

## ✨ Key Features (1:1 UI Replication)
- **Multi-Language Support**: Instant toggle between Traditional/Simplified Chinese and English.
- **Pro/Free Mode**: Interactive membership simulation that unlocks advanced XAI (Explainable AI) metrics and strategy backtest data.
- **AI Scenario Detection**: Dynamic UI updates based on current market sentiment (e.g., "Refensive Growth" or "Risk-Off").
- **Real-Time Simulation**: Mocked news feeds, market heatmaps, and ticker services.

## 🛠 Tech Stack
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Typography**: Inter & JetBrains Mono
- **Data**: JavaScript Proxy-based State Management

---
*Note: This version uses snapshot data for demonstration purposes and does not require an active market data subscription.*