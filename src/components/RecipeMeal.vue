<script setup>
      import { useRecipDetails } from '@/stores/RecipeDetails';
      import { useSearch } from '@/stores/search';
      import { ref } from 'vue';
      import { useRouter } from 'vue-router';

      import { onMounted, watch } from 'vue';
      const router = useRouter(); // ✅ initialize router
      const recipeDetails = useRecipDetails();
      const seeRecipe = useSearch();

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

      const handleSeeRecipe = (recipe) => {
            seeRecipe.selectOneMeal(recipe); // store selected meal
            router.push('/see-recipe'); // navigate
      };
</script>

<template>
      <div class="p-4">
            <div
                  class="px-12 text-4xl text-center md:text-7xl sm:text-left text-customGreen"
            >
                  <h1>Foods</h1>
            </div>

            <div
                  class="grid grid-cols-1 gap-4 p-12 cursor-pointer sm:grid-cols-2 md:grid-cols-3"
            >
                  <div
                        v-if="
                              !recipeDetails.recipes ||
                              recipeDetails.recipes.length === 0
                        "
                        class="text-2xl text-center text-gray-500 col-span-full"
                  >
                        loading foods....
                  </div>
                  <div
                        v-for="recipe in recipeDetails.recipes"
                        :key="recipe.idMeal"
                        class="bg-white rounded-lg shadow"
                  >
                        <!-- Image container with overflow-hidden -->
                        <div class="overflow-hidden rounded-t-lg">
                              <img
                                    :src="recipe.strMealThumb"
                                    :alt="recipe.strMeal"
                                    class="w-full h-[220px] object-cover transition-transform duration-300 hover:scale-105"
                              />
                        </div>
                        <div
                              class="flex flex-col p-2 text-lg text-center text-black"
                        >
                              {{ recipe.strMeal }}
                        </div>

                        <!-- Text stays visible -->
                        <p
                              class="flex flex-col p-2 text-lg text-center text-black"
                        >
                              <button
                                    @click="handleSeeRecipe(recipe)"
                                    class="text-sm text-customGreen hover:underline"
                              >
                                    See recipe
                              </button>
                        </p>
                  </div>
            </div>
            <div class="flex items-center justify-center">
                  <div class="flex items-center justify-center">
                        <button
                              class="p-1 px-4 bg-gray-300 rounded-lg cursor-pointer hover:bg-customGreen hover:text-white"
                              @click="recipeDetails.previousPage"
                              :disabled="recipeDetails.currentPage === 1"
                        >
                              Previous
                        </button>

                        <div class="p-1 px-4 text-nowrap">
                              <p>
                                    {{ recipeDetails.currentPage }} of
                                    {{ recipeDetails.lastPage }}
                              </p>
                        </div>

                        <button
                              class="p-1 px-4 bg-gray-300 rounded-lg cursor-pointer hover:bg-customGreen hover:text-white"
                              @click="recipeDetails.nextPage"
                              :disabled="
                                    recipeDetails.currentPage ===
                                    recipeDetails.lastpage
                              "
                        >
                              Next
                        </button>
                  </div>
            </div>
      </div>
</template>
