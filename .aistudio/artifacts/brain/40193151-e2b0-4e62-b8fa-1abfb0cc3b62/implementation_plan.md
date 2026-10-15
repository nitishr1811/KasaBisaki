# EcoLens: Waste-to-Value Circular Exchange & Smart Segregation Assistant

EcoLens evolves beyond a standard "point-and-classify" tool into a **Waste-to-Value Circular Exchange** that solves the root problem of household waste: *the lack of economic incentive, second-life imagination, and local drop-off awareness*. By pairing precision 3-stream segregation (Dry, Wet, Recyclable) with a **Real-Time Scrap Yield Value Calculator**, an **Interactive AI Upcycling Studio**, and a verified **Bengaluru Waste Disposal Centres Directory ('Locations')**, EcoLens transforms daily trash into tangible household earnings, creative circular assets, and actionable civic drop-offs.

***

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural pivots, terminology conventions, and showcase features reflect confirmed user preferences:

*   **Dedicated 'Locations' Page — Bengaluru Waste Disposal Centres (Confirmed)**: A comprehensive, filterable directory of verified municipal waste disposal and recovery facilities across Bengaluru (India):
    *   **Dry Waste Collection Centres (DWCCs)** managed with BBMP, Hasiru Dala, and Saahas Zero Waste across wards (HSR Layout, Koramangala, Indiranagar, Whitefield, Jayanagar, Malleshwaram, Yelahanka, etc.).
    *   **E-Waste Authorized Drop-Off Points**.
    *   **Community Biomethanation & Decentralized Composting Plants**.
    *   Features zone filters (South, East, West, Mahadevapura, Bommanahalli, Yelahanka), stream filters, operating hours, and direct Google Maps navigation links.
*   **Terminology Discipline (Confirmed)**: Strictly avoid colloquial slang such as "geela kachra" or "sukha kachra / sookha kachra". Use clean, universal professional terminology across all UI elements, labels, and AI prompt instructions:
    *   🌱 **Wet Waste (Organic & Biodegradable)** — Green Bin
    *   📦 **Dry Waste (Non-Biodegradable & Domestic Refuse)** — Blue Bin
    *   ♻️ **Recyclable (High-Value Dry Commodities)** — Blue Bin / Dry Waste Collection Centre (DWCC)
*   **Pivoted Theme — Waste-to-Value Circular Exchange (Confirmed)**: Segregated waste is treated as a tradeable commodity and creative resource. Every scanned or logged item displays its estimated material recovery value, recycling yield, or DIY upcycling blueprint.
*   **Standout Showcase — Real-Time Scrap Yield Calculator (Confirmed)**: Features a live commodity scrap pricing ticker and yield calculator modeled after urban scrap markets (PET bottles, cardboard cartons, HDPE milk pouches, aluminum cans, brass, copper, and e-waste). Users accumulate a personal **"Scrap Stash"** balance, calculate pickup earnings, and generate a printable/exportable segregation receipt.
*   **AI Upcycling Studio (Second-Life Engine)**: When scanning dry packaging or glass/plastic containers, EcoLens generates practical, zero-cost household upcycling recipes (e.g. self-watering planters, seedling trays, storage organizers) with step-by-step instructions before binning.
*   **Strict Hackathon & Sourcing Rules Preserved**:
    *   3 mandatory primary categories: **Dry Waste**, **Wet Waste**, **Recyclable**.
    *   South Asian Swachh Bharat guideline baseline (Green bin for organics, Blue bin for dry refuse, separated recyclables).
    *   Authentic real-life photography from Unsplash/Pixabay (zero AI-generated item images).
    *   100% verified GitHub / Stack Overflow sourcing cataloged in the structured Credits & Sources registry.

***

## 1. Overview & Core Concept

*   **The Hackathon Edge**: Standard waste classification apps fail because users have no incentive to segregate and do not know where to take specialized waste. EcoLens answers both: *"What is this worth if I segregate it?"* and *"Where is the nearest verified drop-off centre in Bengaluru?"*
*   **Core Pillars**:
    1.  **AI Smart Scanner**: Analyzes waste items via computer vision, checks contamination, and outputs stream assignment with estimated scrap value.
    2.  **Scrap Value & Yield Engine**: Calculates instant cash yield for segregated dry recyclables based on live market benchmark rates per kilogram.
    3.  **Upcycling Studio**: Transforms recyclable and non-recyclable dry waste into functional home crafts and garden tools.
    4.  **Bengaluru Disposal Centres ('Locations')**: Comprehensive map and directory of DWCCs, E-waste hubs, and composting facilities across Bengaluru.
    5.  **Circularity Dashboard**: Tracks personal scrap revenue unlocked, kilograms of organic wet waste segregated for compost, and quiz knowledge mastery.

***

## 2. User Experience & Visual Design

### Key User Flows

1.  **Home & Circular Triage**:
    *   Hero introduces the Waste-to-Value concept: *"Don't Just Bin It. Monetize, Upcycle & Locate."*
    *   Live Scrap Market Ticker displaying current recyclable scrap commodity rates (e.g., Newspaper: ₹15/kg, PET Bottles: ₹22/kg, Aluminum: ₹115/kg).
    *   Quick actions to **Scan & Value Waste**, **Explore Upcycling Studio**, **Launch Scrap Calculator**, or **Find Bengaluru Centres**.
2.  **AI Scanner with Value Appraisal**:
    *   Live camera capture or file upload.
    *   Result Card displays:
        - Primary Stream: Wet Waste / Dry Waste / Recyclable with clean professional bin conventions.
        - **Scrap Commodity Valuation**: Estimated unit weight and scrap cash yield.
        - **"Add to My Scrap Stash"** button with cumulative earnings tracker.
        - **One-Click Upcycling Recipe**: Step-by-step DIY instructions to repurpose the item.
        - Contamination check, preparation checklist, and local municipal guidance.
        - Integrated follow-up chatbot.
