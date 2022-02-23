import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
        signIn: {
            signInLoading: false,
            signInDisabled: false,
            signInErrorSnackbar: false,
            signInErrorPayload: null,
            signInSuccessSnackbar: false,
            signInSuccessPayload: null,
        },
        online: 0
    },
    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
        getOnline: (state) => state.online,
    },
    mutations: {
        loginUser(state, userData) {
            state.token = userData.token;
            state.refreshToken = userData.refreshToken;
            state.user = userData.user;
        },
        payment(state, userData) {
            state.user = userData.user;
        },
        signOut(state) {
            state.user = null;
            state.token = null;
            localStorage.clear();
        },
        startLoader(state) {
            state.signIn.signInLoading = true;
            state.signIn.signInDisabled = true;
        },
        stopLoader(state) {
            state.signIn.signInLoading = false;
            state.signIn.signInDisabled = false;
        },
        signInError(state, error) {
            state.signIn.signInErrorSnackbar = true;
            state.signIn.signInErrorPayload = error;
        },
        online(state, data) {
            state.online = data
        }
    },
    actions: {
        SIGN_IN({ commit }, authData) {
            const data = {
                email: authData.email,
                password: authData.password,
            };
            commit("startLoader");
            fetch("http://localhost:4000/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                .then((r) => r.json())
                .then((response) => {
                    // console.log("SIGNIN RESPONSE", response);
                    //status failed or false
                    console.log(response);
                    if (response.status === "failed") {
                        this._vm.$toast.error(`${response.message}`);
                        commit("stopLoader");
                        // commit("signInError", response.message);
                    } else {
                        // console.log("RESPONSE", response);




                        const { token, payload } = response;
                        commit("loginUser", {
                            token: token,
                            user: payload,
                        });
                        //Emit Socket Event
                        //Save To Local Storage
                        localStorage.setItem("token", token);
                        localStorage.setItem("user", JSON.stringify(payload));
                        router.push("/");
                        commit("stopLoader");
                    }
                })
                .catch((error) => {
                    console.log("Error>>>", error);
                    this._vm.$toast.error(error.message);
                    // commit("signInError", error);
                    commit("stopLoader");
                });
        },
        SIGN_UP({ commit }, authData) {
            const data = {
                fullName: authData.fullName,
                email: authData.email,
                phone: authData.phone,
                password: authData.password,
            };
            commit("startLoader");
            fetch("http://localhost:4000/api/users/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                .then((r) => r.json())
                .then((response) => {
                    console.log("RESPONSE>>>", response);
                    if (response.status === "failed") {
                        this._vm.$toast.error(`${response.message}`);
                        // commit("signInError", response.message);
                        commit("stopLoader");
                    } else {
                        // commit("registerUser", { user: response.payload });
                        this._vm.$toast.success(`${response.message}`);
                        router.push("/login");
                        // commit("SignUpSuccessful");
                        commit("stopLoader");
                    }
                })
                .catch((error) => {
                    console.log("Error>>>>>>>>>>>>>", error);
                    // commit("signUpError", error);
                    commit("stopLoader");
                });
        },
        SIGN_OUT({ commit }) {
            router.push("/login");
            commit("signOut");
        },
        //Sockets - Note Dont use arrow functions
        socket_connect(data) {
            console.log("Socket Connected!", data);
        },
        socket_online({ commit }, data) {
            commit("online", data);
        },
        socket_disconnect(data) {
            console.log("Socket disconnected!", data);
        },
    },
    modules: {},
});