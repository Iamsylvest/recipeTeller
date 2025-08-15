<script setup>
      import { useRecipDetails } from '@/stores/RecipeDetails';

      import { onMounted, watch } from 'vue';

      const recipeDetails = useRecipDetails();

      watch(
            () => recipeDetails.currentPage, // 👈 watching the reactive property
            () => {
                  recipeDetails.getRecipeDetails(); // re-run fetch/slice when pages changes, 👈 runs whenever currentPage changes
            },
            { immediate: true }
      );

      onMounted(() => {
            recipeDetails.getRecipeDetails(); //fetch recipe on moint
      });
      // Function to get all formatted ingredients for a recipe
      const getIngredients = (recipe) => {
            // Create an empty array to store ingredients
            const list = [];

            // Loop from 1 to 20 because TheMealDB API has up to 20 ingredients per recipe
            for (let i = 1; i <= 20; i++) {
                  // Dynamically access the ingredient name, e.g., recipe.strIngredient1, recipe.strIngredient2...
                  const ingredient = recipe[`strIngredient${i}`];

                  // Dynamically access the ingredient measure, e.g., recipe.strMeasure1, recipe.strMeasure2...
                  const measure = recipe[`strMeasure${i}`];

                  // Only include the ingredient if it exists and is not an empty string
                  if (ingredient && ingredient.trim() !== '') {
                        // Add a formatted string to the list
                        // measure?.trim() → remove spaces, and use empty string if measure is null
                        // ingredient.trim() → remove spaces from ingredient name
                        list.push(
                              `${measure?.trim() || ''} ${ingredient.trim()}`
                        );
                  }
            }

            // Return the array of formatted ingredients
            return list;
      };
</script>

<template>
      <div class="flex items-end justify-end gap-4 px-24">
            <button
                  @click="recipeDetails.previousPage"
                  :disabled="recipeDetails.currentPage === 1"
            >
                  Previous
            </button>
            <div>
                  <p>
                        {{ recipeDetails.currentPage }} of
                        {{ recipeDetails.lastPage }}
                  </p>
            </div>
            <button
                  @click="recipeDetails.nextPage"
                  :disabled="
                        recipeDetails.currentPage === recipeDetails.lastpage
                  "
            >
                  Next
            </button>
      </div>
      <div
            v-for="recipe in recipeDetails.recipes"
            :key="recipe.idMeal"
            class="grid items-center grid-cols-1 gap-6 sm:grid-cols-2 justify-items-center"
      >
            <div
                  class="flex flex-col items-center justify-center p-4 text-center text-white"
            >
                  <img
                        :src="recipe.strMealThumb"
                        :alt="recipe.strMeal"
                        class="w-[650px] h-[600px]"
                  />

                  <p class="p-2 px-2 mt-2 text-3xl text-black">
                        {{ recipe.strMeal }}
                  </p>
            </div>
            <div class="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2">
                  <!-- Ingredients -->
                  <div class="max-w-sm">
                        <h3 class="mb-2 font-semibold">Ingredients</h3>
                        <ul class="text-sm list-disc list-inside">
                              <li
                                    v-for="(item, index) in getIngredients(
                                          recipe
                                    )"
                                    :key="index"
                              >
                                    {{ item }}
                              </li>
                        </ul>
                  </div>

                  <!-- Steps -->
                  <div class="max-w-md">
                        <h3 class="mb-2 font-semibold">Steps</h3>
                        <div
                              class="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2"
                        >
                              <div
                                    v-for="(
                                          step, index
                                    ) in recipe.strInstructions.split('. ')"
                                    :key="index"
                                    class="p-1 bg-gray-100 rounded"
                              >
                                    <strong>{{ index + 1 }}.</strong>
                                    {{ step }}.
                              </div>
                        </div>
                  </div>
            </div>
      </div>
</template>
