import { LearnTopic } from '../types/waste';

export const LEARN_TOPICS: LearnTopic[] = [
  {
    id: 'topic-1',
    title: '1. What Dry Waste Means',
    category: 'Dry Waste',
    summary: 'Non-biodegradable domestic refuse that will not naturally rot or decompose in an organic compost bin.',
    detailedContent: [
      'Dry waste encompasses all solid household articles that lack organic moisture and do not biodegrade rapidly. Under national frameworks such as the Swachh Bharat Solid Waste Management Rules 2016, dry waste must be kept free of food liquids and moisture.',
      'A crucial distinction: Some dry waste is commercially recyclable (clean paper, PET bottles, tin cans), while other dry waste is non-recyclable refuse (multi-layer snack packets, sweepings, soiled tissue, thermocol, broken ceramics) which heads to waste-to-energy plants or sanitary landfills.'
    ],
    dos: [
      'Keep dry waste completely separate from wet kitchen scraps at source.',
      'Rinse out food residue so dry waste does not attract vermin or ruin paper.',
      'Store clean dry materials in a dedicated Blue bin or dry sack.'
    ],
    donts: [
      'Never toss leftover gravies, wet peelings, or liquids into dry waste.',
      'Do not burn dry plastic or thermocol at home; this releases toxic dioxins.'
    ],
    commonExamples: [
      'Snack wrappers (MLP)',
      'Thermocol and foam blocks',
      'Broken ceramics and plate shards',
      'Used toothbrushes and razor handles',
      'Sanitary pads wrapped in paper (labeled)'
    ],
    realImageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&q=80',
    photoCredit: {
      photographer: 'Pixabay Creative Commons',
      source: 'Pixabay',
      sourceUrl: 'https://pixabay.com/photos/packaging-chips-plastic-waste-trash-6242378/'
    }
  },
  {
    id: 'topic-2',
    title: '2. What Wet Waste Means',
    category: 'Wet Waste',
    summary: 'Biodegradable, organic matter originating from kitchens, dining tables, and domestic gardens.',
    detailedContent: [
      'Wet waste (also termed Organic Bio-Waste or Biodegradable Kitchen Refuse) consists of biological matter with high moisture content. When segregated cleanly without plastics or toxic chemicals, it transforms into nutrient-rich compost or biogas via anaerobic digestion.',
      'If wet waste is mixed into landfill trash, the lack of oxygen produces massive volumes of methane (CH4) — a greenhouse gas over 25 times more potent than carbon dioxide at trapping atmospheric heat.'
    ],
    dos: [
      'Collect daily in a designated Green bin lined with newspaper or a washable bucket.',
      'Include fruit/vegetable peelings, tea leaves, plate leftovers, eggshells, and fish/meat trimmings.',
      'Transfer to your community composter or municipal bio-waste collector daily.'
    ],
    donts: [
      'Never line your wet bin with single-use plastic grocery bags unless certified home-compostable.',
      'Keep fruit stickers, price tags, bread clips, and rubber bands out of the wet bin.'
    ],
    commonExamples: [
      'Fruit peels and vegetable cuttings',
      'Leftover cooked curries, rice, and bread',
      'Eggshells and meat bones',
      'Used tea leaves and coffee grounds',
      'Wilted flowers and garden clippings'
    ],
    realImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    photoCredit: {
      photographer: 'CDC',
      source: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/green-and-yellow-vegetables-and-fruits-on-white-surface-5_7pMm3TWCY'
    }
  },
  {
    id: 'topic-3',
    title: '3. What Recyclable Waste Means',
    category: 'Recyclable',
    summary: 'High-value commodity materials that can be remelted, repulped, or mechanically reprocessed into new goods.',
    detailedContent: [
      'Recyclables form the valuable tier of dry waste. Rather than rotting or filling up landfill trenches, these materials serve as circular raw feedstocks for manufacturing industries.',
      'The core commodity families are rigid plastics (#1 PET, #2 HDPE, #5 PP), cardboard, paper, glass bottles, and metals (aluminum cans, tin, brass, steel). Cleanliness is mandatory: a soiled item can contaminate an entire recycling bale.'
    ],
    dos: [
      'Empty liquids, rinse sticky residues, and dry before binning.',
      'Flatten cardboard cartons and crush beverage bottles to maximize bin space.',
      'Bundle newspapers and hand over to your local Kabadiwala / scrap dealer.'
    ],
    donts: [
      'Do not assume all plastic is recyclable; crinkly thin films and multi-layer pouches are not curbside recyclable.',
      'Never recycle paper coated with grease, wax, or plastic film.'
    ],
    commonExamples: [
      'PET beverage bottles (#1)',
      'HDPE detergent jugs and milk pouches (#2)',
      'Corrugated cardboard shipping boxes',
      'Aluminum beverage cans and tin cans',
      'Glass bottles and condiment jars'
    ],
    realImageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    photoCredit: {
      photographer: 'Brandi Redd',
      source: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/brown-cardboard-box-aJyo8JmV9nI'
    }
  },
  {
    id: 'topic-4',
    title: '4. Differences & Overlaps Between Categories',
    category: 'General',
    summary: 'How physical dry waste splits into recyclable commodities and non-recyclable refuse.',
    detailedContent: [
      'Why is "Recyclable" treated as a distinct primary category alongside "Dry Waste"? Physically, all recyclables are dry materials. However, municipal recovery systems require clean recoverable commodities to be separated from non-recoverable dry refuse.',
      'For instance: a clean PET bottle is physically dry waste, but functionally categorized as "Recyclable". Conversely, a broken ceramic plate or a metallized chip packet is physically dry, but cannot be processed by recycling mills — so it remains strictly in the "Dry Waste" bin.'
    ],
    dos: [
      'Treat "Recyclables" as clean assets for scrap collection or dry sorting centers.',
      'Treat "Dry Waste" as the remaining non-biodegradable domestic refuse.'
    ],
    donts: [
      'Do not mix wet food scraps into dry recyclables; moisture disintegrates paper fibers.'
    ],
    commonExamples: [
      'Clean Cardboard: Recyclable',
      'Greasy Pizza Cardboard: Dry Waste',
      'Clean Glass Bottle: Recyclable',
      'Broken Pyrex Glass / Mirrors: Dry Waste'
    ]
  },
  {
    id: 'topic-5',
    title: '5. Common Household Examples',
    category: 'General',
    summary: 'A quick reference directory of daily household items mapped to their destination streams.',
    detailedContent: [
      'Green Bin (Wet): Apple core, onion skins, leftover roti/rice, chicken bones, eggshells, coffee filters, dead bouquet flowers.',
      'Blue Bin (Dry Non-Recyclable): Styrofoam clamshells, thermal receipt paper, empty toothpaste tubes, blister medicine packs, candy wrappers, dust sweepings.',
      'Recyclable Stream: Milk pouches (rinsed & cut corner intact), oil tins, shampoo bottles, newspapers, amazon delivery boxes, soft drink cans.'
    ],
    dos: [
      'Pin a simple category cheatsheet above your kitchen dustbin station.',
      'Teach children the 3-bin color system early.'
    ],
    donts: [
      'Do not throw medicine blister packs or cosmetics jars into wet waste.'
    ],
    commonExamples: [
      'Kitchen sink scraps -> Wet',
      'Scrap delivery boxes -> Recyclable',
      'Chip foil wrappers -> Dry'
    ]
  },
  {
    id: 'topic-6',
    title: '6. Segregation Do’s and Don’ts',
    category: 'General',
    summary: 'Fundamental household rules that safeguard waste collectors and preserve material value.',
    detailedContent: [
      'Segregation must always happen at the point of generation (in the kitchen or bathroom) rather than later at the curb. Once wet organic waste soaks into dry paper and plastic, secondary sorting becomes hazardous, unsanitary, and economically unviable.',
      'Sanitary waste (diapers, menstrual pads) must be wrapped securely in newspaper, marked with an "X" or red dot, and handed over with dry reject waste to protect municipal conservancy workers.'
    ],
    dos: [
      'Wrap broken glassware and needles in thick newspaper or a secure carton before disposal.',
      'Keep 2 or 3 separate bins in the house: one for wet, one for dry recyclables, one for dry rejects.'
    ],
    donts: [
      'Never put batteries, tube lights, or chemicals into regular domestic bins.',
      'Never mix construction debris with daily municipal waste.'
    ],
    commonExamples: [
      'Securely wrapped sanitary pads',
      'Newspaper-wrapped broken glass',
      'Rinsed milk packets'
    ]
  },
  {
    id: 'topic-7',
    title: '7. Cleaning & Preparing Recyclables',
    category: 'Recyclable',
    summary: 'Why "Empty, Clean, and Dry" is the gold standard for every recycling bin.',
    detailedContent: [
      'You do not need to wash recyclables with dish soap and hot water — that wastes clean drinking water! A simple quick swish of used rinse water is sufficient to remove thick food solids, curries, or sugary beverages.',
      'Key steps: (1) Empty liquids completely. (2) Quick rinse with minimal water. (3) Shake dry so water does not drip onto paper. (4) Re-screw plastic caps so they do not jam automated conveyor belts.'
    ],
    dos: [
      'Flatten cartons and plastic bottles to reduce freight volume and transport emissions.',
      'Keep bottle caps screwed onto the bottle.'
    ],
    donts: [
      'Do not completely cut off the milk packet corner into a tiny plastic triangle; keep the slit attached so it does not end up as microplastic litter.'
    ],
    commonExamples: [
      'Rinsed yogurt tub',
      'Crushed soda can',
      'Flattened cardboard box'
    ],
    realImageUrl: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&w=800&q=80',
    photoCredit: {
      photographer: 'Nick Fewings',
      source: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/crushed-red-soda-can-09d5yE_84sY'
    }
  },
  {
    id: 'topic-8',
    title: '8. Food & Garden Waste Optimization',
    category: 'Wet Waste',
    summary: 'Best practices for handling large organic waste streams, garden pruning, and food surplus.',
    detailedContent: [
      'Food waste represents up to 50% to 60% of all municipal solid waste in developing cities. Diverting this stream directly alleviates landfill burdens and ground-water leachate contamination.',
      'Pruning branches and dry leaves from household gardens are also wet waste, though dry leaves ("Browns") are invaluable as carbon bedding for composting.'
    ],
    dos: [
      'Chop thick vegetable stalks and watermelon rinds into smaller chunks to speed composting.',
      'Save dry autumn leaves to balance wet kitchen scraps in compost bins.'
    ],
    donts: [
      'Do not dump pet feces or dog poop into domestic food composters; pathogens require municipal thermal processing.'
    ],
    commonExamples: [
      'Watermelon rinds',
      'Dry fallen tree leaves',
      'Lawn grass clippings'
    ]
  },
  {
    id: 'topic-9',
    title: '9. Basic Composting Concepts: Aerobic vs Bokashi',
    category: 'Composting',
    summary: 'Turning kitchen scraps into dark organic humus on your balcony or backyard.',
    detailedContent: [
      'Composting requires balancing "Greens" (nitrogen-rich wet food scraps) and "Browns" (carbon-rich dry leaves, sawdust, or shredded cardboard) in roughly a 1:2 ratio.',
      'Two accessible home methods: (1) Aerobic Pot Composting (terracotta pots with breathing holes, turned weekly for airflow). (2) Bokashi Fermentation (airtight anaerobic bucket using beneficial microbes, which can even ferment cooked foods, onions, and citrus).'
    ],
    dos: [
      'Add a handful of dry leaves or sawdust every time you dump wet kitchen waste to eliminate foul odors and fruit flies.',
      'Aerate the compost pile once a week with a garden trowel.'
    ],
    donts: [
      'Never allow standing water to accumulate at the bottom of an aerobic composter; it causes foul anaerobic odors.'
    ],
    commonExamples: [
      'Terracotta 3-tier khamba composter',
      'Balcony Bokashi fermentation bucket',
      'Backyard soil compost pit'
    ],
    realImageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    photoCredit: {
      photographer: 'Battlecreek Coffee Roasters',
      source: 'Unsplash',
      sourceUrl: 'https://unsplash.com/photos/coffee-grounds-in-filter-fcL110N-pbc'
    }
  },
  {
    id: 'topic-10',
    title: '10. Reuse & Repair Before Disposal',
    category: 'General',
    summary: 'The Waste Hierarchy: Prevention > Reuse > Recycling > Energy Recovery > Disposal.',
    detailedContent: [
      'The most sustainable waste item is the one that is never generated in the first place! Before declaring an item waste, explore second-life possibilities.',
      'Glass pasta jars make airtight spice containers; plastic buckets can become balcony planters; old cotton t-shirts replace paper towels as kitchen cleaning rags; single-side printed paper serves for kids doodling or scratch notes.'
    ],
    dos: [
      'Wash and repurpose glass condiment jars for dry pulse and spice storage.',
      'Donate gently used clothing, books, and working appliances to local charities.'
    ],
    donts: [
      'Do not discard refillable containers after a single use.'
    ],
    commonExamples: [
      'Glass jar as pencil holder or spice container',
      'Cardboard box as drawer organizer',
      'Cotton fabric scrap as cleaning cloth'
    ]
  },
  {
    id: 'topic-11',
    title: '11. Common Household Segregation Mistakes',
    category: 'General',
    summary: 'Top 5 mistakes that inadvertently contaminate community recycling bins.',
    detailedContent: [
      '1. The "Wishcycling" Trap: Throwing items into the recycling bin hoping someone will recycle them (e.g. garden hoses, broken plastic toys, toothbrushes). This jams optical sorters.',
      '2. Greasy Pizza Boxes: Greasy paper cannot be repulped; the oil floats on water and ruins entire paper batches.',
      '3. Wet Bagging: Storing wet waste inside a tied plastic bag and tossing the whole plastic ball into the green bin.',
      '4. Plastic-Coated Paper Cups: Thinking coffee paper cups are recyclable paper, when in fact they are lined with fused polyethylene film.',
      '5. Shattered Mirrors & Ceramics: Throwing mirrors, Pyrex, or window panes into bottle glass bins.'
    ],
    dos: [
      'Tear greasy pizza boxes in half: clean lid to recycling, greasy base to dry waste.',
      'Use a washable plastic bucket or newspaper lining for the wet bin.'
    ],
    donts: [
      'Never put plastic bags into curbside recycling carts loose.'
    ],
    commonExamples: [
      'Toothbrushes -> Dry Waste',
      'Greasy pizza bottom -> Dry Waste',
      'Ceramic mug -> Dry Waste'
    ]
  },
  {
    id: 'topic-12',
    title: '12. Local Variations in Waste Collection',
    category: 'General',
    summary: 'How municipal bylaws, urban local bodies (ULBs), and collection days vary by region.',
    detailedContent: [
      'Waste rules are executed by local municipalities, not central federal agencies. For instance, in Bengaluru (BBMP) or Indore (IMC), daily wet waste collection is paired with alternate-day dry waste pickup and door-to-door sanitary waste segregation.',
      'In Germany and the EU, color schemes follow the "Gelber Sack" (Yellow Bag) for packaging, Blue for paper, Brown for organic bio-waste, and Grey/Black for residual refuse.',
      'Always refer to your urban local body’s published schedule for electronic e-waste and domestic hazardous collection days.'
    ],
    dos: [
      'Verify your municipal collection calendar for dry vs wet pickup schedules.',
      'Hand over dry recyclables directly to authorized waste pickers or Dry Waste Collection Centres (DWCC).'
    ],
    donts: [
      'Do not leave unsegregated mixed garbage bags outside your gate for street dogs to tear open.'
    ],
    commonExamples: [
      'Indore Municipal Corporation (IMC) 6-bin system',
      'Bengaluru BBMP 2-Bins-1-Bag framework',
      'EU Green Dot / Yellow Bag packaging system'
    ]
  },
  {
    id: 'topic-13',
    title: '13. Frequently Asked Questions (FAQ)',
    category: 'General',
    summary: 'Answers to the most common household doubts about segregation.',
    detailedContent: [
      'Q: Can I recycle foil-lined blister packs for medicines?\nA: No. Medicine blisters combine aluminum foil and PVC plastic in heat-pressed layers. They are classified as Dry Waste (Domestic Non-Biodegradable).',
      'Q: Should I remove the label from plastic bottles before recycling?\nA: Most modern recycling facilities float-separate labels in water tanks. However, removing plastic shrink sleeves makes the process much cleaner and higher quality.',
      'Q: Where do used batteries go?\nA: Alkaline and lithium batteries are Domestic Hazardous Waste. Never put them in green or blue bins. Store in a small glass jar and drop off at battery drop boxes or e-waste drives.',
      'Q: Can milk pouches be recycled?\nA: Yes! When rinsed clean and dried, LDPE/LLDPE milk packets are high-demand recyclables for piping and industrial crates.'
    ],
    dos: [
      'Store spent batteries and CFL tube lights safely in a dedicated hazardous box.',
      'Rinse milk packets and hand them over to scrap collectors.'
    ],
    donts: [
      'Never puncture or incinerate aerosol cans or lithium batteries.'
    ],
    commonExamples: [
      'Medicine blister pack -> Dry Waste',
      'CFL bulb -> Hazardous E-Waste',
      'Rinsed milk pouch -> Recyclable'
    ]
  }
];
