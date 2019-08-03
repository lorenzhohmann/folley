<template>
	<div class="survey-view">
		<h3>
			Erstellt am {{ survey.created_date }} um
			{{ survey.created_time }} Uhr
		</h3>
		<div class="answer-container">
			<div class="row" v-for="answer in survey.answers">
				<input
					v-bind:id="'answer' + answer.id"
					type="checkbox"
					v-bind:value="answer.id"
					v-model="checkedAnswers"
				/>
				<label v-bind:for="'answer' + answer.id">{{
					answer.answer
				}}</label>
			</div>
		</div>
		<span class="btn small" @click="vote">Abstimmen</span>
		<span
			class="alert"
			v-bind:class="{
				red: alert.colorClass == 'red',
				green: alert.colorClass == 'green'
			}"
			v-if="alert"
		>
			{{ $t(alert.msg) }}
		</span>
		<p
			class="color-light-grey change-view"
			@click="$emit('change-view', 'results')"
		>
			Ergebnisse anschauen
		</p>
	</div>
</template>
<script>
import SurveyManager from '@/services/SurveyManager.js';

export default {
	name: 'SurveyView',
	props: ['survey', 'uuid'],
	data() {
		return {
			alert: [],
			checkedAnswers: []
		};
	},
	methods: {
		vote: async function() {
			if (this.checkedAnswers.length == 0) {
				this.setAlert('alerts.min_one_answer', 'red');
				return false;
			}

			try {
				const response = await SurveyManager.vote(
					this.uuid,
					this.checkedAnswers
				);
				this.setAlert('alerts.vote_success');

				var th = this;
				setTimeout(function() {
					th.view = 'results';
				}, 3000);
			} catch (err) {
				this.setAlert('alerts.default_error', 'red');
			}
		},
		setAlert: function(msg, colorClass = '') {
			const newAlert = {
				msg,
				colorClass
			};
			this.alert = newAlert;
		},
		removeAlert: function() {
			this.alert = [];
		}
	}
};
</script>
