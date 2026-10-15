export interface BangaloreDisposalCentre {
  id: string;
  name: string;
  zone: 'South' | 'East' | 'West' | 'Mahadevapura' | 'Bommanahalli' | 'Yelahanka' | 'RR Nagar' | 'Central';
  wardNumber: string;
  wardName: string;
  type: 'Dry Waste Collection Centre (DWCC)' | 'E-Waste Drop-Off' | 'Biomethanation & Composting' | 'Resource Recovery Facility';
  managingPartner: 'Hasiru Dala' | 'Saahas Zero Waste' | 'BBMP SWM' | 'SWM Round Table';
  address: string;
  landmark: string;
  timings: string;
  acceptedStreams: string[];
  prohibitedStreams: string[];
  contactNumber: string;
  googleMapsUrl: string;
}

export const BANGALORE_LOCATIONS: BangaloreDisposalCentre[] = [
  {
    id: 'dwcc-hsr-sec2',
    name: 'HSR Layout Sector 2 Dry Waste Collection Centre',
    zone: 'Bommanahalli',
    wardNumber: 'Ward 174',
    wardName: 'HSR Layout',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'Hasiru Dala',
    address: 'Near 24th Main Road, Sector 2, HSR Layout, Bengaluru, Karnataka 560102',
    landmark: 'Behind Sector 2 BDA Complex & Park',
    timings: 'Monday – Saturday: 8:00 AM – 3:30 PM (Closed Sundays)',
    acceptedStreams: [
      'Clean PET Bottles (#1)',
      'HDPE Milk & Detergent Jugs (#2)',
      'Cardboard Shipping Boxes',
      'Old Newspapers & Office Paper',
      'Metals & Aluminum Cans',
      'Electronic E-Waste Accessories',
      'Clean Glass Bottles'
    ],
    prohibitedStreams: [
      'Unsegregated Wet Food Waste',
      'Biomedical / Sanitary Waste',
      'Debris / Construction Soil'
    ],
    contactNumber: '+91 80 2572 1199',
    googleMapsUrl: 'https://maps.google.com/?q=HSR+Layout+Sector+2+Dry+Waste+Collection+Centre+Bengaluru'
  },
  {
    id: 'dwcc-indiranagar',
    name: 'Indiranagar Ward 112 Dry Waste Collection Centre',
    zone: 'East',
    wardNumber: 'Ward 112',
    wardName: 'Domlur / Indiranagar',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'Hasiru Dala',
    address: '12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    landmark: 'Adjacent to Indiranagar Club & Sub-Station',
    timings: 'Monday – Saturday: 8:30 AM – 4:00 PM',
    acceptedStreams: [
      'Corrugated Paper & Cartons',
      'Plastic Containers & Rigid Drums',
      'Glass Jam & Sauce Bottles',
      'Aluminum & Beverage Cans',
      'Tetra Pak Cartons'
    ],
    prohibitedStreams: [
      'Mixed Kitchen Food Scraps',
      'Contaminated Oil Packaging'
    ],
    contactNumber: '+91 98450 12834',
    googleMapsUrl: 'https://maps.google.com/?q=Indiranagar+Dry+Waste+Collection+Centre+Bengaluru'
  },
  {
    id: 'dwcc-koramangala-5th',
    name: 'Koramangala 5th Block Resource Recovery Centre',
    zone: 'South',
    wardNumber: 'Ward 151',
    wardName: 'Koramangala',
    type: 'Resource Recovery Facility',
    managingPartner: 'Saahas Zero Waste',
    address: '1st Cross Road, 5th Block, Koramangala, Bengaluru, Karnataka 560095',
    landmark: 'Near Koramangala Club and BBMP Ground',
    timings: 'Monday – Saturday: 9:00 AM – 5:00 PM',
    acceptedStreams: [
      'All 7 Plastic Resin Grades',
      'Cartons & Paper Bundles',
      'Clean Milk Pouches (Rinsed)',
      'E-Waste (Cables, Chargers, Batteries)',
      'Metal Cutlery & Wire Scrap'
    ],
    prohibitedStreams: [
      'Wet Organic Food Waste',
      'Broken Tube Lights / Mercury Lamps'
    ],
    contactNumber: '+91 80 4168 9389',
    googleMapsUrl: 'https://maps.google.com/?q=Koramangala+5th+Block+Resource+Recovery+Centre+Bengaluru'
  },
  {
    id: 'dwcc-jayanagar-4th',
    name: 'Jayanagar 4th Block Dry Waste Centre',
    zone: 'South',
    wardNumber: 'Ward 153',
    wardName: 'Jayanagar',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'Hasiru Dala',
    address: '32nd Cross Road, 4th T Block East, Jayanagar, Bengaluru, Karnataka 560041',
    landmark: 'Near Jayanagar BDA Shopping Complex',
    timings: 'Monday – Saturday: 8:00 AM – 2:30 PM',
    acceptedStreams: [
      'Newspapers & Books',
      'PET Bottles',
      'Corrugated Packaging',
      'Aluminium & Steel Cans',
      'Glass Cullet'
    ],
    prohibitedStreams: [
      'Greasy Paper Packaging',
      'Sanitary Diapers'
    ],
    contactNumber: '+91 97421 88420',
    googleMapsUrl: 'https://maps.google.com/?q=Jayanagar+4th+Block+Dry+Waste+Centre+Bengaluru'
  },
  {
    id: 'dwcc-malleshwaram-18th',
    name: 'Malleshwaram 18th Cross DWCC & Scrap Hub',
    zone: 'West',
    wardNumber: 'Ward 65',
    wardName: 'Kadu Malleshwaram',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'BBMP SWM',
    address: '18th Cross Road, Margosa Road, Malleshwaram, Bengaluru, Karnataka 560055',
    landmark: 'Opposite Malleshwaram Grounds',
    timings: 'Daily: 8:00 AM – 3:00 PM',
    acceptedStreams: [
      'Rigid Plastic Buckets & Toys',
      'Cardboard Shipping Boxes',
      'Metal Tins & Beverage Cans',
      'Clean Glass Jars',
      'Newspapers & Magazines'
    ],
    prohibitedStreams: [
      'Wet Organic Peelings',
      'Garden Soil & Stones'
    ],
    contactNumber: '+91 80 2334 0012',
    googleMapsUrl: 'https://maps.google.com/?q=Malleshwaram+18th+Cross+DWCC+Bengaluru'
  },
  {
    id: 'dwcc-whitefield-outer-ring',
    name: 'Whitefield Outer Ring Road Dry Waste Collection Hub',
    zone: 'Mahadevapura',
    wardNumber: 'Ward 84',
    wardName: 'Hagadur / Whitefield',
    type: 'Resource Recovery Facility',
    managingPartner: 'Saahas Zero Waste',
    address: 'ITPL Main Road, Near Pattandur Agrahara, Whitefield, Bengaluru, Karnataka 560066',
    landmark: 'Close to Hope Farm Junction',
    timings: 'Monday – Saturday: 9:00 AM – 5:30 PM',
    acceptedStreams: [
      'Corporate Paper & Shredded Records',
      'Packaging Bubble Wrap & LDPE Film',
      'PET Bottles & PP Meal Trays',
      'Electronic Hardware & Keyboards',
      'Metal Food Cans'
    ],
    prohibitedStreams: [
      'Wet Canteen Leftovers',
      'Unrinsed Greasy Takeaway Bags'
    ],
    contactNumber: '+91 80 4168 9389',
    googleMapsUrl: 'https://maps.google.com/?q=Whitefield+Dry+Waste+Collection+Centre+Bengaluru'
  },
  {
    id: 'bio-yelahanka-compost',
    name: 'Yelahanka Decentralized Bio-Methanation & Leaf Composting Centre',
    zone: 'Yelahanka',
    wardNumber: 'Ward 4',
    wardName: 'Yelahanka Satellite Town',
    type: 'Biomethanation & Composting',
    managingPartner: 'BBMP SWM',
    address: 'Major Sandeep Unnikrishnan Road, Sector A, Yelahanka New Town, Bengaluru, Karnataka 560064',
    landmark: 'Near Yelahanka Lake Park',
    timings: 'Monday – Sunday: 7:00 AM – 1:00 PM',
    acceptedStreams: [
      'Bulk Organic Kitchen Wet Waste',
      'Garden Tree Pruning & Fallen Leaves',
      'Vegetable Market Peelings & Stalks',
      'Crushed Coconut Shells & Husks'
    ],
    prohibitedStreams: [
      'All Plastics & Synthetics',
      'Thermocol',
      'Treated Timber / Paints'
    ],
    contactNumber: '+91 80 2856 0145',
    googleMapsUrl: 'https://maps.google.com/?q=Yelahanka+Biomethanation+Plant+Bengaluru'
  },
  {
    id: 'ewaste-central-saahas',
    name: 'Saahas Central E-Waste Collection & Safe Disposal Depot',
    zone: 'Central',
    wardNumber: 'Ward 111',
    wardName: 'Shantala Nagar',
    type: 'E-Waste Drop-Off',
    managingPartner: 'Saahas Zero Waste',
    address: 'Museum Road, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025',
    landmark: 'Off Richmond Road',
    timings: 'Monday – Friday: 9:30 AM – 6:00 PM',
    acceptedStreams: [
      'Spent Alkaline & Lithium Batteries',
      'Laptops, Mobiles & Tablets',
      'Power Cords, USB Cables & Chargers',
      'Printed Circuit Boards (PCBs)',
      'Home Appliances (Toasters, Kettles)'
    ],
    prohibitedStreams: [
      'Leaking Car Lead-Acid Batteries',
      'Organic Wet Waste'
    ],
    contactNumber: '+91 80 4168 9389',
    googleMapsUrl: 'https://maps.google.com/?q=Saahas+Zero+Waste+Museum+Road+Bengaluru'
  },
  {
    id: 'dwcc-bellandur',
    name: 'Bellandur Ward 150 Dry Waste Collection Centre',
    zone: 'Mahadevapura',
    wardNumber: 'Ward 150',
    wardName: 'Bellandur',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'Hasiru Dala',
    address: 'Near Bellandur Gate, Sarjapur Main Road, Bengaluru, Karnataka 560103',
    landmark: 'Behind Bellandur Ward Office',
    timings: 'Monday – Saturday: 8:00 AM – 3:30 PM',
    acceptedStreams: [
      'Amazon/Flipkart Cardboard Cartons',
      'Clean PET Bottles',
      'Metal Tins & Beverage Cans',
      'Clean Paper & Books',
      'Clean LDPE Milk Packets'
    ],
    prohibitedStreams: [
      'Wet Food Scraps',
      'Contaminated Styrofoam Food Containers'
    ],
    contactNumber: '+91 97421 88420',
    googleMapsUrl: 'https://maps.google.com/?q=Bellandur+Dry+Waste+Collection+Centre+Bengaluru'
  },
  {
    id: 'dwcc-jp-nagar-2nd',
    name: 'JP Nagar 2nd Phase Resource Recovery DWCC',
    zone: 'South',
    wardNumber: 'Ward 177',
    wardName: 'JP Nagar',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'Hasiru Dala',
    address: '14th Main Road, 2nd Phase, J. P. Nagar, Bengaluru, Karnataka 560078',
    landmark: 'Near Mini Forest Park',
    timings: 'Monday – Saturday: 8:30 AM – 3:00 PM',
    acceptedStreams: [
      'Office Paper & School Books',
      'PET Beverage Bottles',
      'Aluminium Foil & Cans',
      'Glass Jam Jars',
      'HDPE Plastic Containers'
    ],
    prohibitedStreams: [
      'Wet Kitchen Leftovers',
      'Sanitary Diapers'
    ],
    contactNumber: '+91 80 2658 9912',
    googleMapsUrl: 'https://maps.google.com/?q=JP+Nagar+2nd+Phase+Dry+Waste+Centre+Bengaluru'
  },
  {
    id: 'dwcc-rr-nagar-beml',
    name: 'Rajarajeshwari Nagar BEML Layout DWCC',
    zone: 'RR Nagar',
    wardNumber: 'Ward 160',
    wardName: 'Rajarajeshwari Nagar',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'BBMP SWM',
    address: '5th Stage, BEML Layout, RR Nagar, Bengaluru, Karnataka 560098',
    landmark: 'Near Double Road Park',
    timings: 'Monday – Saturday: 8:00 AM – 2:00 PM',
    acceptedStreams: [
      'Paper & Cardboard',
      'Rigid Plastic Items',
      'Metal Scraps',
      'Electronic Accessories',
      'Glass Bottles'
    ],
    prohibitedStreams: [
      'Wet Organic Food Waste',
      'Paints & Solvents'
    ],
    contactNumber: '+91 80 2860 1144',
    googleMapsUrl: 'https://maps.google.com/?q=RR+Nagar+Dry+Waste+Collection+Centre+Bengaluru'
  },
  {
    id: 'dwcc-electronic-city',
    name: 'Electronic City Phase 1 Dry Waste Collection Depot',
    zone: 'Bommanahalli',
    wardNumber: 'Ward 192',
    wardName: 'Begur / Electronic City',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'Saahas Zero Waste',
    address: 'Near Keonics Junction, Phase 1, Electronic City, Bengaluru, Karnataka 560100',
    landmark: 'Behind Velankani Tech Park',
    timings: 'Monday – Saturday: 8:30 AM – 4:30 PM',
    acceptedStreams: [
      'High-grade office paper and cartons',
      'PET and HDPE beverage and cosmetic containers',
      'Aluminum beverage cans and scrap wires',
      'Electronic chargers and cords',
      'Corrugated shipping boxes'
    ],
    prohibitedStreams: [
      'Wet canteen leftovers',
      'Biomedical swabs and bandages'
    ],
    contactNumber: '+91 80 4168 9389',
    googleMapsUrl: 'https://maps.google.com/?q=Electronic+City+Phase+1+Dry+Waste+Centre+Bengaluru'
  },
  {
    id: 'dwcc-btm-2nd',
    name: 'BTM Layout 2nd Stage DWCC',
    zone: 'Bommanahalli',
    wardNumber: 'Ward 176',
    wardName: 'BTM Layout',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'Hasiru Dala',
    address: '7th Cross, 16th Main Road, 2nd Stage, BTM Layout, Bengaluru, Karnataka 560076',
    landmark: 'Near Udupi Garden Signal & Park',
    timings: 'Monday – Saturday: 8:00 AM – 3:00 PM',
    acceptedStreams: [
      'Plastic containers and bottles',
      'Cardboard boxes and newsprint',
      'Metal tins and aerosol cans (emptied)',
      'Clean milk sachets'
    ],
    prohibitedStreams: [
      'Wet food waste',
      'Soiled paper napkins'
    ],
    contactNumber: '+91 98450 12834',
    googleMapsUrl: 'https://maps.google.com/?q=BTM+Layout+2nd+Stage+Dry+Waste+Collection+Centre+Bengaluru'
  },
  {
    id: 'dwcc-rajajinagar-3rd',
    name: 'Rajajinagar 3rd Block Resource Recovery Hub',
    zone: 'West',
    wardNumber: 'Ward 108',
    wardName: 'Rajajinagar',
    type: 'Resource Recovery Facility',
    managingPartner: 'BBMP SWM',
    address: '10th Main, 3rd Block, Rajajinagar, Bengaluru, Karnataka 560010',
    landmark: 'Near Rajajinagar ESI Hospital',
    timings: 'Monday – Saturday: 8:00 AM – 3:30 PM',
    acceptedStreams: [
      'All dry plastics (#1 through #7)',
      'Paper, magazines, and notebooks',
      'Glass beverage and food bottles',
      'Tin and aluminum cans'
    ],
    prohibitedStreams: [
      'Wet vegetable and fruit scraps',
      'Sanitary diapers'
    ],
    contactNumber: '+91 80 2315 4488',
    googleMapsUrl: 'https://maps.google.com/?q=Rajajinagar+3rd+Block+Dry+Waste+Centre+Bengaluru'
  },
  {
    id: 'dwcc-banashankari-2nd',
    name: 'Banashankari 2nd Stage Dry Waste Depot',
    zone: 'South',
    wardNumber: 'Ward 154',
    wardName: 'Banashankari Temple Ward',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'Hasiru Dala',
    address: '22nd Main Road, Banashankari 2nd Stage, Bengaluru, Karnataka 560070',
    landmark: 'Near Banashankari BDA Complex',
    timings: 'Monday – Saturday: 8:00 AM – 2:30 PM',
    acceptedStreams: [
      'Clean plastic bottles and buckets',
      'Cardboard packing boxes',
      'Newspapers and discarded books',
      'Metals and household scrap'
    ],
    prohibitedStreams: [
      'Kitchen food waste',
      'Hazardous paints or solvents'
    ],
    contactNumber: '+91 97421 88420',
    googleMapsUrl: 'https://maps.google.com/?q=Banashankari+2nd+Stage+Dry+Waste+Collection+Centre+Bengaluru'
  },
  {
    id: 'dwcc-hebbal-kempapura',
    name: 'Hebbal Kempapura Dry Waste & E-Waste Depot',
    zone: 'Yelahanka',
    wardNumber: 'Ward 21',
    wardName: 'Hebbal',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'BBMP SWM',
    address: 'Near Hebbal Lake Bund Road, Kempapura, Bengaluru, Karnataka 560024',
    landmark: 'Adjacent to Hebbal Flyover Underpass',
    timings: 'Daily: 8:00 AM – 2:00 PM',
    acceptedStreams: [
      'PET beverage bottles',
      'E-Waste cables, phones, and batteries',
      'Cardboard cartons and packaging foam (non-food)',
      'Metal containers and copper wire'
    ],
    prohibitedStreams: [
      'Wet kitchen bio-waste',
      'Debris and masonry bricks'
    ],
    contactNumber: '+91 80 2363 1102',
    googleMapsUrl: 'https://maps.google.com/?q=Hebbal+Dry+Waste+Collection+Centre+Bengaluru'
  },
  {
    id: 'dwcc-kalyannagar-hrbr',
    name: 'Kalyan Nagar / HRBR Layout DWCC',
    zone: 'East',
    wardNumber: 'Ward 27',
    wardName: 'Banaswadi / HRBR',
    type: 'Dry Waste Collection Centre (DWCC)',
    managingPartner: 'Hasiru Dala',
    address: 'Kammanahalli Main Road, HRBR 2nd Block, Kalyan Nagar, Bengaluru, Karnataka 560043',
    landmark: 'Behind Jalvayu Vihar',
    timings: 'Monday – Saturday: 8:30 AM – 3:30 PM',
    acceptedStreams: [
      'Plastic beverage bottles and jugs',
      'Online delivery cartons and envelopes',
      'Aluminium cans and steel boxes',
      'Clean dry paper'
    ],
    prohibitedStreams: [
      'Cooked food leftovers',
      'Sanitary pads and diapers'
    ],
    contactNumber: '+91 98450 12834',
    googleMapsUrl: 'https://maps.google.com/?q=Kalyan+Nagar+HRBR+Dry+Waste+Centre+Bengaluru'
  },
  {
    id: 'dwcc-marathahalli-bridge',
    name: 'Marathahalli Outer Ring Road Resource Recovery Depot',
    zone: 'Mahadevapura',
    wardNumber: 'Ward 85',
    wardName: 'Doddanekkundi / Marathahalli',
    type: 'Resource Recovery Facility',
    managingPartner: 'Saahas Zero Waste',
    address: 'Service Road, Near Kalamandir, Marathahalli, Bengaluru, Karnataka 560037',
    landmark: 'Near Marathahalli Multiplex Signal',
    timings: 'Monday – Saturday: 9:00 AM – 5:00 PM',
    acceptedStreams: [
      'Rigid plastics, PET bottles, and HDPE jugs',
      'Amazon/Flipkart shipping boxes',
      'Tetra Pak juice cartons',
      'Scrap aluminium and iron tins'
    ],
    prohibitedStreams: [
      'Wet kitchen waste',
      'Styrofoam food takeaway boxes'
    ],
    contactNumber: '+91 80 4168 9389',
    googleMapsUrl: 'https://maps.google.com/?q=Marathahalli+Dry+Waste+Collection+Depot+Bengaluru'
  },
  {
    id: 'bio-koramangala-aerobic',
    name: 'Koramangala Community Aerobic Composting Unit',
    zone: 'South',
    wardNumber: 'Ward 151',
    wardName: 'Koramangala',
    type: 'Biomethanation & Composting',
    managingPartner: 'SWM Round Table',
    address: '3rd Block Park, 10th Cross, Koramangala, Bengaluru, Karnataka 560034',
    landmark: 'Inside 3rd Block Community Park',
    timings: 'Daily: 7:00 AM – 11:30 AM',
    acceptedStreams: [
      'Clean vegetable and fruit peelings',
      'Coffee grinds and tea leaves',
      'Dry leaves and garden trimmings',
      'Eggshells and flower garlands'
    ],
    prohibitedStreams: [
      'Plastic bags of any micron thickness',
      'Cooked gravy with high salt/oil',
      'Metal or glass'
    ],
    contactNumber: '+91 80 2553 4410',
    googleMapsUrl: 'https://maps.google.com/?q=Koramangala+3rd+Block+Composting+Bengaluru'
  }
];
