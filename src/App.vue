<script setup>
      import { RouterLink, RouterView } from 'vue-router';
      import Nav from './components/Nav.vue';
      import SearchedRecipe from '@/components/SearchedRecipe.vue';
      import Dashboard from './pages/Dashboard.vue';
</script>

<template>
      <header>
            <div>
                  <Nav />
            </div>
      </header>

      <RouterView />
</template>
