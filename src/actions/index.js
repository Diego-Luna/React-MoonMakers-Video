// datos
import axios from "axios";
import env from "react-dotenv";

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

export const setFavorite = (payload) => ({
  type: "SET_FAVORITE",
  payload,
});

export const deleteFavorite = (payload) => ({
  type: "DELETE_FAVORITE",
  payload,
});

export const loginRequest = (payload) => ({
  type: "LOGIN_REQUEST",
  payload,
});

export const logoutRequest = (payload) => ({
  type: "LOGOUT_REQUEST",
  payload,
});

export const registerRequest = (payload) => ({
  type: "REGISTER_REQUEST",
  payload,
});

export const getVideoSource = (payload) => ({
  type: "GET_VIDEO_SOURCE",
  payload,
});

export const setError = (payload) => ({
  type: "SET_ERROR",
  payload,
});

export const loginCheckout = (payload) => ({
  type: "LOGIN_CHECKOUT",
  payload,
});

export const coursesAdd = (payload) => ({
  type: "COURSES_ADD",
  payload,
});

export const coursesAddUser = (payload) => ({
  type: "COURSES_ADD_USER",
  payload,
});

export const searchApi = (payload) => ({
  type: "SEARCH_API",
  payload,
});

export const dataApiCoursesUSer = (payload, redirectUrl) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: `${env.API_URL}/api/user-movies?userId=${leerCookie("id")}`,
      headers: { Authorization: `Bearer ${leerCookie("token")}` },
    })
      .then(({ data }) => dispatch(coursesAddUser(data.data)))
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
};

export const dataApi = (payload, redirectUrl) => {
  return (dispatch) => {
    axios({
      method: "get",
      url: `${env.API_URL}/api/videos`,
      headers: { Authorization: `Bearer ${leerCookie("token")}` },
    })
      .then(({ data }) => dispatch(coursesAdd(data.data)))
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
};

// ----> Seccciond de inicio de sección en backend <----
export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios
      .post(`${env.API_URL}/api/auth/sign-up`, {
        email: payload.email,
        name: payload.name,
        password: payload.password,
      })
      // .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        // si todo salio bien, reirecciona a la url que tenemos
        window.location.href = redirectUrl;
      })
      .catch(
        // si tenemos un error, lo tratamos
        (error) => dispatch(setError(error))
      );
  };
};

export const loginUser = ({ email, password, rememberMe }, redirectUrl) => {
  // el tiempo de vida de la atorisacion
  // Agregamos las variables de timpo en milisegundos
  // const THIRTY_DAYS_IN_SEC = 2592000000;
  // const TWO_HOURS_IN_SEC = 7200000;
  const THIRTY_DAYS_IN_SEC = 2592000;
  const TWO_HOURS_IN_SEC = 7200;

  return (dispatch) => {
    axios({
      url: `${env.API_URL}/api/auth/sign-in`,
      method: "post",
      auth: {
        password,
        username: email,
      },
      data: {
        apiKeyToken: env.API_KEY_TOKEN,
      },
    })
      // guardamos la informacion en el navegador
      .then(({ data }) => {

        document.cookie = `email=${data.user.email}; max-age=${
          rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
        };`;
        document.cookie = `name=${data.user.name}; max-age=${
          rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
        };`;
        document.cookie = `id=${data.user.id}; max-age=${
          rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
        };`;
        if (env.ENV === "development") {
          console.log("modo desarollo");
          document.cookie = `token=${data.token}; max-age=${
            rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
          };`;
        } else {
          console.log("modo produccion");
          document.cookie = `token=${data.token}; max-age=${
            rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
          }; secure; httponly;`;
        }
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};

// ----> Seccciond de favoritos en backend <----
export const setFavoriteBackend = (payload) => {
  const { _id, userId } = payload;

  return (dispatch) => {
    axios({
      method: "POST",
      url: `${env.API_URL}/api/user-movies`,
      headers: { Authorization: `Bearer ${leerCookie("token")}` },
      data: {
        userId: userId,
        movieId: _id,
      },
    })
      .then(({ data }) => console.log(data.data))
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
};

export const deleteFavoriteBackend = ({ _id, id, userId }) => {

  return () => {
    axios({
      url: `${env.API_URL}/api/user-movies/${_id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${leerCookie("token")}` },
      data: { userId },
    })
      .then(({ data }) => console.log(data))
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
};

