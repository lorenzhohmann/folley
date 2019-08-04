<template>
	<div class="home">
		<div class="container">
			<section>
				<h1>{{ $t('create_surveys') }}</h1>
				<h2>{{ $t('free_safe_fast') }}</h2>
				<div class="graphic"></div>
				<a href="#new-survey" class="btn red">
					{{ $t('create_survey') }}
				</a>
			</section>
			<section class="auto-margin">
				<CreateSurvey />
			</section>
			<section class="auto-margin">
				<SurveyList />
			</section>
		</div>
	</div>
</template>

<script>
import CreateSurvey from '@/components/CreateSurvey.vue';
import SurveyList from '@/components/SurveyList.vue';

export default {
	name: 'Home',
	components: {
		CreateSurvey,
		SurveyList
	}
};
</script>

<style lang="scss">
.home {
	section {
		&.auto-margin {
			margin: 10rem 0;
		}

		&:first-child {
			height: 90vh;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.graphic {
			background-image: url(../assets/survey-graphic.png);
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
			width: 60rem;
			height: 60rem;
			top: -8rem;

			position: absolute;
			z-index: -1;
			opacity: 0.5;
			animation: scale 0.8s;
		}

		.btn {
			margin-top: 2rem;
		}

		@keyframes scale {
			0% {
				opacity: 0;
				transform: scale(0);
			}
			100% {
				opacity: 0.5;
				transform: scale(1);
			}
		}
	}
}
</style>
