import { defineStore } from 'pinia';
import axios from 'axios';

export const useSearch = defineStore('search', {
      state: () => ({
            search: '',
            isFetched: false,
            isFetchedCategory: false,
            errorMessage: null,
            results: [],
            category: '',
            categoryList: [],
            showList: false,
            categoryResults: [],
            recipeSuggestions: [],
            skipWatcher: false,
            seeRecipe: [],
            mealName: null,
      }),

      getters: {},

      actions: {
            selectOneMeal(value) {
                  // Store the full recipe object directly
                  this.seeRecipe = [value];
            },
            selectSuggestions(suggestions) {
                  this.recipeSuggestions = []; // optional: replace suggestions with clicked item
                  this.search = suggestions.strMeal; // set input to clicked suggestion
                  this.fetchResultsRecipe();
                  this.skipWatcher = true;
            },
            // Delay to allow clicking on a suggesiotns
            selectCategory(category) {
                  this.category = category;
                  this.fetchCategoryResults();
            },
            clearCategory() {
                  this.category = '';
            },
            showDropdown() {
                  this.showList = true;
            },
            hideDropdown() {
                  this.showList = false;
            },
            setQuery(value) {
                  // Check if the value exists, is an object, and has a 'strMeal' property
                  if (value && typeof value === 'object' && value.strMeal) {
                        // If it's an object from API, set the search input to the meal name
                        this.search = value.strMeal;
                  } else {
                        // Otherwise, just use the value as-is (likely a string typed by the user)
                        this.search = value;
                  }
            },
            async fetchCategoryResults() {
                  try {
                        const response = await axios.get(
                              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.category}`
                        );

                        this.categoryResults = response.data.meals
                              ? response.data.meals
                              : [];
                  } catch (error) {
                        console.error('Failed to fetch category meal', error);
                        this.categoryResults = [];
                  }
            },

            async fetchCategoryList() {
                  try {
                        const response = await axios.get(
                              `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
                        );
                        this.categoryList = response.data.meals.map(
                              (item) => item.strCategory
                        );
                  } catch (error) {
                        console.error('Failed to fetch categories:', error);
                  }
            },

            async fetchResultsRecipe() {
                  if (!this.search) return;

                  try {
                        const response = await axios.get(
                              `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.search}`
                        );

                        console.log('Recipes Fetched', response.data);
                        this.results = response.data.meals || [];

                        this.isFetched = true;
                  } catch (error) {
                        console.error('Failed to fetch recipe:', error);
                        this.errorMessage = 'Could not load recipe details';
                  }
            },

            async fetchSeeRecipe() {
                  try {
                        const response = await axios.get(
                              `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.mealName}`
                        );
                        console.log('Meal recipe fetched', response.data);
                        this.seeRecipe = response.data.meal
                              ? response.data.meal[0]
                              : null;
                  } catch (error) {
                        console.error('Failed to fetch one recipe meal', error);
                  }
            },
      },
});
