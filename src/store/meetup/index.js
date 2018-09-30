import * as FireBase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      {
        id: '0-1213',
        title: 'NewYork Pizza',
        location: 'Nueva York, USA',
        imageUrl: 'http://assets.bubblear.com/wp-content/uploads/2017/02/09105313/nyspfeat2.jpg',
        date: new Date(), // 'Enero 1, 2017',
        description: `Ven y disfruta gratis la mejor pizza del mundo... No te lo pierdas!`
      },
      {
        id: '0-1333',
        title: '"Oktoberfest" en FrysStreet',
        location: 'Denton, Texas USA',
        imageUrl: 'https://frystreetoktoberfestdotcom.files.wordpress.com/2015/11/100315_ed_steele_fwb_9th_annual_fry_st_oktoberfest_friends_with_benefits_denton_tx_47.jpg',
        date: new Date(), // 'Diciembre 30, 2017',
        description: `Ven y festeja "Oktoberfest" con nosotros hasta el amanecer en "Fry Street..."
                      Cerveza gratis!`
      }
    ]
  },
  mutations: {
    createMeetup (state, payload) { state.loadedMeetups.push(payload) },
    setLoadedMeetups (state, payload) { state.loadedMeetups = payload },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({ commit }) {
      commit('setLoading', true)
      FireBase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const object = data.val()
          for (let key in object) {
            meetups.push({
              id: key,
              date: object[key].date,
              title: object[key].title,
              imageUrl: object[key].imageUrl,
              location: object[key].location,
              creatorid: object[key].creatorId,
              description: object[key].description
            })
          }
          commit('setLoading', false)
          commit('setLoadedMeetups', meetups)
        })
        .catch(error => {
          console.log(error)
          // commit('setError', error)
          commit('setLoading', false)
        })
    },
    createMeetup ({ commit, getters }, payload) {
      let key
      let imageUrl
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      // Reach firebase database at this point...??
      FireBase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const fName = payload.image.name
          const ext = fName.slice(fName.lastIndexOf('.'))
          return FireBase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return FireBase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          // commit('setError', error)
          console.log(error)
        })
    },
    updateMeetupData ({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.date) {
        updateObj.date = payload.date
      }
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      FireBase.database().ref('meetup').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          // commit('setError', error)
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
