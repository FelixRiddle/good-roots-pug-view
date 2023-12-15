
/**
 * Draggable marker
 * 
 * Note: This hasn't been even tested, just discovered that this functionality is already included in leaflet.
 * Reference/s:
 * https://gis.stackexchange.com/questions/80306/leaflet-draggable-marker
 * 
 * @deprecated https://gis.stackexchange.com/questions/80306/leaflet-draggable-marker
 */
export default class DragMarker {
    /**
     * Apply draggable marker to an existing one.
     * 
     * Create it with draggable.
     * 
     * @param {L.Marker} marker The marker to be dragged around.
     */
    constructor(marker) {
        this.marker = marker;
    }
    
    // --- Other constructors ---
    /**
     * TODO: Create class and try to create a marker on the user location
     * 
     * @returns {DragMarker} 
     */
    static newTryFetchUserLocation() {
        
    }
    
    /**
     * Create new wherever the user clicked and dragg around
     * 
     * @param {MouseEvent} e The mouse event
     * @returns {DragMarker}
     */
    static newCreateAndDragAtClick(e) {
        let marker = new L.marker(e.latlng, { draggable: "true" });
        let draggableMarker = new DragMarker(marker);
        
        draggableMarker.bindDragend();
        
        return draggableMarker;
    }
    
    /**
     * Bind dragend event
     */
    bindDragend() {
        this.marker.on("dragend", function(event) {
            let marker = event.target;
            let position = marker.getLatLng();
            
            marker.setLatLng(new L.LatLng(position.lat, position.lng), {
                draggable: "true"
            });
            
            map.panTo(new L.LatLng(position.lat, position.lng));
        });
        
        map.addLayer(marker)
    }
}
