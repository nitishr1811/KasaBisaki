/**
 * Verified Real Household Waste Test Samples for Instant Testing in Scanner
 */

export interface ScannerSampleItem {
  id: string;
  name: string;
  categoryHint: 'Recyclable' | 'Wet Waste' | 'Dry Waste';
  badge: string;
  dataUrl: string;
  description: string;
}

// Function to generate high-resolution clean SVG data-uris for instant visual testing
function createSvgDataUrl(svgContent: string): string {
  const encoded = encodeURIComponent(
    svgContent.trim().replace(/\s+/g, ' ')
  );
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

export const SCANNER_SAMPLES: ScannerSampleItem[] = [
  {
    id: 'sample-pet-bottle',
    name: 'PET Water Bottle (#1)',
    categoryHint: 'Recyclable',
    badge: '₹22/kg Scrap Rate',
    description: 'Clean transparent plastic beverage bottle with screw cap',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#F1F5F9" />
        <defs>
          <linearGradient id="petGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#BAE6FD" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#E0F2FE" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#7DD3FC" stop-opacity="0.8"/>
          </linearGradient>
          <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284C7"/>
            <stop offset="100%" stop-color="#0369A1"/>
          </linearGradient>
        </defs>
        <!-- Shadow -->
        <ellipse cx="200" cy="360" rx="65" ry="14" fill="#CBD5E1" opacity="0.6"/>
        <!-- Cap -->
        <rect x="182" y="55" width="36" height="24" rx="4" fill="url(#capGrad)" stroke="#075985" stroke-width="2"/>
        <line x1="184" y1="62" x2="216" y2="62" stroke="#38BDF8" stroke-width="1.5"/>
        <line x1="184" y1="68" x2="216" y2="68" stroke="#38BDF8" stroke-width="1.5"/>
        <rect x="180" y="77" width="40" height="6" rx="2" fill="#0284C7"/>
        <!-- Bottle Neck -->
        <path d="M 186 83 L 186 115 L 140 180 L 140 330 C 140 345, 260 345, 260 330 L 260 180 L 214 83 Z" fill="url(#petGrad)" stroke="#0284C7" stroke-width="2.5"/>
        <!-- Ribbed texture -->
        <line x1="144" y1="210" x2="256" y2="210" stroke="#0284C7" stroke-width="1.5" opacity="0.6"/>
        <line x1="144" y1="240" x2="256" y2="240" stroke="#0284C7" stroke-width="1.5" opacity="0.6"/>
        <line x1="144" y1="270" x2="256" y2="270" stroke="#0284C7" stroke-width="1.5" opacity="0.6"/>
        <!-- Recycling Badge Icon -->
        <circle cx="200" cy="225" r="18" fill="#FFFFFF" opacity="0.9"/>
        <text x="200" y="230" font-family="sans-serif" font-weight="bold" font-size="12" fill="#0369A1" text-anchor="middle">♳ 1</text>
        <text x="200" y="385" font-family="sans-serif" font-weight="600" font-size="13" fill="#334155" text-anchor="middle">Transparent PET Bottle (#1)</text>
      </svg>
    `)
  },
  {
    id: 'sample-banana-peel',
    name: 'Banana Peel / Kitchen Food',
    categoryHint: 'Wet Waste',
    badge: 'Organic Compost Yield',
    description: 'Biodegradable fruit peelings with organic kitchen moisture',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#F1F5F9" />
        <ellipse cx="200" cy="340" rx="90" ry="16" fill="#CBD5E1" opacity="0.6"/>
        <!-- Banana peels curving out -->
        <!-- Stem -->
        <path d="M 190 120 C 195 100, 205 90, 215 90 C 220 90, 222 95, 220 105 C 215 115, 208 125, 200 135 Z" fill="#4D3811" stroke="#2E2008" stroke-width="2"/>
        <!-- Peel Left -->
        <path d="M 195 130 C 160 160, 110 220, 90 290 C 120 310, 150 260, 185 200 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="3"/>
        <path d="M 90 290 C 85 295, 80 305, 95 305 C 105 305, 120 295, 130 280" fill="#A16207"/>
        <!-- Peel Center -->
        <path d="M 200 135 C 185 190, 180 260, 195 330 C 215 330, 220 260, 210 190 Z" fill="#FDE047" stroke="#EAB308" stroke-width="3"/>
        <!-- Brown Sugar Spots -->
        <circle cx="195" cy="230" r="4" fill="#713F12" opacity="0.8"/>
        <circle cx="202" cy="270" r="5" fill="#713F12" opacity="0.8"/>
        <circle cx="190" cy="295" r="3" fill="#713F12" opacity="0.8"/>
        <!-- Peel Right -->
        <path d="M 205 130 C 240 160, 290 220, 310 290 C 280 310, 250 260, 215 200 Z" fill="#EAB308" stroke="#CA8A04" stroke-width="3"/>
        <path d="M 310 290 C 315 295, 320 305, 305 305 C 295 305, 280 295, 270 280" fill="#A16207"/>
        <circle cx="260" cy="240" r="4" fill="#713F12" opacity="0.7"/>
        <text x="200" y="380" font-family="sans-serif" font-weight="600" font-size="13" fill="#334155" text-anchor="middle">Banana Peel &amp; Fruit Kitchen Waste</text>
      </svg>
    `)
  },
  {
    id: 'sample-cardboard-box',
    name: 'Cardboard Shipping Box',
    categoryHint: 'Recyclable',
    badge: '₹13.50/kg Scrap Rate',
    description: 'Clean ungreased corrugated cardboard delivery parcel',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#F1F5F9" />
        <ellipse cx="200" cy="345" rx="110" ry="18" fill="#CBD5E1" opacity="0.6"/>
        <!-- Isometric Box -->
        <!-- Left Face -->
        <polygon points="90,200 200,260 200,340 90,280" fill="#B45309" stroke="#78350F" stroke-width="2.5"/>
        <!-- Right Face -->
        <polygon points="200,260 310,200 310,280 200,340" fill="#92400E" stroke="#78350F" stroke-width="2.5"/>
        <!-- Top Face -->
        <polygon points="200,120 310,180 200,240 90,180" fill="#D97706" stroke="#78350F" stroke-width="2.5"/>
        <!-- Open Flap Left -->
        <polygon points="90,180 200,240 180,265 70,205" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
        <!-- Open Flap Right -->
        <polygon points="200,240 310,180 330,205 220,265" fill="#D97706" stroke="#B45309" stroke-width="2"/>
        <!-- Tape Line -->
        <line x1="145" y1="150" x2="255" y2="210" stroke="#78350F" stroke-width="4" stroke-dasharray="8,4" opacity="0.5"/>
        <!-- Fragile / Recyclable stamp -->
        <rect x="110" y="235" width="40" height="25" rx="3" fill="#FEF3C7" stroke="#B45309" stroke-width="1.5"/>
        <text x="130" y="252" font-family="sans-serif" font-weight="bold" font-size="10" fill="#92400E" text-anchor="middle">♻ OCC</text>
        <text x="200" y="380" font-family="sans-serif" font-weight="600" font-size="13" fill="#334155" text-anchor="middle">Corrugated Cardboard Packaging Box</text>
      </svg>
    `)
  },
  {
    id: 'sample-aluminum-can',
    name: 'Aluminum Soda Can',
    categoryHint: 'Recyclable',
    badge: '₹115/kg Scrap Rate',
    description: 'Lightweight aluminum beverage soda can with pull tab',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#F1F5F9" />
        <ellipse cx="200" cy="340" rx="60" ry="14" fill="#CBD5E1" opacity="0.6"/>
        <defs>
          <linearGradient id="canMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#E2E8F0"/>
            <stop offset="25%" stop-color="#F8FAFC"/>
            <stop offset="50%" stop-color="#CBD5E1"/>
            <stop offset="80%" stop-color="#EF4444"/>
            <stop offset="100%" stop-color="#B91C1C"/>
          </linearGradient>
        </defs>
        <!-- Can Body -->
        <path d="M 150 110 L 150 310 C 150 325, 250 325, 250 310 L 250 110 Z" fill="url(#canMetal)" stroke="#64748B" stroke-width="2"/>
        <!-- Can Top Rim -->
        <ellipse cx="200" cy="110" rx="50" ry="16" fill="#E2E8F0" stroke="#64748B" stroke-width="2.5"/>
        <ellipse cx="200" cy="110" rx="42" ry="12" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1.5"/>
        <!-- Pull tab -->
        <rect x="194" y="103" width="12" height="18" rx="3" fill="#94A3B8" stroke="#475569" stroke-width="1"/>
        <ellipse cx="200" cy="107" rx="3" ry="3" fill="#64748B"/>
        <ellipse cx="200" cy="116" rx="4" ry="3" fill="#475569"/>
        <!-- Can Bottom Rim -->
        <path d="M 152 305 C 152 320, 248 320, 248 305" fill="none" stroke="#64748B" stroke-width="2"/>
        <text x="200" y="225" font-family="sans-serif" font-weight="900" font-size="18" fill="#FFFFFF" text-anchor="middle" transform="rotate(-90 200 225)" opacity="0.9">ALU ♺</text>
        <text x="200" y="380" font-family="sans-serif" font-weight="600" font-size="13" fill="#334155" text-anchor="middle">Aluminum Beverage Drink Can</text>
      </svg>
    `)
  },
  {
    id: 'sample-greasy-wrapper',
    name: 'Greasy Soiled Food Wrapper',
    categoryHint: 'Dry Waste',
    badge: 'Non-Recyclable Refuse',
    description: 'Grease-stained takeout wrapper / multi-layered plastic',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#F1F5F9" />
        <ellipse cx="200" cy="335" rx="85" ry="14" fill="#CBD5E1" opacity="0.6"/>
        <!-- Crinkled Foil/Plastic Wrapper -->
        <path d="M 120 160 Q 170 140, 230 150 Q 280 160, 290 200 Q 300 250, 270 290 Q 220 310, 160 295 Q 110 270, 105 220 Z" fill="#CBD5E1" stroke="#64748B" stroke-width="2.5"/>
        <!-- Crinkle Lines -->
        <path d="M 130 180 L 190 210 L 220 180 L 270 220" fill="none" stroke="#94A3B8" stroke-width="2"/>
        <path d="M 140 240 L 180 220 L 220 260 L 260 240" fill="none" stroke="#94A3B8" stroke-width="2"/>
        <!-- Grease Oil Stains -->
        <ellipse cx="190" cy="220" rx="35" ry="25" fill="#EAB308" opacity="0.45"/>
        <ellipse cx="210" cy="245" rx="20" ry="15" fill="#CA8A04" opacity="0.5"/>
        <ellipse cx="160" cy="250" rx="18" ry="14" fill="#CA8A04" opacity="0.35"/>
        <!-- Food Crumbs -->
        <circle cx="185" cy="215" r="3" fill="#78350F"/>
        <circle cx="215" cy="235" r="2.5" fill="#78350F"/>
        <circle cx="198" cy="250" r="3" fill="#78350F"/>
        <text x="200" y="380" font-family="sans-serif" font-weight="600" font-size="13" fill="#334155" text-anchor="middle">Soiled Greasy Takeaway Food Wrapper</text>
      </svg>
    `)
  }
];
