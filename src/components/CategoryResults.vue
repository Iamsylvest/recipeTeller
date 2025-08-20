<script setup>
      import { useSearch } from '@/stores/search';

      const searchFoodCategory = useSearch();
</script>
<template>
      <div class="p-12">
            <div
                  class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
                  <!-- Loading state -->
                  <div
                        v-if="
                              !searchFoodCategory.categoryResults ||
                              searchFoodCategory.categoryResults.length === 0
                        "
                        class="text-xl font-medium text-center text-gray-500 col-span-full"
                  >
                        Loading foods...
                  </div>

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
                                    class="px-4 py-1 text-sm font-medium transition duration-300 border rounded-full text-customGreen border-customGreen hover:bg-customGreen hover:text-white"
                              >
                                    View Details
                              </button>
                        </div>
                  </div>
            </div>
      </div>
</template>