3.  **Real-Time Scrap Yield Calculator (Showcase View)**:
    *   Interactive multi-material scrap weight sliders (Newspaper, Cardboard, PET Plastic, Milk Pouches, Aluminum Cans, Iron Scrap, Glass Bottles).
    *   Computes total estimated earnings in real-time.
    *   Generates a structured **"Recycling Segregation Manifest"** summary that households can present to scrap collectors.
4.  **Bengaluru Waste Disposal Centres ('Locations' View)**:
    *   Filter by Bengaluru Zone (South, East, West, Mahadevapura, Bommanahalli, Yelahanka, RR Nagar) and Stream (All, Dry Waste / DWCC, E-Waste, Organic Composting).
    *   Search by locality name (e.g., "Koramangala", "HSR", "Indiranagar", "Whitefield", "Jayanagar").
    *   Detailed cards with operating ward, managing partner (Hasiru Dala, Saahas, BBMP), full address, working hours, accepted materials, and one-click Google Maps directions.
5.  **Upcycling Studio (Second-Life Directory)**:
    *   Curated catalog of high-impact DIY upcycling projects categorized by material (Plastic Bottles, Cardboard, Glass Jars, Egg Cartons, Tin Cans).
    *   Detailed time, difficulty, tools needed, and step-by-step illustrated guides.
6.  **Interactive Quiz, Learn Hub, Dashboard & Credits**:
    *   Retains the 13 comprehensive lessons, real-life photography quiz, historical scans, and verified Credits & Sources registry.

### Visual Identity & Theme

```
Dominant Canvas (60%):      #FDFBF7 / #F8F9FA (Crisp Editorial Warm White)
Structural Surfaces (30%):   #FFFFFF / #F1F5F9 (Clean 1px Hairline Slate Borders)
Accents (10%):              #15803D (Forest Green), #0284C7 (Recycling Cyan), #D97706 (Scrap Value Amber)
```

*   **Anti-Slop Discipline**: No decorative pulsing dots, no floating glowing glass cards, no fake environmental stats. Real commodity scrap pricing models and honest data.

***

## 3. Key Product Decisions & Architecture

*   **Decision 1: Native Integration of Scrap Commodity Rates**:
    *   *Implementation*: `src/data/scrapCommodityRates.ts` housing verified benchmark scrap pricing from recycling hubs with weight estimators.
    *   *Why*: Gives users immediate mathematical insight into how much money is sitting in their recyclable bin.
*   **Decision 2: Comprehensive Bengaluru Disposal Centres Dataset**:
    *   *Implementation*: `src/data/bangaloreLocations.ts` with authentic DWCC facilities, E-waste drop-offs, and biomethanation plants across all major zones of Bengaluru.
    *   *Why*: Directly bridges the gap between home segregation and actual civic infrastructure.
*   **Decision 3: Clean Professional Terminology**:
    *   *Implementation*: Refactored all text to strictly use "Wet Waste (Organic)", "Dry Waste (Non-Biodegradable)", and "Recyclable (Dry Commodities)", removing colloquial slang.

***

## 4. System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EcoLens Browser Client                          │
│                                                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │ WasteScanner │  │ Scrap Value  │  │ Bengaluru   │  │  Upcycling  │  │
│  │ (Cam/Upload) │  │  Calculator  │  │  Locations  │  │   Studio    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                 │                 │                │         │
│         ▼                 ▼                 ▼                ▼         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │      Client Services: storageService (Scrap Stash) · credits     │  │
│  └───────────────────────────────┬──────────────────────────────────┘  │
└──────────────────────────────────┼─────────────────────────────────────┘
                                   │ HTTPS / JSON
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  Node.js / Express Server (Port 3000)                  │
│                                                                        │
│   POST /api/classify ────────┐     POST /api/chat ─────────────────┐   │
│   • Image payload validation │     • Conversation history          │   │
│   • Multimodal AI analysis   │     • Upcycling & commodity context │   │
│   └────────────┬─────────────┘     └──────────────┬────────────────┘   │
│                │                                  │                    │
│                ▼                                  ▼                    │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │        @google/genai SDK (Multi-model resilient fallback)      │   │
│   │           gemini-3.5-flash · gemini-3.6-flash · preview        │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

***

## 5. Implementation Milestones

1.  **Clean Terminology Refactor**: Replace any remaining instances of colloquial phrases across all files.
2.  **Bengaluru Locations Dataset & View (`LocationsView.tsx`)**: Build `src/data/bangaloreLocations.ts` with verified DWCCs, E-waste centres, and composting facilities across Bengaluru with zone filters, search, and map links.
3.  **Scrap Commodity Data & Yield Engine**: Build `src/data/scrapCommodityRates.ts` with authentic per-kg market rates, item weight formulas, and collection categories.
4.  **Upcycling Studio Data & View (`UpcyclingView.tsx`)**: Build `src/data/upcyclingProjects.ts` with 10 high-value DIY second-life projects and step-by-step guides.
5.  **Scrap Value Calculator View (`ScrapCalculatorView.tsx`)**: Interactive weight & item count sliders, real-time value calculator, and downloadable/printable pickup manifest.
6.  **Scanner Enhancement**: Incorporate estimated scrap yield value badge and instant upcycling recipe suggestion directly on `ClassificationResultCard.tsx`.
7.  **Navigation & App Integration**: Add "Locations", "Scrap Value", and "Upcycling" to the navigation and top bar contract.
8.  **Credits & Sources Update**: Register all newly introduced datasets and benchmark references into `CREDITS_REGISTRY`.
