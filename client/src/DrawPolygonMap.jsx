import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import 'leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';
const DrawPolygonMap = ({ updateCoordenadas }) => {
  const [values, setValues] = useState({ coordenadas: [] });

  const handlePolygonDrawn = (e) => {
    const { layerType, layer } = e;

    if (layerType === 'polygon') {
      const latlngs = layer.getLatLngs()[0].map(({ lat, lng }) => [lat, lng]);

      // Actualiza las coordenadas en el estado global
      setValues({
        ...values,
        coordenadas: latlngs,
      });

      // Llama a la función de actualización externa si se proporciona
      if (updateCoordenadas) {
        updateCoordenadas(latlngs);
      }
    }
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <FeatureGroup>
        <EditControl
          position="topright"
          onEdited={handlePolygonDrawn}
          onCreated={handlePolygonDrawn}
          draw={{
            polygon: {
              allowIntersection: false,
              drawError: {
                color: '#e1e100',
                message: '<strong>Error:</strong> Polygons cannot overlap.',
              },
              shapeOptions: {
                color: '#97009c',
              },
            },
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default DrawPolygonMap;
