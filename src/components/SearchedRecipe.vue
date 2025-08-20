<script setup>
      import { useSearch } from '@/stores/search';

      const recipeDetails = useSearch();

      function getIngredients(meal) {
            const ingredients = [];
            for (let index = 1; index <= 20; index++) {
                  const ingredient = meal[`strIngredient${index}`];
                  const measure = meal[`strMeasure${index}`];
                  if (ingredient && ingredient.trim() !== '') {
                        ingredients.push(`${ingredient}, ${measure}`); // add to array
                  }
            }
            return ingredients;
      }

      function getInstructions(meal) {
            return meal.strInstructions // check strInstructions if exsits
                  ? meal.strInstructions
                          .split('. ') // split in the sentence by .
                          .filter((step) => step.trim() !== '') // remove empty spaces
                  : []; // return empty array if no instructions
      }
</script>

<template>
      <div class="grid grid-cols-1 gap-8 p-14 place-items-center">
            <div
                  v-for="searchRecipe in recipeDetails.results"
                  :key="searchRecipe.idMeal"
                  class="max-w-2xl p-10 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl"
            >
                  <div class="space-y-4">
                        <img
                              :src="searchRecipe.strMealThumb"
                              :alt="searchRecipe.strMeal"
                              class="object-cover w-full rounded-lg h-96"
                        />

                        <h3
                              class="text-2xl font-semibold text-center text-gray-800"
                        >
                              {{ searchRecipe.strMeal }}
                        </h3>

                        <!-- Ingredients list -->
                        <div class="space-y-4">
                              <h4 class="text-lg font-bold">Ingredients:</h4>
                              <ul class="space-y-2 list-disc list-inside">
                                    <li
                                          v-for="(
                                                ingredient, index
                                          ) in getIngredients(searchRecipe)"
                                          :key="index"
                                    >
                                          {{ ingredient }}
                                    </li>
                              </ul>
                        </div>

                        <!-- Instructions -->
                        <div class="space-y-4">
                              <h4 class="text-lg font-bold">Instructions:</h4>
                              <ol class="space-y-2 list-decimal list-inside">
                                    <li
                                          v-for="(
                                                step, index
                                          ) in getInstructions(searchRecipe)"
                                          :key="index"
                                    >
                                          {{ step }}
                                    </li>
                              </ol>
                        </div>
                  </div>
            </div>
      </div>
</template>
