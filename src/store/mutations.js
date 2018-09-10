export default {
  SET_bookInfo: (state, bookInfo) => {
    // console.log(bookInfo,'mut')
    state.bookInfo = bookInfo
  },
  SET_bookInfo2: (state, bookInfo2) =>{
    state.bookInfo2 = bookInfo2
  },
  SET_recom_song_menu:(state,songMenu)=>{
    state.recom_song_menu = songMenu
  },
  SET_newest_music:(state,music)=>{
    state.newest_music=music
  },
  SET_hot_music_list: (state, music) => {
    state.hot_music_list = music
  }
}