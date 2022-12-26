/**
 * Calls console.group(groupInput), console.dir(dirInput) and console.groupEnd()
 * @param groupInput - to console.group() a string
 * @param dirInput - to console.dir() object or array
 */
export const consoleDirGroup = (groupInput, dirInput) => {
	console.group(groupInput);
	console.dir(dirInput);
	console.groupEnd();
};

/**
 * Filters HRM bus data to return busses between two specific routes
 * @param {array} hrmBusses - array containing all HRM busses data
 * @param {number} route1 - first route
 * @param {number} route2 - second route
 * @returns {array} filtered array
 */
export const getBussesBetweenRoutes = (hrmBusses, route1, route2) => {
	try {
		const filteredData = hrmBusses.filter(
			(hrmBus) => hrmBus.vehicle.trip.routeId >= route1 && hrmBus.vehicle.trip.routeId <= route2
		);
		return filteredData;
	} catch (error) {
		console.error(`Error in getBussesBetweenRoutes filter. Error message: ${error.message}`);
	}
};

export const convertJSONToGeoJSON = (jsonData) => {
	return jsonData.map((hrmBus) => {
		const { longitude, latitude, speed = 0, bearing: rotationAngle } = hrmBus.vehicle.position;
		const { routeId, startDate } = hrmBus.vehicle.trip;
		const { label } = hrmBus.vehicle.vehicle
		return {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [longitude, latitude],
			},
			properties: {
				routeId,
				rotationAngle,
				speed: speed.toFixed(2),
				label
			},
		};
	});
};
