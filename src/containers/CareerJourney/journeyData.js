import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const locations = [
  {
    name: "India",
    coordinates: [78.9629, 20.5937]
  },
  {
    name: "Remote Work",
    coordinates: [0, 20]
  },
  {
    name: "Mongolia (Zorgers)",
    coordinates: [103.8467, 46.8625]
  }
];

export default function JourneyMap() {
  return (
    <div style={{ width: "100%", marginBottom: "60px" }}>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#e0e0e0" />
            ))
          }
        </Geographies>

        {locations.map((loc, index) => (
          <Marker key={index} coordinates={loc.coordinates}>
            <circle r={6} fill="#6c63ff" />
            <text textAnchor="middle" y={-10} style={{ fontSize: "10px" }}>
              {loc.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}