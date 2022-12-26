import * as api from './api.js';
import * as utils from './util.js';
import './leaflet-rotatedmarker.js';

(async function () {
	//create map in leaflet and tie it to the div called 'theMap'

	let map = L.map('theMap').setView([44.650627, -63.59714], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);
	
	let geoJSONMarkers;

	const removePreviousMarkers = async () => {
		if(geoJSONMarkers) map.removeLayer(geoJSONMarkers);
	};

	const renderHRMBusMarkers = async (geoJSON) => {
		geoJSONMarkers = L.geoJSON(geoJSON, {
			pointToLayer: function (feature, latlng) {
				const { rotationAngle, routeId } = feature.properties;
				return L.marker(latlng, {
					icon: new L.DivIcon({
						className: 'icon-div',
						html: `<img src='bus.png'/>
						<span>${routeId}</span> 
						`,
					}),
					rotationAngle,
				});
			},
			onEachFeature: function (feature, layer) {
				layer.bindTooltip(
					`Route Id: ${feature.properties.routeId} Label: ${feature.properties.label}`
				);
			},
		}).addTo(map);
	};

	const displayHRMBusses = async () => {
		const hrmBussesData = await api.getHRMBussesDataJSON();
		const filterRoute1to10Busses = utils.getBussesBetweenRoutes(hrmBussesData, 1, 10);
		const bussesGeoJSON = utils.convertJSONToGeoJSON(filterRoute1to10Busses);
		await renderHRMBusMarkers(bussesGeoJSON);
	};

	//for first time rendering
	await displayHRMBusses();

	//for subsequent rendering every 15 seconds
	window.setInterval(async () => {
		await removePreviousMarkers();
		await displayHRMBusses();
	}, 15000);
})();
