<template>
	<div class="result-view">
		<h2>{{ $t('result') }} - {{ totalVotes }} {{ $t('votes') }}</h2>

		<div class="vote-results">
			<div class="answer" v-for="vote in votes">
				<p>
					<b>{{ vote.answer }}</b
					>: {{ vote.votes }} {{ $t('votes') }}
				</p>
				<span class="bar">
					<span
						class="progress"
						v-bind:style="'width:' + vote.percent + '%'"
					></span>
					<span
						class="percent-value"
						v-bind:style="'left:' + (vote.percent + 1) + '%'"
						>{{ vote.percent }} %</span
					>
				</span>
			</div>
		</div>

		<span class="btn small outline" @click="getVotes">{{
			$t('refresh_result')
		}}</span>

		<p
			class="color-light-grey change-view"
			@click="$emit('change-view', 'survey')"
		>
			{{ $t('to_survey') }}
		</p>
	</div>
</template>
<script>
import SurveyManager from '@/services/SurveyManager.js';

export default {
	name: 'ResultView',
	props: ['survey', 'uuid'],
	data() {
		return {
			votes: [],
			totalVotes: 0
		};
	},
	async created() {
		this.uuid = this.$route.params['uuid'];
		this.getVotes();
	},
	methods: {
		getVotes: async function() {
			this.votes = [];
			this.totalVotes = 0;
			this.votes = await SurveyManager.getVotes(this.uuid);
			this.votes.map(vote => (this.totalVotes += vote.votes));

			// calc percent values
			this.votes.forEach(vote => {
				vote.percent =
					Math.round((100 / this.totalVotes) * vote.votes * 10) / 10;
			});
		}
	}
};
</script>

<style lang="scss">
.vote-results {
	margin: 3rem 0;

	.answer {
		margin: 1rem 0;
	}
}
.bar {
	width: 100%;
	display: block;
	height: 2rem;
	position: relative;
	background-color: var(--light-grey);

	.progress {
		position: absolute;
		left: 0;
		top: 0;
		background-color: var(--main-color);
		height: 2rem;
	}

	.percent-value {
		position: absolute;
		right: 1rem;
		color: var(--grey);
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>
