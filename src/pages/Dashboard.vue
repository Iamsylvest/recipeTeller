<script setup>
      import RecipeMeal from '../components/RecipeMeal.vue';
      import SearchedRecipe from '@/components/SearchedRecipe.vue';
      import { useSearch } from '@/stores/search';
      import CategoryResults from '@/components/CategoryResults.vue';
      const seeRecipe = useSearch();
</script>

<template>
      <div>
            <div class="flex items-center justify-center py-12">
                  <h1
                        class="relative text-xl font-semibold md:text-6xl text-customGreen top-7"
                  >
                        Welcome to Recipe Teller
                  </h1>
            </div>

            <div>
                  <img
                        src="../assets/images/recipebg.jpeg"
                        alt="Vegetables"
                        class="object-cover w-full h-96"
                  />
            </div>

            <div
                  class="flex items-center justify-center px-12 text-center sm:px-32"
            >
                  <p class="relative text-gray-700 text-md top-7">
                        Discover simple, delicious recipes you can make at home.
                        Whether you’re a beginner in the kitchen or a seasoned
                        cook, you’ll find easy-to-follow recipes, handy cooking
                        tips, and inspiration for every meal of the day. Let’s
                        get cooking!
                  </p>
            </div>

            <div class="relative mt-14">
                  <RecipeMeal
                        v-if="
                              !seeRecipe.results ||
                              seeRecipe.results.length === 0
                        "
                  />
                  <SearchedRecipe v-else />
            </div>
            <CategoryResults />
      </div>
</template>
