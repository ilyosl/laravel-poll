import {createStore} from 'vuex'

const store = createStore({
    state: {
        user: {
            data: {},
            token: localStorage.getItem("token")
        }
    },
    getters: {},
    actions: {
        async register({commit}, user) {
            return fetch(`http://localhost:8000/api/register`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "POST",
                body: JSON.stringify(user),
            })
            .then((res) => res.json())
            .then((res)=> {
                commit("setUser", res)
                return res
            })
        },
        login({commit}, user){
            return fetch(`http://localhost:8000/api/login`,{
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                method: "POST",
                body: JSON.stringify(user),
            })
            .then((res) => res.json())
            .then((res) => {
                commit("setUser", res)
                return res
            })
        }
    },
    mutations: {

        logout: (state) => {
            state.user.data = {}
            state.user.token = null
            localStorage.removeItem('token')
        },
        setUser: (state, userData) => {
            console.log(userData);
            state.user.token = userData.token
            state.user.data = userData.user
            localStorage.setItem("token", userData.token)
        }
    },
    modules: {}
})

export default store;