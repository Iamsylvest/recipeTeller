import { defineStore } from 'pinia';
import axios from 'axios';

export const useRecipDetails = defineStore('recipe', {
      state: () => ({
            allRecipes: [], // store ALL fetched recipes
            recipes: [], // store only the current page slice
            currentPage: 1,
            lastPage: 1,
            fetchedRecipes: false,
            errorRecipes: null,
            searchRecipe: '',
      }),

      actions: {
            async getRecipeDetails() {
                  // ✅ If recipes are already fetched, just re-apply pagination
                  if (this.fetchedRecipes) {
                        this.applyPagination();
                        return;
                  }

                  this.errorRecipes = null;

                  // ✅ API setup
                  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
                  const base_url = import.meta.env.VITE_MEALDB_BASE_URL;
                  const apiKey = import.meta.env.VITE_MEALDB_API_KEY;

                  try {
                        let allRecipes = [];

                        // ✅ Fetch recipes for every letter A–Z
                        for (const letter of letters) {
                              const response = await axios.get(
                                    `${base_url}/${apiKey}/search.php?f=${letter}`
                              );

                              // ✅ If meals exist for this letter, add them to the master list
                              if (response.data.meals) {
                                    allRecipes = allRecipes.concat(
                                          response.data.meals
                                    );
                              }
                        }

                        // ✅ Sort all recipes alphabetically by meal name
                        allRecipes = allRecipes.sort((a, b) =>
                              a.strMeal.localeCompare(b.strMeal)
                        );

                        // ✅ Store all recipes in memory
                        this.allRecipes = allRecipes;

                        // ✅ Calculate how many pages are needed (10 per page)
                        const perPage = 6;
                        this.lastPage = Math.ceil(
                              this.allRecipes.length / perPage
                        );

                        // ✅ Show the first page by slicing
                        this.applyPagination();

                        // ✅ Mark recipes as already fetched (so we don’t refetch again)
                        this.fetchedRecipes = true;

                        console.log(
                              `Fetched recipes for page ${this.currentPage} of ${this.lastPage}:`,
                              this.recipes
                        );
                  } catch (error) {
                        console.error('Failed to fetch recipes:', error);
                        this.errorRecipes = 'Could not load recipes';
                  }
            },

            applyPagination() {
                  // ✅ Show only recipes for the current page
                  const perPage = 6;
                  const start = (this.currentPage - 1) * perPage; // starting index
                  const end = start + perPage; // ending index
                  this.recipes = this.allRecipes.slice(start, end); // slice 10 recipes
            },

            nextPage() {
                  // ✅ Move to next page if not at the last page
                  if (this.currentPage < this.lastPage) {
                        this.currentPage++;
                        this.applyPagination(); // update displayed recipes
                  }
            },

            previousPage() {
                  // ✅ Move to previous page if not at the first page
                  if (this.currentPage > 1) {
                        this.currentPage--;
                        this.applyPagination(); // update displayed recipes
                  }
            },
      },
});
