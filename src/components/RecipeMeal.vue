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
                  class="px-12 text-2xl text-center md:text-7xl sm:text-left text-customGreen"
            >
                  <h1 class="font-cursive">Foods</h1>
            </div>

            <div class="p-12">
                  <div
                        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  >
                        <!-- Loading state -->
                        <div
                              v-if="
                                    !recipeDetails.recipes ||
                                    recipeDetails.recipes.length === 0
                              "
                              class="text-xl font-medium text-center text-gray-500 col-span-full"
                        >
                              <Vue3Lottie
                                    animationLink="/src/assets/LoadingAnimationBlue.json"
                                    :loop="true"
                                    :autoplay="true"
                                    style="width: 150px; height: 150px"
                                    class="text-customGreen"
                              />
                              <p class="font-cursive">Searching for meals...</p>
                        </div>

                        <!-- Recipe cards -->
                        <div
                              v-for="recipe in recipeDetails.recipes"
                              :key="recipe.idMeal"
                              class="overflow-hidden transition duration-300 bg-white shadow-md rounded-xl hover:shadow-lg group"
                        >
                              <!-- Image with hover zoom -->
                              <div class="overflow-hidden">
                                    <img
                                          :src="recipe.strMealThumb"
                                          :alt="recipe.strMeal"
                                          class="object-cover w-full h-56 transition-transform duration-500 group-hover:scale-110"
                                    />
                              </div>

                              <!-- Content -->
                              <div
                                    class="flex flex-col items-center p-4 text-center"
                              >
                                    <h3
                                          class="mb-2 text-lg font-semibold text-gray-800"
                                    >
                                          {{ recipe.strMeal }}
                                    </h3>

                                    <button
                                          @click="handleSeeRecipe(recipe)"
                                          class="px-4 py-1 text-sm font-medium transition duration-300 border rounded-full text-customGreen border-customGreen hover:bg-customGreen hover:text-white"
                                    >
                                          See Recipe
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
            <div class="flex items-center justify-center">
                  <div
                        v-if="
                              recipeDetails.recipes &&
                              recipeDetails.recipes.length > 0
                        "
                        class="flex items-center justify-center"
                  >
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
