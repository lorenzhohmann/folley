<template>
	<div>
		<h2 class="main-color" id="new-survey">{{ $t('new_survey') }}</h2>

		<input type="text" v-model="question" :placeholder="$t('question')" />

		<div class="answer-area">
			<div class="answer-option" v-for="i in (0, answerCount)">
				<label :for="'answer-' + (i - 1)"
					>{{ $t('answer') }} {{ i }}</label
				>
				<input
					:id="'answer-' + (i - 1)"
					class="answer"
					type="text"
					placeholder="..."
					v-model="answers[i - 1]"
				/>
				<span
					class="removeAnswer"
					:title="$t('remove_answer')"
					v-if="answerCount > 2"
					@click="removeAnswer(i - 1)"
					>x</span
				>
			</div>
			<span
				class="add-answer"
				:title="$t('add_answer')"
				@click="addAnswer"
				v-if="answerCount < 50"
				>+</span
			>
		</div>

		<div class="btn small" @click="createSurvey">
			{{ $t('create_survey') }}
		</div>
	</div>
</template>

<script>
import SurveyManager from '@/services/SurveyManager.js';

export default {
	name: 'CreateSurvey',
	data() {
		return {
			question: '',
			answerCount: 2,
			answers: []
		};
	},
	methods: {
		createSurvey: async function() {
			const data = {
				question: this.question,
				answers: this.answers
			};

			try {
				const response = await SurveyManager.createSurvey(data);
				this.$router.push({ path: `/survey/${response['uuid']}` });
			} catch (err) {
				const errorCode = err.response.data.code;

				switch (errorCode) {
					case 'no-question':
						alert('Bitte gebe eine Frage ein!');
						break;
					case 'no-answers':
						alert(
							'Es müssen mindestens zwei Antworten vorhanden sein'
						);
						break;
				}
			}
		},
		addAnswer: function() {
			this.answerCount++;
		},
		removeAnswer: function(id) {
			this.answers = this.answers.filter((answer, index) => index !== id);
			this.answerCount--;
		}
	}
};
</script>

<style lang="scss">
h2 {
	margin-bottom: 1rem;
}

.answer-option {
	position: relative;
	margin: 1rem 0;

	.removeAnswer {
		color: var(--lighter-grey);
		position: absolute;
		font-weight: bold;
		right: 12px;
		font-size: 1.2em;
		top: 28px;
		transition: 0.2s ease all;
		cursor: pointer;

		&:hover {
			color: var(--red);
		}
	}

	label {
		color: var(--grey);
	}

	input {
		padding: 10px 20px;
		font-size: 1em;
		border: 2px solid var(--lighter-grey);

		&:hover,
		&:focus {
			border: 2px solid var(--main-color);
		}
	}
}

.answer-area {
	margin-top: 2rem;
	width: 50%;

	.add-answer {
		border: 2px solid var(--main-color);
		color: var(--main-color);
		display: inline-block;
		font-size: 1.6em;
		cursor: pointer;
		padding: 0 11px;
		opacity: 0.8;
		transition: 0.2s ease all;

		&:hover {
			opacity: 1;
		}
	}
}
</style>
