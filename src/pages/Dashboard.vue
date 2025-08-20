<script setup>
      import RecipeMeal from '../components/RecipeMeal.vue';
      import SearchedRecipe from '@/components/SearchedRecipe.vue';
      import { useSearch } from '@/stores/search';
      import CategoryResults from '@/components/CategoryResults.vue';
      import Footer from '@/components/Footer.vue';
      const seeRecipe = useSearch();
</script>

<template>
      <div class="space-y-6">
            <div class="flex items-center justify-center py-12">
                  <h1
                        class="relative text-2xl font-semibold leading-tight sm:text-5xl text-customGreen top-9 md:top-12 font-cursive"
                  >
                        Welcome to Recipe Teller
                  </h1>
            </div>

            <div
                  class="flex items-center justify-center px-12 text-center sm:px-64"
            >
                  <p
                        class="max-w-2xl mt-6 text-base leading-relaxed text-gray-700 sm:text-lg"
                  >
                        Discover simple, delicious recipes you can make at home.
                        Whether you’re a beginner in the kitchen or a seasoned
                        cook, you’ll find easy-to-follow recipes, handy cooking
                        tips, and inspiration for every meal of the day. Let’s
                        get cooking!
                  </p>
            </div>

            <div class="relative">
                  <RecipeMeal
                        v-if="
                              !seeRecipe.results ||
                              seeRecipe.results.length === 0
                        "
                  />
                  <SearchedRecipe v-else />
            </div>
            <CategoryResults />

            <Footer />
      </div>
</template>
