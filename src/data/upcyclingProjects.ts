export interface UpcyclingProject {
  id: string;
  title: string;
  targetWasteMaterial: string;
  category: 'Plastics' | 'Paper & Cardboard' | 'Glass' | 'Metals' | 'Kitchen Organics' | 'Fabrics';
  difficulty: 'Easy (10 mins)' | 'Medium (25 mins)' | 'Advanced (45 mins)';
  toolsNeeded: string[];
  steps: string[];
  householdBenefit: string;
  environmentalValue: string;
}

export const UPCYCLING_PROJECTS: UpcyclingProject[] = [
  {
    id: 'upcycle-self-watering-planter',
    title: 'Self-Watering Balcony Herb Planter',
    targetWasteMaterial: 'Clear Plastic PET Bottle (1L or 2L)',
    category: 'Plastics',
    difficulty: 'Easy (10 mins)',
    toolsNeeded: ['Kitchen scissors or utility knife', 'Cotton cord or strip of old cotton cloth', 'Potting soil & seeds (mint/coriander)'],
    steps: [
      '1. Cut the clean plastic bottle in half horizontally about 4 inches below the neck.',
      '2. Invert the top neck section and place it upside down like a funnel inside the lower reservoir base.',
      '3. Thread a 6-inch cotton cord through the bottle opening, allowing 2 inches to dangle into the base and 4 inches to rest inside the inverted funnel.',
      '4. Fill the inverted funnel with soil and plant your herb seeds; fill the lower base with 2 inches of water.',
      '5. The cotton cord automatically wicks moisture upwards to the roots, keeping herbs hydrated for up to a week!'
    ],
    householdBenefit: 'Grow fresh coriander, mint, or basil on your window sill with zero watering chores.',
    environmentalValue: 'Diverts 1 plastic bottle and eliminates the need to buy plastic store-bought nursery pots.'
  },
  {
    id: 'upcycle-egg-carton-seedlings',
    title: 'Biodegradable Seedling Nursery Pods',
    targetWasteMaterial: 'Molded Pulp Paper Egg Carton',
    category: 'Paper & Cardboard',
    difficulty: 'Easy (10 mins)',
    toolsNeeded: ['Egg carton', 'Potting mix', 'Water spray bottle', 'Seeds (tomato, chili, marigold)'],
    steps: [
      '1. Cut the egg carton lid off, leaving the 6 or 12 cup compartments intact.',
      '2. Poke a tiny pinhole at the bottom of each egg cup for drainage.',
      '3. Fill each cup with potting soil, insert 1-2 seeds, and mist with a water spray.',
      '4. Once the seedlings sprout and develop their first true leaves, cut the cups apart with scissors.',
      '5. Plant the entire paper cup directly into a garden pot or soil bed! The paper will naturally decompose into organic compost as the roots grow.'
    ],
    householdBenefit: 'Zero root-shock when transplanting seedlings into larger garden beds.',
    environmentalValue: 'Zero plastic nursery trays used, and 100% compostable paper return to the soil.'
  },
  {
    id: 'upcycle-glass-spice-jars',
    title: 'Airtight Kitchen Spice & Pulse Decanter',
    targetWasteMaterial: 'Glass Jam, Honey, or Pickle Jars',
    category: 'Glass',
    difficulty: 'Medium (25 mins)',
    toolsNeeded: ['Warm water & baking soda (to strip label)', 'Paper masking tape or chalkboard sticker', 'Chalk pen'],
    steps: [
      '1. Soak the glass jar in warm water mixed with 1 tablespoon of baking soda for 15 minutes.',
      '2. Peel off the paper label smoothly; wipe any remaining glue with a drop of cooking oil.',
      '3. Sterilize the glass jar in boiling water or hot rinse and let dry completely.',
      '4. Apply a clean tape label on the front and write the name of your spices (mustard seeds, cumin, cloves).',
      '5. Replace expensive plastic Tupperware with uniform, non-toxic, moisture-proof glass storage!'
    ],
    householdBenefit: 'Eliminates pantry insect infestation and keeps spices fragrant for months.',
    environmentalValue: 'Saves ₹80–120 per purchased plastic container and keeps cullet out of landfills.'
  },
  {
    id: 'upcycle-cardboard-drawer-dividers',
    title: 'Custom Modular Drawer & Wardrobe Organizers',
    targetWasteMaterial: 'Corrugated E-Commerce Shipping Cartons',
    category: 'Paper & Cardboard',
    difficulty: 'Medium (25 mins)',
    toolsNeeded: ['Ruler', 'Pencil', 'Utility cutter / scissors', 'Paper tape or gift wrap scrap'],
    steps: [
      '1. Measure the length, width, and depth of your desk or clothes drawer.',
      '2. Cut strips of sturdy corrugated cardboard matching the drawer height.',
      '3. Cut interlocking vertical slots halfway through the cardboard strips at 3-inch intervals.',
      '4. Interlock the strips in a grid pattern to create custom honeycomb compartments.',
      '5. Drop into your drawer to neatly sort socks, stationery, charging cables, and cosmetics.'
    ],
    householdBenefit: 'Turns chaotic messy drawers into neat, segmented compartments without buying acrylic organizers.',
    environmentalValue: 'Repurposes bulky shipping boxes immediately inside the home.'
  },
  {
    id: 'upcycle-citrus-cleaning-vinegar',
    title: 'All-Natural Citrus Antimicrobial Cleaning Spray',
    targetWasteMaterial: 'Leftover Orange, Lemon, or Sweet Lime Peels',
    category: 'Kitchen Organics',
    difficulty: 'Easy (10 mins)',
    toolsNeeded: ['Glass jar', 'White vinegar', 'Clean spray bottle', 'Strainer'],
    steps: [
      '1. Pack clean leftover orange or lemon peels tightly into a clean glass jar.',
      '2. Pour plain white vinegar over the peels until completely submerged, and seal the lid tightly.',
      '3. Store in a dark kitchen cupboard for 2 weeks. The citrus oils (d-limonene) naturally infuse into the acetic acid.',
      '4. Strain out the peels into your compost bin and dilute the infused liquid 1:1 with clean water.',
      '5. Pour into a reusable spray bottle. Use as a powerful non-toxic kitchen counter degreaser, glass cleaner, and floor deodorizer!'
    ],
    householdBenefit: 'Replaces chemical aerosol sprays with a fresh, child-safe, antibacterial kitchen disinfectant.',
    environmentalValue: 'Saves ₹150–250 per store-bought chemical spray and utilizes fruit peels before composting.'
  },
  {
    id: 'upcycle-tin-can-desk-organizer',
    title: 'Rustic Cutlery Caddy & Desk Pencil Stand',
    targetWasteMaterial: 'Clean Steel or Tin Food Cans (Condensed milk, fruit cans)',
    category: 'Metals',
    difficulty: 'Medium (25 mins)',
    toolsNeeded: ['Pliers (to crimp inner rim)', 'Jute twine or acrylic paint', 'Glue'],
    steps: [
      '1. Rinse the food can clean and use pliers to firmly press down any sharp inner metal burrs.',
      '2. Wrap natural jute twine tightly around the exterior of the can, securing with small dots of glue every few rows.',
      '3. Alternatively, paint with a coat of primer and a matte color of your choice.',
      '4. Group 3-4 cans together and bind with a twine bow to create a multi-compartment cutlery holder for dinner tables or craft brushes.'
    ],
    householdBenefit: 'Durable, drop-proof, attractive organizer that never cracks like brittle plastic.',
    environmentalValue: 'Keeps scrap metal in active domestic use.'
  }
];
