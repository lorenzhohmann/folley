<template>
	<div>
		<h2 class="main-color">{{ $t('latest_surveys') }}</h2>
		<div class="latest-surveys" v-if="surveys.length > 0">
			<div class="survey" v-for="survey in surveys">
				<h3>
					<a
						v-bind:href="
							$i18n.locale + '/survey/' + survey.survey_id
						"
						>{{ survey.question }}</a
					>
				</h3>
				<p>
					{{ $t('created') }} {{ survey.created_date }} {{ $t('at') }}
					{{ survey.created_time }}
				</p>
			</div>
		</div>
		<p v-if="surveys.length === 0">{{ $t('no_surveys') }}</p>
	</div>
</template>
<script>
import SurveyManager from '@/services/SurveyManager.js';

export default {
	name: 'SurveyList',
	data() {
		return {
			surveys: []
		};
	},
	async created() {
		this.surveys = await SurveyManager.getSurveys();
	}
};
</script>
<style lang="scss">
.survey {
	margin: 1rem 0;

	a {
		font-size: 20px;
		text-decoration: none;
		color: var(--grey);

		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
