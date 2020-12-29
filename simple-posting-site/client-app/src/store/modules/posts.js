

import axios from 'axios';

const url = "/api/posts/";

const state = {
   posts: [],
   loadingStates: {
      fetchingPost: false,
      sendingPost: false,
      updatingPost: false,
      deletingPost: false,
      msg: ''
   }, 
   errors: ""
};

const getters = {
   allPosts: (state) => state.posts,
   loadingStates: (state) => state.loadingStates,
   errors: (state) => state.errors
};

const actions = {

   //load posts
   async loadPosts({ commit }){
      state.loadingStates.fetchingPost = true
      try{
         const res = await axios.get(url);      
         const posts = res.data.map(thePassedPost => ({
            ...thePassedPost,
            createdAt: new Date(thePassedPost.createdAt)                        
        }))
         
        //console.log(posts)
        commit('setPosts',posts);
      }
      catch(err){
         commit('setError', err);
      }      
   },

   //insert posts
   async createPost({ commit }, newPostObject){    
      state.loadingStates.sendingPost = true
      const res = await axios.post(url, {
         text: newPostObject.text,
         createdBy: newPostObject.createdBy
     }) 
     commit('newPost',res.data);
   },

   //delete posts
   async deletePost({ commit },id){
      state.loadingStates.deletingPost = true
      await axios.delete(`${url}${id}`);
      commit('removePost',id);
   },

   //update posts
   async updatePost({commit},updatedPostObject){           
      state.loadingStates.updatingPost = true
      const res = await axios.put(`${url}${updatedPostObject.id}`, 
      updatedPostObject
      );
     
     commit('editPost',res.data)
   },

};

const mutations = {
   setPosts: (state, posts) => {
      state.posts = posts;
      state.loadingStates.fetchingPost = false;
   },
   
   newPost: (state, post) => {
      post.createdAt = new Date(post.createdAt);
      state.posts.push(post);
      state.loadingStates.sendingPost = false;
   },
   
   removePost: (state, id) => {
      state.posts = state.posts.filter(post => post._id !== id);
      state.loadingStates.deletingPost = false
   },

   editPost: (state, update) => {      
      const index = state.posts.findIndex(post => post._id === update._id);
      update.createdAt = new Date(update.createdAt);
      update.updatedAt = new Date(update.updatedAt);
      
      if(index !== -1){         
         state.posts[index].text = update.text;
         state.posts[index].updatedAt = update.updatedAt;         
      }
      
      state.loadingStates.updatingPost = false; 
   },

   setError: (state, error) => (state.errors = error),

   
};

export default{
   state,
   getters,
   actions,
   mutations
}