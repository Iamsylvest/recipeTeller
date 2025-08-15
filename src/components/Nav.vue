<template>
      <div>
            <nav
                  class="fixed top-0 left-0 z-50 flex justify-between w-full gap-12 p-4 px-12 font-bold text-white bg-customGreen"
            >
                  <router-link to=""> <Logo /> </router-link>
                  <div class="flex items-end justify-end gap-12">
                        <router-link to=""> Search </router-link>
                        <router-link to=""> Recipe </router-link>
                        <router-link to="" class="whitespace-nowrap">
                              By Category
                        </router-link>
                  </div>
            </nav>
      </div>
</template>
<script setup>
      import Logo from '../assets/Logo.vue';
</script>
