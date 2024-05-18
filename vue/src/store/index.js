import {createStore} from 'vuex'
import axiosClient from '../axios'

const tmpPoll = [
    {
        id: 100,
        title: 'Youtube channel content',
        slug: 'youtube-channel-content',
        status: 'draft',
        image: 'https://img3.goodfon.ru/wallpaper/nbig/e/61/exterior-villa-hous-hoome.jpg',
        description: 'My name is Ilyos. <br> I am a Web Developer with 9+ years of experience, free educational content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        created_at: '2022-11-12 09:00:00',
        updated_at: '2022-11-12 09:00:00',
        expire_date: '30/11/2022 09:00:00',
        questions: [
            {
                id: 1,
                type: 'select',
                question: 'From which region are you ?',
                description: null,
                data: {
                    options: [
                        {id:1, text: "Tashkent"},
                        {id:2, text: "Samarkand"},
                        {id:3, text: "Fergana"},
                        {id:4, text: "Andijon"},
                    ]
                }
            },
            {
                id: 2,
                type: 'checkbox',
                question: 'Which video games do you want to see on my channel?',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                data: {
                    options: [
                        {
                            id: 1,
                            text: 'Pubg'
                        },
                        {
                            id: 2,
                            text: 'Counter Strike'
                        },
                        {
                            id: 3,
                            text: 'Fifa 22'
                        },
                        {
                            id: 4,
                            text: 'Pubg mobile'
                        }
                    ]
                }
            },
            {
                id: 3,
                type: 'radio',
                question: 'Which game video do you like?',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                data: {
                    options: [
                        {
                            id: 1,
                            text: 'Pubg'
                        },
                        {
                            id: 2,
                            text: 'Counter Strike'
                        },
                        {
                            id: 3,
                            text: 'Fifa 22'
                        },
                        {
                            id: 4,
                            text: 'Pubg mobile'
                        }
                    ]
                }
            },
            {
                id: 4,
                type: 'text',
                question: "What's your favourite game YouTube channel",
                description: null,
                data: {}
            },
            {
                id: 5,
                type: 'textarea',
                question: "What do you think about LimDev channel?",
                description: "Write your hones openion. Everything is anonymous",
                data: {}
            }
        ],
    }
]

const store = createStore({
    state: {
        user: {
            data: {},
            token: localStorage.getItem("token")
        },
        poll: [...tmpPoll],
        questionTypes:["text","select","radio", "checkbox", "textarea"],
    },
    getters: {},
    actions: {
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
