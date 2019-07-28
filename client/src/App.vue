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
      <p>Impressum</p>
      <p>Datenschutzerklärung</p>
      <p><a href="https://webdeasy.de/" target="_blank">Blog</a></p>
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

    &:hover {
      opacity: 1;
    }
  }
}
</style>
