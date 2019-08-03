import axios from 'axios';

const url = '/api/survey/';

export default {
	createSurvey(data) {
		return axios.post(url, data).then(response => response.data);
	},
	getSurvey(uuid) {
		return axios.get(url + uuid).then(response => response.data);
	},
	vote(uuid, answers) {
		return axios
			.post(url + uuid, { answers })
			.then(response => response.data);
	},
	getVotes(uuid) {
		return axios.get(url + uuid + '/votes').then(response => response.data);
	}
};
