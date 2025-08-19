<script setup>
      import { useSearch } from '@/stores/search';
      import { onMounted } from 'vue';
      const searchFoodCategory = useSearch();

      onMounted(() => {
            searchFoodCategory.fetchCategoryResults();
      });
</script>
<template>
      <div class="p-12">
            <div
                  v-for="categoryFoods in searchFoodCategory.categoryResults"
                  :key="categoryFoods.idMeal"
            >
                  <div>
                        {{ categoryFoods.strMeal }}
                  </div>
                  <div></div>
                  <div>
                        <img
                              :src="categoryFoods.strMealThumb"
                              alt="Meal thumbnail"
                              class="object-cover w-32 h-32"
                        />
                  </div>
            </div>
      </div>
</template>
