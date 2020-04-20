import axios from 'axios';
import { API_KEY, API_URL } from '../plugins/apiplugins';

export default {
  namespaced: true,
  state: () => ({
    title: '',
    loading: false,
    movies: [],
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    },
    pushIntoMovies(state, movies) {
      state.movies.push(...movies);
    },
  },
  actions: {
    fetchMovies({ state, commit }, pageNum) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async resolve => {
        const res = await axios.get(
          `${API_URL}?apikey=${API_KEY}&s=${state.title}&page=${pageNum}`,
        );
        commit('pushIntoMovies', res.data.Search);
        resolve(res.data);
      });
    },
    async getData({ commit, dispatch }) {
      commit('updateState', {
        loading: true,
        movies: [],
      });

      const { totalResults } = await dispatch('fetchMovies', 1);
      const pageLength = Math.ceil(totalResults / 10);

      if (pageLength > 1) {
        for (let i = 2; i <= pageLength; i += 1) {
          if (i > 4) break;
          await dispatch('fetchMovies', i);
        }
      }

      commit('updateState', {
        loading: false,
      });
    },
  },
};
