<template>
  <v-container>
    <SearchBar />
    <MovieList />
  </v-container>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import MovieList from '@/components/MovieList.vue';
export default {
  components: {
    SearchBar,
    MovieList,
  },
};
</script>
