const clampNumber = (num: number, a: number, b: number) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))

export function moveMarker(MapMouseEvent: any, marker: google.maps.Marker)
{
    const latLng = MapMouseEvent.latLng.toJSON();
    latLng.lat = clampNumber(latLng.lat, -85, 85)
    marker.setPosition(latLng);
    return latLng;
}