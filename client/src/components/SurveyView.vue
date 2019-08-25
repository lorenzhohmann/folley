<template>
	<div class="survey-view">
		<h3>
			{{ $t('created') }} {{ survey.created_date }} {{ $t('at') }}
			{{ survey.created_time }} {{ $t('clock') }}
		</h3>
		<div class="name-container">
			<input type="text" v-model="name" :placeholder="$t('your_name')" />
		</div>
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
		<div class="action-container">
			<div class="btn-container">
				<span class="btn small" @click="vote">{{ $t('vote') }}</span>
				<p
					class="color-light-grey change-view"
					@click="$emit('change-view', 'results')"
				>
					{{ $t('view_results') }}
				</p>
			</div>
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
		</div>
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
			name: '',
			checkedAnswers: []
		};
	},
	methods: {
		vote: async function() {
			if (this.checkedAnswers.length == 0) {
				this.setAlert('alerts.min_one_answer', 'red');
				return false;
			}
			if (this.name == '') {
				this.setAlert('alerts.no_name', 'red');
				return false;
			}
			if (this.getCookie('voted-' + this.uuid) === 'true') {
				this.setAlert('alerts.already_voted', 'red');
				return false;
			}

			try {
				const response = await SurveyManager.vote(
					this.uuid,
					this.name,
					this.checkedAnswers
				);
				this.setAlert('alerts.vote_success');
				this.setCookie('voted-' + this.uuid, 'true', 1);

				var th = this;
				setTimeout(function() {
					th.view = 'results';
				}, 3000);
			} catch (err) {
				this.setAlert('alerts.default_error', 'red');
			}
		},
		setCookie: function(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
			var expires = 'expires=' + d.toUTCString();
			document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
		},
		getCookie: function(cname) {
			var name = cname + '=';
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return '';
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
