import axios from 'axios';

const url = "/api/posts/";

const state = {
   posts: [],
   postsError: '',
   loadingStates: {
      fetchingPost: false,
      sendingPost: false,
      updatingPost: false,
      deletingPost: false,
   }, 
  
};

const getters = {
   allPosts: (state) => state.posts,
   postLoadingStates: (state) => state.loadingStates,
   postErrors: (state) => state.postsError
};

const actions = {

   //load posts
   async loadPosts({ commit },uname){
      commit('fetching_post');
      const res = await axios.get(`${url}${uname ? uname: ''}`).catch((err)=>{    
         commit('fetching_post_err',err.message);
      });
      const posts = res.data.map(thePassedPost => ({
         ...thePassedPost,
         createdAt: new Date(thePassedPost.createdAt)                        
      }));
      commit('fetching_post_success',posts);
      
   },

   //insert posts
   async createPost({ commit }, newPostObject){   
      commit('post_send_request');
      
      const postContent= {
         text: newPostObject.text,
         user: newPostObject.user
      }

      const formData = new FormData()
      if(newPostObject.media){
         newPostObject.media.forEach(item => {
            formData.append('post-media', item)
         });
      }
      formData.append('postContent' , JSON.stringify(postContent))

      const res = await axios.post(url,formData).catch((err)=> {
         commit('post_send_failed',err,res);
      })
      console.log(res)
     commit('post_send_success',res.data.post);
   },

   //delete posts
   async deletePost({ commit },id){
      state.loadingStates.deletingPost = true
      await axios.delete(`${url}${id}`);
      commit('removePost',id);
   },

   //update posts
   async updatePost({commit},updatedPostObject){  
      commit('post_update_request')

      const res = await axios.put(`${url}${updatedPostObject.id}`, 
         updatedPostObject
      ).catch((err) => { commit('post_update_err', err) });

      if(res)
      {
         commit('post_update_success',res.data)   
      }     
      
   },

   async clearPosts({commit}){
      commit('clear_posts')
   }

};

const mutations = {

   fetching_post: (state) => {
      state.loadingStates.fetchingPost = true
   },

   fetching_post_success: (state, posts) => {
      state.posts = posts;
      state.loadingStates =  {
         fetchingPost: false,
         sendingPost: false,
         updatingPost: false,
         deletingPost: false,
      };
      state.postsError = '';
   },

   fetching_post_err: (state, error) => {
      state.loadingStates.fetchingPost = false;
      state.postsError = error
   },

   post_send_request: (state) => {
      state.loadingStates.sendingPost = true
   },
   
   post_send_success: (state, post) => {      
      post.createdAt = new Date(post.createdAt);
      state.posts.push(post);
      state.loadingStates.sendingPost = false;
   },
   
   post_send_failed: (state, error) => {
      state.loadingStates.sendingPost = false;
      state.postsError = error
   },

   removePost: (state, id) => {
      state.posts = state.posts.filter(post => post._id !== id);
      state.loadingStates.deletingPost = false
   },

   post_update_request: (state) => {
      state.loadingStates.updatingPost = true
   },

   post_update_err: (state, error) => {
      //console.log('update error')
      state.loadingStates.updatingPost = false;
      state.postsError = error
   },

   post_update_success: (state, update) => {      
      const index = state.posts.findIndex(post => post._id === update._id);
      update.createdAt = new Date(update.createdAt);
      update.updatedAt = new Date(update.updatedAt);
      
      if(index !== -1){         
         state.posts[index].text = update.text;
         state.posts[index].updatedAt = update.updatedAt;         
      }
      
      state.loadingStates.updatingPost = false; 
   },

   clear_posts: (state) => state.posts = []
};

export default{
   state,
   getters,
   actions,
   mutations
}