import Vuex from 'vuex'
import firebase from '~/utils/firebase'
import Cookies from 'js-cookie'
import { getUserFromCookie } from '@/utils/userHelper'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: null,
      profile: null,
      drawer: false,
      darkLayout: false,
      uploadedImageURL: ''
    }),
    getters: {
      uid(state) {
        if (state.user && state.user.uid) return state.user.uid
        else return null
      },

      user(state) {
        return state.user
      },

      isAuthenticated(state) {
        return !!state.user && !!state.user.uid
      }
    },
    mutations: {
      setProfile: (state, value) => {
        state.profile = value
      },
      setUser: (state, value) => {
        state.user = value
      },
      toggleDrawer(state, value) {
        state.drawer = value
      },
      setAvatar(state, url) {
        state.user.avatar = url
        state.profile.avatar = url
      },
      imageURL(state, url) {
        state.uploadedImageURL = url
      }
    },
    actions: {
      async nuxtServerInit({ commit, dispatch }, { req }) {
        const user = getUserFromCookie(req)
        if (user) {
          await commit('setUser', {
            uid: user.user_id,
            email: user.email,
            displayName: user.name
          })
          await dispatch('loadProfile', user.user_id)
        }
      },
      loginGoogle({ commit, dispatch }) {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            dispatch('login')
            dispatch('createProfile', result.user)
            commit('setUser', result.user)
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      createProfile({ commit }, user) {
        const profileRef = db.collection('profiles').doc(user.uid)

        profileRef.get().then(docSnapshot => {
          if (docSnapshot.exists) {
            profileRef.onSnapshot(doc => {
              commit('setProfile', doc.data())
            })
          } else {
            profileRef.set({
              displayName: user.displayName,
              email: user.email,
              avatar: user.photoURL
            })
          }
        })
      },
      async login() {
        const token = await firebase.auth().currentUser.getIdToken(true)
        Cookies.set('access_token', token)
      },
      logout({ commit }) {
        firebase.auth().signOut()
        Cookies.remove('access_token')
        commit('setProfile', null)
        commit('setUser', null)
      },
      async loadProfile({ commit }, id) {
        const profileRef = await db
          .collection('profiles')
          .doc(id)
          .get()
        commit('setProfile', profileRef.data())
      },
      async avatarUpload({ state, commit }, url) {
        const user = state.user
        const profileRef = db.collection('profiles').doc(user.uid)

        profileRef.update({
          avatar: url
        })

        profileRef.onSnapshot(function(doc) {
          commit('setProfile', doc.data())
        })
      }
    }
  })
}

export default createStore
