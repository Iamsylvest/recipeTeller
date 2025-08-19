<script setup>
      import { useSearch } from '@/stores/search';

      const recipeDetails = useSearch();
</script>

<template>
      <div class="w-full max-w-5xl p-4 mx-auto">
            <div
                  v-for="searchRecipe in recipeDetails.results"
                  :key="searchRecipe.idMeal"
            >
                  <div class="flex flex-col items-center justify-center gap-4">
                        <img
                              :src="searchRecipe.strMealThumb"
                              alt="Meal Thumbnail"
                              class="w-full h-full max-h-96 max-w-[500px] rounded-lg"
                        />
                        <h2 class="text-xl sm:text-5xl">
                              {{ searchRecipe.strMeal }}
                        </h2>
                        <p>{{ searchRecipe.strInstructions }}</p>
                  </div>
            </div>
      </div>
</template>
