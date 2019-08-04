<template>
  <div id="app">
    <header>
      <router-link tag="p" to="/">
        folley.
      </router-link>
      <LanguageSwitcher />
    </header>

    <router-view />

    <footer>
      <p>
        <a href="https://webdeasy.de/impressum/" target="_blank">{{
          $t('imprint')
        }}</a>
      </p>
      <p>
        <a href="https://webdeasy.de/datenschutzerklaerung/" target="_blank">{{
          $t('data_privacy')
        }}</a>
      </p>
      <p>
        <a href="https://webdeasy.de/" target="_blank">{{ $t('blog') }}</a>
      </p>
    </footer>
  </div>
</template>

<script>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

export default {
  name: 'App',
  components: { LanguageSwitcher }
};
</script>

<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;

  .locale-changer {
  }

  p {
    font-size: 2em;
    font-weight: 800;
    opacity: 0.8;
    transition: 0.2s ease all;
    cursor: pointer;
    color: var(--main-color);

    &:hover {
      opacity: 1;
    }
  }
}
</style>
