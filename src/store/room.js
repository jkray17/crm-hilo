import firebase from 'firebase/app'

export default {
  mutations: {
    addUserRoom(userrooms, {nickname, nameroom, viewforall}) {
      this.rooms.push({nickname, nameroom, viewforall})
    alert('MUTATION')
    }
  },
  actions: {
    async fetchRooms({commit, dispatch}) {
      try {
        const rooms = (await firebase.database().ref(`/rooms`).once('value')).val() || {}
          return Object.keys(rooms).map(key => ({...rooms[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchUserRooms({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const rooms = (await firebase.database().ref(`/users/${uid}/info/rooms`).once('value')).val() || {}
          return Object.keys(rooms).map(key => ({...rooms[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // async fetchCategoryById({commit, dispatch}, id) {
    //   try {
    //     const uid = await dispatch('getUid')
    //     const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
    //     return {...category, id}
    //   } catch (e) {
    //     commit('setError', e)
    //     throw e
    //   }
    // },
    async updateRoom({commit, dispatch}, {name, id}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/rooms`).child(id).update({name})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createUserRoom({commit, dispatch}, {nickname, nameroom, viewforall}) {
      try {
        const uid = await dispatch('getUid')
        // const room = await firebase.database().ref(`/users/${uid}/info/rooms`).push({nickname, nameroom, viewforall})
        // return {nickname, nameroom, viewforall, id: room.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addUserRoom({commit, dispatch}, {nickname, nameroom, viewforall}) {
      try {
        const uid = await dispatch('getUid')
        // const room = await firebase.database().ref(`/users/${uid}/info/rooms`).push({nickname, nameroom, viewforall})
        // return {nickname, nameroom, viewforall, id: room.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
