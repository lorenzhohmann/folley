<template>
	<div class="container">
		<h1>{{ this.survey.question }}</h1>
		<p v-for="answer in survey.answers">
			{{ answer.answer }}
		</p>
	</div>
</template>

<script>
import SurveyManager from '@/services/SurveyManager.js';

export default {
	name: 'Survey',
	data() {
		return {
			survey: []
		};
	},
	async created() {
		this.survey = await SurveyManager.getSurvey(this.$route.params['uuid']);
	}
};
</script>
