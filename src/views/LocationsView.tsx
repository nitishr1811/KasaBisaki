import React, { useState } from 'react';
import { MapPin, Search, ExternalLink, Phone, Clock, AlertTriangle, CheckCircle2, Building2, Filter } from 'lucide-react';
import { BANGALORE_LOCATIONS, BangaloreDisposalCentre } from '../data/bangaloreLocations';

export const LocationsView: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const zones = ['All', 'South', 'East', 'West', 'Mahadevapura', 'Bommanahalli', 'Yelahanka', 'RR Nagar', 'Central'];
  const types = ['All', 'Dry Waste Collection Centre (DWCC)', 'E-Waste Drop-Off', 'Biomethanation & Composting', 'Resource Recovery Facility'];

  const filteredLocations = BANGALORE_LOCATIONS.filter((loc) => {
    const matchesZone = selectedZone === 'All' || loc.zone === selectedZone;
    const matchesType = selectedType === 'All' || loc.type === selectedType;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesZone && matchesType;

    const matchesSearch =
      loc.name.toLowerCase().includes(q) ||
      loc.wardName.toLowerCase().includes(q) ||
      loc.wardNumber.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q) ||
      loc.landmark.toLowerCase().includes(q) ||
      loc.managingPartner.toLowerCase().includes(q) ||
      loc.acceptedStreams.some((s) => s.toLowerCase().includes(q));

    return matchesZone && matchesType && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 font-mono">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Bengaluru Civic Waste Infrastructure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Bengaluru Waste Disposal & Recovery Centres
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Find verified Dry Waste Collection Centres (DWCCs), authorized E-waste drop-off points, and decentralized composting facilities managed by BBMP, Hasiru Dala, and Saahas Zero Waste across Bengaluru wards.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Locality Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by area (e.g. HSR Layout, Koramangala, Indiranagar, Whitefield, Jayanagar, Malleshwaram)..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900"
          />
        </div>

        {/* Zone Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold shrink-0 pr-1">
            Zone:
          </span>
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedZone === zone
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Facility Type Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-100">
          <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold shrink-0 pr-1">
            Facility:
          </span>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedType === type
                  ? 'bg-emerald-800 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {type === 'All' ? 'All Types' : type.replace('Collection Centre ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Locations Grid */}
      {filteredLocations.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-2">
          <Building2 className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No disposal centres found</h3>
          <p className="text-xs text-slate-500">Try adjusting your zone filter or search for a nearby locality.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Tag Bar */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase font-bold text-slate-500">
                      {loc.zone} Zone · {loc.wardNumber} ({loc.wardName})
                    </span>
                    <h3 className="text-base font-display font-bold text-slate-900 mt-0.5 leading-snug">
                      {loc.name}
                    </h3>
                  </div>

                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {loc.type.replace('Collection Centre ', '')}
                  </span>
                </div>

                {/* Operating Partner & Timings */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Managed By</span>
                    <span className="font-bold text-slate-800">{loc.managingPartner}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Timings</span>
                    <span className="font-bold text-slate-800 truncate block">{loc.timings.split('(')[0]}</span>
                  </div>
                </div>

                {/* Address & Landmark */}
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="leading-relaxed font-medium text-slate-800">{loc.address}</p>
                  <p className="text-[11px] text-slate-500">Landmark: {loc.landmark}</p>
                </div>

                {/* Accepted Streams Chips */}
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block mb-1">
                    Accepted Waste Streams:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {loc.acceptedStreams.map((stream, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {stream}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`tel:${loc.contactNumber}`}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-mono text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{loc.contactNumber}</span>
                </a>

                <a
                  href={loc.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors shadow-2xs"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ward Info Note */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
        <span className="font-bold text-slate-800 block">ℹ️ Bangalore Source Segregation Rules:</span>
        <p className="leading-relaxed">
          BBMP enforces the "2-Bins-1-Bag" standard across all 198 wards: Green Bin for daily wet waste collected at your doorstep; Blue Bag/Bin for dry recyclables handed over to your ward DWCC or authorized waste pickers; and Red hazard pouch for domestic sanitary/battery items.
        </p>
      </div>
    </div>
  );
};
