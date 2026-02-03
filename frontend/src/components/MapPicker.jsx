import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"

const center = { lat: 28.6139, lng: 77.2090 } // Delhi default

export default function MapPicker({ location, setLocation }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY
  })

  if (!isLoaded) return <p>Loading map...</p>

  return (
    <GoogleMap
      zoom={14}
      center={location || center}
      mapContainerStyle={{ width: "100%", height: "300px" }}
      onClick={(e) =>
        setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
      }
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  )
}
