export interface ScrapCommodity {
  id: string;
  name: string;
  category: 'Paper' | 'Plastics' | 'Metals' | 'Glass' | 'E-Waste';
  currentRatePerKg: number; // in INR (₹)
  unitName: string;
  avgUnitWeightKg: number; // typical weight of a single household item
  description: string;
  preparationTip: string;
}

export const SCRAP_COMMODITIES: ScrapCommodity[] = [
  {
    id: 'scrap-pet-bottles',
    name: 'PET Plastic Bottles (Clear #1)',
    category: 'Plastics',
    currentRatePerKg: 22.00,
    unitName: 'bottle',
    avgUnitWeightKg: 0.032, // ~32 grams
    description: 'Clear water, juice, and soft drink bottles made of transparent PET #1.',
    preparationTip: 'Empty liquids, rinse sticky residues, crush flat, and re-screw the cap.'
  },
  {
    id: 'scrap-cardboard',
    name: 'Corrugated Cardboard Boxes (OCC)',
    category: 'Paper',
    currentRatePerKg: 13.50,
    unitName: 'box',
    avgUnitWeightKg: 0.450, // ~450 grams for medium shipping box
    description: 'Clean, ungreased corrugated cardboard delivery boxes from e-commerce.',
    preparationTip: 'Flatten boxes completely and strip off plastic shipping tape.'
  },
  {
    id: 'scrap-newspaper',
    name: 'Old Newspaper & Magazines (ONP)',
    category: 'Paper',
    currentRatePerKg: 15.00,
    unitName: 'bundle (10 papers)',
    avgUnitWeightKg: 0.900,
    description: 'Dry newspapers, school notebooks, and printed office papers.',
    preparationTip: 'Tie securely into neat bundles with twine to prevent scattering.'
  },
  {
    id: 'scrap-hdpe-plastic',
    name: 'HDPE Rigid Plastic Containers (#2)',
    category: 'Plastics',
    currentRatePerKg: 26.00,
    unitName: 'container',
    avgUnitWeightKg: 0.085, // ~85 grams
    description: 'High-density polyethylene detergent bottles, shampoo jugs, and motor oil cans.',
    preparationTip: 'Rinse thoroughly to remove soap or chemical residues.'
  },
  {
    id: 'scrap-milk-pouches',
    name: 'LDPE Clean Milk Pouches',
    category: 'Plastics',
    currentRatePerKg: 28.00,
    unitName: 'pouch',
    avgUnitWeightKg: 0.005, // ~5 grams
    description: 'Clean rinsed LDPE/LLDPE milk packaging film.',
    preparationTip: 'Rinse pouch with a splash of water, air dry, and leave the cut corner attached.'
  },
  {
    id: 'scrap-aluminum-cans',
    name: 'Aluminum Beverage Cans',
    category: 'Metals',
    currentRatePerKg: 115.00,
    unitName: 'can',
    avgUnitWeightKg: 0.015, // ~15 grams
    description: 'Lightweight aluminum soda and carbonated water cans.',
    preparationTip: 'Rinse to deter ants, step on to crush flat to maximize storage.'
  },
  {
    id: 'scrap-steel-cans',
    name: 'Tin & Steel Food Cans',
    category: 'Metals',
    currentRatePerKg: 28.00,
    unitName: 'can',
    avgUnitWeightKg: 0.050, // ~50 grams
    description: 'Tinned fruit, condensed milk, paint, and food tins (magnetic).',
    preparationTip: 'Rinse clean; push metal lids inside the can so edges do not cut workers.'
  },
  {
    id: 'scrap-glass-bottles',
    name: 'Glass Beverage & Condiment Bottles',
    category: 'Glass',
    currentRatePerKg: 3.50,
    unitName: 'bottle',
    avgUnitWeightKg: 0.350, // ~350 grams
    description: 'Intact beer bottles, glass milk bottles, and pickle/jam jars.',
    preparationTip: 'Separate metal or plastic lids; keep bottles unchipped for refill reuse.'
  },
  {
    id: 'scrap-brass-copper',
    name: 'Copper & Brass Domestic Scrap',
    category: 'Metals',
    currentRatePerKg: 420.00,
    unitName: 'piece',
    avgUnitWeightKg: 0.150,
    description: 'Disused pooja brassware, plumbing pipes, and stripped copper wiring.',
    preparationTip: 'Keep clean of cement or heavy iron attachments for peak value.'
  },
  {
    id: 'scrap-ewaste',
    name: 'Small Domestic E-Waste & Chargers',
    category: 'E-Waste',
    currentRatePerKg: 65.00,
    unitName: 'device / cable',
    avgUnitWeightKg: 0.200,
    description: 'Dead mobile chargers, USB cables, discarded keyboards, and old remote controls.',
    preparationTip: 'Do not smash or burn casings; wrap neatly and drop at authorized e-waste depots.'
  }
];
