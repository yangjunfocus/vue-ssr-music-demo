import request from 'axios'
export default{
    actionNewMusic:({commit,state}) =>{
      // 最新音乐
      return request.get('http://localhost:3000/personalized/newsong').then((res) => {
        if (res.statusText === 'OK') {
          commit('SET_newest_music', res.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    actionRecomSongMenu:({commit,state}) =>{
      // 推荐歌单
      return request.get('http://localhost:3000/personalized').then((res) => {
        if (res.statusText === 'OK') {
        //  console.log(res.data, '自定义api')
          commit('SET_recom_song_menu', res.data)
        }
      }).catch((err)=>{
        console.log(err)
      })
    },
    actionHotTop: ({commit,state}) => {
      // 热歌榜
      return request.get('http://localhost:3000/top/list?idx=1').then((res) => {
        if (res.statusText === 'OK') {
          commit('SET_hot_music_list', res.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    actionPlaylistDetail:({commit,state},id) =>{
      // 获取歌单详情
      return request.get(`http://localhost:3000/playlist/detail?id=${id}`).then((res) => {
        if (res.statusText === 'OK') {
          commit('SET_playlist_Detail', res.data)
        }
      }).catch((error) => {
        console.log(error)
      })
    }

}
