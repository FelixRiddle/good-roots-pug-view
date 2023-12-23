# Map

In the udemy course the guy makes a movable marker, but using esri, which now is subscription-walled.

- [x] Remake the movable marker
- [x] [BUG] The marker uses a script to display user real location, I only need the location once.
- [ ] The marker can receive coordinates and be set to that location

So that formularies that use this map can go back to their previous place, like the '/edit' page.

- [ ] On page restart, the previous marker position is remembered.
- [x] Click and drag
- [x] Get the position

- [x] Default position to user position

[Leaflet GeoIP Locator](https://github.com/jakubdostal/leaflet-geoip)

- [x] Address lookup

The process of looking up the address from a search bar, and go straight to its position

The process of converting street name to lat/long is called geocoding, here is a list of plugins from leaflet website.
[Geocoding](https://leafletjs.com/plugins.html#geocoding)
[Leaflet Geosearch](https://github.com/smeijer/leaflet-geosearch)
[leaflet-control-geocoder](https://github.com/perliedman/leaflet-control-geocoder)

- [x] Street name from position

This is called 'Reverse Geocoding'.

Reference/s:
[leaflet latlng to name of location](https://stackoverflow.com/questions/47909266/leaflet-latlng-to-name-of-location)
[Reverse Geocoding](https://en.wikipedia.org/wiki/Reverse_geocoding)
[Leaflet Control Geocoder](https://github.com/perliedman/leaflet-control-geocoder)
