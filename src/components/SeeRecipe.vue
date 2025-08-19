<script setup>
      import { useSearch } from '@/stores/search';

      const seeOneMeal = useSearch();
</script>

<template>
      <div
            v-if="seeOneMeal.seeRecipe && seeOneMeal.seeRecipe.length > 0"
            class="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
            <div
                  v-for="oneMeal in seeOneMeal.seeRecipe"
                  :key="oneMeal.idMeal"
                  class="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl"
            >
                  <img
                        :src="oneMeal.strMealThumb"
                        :alt="oneMeal.strMeal"
                        class="object-cover w-full h-48"
                  />
                  <div class="flex flex-col items-center p-4">
                        <h3
                              class="text-lg font-semibold text-center text-gray-800"
                        >
                              {{ oneMeal.strMeal }}
                        </h3>
                        <button
                              class="px-4 py-2 mt-3 text-sm text-white transition-colors bg-green-500 rounded hover:bg-green-600"
                        >
                              See Recipe
                        </button>
                  </div>
            </div>
      </div>

      <p v-else class="p-6 text-center text-gray-500">No recipe selected.</p>
</template>
