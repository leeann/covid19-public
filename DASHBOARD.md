# COVID-19 Malaysia Data Visualization Dashboard

A meaningful interactive visualization of COVID-19 data across Malaysian states, inspired by the **Olympic Feathers** design pattern. This dashboard presents official data from CPRC, CPRC Hospital System, MKAK, and MySejahtera using innovative radial "feather" visualizations.

## 🎨 Design Inspiration

This project adapts the elegant **Olympic Feathers** visualization concept—originally created to display ~5000 gold medalists since 1896—to tell the story of the COVID-19 pandemic across Malaysia's 16 states and federal territories.

### Why Feathers?

The radial feather design allows us to simultaneously display:
- **Geographic data** (each state = one feather)
- **Temporal trends** (concentric rings = time periods)
- **Multiple metrics** (colored segments = cases, deaths, vaccination rates)
- **Comparative analysis** (relative sizes show intensity across states)

## 📊 Visualization Components

### Main Feather Chart
Each state is represented as a radial feather with:
- **Concentric rings**: Time periods (months or quarters)
- **Colored arcs**: Three metrics per period
  - 🔵 **Blue**: Confirmed COVID-19 cases
  - 🔴 **Red**: Deaths
  - 🟢 **Green**: Vaccination percentage

### Interactive Features
- **Hover tooltips**: Detailed metrics for each state and time period
- **Color-coded legends**: Intensity scales for each metric
- **Timeline annotations**: Major events (first case, MCO, vaccination start)
- **Responsive design**: Works on desktop, tablet, and mobile

### Supporting Elements
- **Introduction section**: Context and methodology
- **Legend visualizations**: Sample feathers and color scales
- **Event timeline**: Key dates in Malaysia's pandemic response
- **Credits**: Data sources and design attribution

## 📁 Project Structure

```
covid19-public/
├── index.html                      # Main dashboard page
├── css/
│   └── style.css                  # Styling and responsive design
├── js/
│   ├── script.js                  # Main initialization & interactions
│   ├── createStateFeather.js      # Main feather visualization
│   ├── createLegends.js           # Legend components
│   ├── createTimelineAnnotations.js # Event timeline
│   └── data/
│       └── covid-data.csv         # (To be integrated)
├── data/
│   └── covid-data.csv             # Official COVID-19 data
└── img/
    └── favicon-*.png              # Favicons
```

## 🚀 Getting Started

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- D3.js v7+ (loaded via CDN)
- COVID-19 data in CSV format

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/leeann/covid19-public.git
   cd covid19-public
   ```

2. **Add your data**
   Place your COVID-19 CSV file in the `data/` directory:
   ```csv
   date,state,cases,deaths,vaccination_rate
   2020-01-25,Selangor,1,0,0
   2020-01-26,Kuala Lumpur,1,0,0
   ...
   ```

3. **Open in browser**
   ```bash
   # Simple HTTP server
   python -m http.server 8000
   # or
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`

4. **Deploy to GitHub Pages** (Optional)
   ```bash
   git add .
   git commit -m "Update COVID-19 dashboard"
   git push origin main
   ```
   Enable GitHub Pages in repository settings (Settings → Pages → Source: main branch)

## 📈 Data Integration

The dashboard expects COVID-19 data in the following format:

```javascript
{
  "date": "2020-01-25",
  "state": "Selangor",
  "cases": 30,
  "deaths": 0,
  "vaccination_rate": 0,
  "hospital_admissions": 0
}
```

### Data Sources
- [Official COVID-19 Malaysia Repository](https://github.com/leeann/covid19-public)
- CPRC (Crisis Preparedness and Response Centre)
- CPRC Hospital System
- MKAK (Ministry of Health Data)
- MySejahtera App Data

## 🎨 Customization

### Colors
Modify in `css/style.css` or `js/createStateFeather.js`:
```css
.cases-color { fill: #3b82f6; }        /* Blue */
.deaths-color { fill: #dc2626; }       /* Red */
.vaccination-color { fill: #16a34a; }  /* Green */
```

### States Display
Edit the `states` array in `js/createStateFeather.js`:
```javascript
const states = [
  'Selangor', 'Kuala Lumpur', 'Johor', 'Sabah', 'Sarawak',
  'Penang', 'Perak', 'Pahang', 'Kedah', 'Terengganu',
  'Kelantan', 'Negeri Sembilan', 'Melaka', 'Perlis', 'Putrajaya'
];
```

### Time Periods
Adjust in `js/createStateFeather.js`:
```javascript
const timeData = [
  { period: 'Q1 2020', cases: 30, deaths: 0, vaccination: 0 },
  { period: 'Q2 2020', cases: 150, deaths: 3, vaccination: 0 },
  // ... add more periods
];
```

## 📚 How to Read the Feathers

1. **Find your state**: Each circle represents one Malaysian state
2. **Read the rings**: Moving outward = moving forward in time
3. **Identify the metrics**:
   - Inner arc (blue) = confirmed cases
   - Middle arc (red) = deaths
   - Outer arc (green) = vaccination percentage
4. **Compare states**: Wider arcs = higher values
5. **Hover for details**: Get exact numbers and dates

## 🌐 Viewing on GitHub Pages

### Enable GitHub Pages for this repository:

1. **Go to Repository Settings**
   - Navigate to Settings → Pages
   - Under "Source", select "main" branch
   - Click Save

2. **Access your dashboard**
   ```
   https://leeann.github.io/covid19-public/
   ```

3. **Verify it's working**
   - It may take a few minutes for GitHub Pages to build and deploy
   - Check the "Pages" section in Settings for deployment status
   - You'll see a link like "Your site is live at: https://..."

### For a custom domain (optional)
- Create a `CNAME` file with your custom domain
- Update your domain's DNS settings to point to GitHub Pages

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML structure
- Color-blind friendly palette options
- Keyboard navigation support
- ARIA labels for screen readers
- High contrast text

## 📄 License

This project uses data from official Malaysian health sources and is released for public health awareness and education purposes.

## 🙏 Acknowledgments

- **Design Inspiration**: [Olympic Feathers](https://olympicfeathers.visualcinnamon.com/) by Nadieh Bremer
- **Data Visualization**: D3.js by Mike Bostock
- **Data Source**: Official COVID-19 Malaysia Repository
- **Powered by**: CPRC, CPRC Hospital System, MKAK, MySejahtera

## 📞 Support

For issues, questions, or contributions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Submit a pull request with improvements

## 🔄 Version History

- **v1.0.0** (2026-05-24): Initial dashboard framework with feather visualization
  - Basic state feather rendering
  - Interactive tooltips
  - Legend visualizations
  - Timeline annotations
  - Responsive design

## 🎯 Future Enhancements

- [ ] Real-time data integration via API
- [ ] Advanced filtering by date range
- [ ] Export visualization as PNG/SVG
- [ ] Regional comparison tools
- [ ] Predictive analytics overlay
- [ ] Mobile app version
- [ ] Multi-language support

---

**Last Updated**: May 24, 2026

For the latest data and updates, visit the official [COVID-19 Malaysia Repository](https://github.com/leeann/covid19-public)
