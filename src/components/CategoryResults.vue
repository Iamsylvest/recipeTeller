<script setup>
      import router from '@/router';
      import { useSearch } from '@/stores/search';
      import Footer from '@/components/Footer.vue';

      const searchFoodCategory = useSearch();
      // In your component
      const getOneMealRecipe = async (meal) => {
            try {
                  // 1. Call the API again using the meal's unique ID
                  //    This ensures we get the FULL details (ingredients, instructions, etc.)
                  const response = await fetch(
                        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                  );

                  // 2. Convert the raw response into JSON format
                  const data = await response.json();

                  // 3. Check if the API actually returned any meals
                  if (data.meals && data.meals.length > 0) {
                        // 4. Save the first meal (with full details) into your Pinia store
                        //    so the "see-recipe" page can display all info correctly
                        searchFoodCategory.selectOneMeal(data.meals[0]);

                        // 5. Navigate to the "see-recipe" page
                        router.push('/see-recipe');
                  }
            } catch (err) {
                  // 6. If anything goes wrong (like no internet or invalid response),
                  //    log the error so you can debug it
                  console.error('Failed to fetch recipe:', err);
            }
      };
</script>
<template>
      <div class="p-12 mt-12 space-y-4">
            <div
                  class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
                  <!-- Category cards -->
                  <div
                        v-for="meal in searchFoodCategory.categoryResults"
                        :key="meal.idMeal"
                        class="overflow-hidden transition duration-300 bg-white shadow-md rounded-xl hover:shadow-lg group"
                  >
                        <!-- Image with hover zoom -->
                        <div class="overflow-hidden">
                              <img
                                    :src="meal.strMealThumb"
                                    :alt="meal.strMeal"
                                    class="object-cover w-full h-56 transition-transform duration-500 group-hover:scale-110"
                              />
                        </div>

                        <!-- Content -->
                        <div class="flex flex-col items-center p-4 text-center">
                              <h3
                                    class="mb-2 text-lg font-semibold text-gray-800"
                              >
                                    {{ meal.strMeal }}
                              </h3>

                              <button
                                    @click="getOneMealRecipe(meal)"
                                    class="px-4 py-1 text-sm font-medium transition duration-300 border rounded-full text-customGreen border-customGreen hover:bg-customGreen hover:text-white"
                              >
                                    See Recipe
                              </button>
                        </div>
                  </div>
            </div>
      </div>
      <footer
            v-if="
                  searchFoodCategory.categoryResults &&
                  searchFoodCategory.categoryResults.length > 0
            "
            class="py-6 mt-12 text-center text-gray-300 bg-customGreen font-cursive"
      >
            <div class="space-y-2">
                  <p class="font-semibold text-xm sm:text-lg">
                        Recipe Teller © 2025
                  </p>
                  <p class="text-xs italic sm:text-sm">
                        Sharing simple recipes with big flavors.
                  </p>
                  <p class="text-sm">
                        Powered by
                        <a
                              href="https://www.themealdb.com/"
                              target="_blank"
                              class="text-xs text-yellow-400 hover:underline sm:text-sm"
                              >TheMealDB API</a
                        >
                  </p>
                  <p class="text-xs sm:text-sm">
                        Made with ❤️ for food lovers everywhere.
                  </p>
            </div>
      </footer>
</template>
