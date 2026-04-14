"use client";

import { useState } from "react";
import type { InspectResponse } from "@/lib/types";
import { parseCoordinates } from "@/lib/api";
import ZoningTile from "./ZoningTile";
import LandPriceTile from "./LandPriceTile";
import SchoolDistrictTile from "./SchoolDistrictTile";
import HazardTile from "./HazardTile";
import HazardMap from "./HazardMap";
import DataSource from "./DataSource";

interface SerpSectionProps {
  data: InspectResponse;
  query: string;
}

export default function SerpSection({ data, query }: SerpSectionProps) {
  const [expandedTile, setExpandedTile] = useState<string | null>(null);

  const toggle = (tile: string) => {
    setExpandedTile((prev) => (prev === tile ? null : tile));
  };

  return (
    <section id="serp" className="bg-white py-8">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Address label */}
        <div className="text-sm text-gray-500 pt-2">
          {parseCoordinates(query) ? "検索座標: " : "検索住所: "}
          <span className="font-medium text-gray-800">
            {data.address_normalized ?? query}
          </span>
          {data.location && (
            <span className="ml-2 text-xs text-gray-400">
              ({data.location.lat.toFixed(6)}, {data.location.lng.toFixed(6)})
            </span>
          )}
        </div>

        {/* Result Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.zoning && (
            <ZoningTile
              zoning={data.zoning}
              expanded={expandedTile === "zoning"}
              onToggle={() => toggle("zoning")}
            />
          )}
          {data.land_price && (
            <LandPriceTile
              landPrice={data.land_price}
              expanded={expandedTile === "land_price"}
              onToggle={() => toggle("land_price")}
            />
          )}
          {data.school_district && (
            <SchoolDistrictTile
              schoolDistrict={data.school_district}
              expanded={expandedTile === "school"}
              onToggle={() => toggle("school")}
            />
          )}
          {data.hazard && (
            <HazardTile
              hazard={data.hazard}
              expanded={expandedTile === "hazard"}
              onToggle={() => toggle("hazard")}
            />
          )}
        </div>

        {/* Hazard Map */}
        <HazardMap location={data.location} hazard={data.hazard} />

        {/* DataSource footer */}
        <DataSource meta={data.meta} />
      </div>
    </section>
  );
}
