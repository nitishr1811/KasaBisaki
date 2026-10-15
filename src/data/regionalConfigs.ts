import { RegionalConfig, RegionalGuideline } from '../types/waste';

export const REGIONAL_CONFIGS: Record<RegionalGuideline, RegionalConfig> = {
  swachh_bharat: {
    id: 'swachh_bharat',
    name: 'South Asian (Swachh Bharat / SWM Rules 2016)',
    tagline: 'Green Bin for Organic Wet Waste, Blue Bin for Dry Waste, Separated Recyclables',
    wetBinColor: 'Green Bin (Organic Wet Waste)',
    dryBinColor: 'Blue Bin (Dry Waste / Domestic Refuse)',
    recyclableBinColor: 'Blue Bin / Dry Waste Collection Centre (DWCC)',
    authorityReference: 'Ministry of Environment, Forest and Climate Change & MoHUA (Solid Waste Management Rules 2016)',
    referenceUrl: 'https://swachhbharatmission.ddws.gov.in/',
    notes: 'Source segregation mandatory: Organic wet waste into the green bin for local composting or biomethanation; clean dry recyclables (paper, plastic, glass, metal) sent to DWCCs or authorized scrap recyclers; non-recyclable rejects to sanitary landfill.'
  },
  universal_municipal: {
    id: 'universal_municipal',
    name: 'Universal Standard Municipal Framework',
    tagline: 'Standard 3-Stream Segregation: Organics, Dry Trash, Recyclables',
    wetBinColor: 'Green / Brown Bin',
    dryBinColor: 'Black / Grey Bin',
    recyclableBinColor: 'Blue Bin',
    authorityReference: 'UN Environment Programme (UNEP) Municipal Waste Guidelines',
    referenceUrl: 'https://www.unep.org/explore-topics/resource-efficiency/what-we-do/solid-waste-management',
    notes: 'General baseline framework for global households: keep organic wet waste separate to prevent contamination of dry recoverable materials.'
  },
  eu_uk_waste: {
    id: 'eu_uk_waste',
    name: 'European Union & UK Waste Framework Directive',
    tagline: 'Food & Bio-Waste, General Refuse, Commingled or Multi-stream Recyclables',
    wetBinColor: 'Brown / Green Bio Caddy',
    dryBinColor: 'Black / Dark Grey Wheelie Bin',
    recyclableBinColor: 'Blue / Green Recycling Bin',
    authorityReference: 'EU Waste Framework Directive (2008/98/EC) & WRAP UK',
    referenceUrl: 'https://environment.ec.europa.eu/topics/waste-and-recycling_en',
    notes: 'Mandatory bio-waste separation across EU member states; packaging recyclables collected at curbside; strict contamination rejection thresholds at MRFs.'
  },
  north_america: {
    id: 'north_america',
    name: 'North American Curbside System',
    tagline: 'Organics/Compost, Trash/Landfill, Single-Stream Curbside Blue Cart',
    wetBinColor: 'Green Cart (Organics)',
    dryBinColor: 'Black / Grey Cart (Trash / Landfill)',
    recyclableBinColor: 'Blue Cart (Recycling)',
    authorityReference: 'US EPA & Environment and Climate Change Canada Municipal Waste Guidelines',
    referenceUrl: 'https://www.epa.gov/recycle',
    notes: 'Single-stream curbside collection common; items must be clean, dry, and loose (never bagged in plastic); yard and food scraps go into municipal green cart where offered.'
  }
};
