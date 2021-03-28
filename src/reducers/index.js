/* eslint-disable no-unused-vars */
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_CHECKOUT":
      function leerCookie(nombre) {
        var lista = document.cookie.split(";");
        var micookie;
        for (let i = 0; i < lista.length; i++) {
          var busca = lista[i].search(nombre);
          if (busca > -1) {
            micookie = lista[i];
            var igual = micookie.indexOf("=");
            var valor = micookie.substring(igual + 1);
            return valor;
          }
        }
      }
      function cokies() {
        if (
          leerCookie("name") !== undefined &&
          leerCookie("id") !== undefined
        ) {
          let user = {
            email: leerCookie("email"),
            name: leerCookie("name"),
            id: leerCookie("id"),
          };
          return user;
        } else {
          let user = {
            email: "",
            name: "",
            id: "",
          };
          return user;
        }
      }

      return {
        ...state,
        user: cokies(),
      };
    case "COURSES_ADD":

      return {
        ...state,
        trends: action.payload.filter(
          (item) => item.contentRating === "make" && item._id
        ),
        originals: action.payload.filter(
          (item) => item.contentRating === "moon" && item._id
        ),
      };
    case "COURSES_ADD_USER":

      const userMovieTrends = state.trends.filter((movie) => {
        let isUserMovie = action.payload.some(
          (userHas) => userHas.movieId === movie._id
        );
        return isUserMovie;
      });

      const userMovieOriginals = state.originals.filter((movie) => {
        let isUserMovie = action.payload.some(
          (userHas) => userHas.movieId === movie._id
        );
        return isUserMovie;
      });

      const userMovieList = userMovieTrends.concat(userMovieOriginals);

      return {
        ...state,
        myList: userMovieList,
      };
    case "SET_FAVORITE":
      return {
        ...state,
        myList: [...state.myList, action.payload],
      };
    case "DELETE_FAVORITE":
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload),
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_REQUEST":
      return {
        ...state,
        user: action.payload,
      };
    case "REGISTER_REQUEST":
      return {
        ...state,
        user: action.payload,
      };
    case "GET_VIDEO_SOURCE":
      return {
        ...state,
        playing:
          state.trends.find((item) => item.id === action.payload) ||
          state.originals.find((item) => item.id === action.payload) ||
          {},
        // [],
      };
    case "SEARCH_API":
      var searchResult1 = "";
      var searchResult2 = "";
      var result = [];

      if (action.payload === "") {
        searchResult1 = "";
        searchResult2 = "";
        result = [];
      } else {
        searchResult1 = state.trends.filter(
          (word) =>
            word.title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1
        );
        searchResult2 = state.originals.filter(
          (word) =>
            word.title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1
        );
        result = searchResult1.concat(searchResult2);
      }

      return {
        ...state,
        search: result,
      };
    default:
      return state;
  }
};

export default reducer;
