import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../siteConfig';
import Logo3D from './Logo3D';

// Real-time 3D logo (Three.js) that rotates toward the mouse.
function HeroLogo() {
  return (
    <div className="logo-3d">
      <Logo3D />
    </div>
  );
}

// Original animated hero: network graphic + floating 3D logo.
// Styling + animations live in main.scss (.section__hero, .logo-3d, etc.).
export default function Hero() {
  return (
    <div className="section__hero">

      <svg className="section__hero__web__graphic" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="-200 -150 1600 1100">
        {/* Original connections */}
        <path style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} d="M300.14,225.46,1003,292.61,601.55,538.85a.09.09,0,0,1-.12,0L300.09,225.56A.06.06,0,0,1,300.14,225.46Z" transform="translate(-287.78 -150.4)"/>
        <path style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} d="M1003,292.61,1125.21,163a.24.24,0,0,1,.36,0l120.62,148.91a.08.08,0,0,1-.07.13Z" transform="translate(-287.78 -150.4)"/>
        <path style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} d="M1246.3,312l80.23,25.26a.22.22,0,0,1,.08.37l-80.31,67.93Z" transform="translate(-287.78 -150.4)"/>
        <path style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} d="M1327,337.5l126,121.65-9.7,109.6L1327,337.53S1327,337.47,1327,337.5Z" transform="translate(-287.78 -150.4)"/>
        <path style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} d="M601.36,539.07,485.07,698.58s0,0,0,0L641.78,712,601.53,539.1A.09.09,0,0,0,601.36,539.07Z" transform="translate(-287.78 -150.4)"/>
        <polygon style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} points="354 561.64 734.62 766.13 734.63 766.13 734.63 591.97 354 561.64"/>
        <path style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} d="M1022.41,742.37l83.91-173.62,362.86,245a.19.19,0,0,1-.14.35Z" transform="translate(-287.78 -150.4)"/>
        <path style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} d="M1106.32,568.75h337l26.56,95.1a0,0,0,0,1,0,0Z" transform="translate(-287.78 -150.4)"/>
        <path style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} d="M1469.91,663.91V814.13a.19.19,0,0,1-.15.19L1022.41,916.53" transform="translate(-287.78 -150.4)"/>
        <polyline style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} points="197.28 548.21 12.19 75.04 837.62 12.35 1039.12 186.99"/>
        <path style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} d="M1443.33,568.75l-197-163.18L601.76,538.83a.1.1,0,0,0,0,.19l420.67,203.35" transform="translate(-287.78 -150.4)"/>
        <polyline style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} points="313.7 388.5 818.54 418.35 958.52 255.17"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="715.22" y1="142.21" x2="958.52" y2="255.65"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="958.52" y1="161.62" x2="313.7" y2="388.5"/>
        {/* New outer connections - top edge */}
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="12.19" y1="75.04" x2="200" y2="-60"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="200" y1="-60" x2="500" y2="-80"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="500" y1="-80" x2="680" y2="-50"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="680" y1="-50" x2="837.62" y2="12.35"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="500" y1="-80" x2="715.22" y2="142.21"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="680" y1="-50" x2="715.22" y2="142.21"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="200" y1="-60" x2="100" y2="180"/>
        {/* New connections - left edge */}
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="-120" y1="250" x2="12.19" y2="75.04"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="-120" y1="250" x2="100" y2="180"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="-120" y1="250" x2="-80" y2="480"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="-80" y1="480" x2="197.28" y2="548.21"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="-80" y1="480" x2="-100" y2="700"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="-80" y1="480" x2="313.7" y2="388.5"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="12.19" y1="75.04" x2="100" y2="180"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="100" y1="180" x2="250" y2="200"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="250" y1="200" x2="313.7" y2="388.5"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="250" y1="200" x2="715.22" y2="142.21"/>
        {/* New connections - center fill */}
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="550" y1="280" x2="818.21" y2="418.35"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="550" y1="280" x2="715.22" y2="142.21"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="550" y1="280" x2="313.7" y2="388.5"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="550" y1="280" x2="450" y2="480"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="450" y1="480" x2="313.7" y2="388.5"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="450" y1="480" x2="354" y2="561.64"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="450" y1="480" x2="734.62" y2="591.49"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="450" y1="480" x2="818.21" y2="418.35"/>
        {/* New connections - bottom edge */}
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="-100" y1="700" x2="150" y2="720"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="150" y1="720" x2="354" y2="561.64"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="150" y1="720" x2="480" y2="730"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="480" y1="730" x2="734.62" y2="766.13"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="480" y1="730" x2="600" y2="680"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="600" y1="680" x2="734.62" y2="591.49"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="900" y1="680" x2="1182.42" y2="663.14"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="900" y1="680" x2="734.62" y2="766.13"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="900" y1="680" x2="734.62" y2="591.49"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="900" y1="680" x2="1050" y2="800"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1050" y1="800" x2="1280" y2="720"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1280" y1="720" x2="1182.42" y2="663.14"/>
        {/* New connections - right edge */}
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1100" y1="120" x2="1039.12" y2="186.99"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1100" y1="120" x2="837.62" y2="12.35"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1100" y1="120" x2="1300" y2="250"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1300" y1="250" x2="1164.5" y2="309.39"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1300" y1="250" x2="1320" y2="500"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1320" y1="500" x2="1182.42" y2="513.88"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1320" y1="500" x2="1280" y2="720"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1320" y1="500" x2="1155.55" y2="418.35"/>
        {/* New triangular fill connections */}
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="-120" y1="250" x2="250" y2="200"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="100" y1="180" x2="313.7" y2="388.5"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="197.28" y1="548.21" x2="150" y2="720"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="600" y1="680" x2="480" y2="730"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1050" y1="800" x2="734.62" y2="766.13"/>
        <line style={{fill: "none", stroke: "#00ACE1", strokeMiterLimit: 10, strokeWidth:'0.5px' }} x1="1100" y1="120" x2="1164.5" y2="309.39"/>
        {/* Original nodes */}
        <circle style={{fill: "#00ACE1"}} cx="197.28" cy="548.21" r="5.97"/>
        <circle style={{fill: "#00ACE1"}} cx="313.7" cy="388.5" r="13.02"/>
        <circle style={{fill: "#00ACE1"}} cx="12.19" cy="75.04" r="11.94"/>
        <circle style={{fill: "#00ACE1"}} cx="837.62" cy="12.35" r="12.1"/>
        <circle style={{fill: "#00ACE1"}} cx="1039.12" cy="186.99" r="10.89"/>
        <circle style={{fill: "#00ACE1"}} cx="958.52" cy="161.62" r="5.97"/>
        <circle style={{fill: "#00ACE1"}} cx="958.52" cy="255.65" r="8.2"/>
        <circle style={{fill: "#00ACE1"}} cx="818.21" cy="418.35" r="12.25"/>
        <circle style={{fill: "#00ACE1"}} cx="734.62" cy="591.49" r="9.09"/>
        <circle style={{fill: "#00ACE1"}} cx="354" cy="561.64" r="7.54"/>
        <circle style={{fill: "#00ACE1"}} cx="1164.5" cy="309.39" r="5.97"/>
        <circle style={{fill: "#00ACE1"}} cx="1155.55" cy="418.35" r="9.17"/>
        <circle style={{fill: "#00ACE1"}} cx="1182.42" cy="513.88" r="5.97"/>
        <circle style={{fill: "#00ACE1"}} cx="1182.42" cy="663.14" r="6.04"/>
        <circle style={{fill: "#00ACE1"}} cx="734.62" cy="766.13" r="5.97"/>
        <circle style={{fill: "#00ACE1"}} cx="715.22" cy="142.21" r="10.11"/>
        <circle style={{fill: "#00ACE1"}} cx="843.59" cy="201.92" r="5.97"/>
        {/* New outer nodes - top */}
        <circle style={{fill: "#00ACE1"}} cx="200" cy="-60" r="6.0"/>
        <circle style={{fill: "#00ACE1"}} cx="500" cy="-80" r="9.4"/>
        <circle style={{fill: "#00ACE1"}} cx="680" cy="-50" r="5.5"/>
        {/* New outer nodes - left */}
        <circle style={{fill: "#00ACE1"}} cx="-120" cy="250" r="8.5"/>
        <circle style={{fill: "#00ACE1"}} cx="-80" cy="480" r="6.5"/>
        <circle style={{fill: "#00ACE1"}} cx="-100" cy="700" r="10.2"/>
        {/* New inner nodes - upper left */}
        <circle style={{fill: "#00ACE1"}} cx="100" cy="180" r="7.3"/>
        <circle style={{fill: "#00ACE1"}} cx="250" cy="200" r="5.97"/>
        {/* New inner nodes - center */}
        <circle style={{fill: "#00ACE1"}} cx="550" cy="280" r="7.8"/>
        <circle style={{fill: "#00ACE1"}} cx="450" cy="480" r="6.2"/>
        {/* New outer nodes - bottom */}
        <circle style={{fill: "#00ACE1"}} cx="150" cy="720" r="8.0"/>
        <circle style={{fill: "#00ACE1"}} cx="480" cy="730" r="5.5"/>
        <circle style={{fill: "#00ACE1"}} cx="600" cy="680" r="7.0"/>
        <circle style={{fill: "#00ACE1"}} cx="900" cy="680" r="8.8"/>
        <circle style={{fill: "#00ACE1"}} cx="1050" cy="800" r="7.8"/>
        <circle style={{fill: "#00ACE1"}} cx="1280" cy="720" r="6.3"/>
        {/* New outer nodes - right */}
        <circle style={{fill: "#00ACE1"}} cx="1100" cy="120" r="6.8"/>
        <circle style={{fill: "#00ACE1"}} cx="1300" cy="250" r="7.5"/>
        <circle style={{fill: "#00ACE1"}} cx="1320" cy="500" r="9.2"/>
      </svg>

      <div className="row">

        <div className="section__hero__presentation">

          <div className="logo-glass-card">
            <div className="logo-3d-container">
              <HeroLogo />
            </div>
          </div>

        </div>

        <div className="section__hero__branding">

          <div className="section__hero__branding__content">
            <h1>{COMPANY.shortName.toLowerCase()}</h1>
            <p>{COMPANY.tagline.toLowerCase()}</p>
            <div className="hero__cta">
              <h3>Smart software, built for your business.</h3>
              <Link to="/services" className="hero__cta__btn hero__cta__btn--primary">
                EXPLORE OUR SERVICES
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>

      </div>

      <a href="#what-we-do" className="hero__scroll-indicator">
        <span>WHAT WE DO</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M7 10l5 5 5-5"/>
        </svg>
      </a>

    </div>
  );
}
