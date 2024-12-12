"use client";
import React from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { CricketFarm } from "@prisma/client";

interface MapboxProps {
  cricketFarms: CricketFarm[] | undefined;
}

export default function Mapbox({ cricketFarms }: MapboxProps) {
  const router = useRouter();

  return (
    <div className="h-full w-full">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        initialViewState={{
          longitude: 104.991,
          latitude: 12.5657,
          zoom: 5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {cricketFarms &&
          cricketFarms.length > 0 &&
          cricketFarms.map((farm) => (
            <Marker
              key={farm.id}
              className="hover:cursor-pointer"
              longitude={farm.longitude}
              latitude={farm.latitude}
              anchor="center"
              onClick={() => router.push(`/dashboard/cricket/farm/${farm.id}`)}
            >
              <MapPin size={40} fill={"#1ab394"} className="text-gray-800 hover:text-[#5c5959]" />
            </Marker>
          ))}
      </Map>
    </div>
  );
}
