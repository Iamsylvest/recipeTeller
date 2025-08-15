<script setup>
      import { RouterLink, RouterView } from 'vue-router';
      import Nav from './components/Nav.vue';
      import Dashboard from './pages/Dashboard.vue';
</script>

<template>
      <header>
            <div>
                  <Nav />
                  <Dashboard />
            </div>
      </header>

      <RouterView />
</template>
