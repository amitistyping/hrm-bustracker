import * as util from './util.js';

export const getHRMBussesDataJSON = async () => {
	try {
		const requestOptions = {
			method: 'GET',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const hrmBussesData = await fetch('https://hrmbusapi.onrender.com/', requestOptions);
		const hrmBussesDataJSON = await hrmBussesData.json();
		util.consoleDirGroup('HRM BUS API Response', hrmBussesDataJSON);
		util.consoleDirGroup('All HRM busses data', hrmBussesDataJSON.entity);
		return hrmBussesDataJSON.entity;
	} catch (error) {
		console.error(`HRM Bus API fetch error. Error message:${error.message}`);
	}
};
