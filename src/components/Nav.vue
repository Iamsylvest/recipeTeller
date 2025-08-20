<template>
      <div>
            <nav
                  class="fixed top-0 left-0 z-50 flex justify-between w-full gap-12 p-4 px-12 font-bold text-white bg-customGreen"
            >
                  <div class="flex items-end justify-end gap-4">
                        <router-link to="/"> <Logo /> </router-link>
                        <div class="" v-if="!isSeeRecipePage">
                              <!-- Mobile Search Button -->
                              <button
                                    :disabled="isSeeRecipePage"
                                    @click="toggleHamburger"
                                    class="flex items-center gap-1 text-sm rounded md:hidden sm:text-md"
                                    :class="showHamburger ? '' : ''"
                              >
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          class="w-4 h-4"
                                    >
                                          <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                          />
                                    </svg>
                                    Search
                              </button>

                              <div>
                                    <!-- Desktop Search (always visible) -->
                                    <input
                                          v-model="recipeSearch.search"
                                          type="search"
                                          placeholder="Search..."
                                          class="hidden px-2 py-1 text-black border rounded outline-none md:block w-96"
                                    />
                                    <!-- Suggestions Dropdown -->
                                    <ul
                                          v-if="
                                                recipeSearch.recipeSuggestions
                                                      .length > 0
                                          "
                                          class="absolute z-50 w-64 h-64 p-4 mt-20 ml-[-19px] overflow-y-auto text-black bg-white border rounded shadow md:w-96 min-w-12 md:mt-1 md:ml-0"
                                    >
                                          <li
                                                v-for="item in recipeSearch.recipeSuggestions"
                                                :key="item.idMeal"
                                                @click="
                                                      recipeSearch.selectSuggestions(
                                                            item
                                                      )
                                                "
                                                class="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                          >
                                                {{ item.strMeal }}
                                          </li>
                                    </ul>
                              </div>
                        </div>

                        <!-- Mobile Search Input (below nav) -->
                        <div
                              v-if="!isSeeRecipePage"
                              v-show="showHamburger"
                              class="absolute w-64 top-16 md:hidden left-20"
                        >
                              <input
                                    v-model="recipeSearch.search"
                                    type="search"
                                    placeholder="Search..."
                                    class="w-full px-3 py-2 text-black border rounded"
                              />
                        </div>
                        <div
                              v-if="!isSeeRecipePage"
                              class="relative inline-block"
                              @mouseenter="recipeSearch.showDropdown"
                              @mouseleave="recipeSearch.hideDropdown"
                        >
                              <!-- Input with clear button -->
                              <div
                                    class="flex items-center w-full text-black rounded"
                              >
                                    <input
                                          type="text"
                                          v-model="recipeSearch.category"
                                          placeholder="Select Category"
                                          class="flex-1 w-32 text-white bg-transparent border-none placeholder:text-white placeholder:text-xs"
                                          readonly
                                    />

                                    <!-- Clear button -->
                                    <button
                                          v-if="recipeSearch.category"
                                          @click="recipeSearch.clearCategory"
                                          class="ml-2 text-white hover:text-gray-100"
                                    >
                                          ✕
                                    </button>
                              </div>

                              <!-- Dropdown -->
                              <ul
                                    v-if="recipeSearch.showList"
                                    class="absolute z-50 w-full bg-white border rounded shadow-lg"
                              >
                                    <li
                                          v-for="category in recipeSearch.categoryList"
                                          :key="category"
                                          @click="
                                                recipeSearch.selectCategory(
                                                      category
                                                );
                                                handleSeeCategoryResults(
                                                      category
                                                );
                                          "
                                          class="px-4 py-2 text-black cursor-pointer hover:bg-gray-200"
                                    >
                                          {{ category }}
                                    </li>
                              </ul>
                        </div>
                  </div>
            </nav>
      </div>
</template>
<script setup>
      import axios from 'axios';
      import { ref, watch, onMounted } from 'vue';
      import Logo from '../assets/Logo.vue';
      import { useSearch } from '@/stores/search';
      import { computed } from 'vue';
      import { useRoute } from 'vue-router';
      import { useRouter } from 'vue-router';
      const recipeSearch = useSearch();
      const showHamburger = ref(false);
      let debounceTimeout = null;
      let debounceTimeoutCategory = null;

      const route = useRoute();
      const router = useRouter();
      // Computed property that returns true if the user is on the see-recipe page
      const isSeeRecipePage = computed(() => route.path === '/see-recipe');

      const handleSeeCategoryResults = (results) => {
            recipeSearch.selectCategory(results);
            router.push('/see-Category-Results');
      };

      function toggleHamburger() {
            showHamburger.value = !showHamburger.value;
      }
      onMounted(() => {
            recipeSearch.fetchCategoryList(); // fetch only once when mounted
      });
      // Watch the store's query instead of a local ref
      watch(
            () => recipeSearch.search, // Watch the search input in the store
            async (newVal) => {
                  // 'async' allows us to use 'await' for API calls
                  // If skipWatcher is true, ignore this watcher run (used when clicking a suggestion)
                  if (recipeSearch.skipWatcher) {
                        recipeSearch.skipWatcher = false; // reset the flag for next updates
                        return; // exit the watcher early
                  }

                  // Clear any previously set debounce to avoid multiple calls
                  clearTimeout(debounceTimeout);

                  // Set a new debounce: wait 500ms after the user stops typing
                  debounceTimeout = setTimeout(async () => {
                        if (!newVal.trim()) {
                              // If the input is empty:
                              recipeSearch.isFetched = false; // mark results as not fetched
                              recipeSearch.results = []; // clear previous results
                              recipeSearch.recipeSuggestions = []; // ✅ clear suggestions too
                              recipeSearch.setQuery(''); // reset search input
                        } else {
                              // If the input has text:
                              await recipeSearch.fetchResultsRecipe(); // fetch results from API

                              // Filter the fetched results to create suggestions
                              // Only include items whose name includes the search text (case-insensitive)
                              recipeSearch.recipeSuggestions =
                                    recipeSearch.results.filter((item) =>
                                          item.strMeal
                                                .toLowerCase()
                                                .includes(newVal.toLowerCase())
                                    );
                        }
                  }, 500); // 500ms debounce delay
            }
      );

      watch(
            () => recipeSearch.category,
            (newVal) => {
                  clearTimeout(debounceTimeoutCategory);

                  debounceTimeoutCategory = setTimeout(() => {
                        if (!newVal.trim()) {
                              recipeSearch.isFetchedCategory = false;
                              recipeSearch.category = '';
                              recipeSearch.categoryResult = [];
                              recipeSearch.selectCategory('');
                        } else {
                              recipeSearch.isFetchedCategory = false;
                              recipeSearch.categoryResult = [];
                              recipeSearch.selectCategory(newVal);
                              recipeSearch.fetchCategoryResults();
                        }
                  }, 500);
            }
      );
</script>
