import Vuex from 'vuex'
import firebase from '~/utils/firebase'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      user: null,
      profile: null
    }),
    mutations: {
      setProfile: (state, value) => {
        state.profile = value
      },
      setUser: (state, value) => {
        state.user = value
      }
    },
    actions: {
      loginGoogle({ commit, dispatch }) {
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
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
      logout({ commit }) {
        firebase.auth().signOut()
        commit('setProfile', null)
        commit('setUser', null)
      }
    }
  })
}

export default createStore
