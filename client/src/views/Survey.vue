<template>
	<div class="container">
		<h1>{{ survey.question }}</h1>
		<SurveyView
			v-if="view == 'survey'"
			v-bind:survey="survey"
			v-bind:uuid="uuid"
			v-on:change-view="changeView"
		/>
		<ResultView
			v-if="view == 'results'"
			v-bind:survey="survey"
			v-bind:uuid="uuid"
			v-on:change-view="changeView"
		/>
	</div>
</template>

<script>
import SurveyManager from '@/services/SurveyManager.js';
import SurveyView from '@/components/SurveyView.vue';
import ResultView from '@/components/ResultView.vue';

export default {
	name: 'Survey',
	components: {
		SurveyView,
		ResultView
	},
	data() {
		return {
			survey: [],
			uuid: null,
			view: 'survey',
			votes: []
		};
	},
	async created() {
		this.uuid = this.$route.params['uuid'];
		this.survey = await SurveyManager.getSurvey(this.uuid);
	},
	methods: {
		changeView: function(view) {
			this.view = view;
		}
	}
};
</script>

<style lang="scss">
.name-container {
	margin: 2rem 0;
	width: 50%;

	input {
		padding: 10px 20px;
		font-size: 1em;
		border: 2px solid var(--lighter-grey);
	}
}
.answer-container {
	margin: 1rem 0;

	.row {
		display: flex;
		margin: 1rem 0;

		label {
			margin-left: 0.5rem;
		}
	}
}
.change-view {
	margin-top: 5px;
	text-decoration: none;
	cursor: pointer;
	font-size: 14px;

	&:hover {
		text-decoration: underline;
	}
}
</style>
