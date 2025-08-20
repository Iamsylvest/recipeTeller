import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/pages/Dashboard.vue';
import SeeRecipe from '@/components/SeeRecipe.vue';
import CategoryResults from '@/components/CategoryResults.vue';
const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
            { name: 'SeeRecipe', path: '/see-Recipe', component: SeeRecipe },

            { name: 'Dashboard', path: '/', component: Dashboard },

            {
                  name: 'CategoryResults',
                  path: '/see-Category-Results',
                  component: CategoryResults,
            },
      ],
});

export default router;
