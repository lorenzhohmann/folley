import axios from 'axios';

const url = '/api/survey/';

export default {
	createSurvey(data) {
		return axios.post(url, data).then(response => response.data);
	},
	getSurvey(uuid) {
		return axios.get(url + uuid).then(response => response.data);
	}
};
