<script setup>
      import router from '@/router';
      import { useSearch } from '@/stores/search';
      import Footer from '@/components/Footer.vue';
      const seeOneMeal = useSearch();

      // extract ingredients + measures
      function getIngredients(meal) {
            const ingredients = []; // make empty array to store ingredient + measure
            for (let i = 1; i <= 20; i++) {
                  // loop from 1 to 20 (API max ingredients)
                  const ingredient = meal[`strIngredient${i}`]; // get ingredient by key
                  const measure = meal[`strMeasure${i}`]; // get measure by key
                  if (ingredient && ingredient.trim() !== '') {
                        // check not empty/null
                        ingredients.push(`${measure} ${ingredient}`); // add to array
                  }
            }
            return ingredients; // return final list
      }

      // split instructions into steps
      function getInstructions(meal) {
            return meal.strInstructions // check if instructions exist
                  ? meal.strInstructions
                          .split('. ') // split by ". " into sentences
                          .filter((step) => step.trim() !== '') // remove empty steps
                  : []; // return empty array if no instructions
      }
</script>

<template>
      <div
            v-if="seeOneMeal.seeRecipe && seeOneMeal.seeRecipe.length > 0"
            class="flex items-center justify-center p-14"
      >
            <div
                  v-for="oneMeal in seeOneMeal.seeRecipe"
                  :key="oneMeal.idMeal"
                  class="max-w-2xl overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl"
            >
                  <div class="flex flex-col gap-6 p-6 text-justify">
                        <img
                              :src="oneMeal.strMealThumb"
                              :alt="oneMeal.strMeal"
                              class="object-cover w-full rounded-lg h-96"
                        />

                        <h3
                              class="text-2xl font-semibold text-center text-gray-800"
                        >
                              {{ oneMeal.strMeal }}
                        </h3>

                        <!-- Ingredients list -->
                        <div class="space-y-4">
                              <h4 class="text-lg font-bold">Ingredients:</h4>
                              <ul class="space-y-2 list-disc list-inside">
                                    <li
                                          v-for="(
                                                ingredient, index
                                          ) in getIngredients(oneMeal)"
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
                                          ) in getInstructions(oneMeal)"
                                          :key="index"
                                    >
                                          {{ step }}
                                    </li>
                              </ol>
                        </div>
                  </div>
            </div>
      </div>

      <p v-else class="p-6 text-center text-gray-500">No recipe selected.</p>

      <Footer />
</template>
