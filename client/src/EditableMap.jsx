// En tu componente de React
import { MapContainer, TileLayer, Polygon, EditControl } from 'react-leaflet';

const EditableMap = () => {
  const [editableLayers, setEditableLayers] = useState([]);

  const handleEdit = (e) => {
    // Actualiza el estado con las capas editables después de que el usuario realiza cambios
    setEditableLayers(e.layers);
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <EditControl
        position='topright'
        onEdited={handleEdit}
        onCreated={handleEdit}
        draw={{
          rectangle: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polyline: false,
        }}
      />
      {editableLayers.map(layer => (
        <Polygon key={layer._leaflet_id} positions={layer._latlngs} />
      ))}
    </MapContainer>
  );
};

export default EditableMap;
