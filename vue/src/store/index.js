import {createStore} from 'vuex'
import axiosClient from '../axios'


const store = createStore({
    state: {
        user: {
            data: {},
            token: localStorage.getItem("token")
        },
        currentPoll: {
          loading: false,
          data: {}
        },
        poll: {
          loading: false,
          data: {}
        },
        questionTypes:["text","select","radio", "checkbox", "textarea"],
    },
    getters: {},
    actions: {
      getPoll({commit}, id) {
        commit('setCurrentPollLoading', true);
        return axiosClient.get(`/poll/${id}`).then((res)=>{
          commit('setCurrentPoll', res.data);
          commit('setCurrentPollLoading', false);
          return res;
        }).catch((err)=>{
          commit('setCurrentPollLoading', false);
          throw err;
        })
      },
      deletePoll({}, id){
        return axiosClient.delete(`/poll/${id}`);
      },
      getPolls({commit}){
        commit('setPollsLoading', true)
        return axiosClient.get('/poll').then((res)=>{
          commit('setPollsLoading', false)
          commit('setPolls', res.data)
          return res;
        })
      },
      savePoll({commit}, poll){
        delete poll.image_url;
        let response;
        // console.log(poll);
        if(poll.id){
          response = axiosClient.put(`/poll/${poll.id}`, poll).then((res)=>{
            commit('setCurrentPoll', res.data);
            return res;
          });
        }else{
          response = axiosClient.post('/poll', poll).then((res)=>{
            commit('setCurrentPoll', res.data);
            return res;
          });

        }
        return response;
      },
      register({commit}, user) {
          return axiosClient.post('/register', user)
              .then(({ data }) => {
                  commit('setUser', data)
                  return data
              })
      },
      login({commit}, user){
          return axiosClient.post('/login', user)
          .then(({data})=>{
              commit('setUser', data)
              return data
          })
      },
      logout({commit}) {
          return axiosClient.post('/logout').then(({data}) => {
              commit('logout')
          })
      }
    },
    mutations: {
      setCurrentPollLoading: (state, loading) => {
        state.currentPoll.loading = loading;
      },

      setPollsLoading: (state, loading) => {
        state.poll.loading = loading;
      },

      setPolls: (state, poll) => {
        state.poll.data = poll.data;
      },

      setCurrentPoll: (state, poll) => {
        state.currentPoll.data = poll.data;
      },

      savePoll: (state, poll) => {
        state.poll = [...state.poll, poll.data]
      },
      updatePoll: (state, poll) => {
        state.poll = state.poll.map((p) => {
          if(p.id == poll.data.id){
            return poll.data;
          }
          return p;
        })
      },
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
