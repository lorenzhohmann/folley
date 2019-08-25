<template>
	<div class="result-view">
		<h2>{{ $t('result') }} - {{ totalVotes }} {{ $t('votes') }}</h2>

		<div class="vote-results">
			<div class="answer" v-for="vote in votes">
				<p>
					<b>{{ vote.answer }}</b
					>: {{ vote.votes }} {{ $t('votes') }}
				</p>
				<span class="bar" @click="showVoters(vote.id)">
					<span
						class="progress"
						v-bind:style="'width:' + vote.percent + '%'"
					></span>
					<span
						class="percent-value"
						v-bind:style="
							'left:' +
								(vote.percent > 50 ? 1 : vote.percent + 1) +
								'%'
						"
						>{{ vote.percent }} %</span
					>
				</span>
				<div class="voter" v-if="showVoter == vote.id">
					<span class="close-voters" @click="showVoter = 0">x</span>
					<span class="fake-hl">{{ $t('votet_for') }}</span>
					<p v-for="name in vote.names">{{ name }}</p>
				</div>
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
			totalVotes: 0,
			showVoter: 0
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
			this.votes.forEach(async vote => {
				vote.percent =
					Math.round((100 / this.totalVotes) * vote.votes * 10) / 10;
			});

			console.log(this.votes);
		},
		showVoters(answerID) {
			this.showVoter = answerID == this.showVoter ? 0 : answerID;
		}
	}
};
</script>

<style lang="scss">
.vote-results {
	margin: 3rem 0;

	.answer {
		margin: 2rem 0;
	}
}
.voter {
	border: 2px solid;
	display: flex;
	border-top: none;
	padding: 1rem;
	flex-wrap: wrap;
	position: relative;

	.close-voters {
		position: absolute;
		cursor: pointer;
		top: 5px;
		right: 10px;
		font-weight: bold;
	}

	.fake-hl {
		width: 100%;
		margin-bottom: 1rem;
		padding-left: 1rem;
		font-weight: 600;
		color: var(--grey);
	}

	p {
		width: 20%;
		padding: 0.5rem 1rem;
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
