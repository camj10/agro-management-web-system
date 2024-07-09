import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';

const DisplayPolygons = ({ coordenadas }) => {
  console.log("al llegar- coordenadas: ", coordenadas);
  const [displayedcoordenadas, setDisplayedcoordenadas] = useState([]);

  useEffect(() => {
    if (Array.isArray(coordenadas) && coordenadas.length > 0) {
      setDisplayedcoordenadas(coordenadas);
    } else {
      console.log("No es un array válido. Valor de 'coordenadas': ", coordenadas);
      setDisplayedcoordenadas(JSON.parse(coordenadas));
    }
  }, [coordenadas]);
  {displayedcoordenadas.map((polygon, index) => (
    console.log("polygon: ",polygon)
  ))}
  console.log("coordenadas: ", coordenadas);
  console.log("displayedcoordenadas: ", displayedcoordenadas);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
          <Polygon positions={displayedcoordenadas}>
            <Popup>
              Información del Polígono
            </Popup>
          </Polygon>
    </MapContainer>
  );
};

export default DisplayPolygons;
