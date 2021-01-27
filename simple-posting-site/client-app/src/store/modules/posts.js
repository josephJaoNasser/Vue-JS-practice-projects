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
      msg: ''
   }, 
  
};

const getters = {
   allPosts: (state) => state.posts,
   postLoadingStates: (state) => state.loadingStates,
   postErrors: (state) => state.postsError
};

const actions = {

   //load posts
   async loadPosts({ commit }){
      commit('fetching_post');

      const res = await axios.get(url).catch((err)=>{    
         commit('fetching_post_err',err.message);
      });

      const posts = res.data.map(thePassedPost => ({
         ...thePassedPost,
         createdAt: new Date(thePassedPost.createdAt)                        
      }));
      commit('posts_received',posts);
      
   },

   //insert posts
   async createPost({ commit }, newPostObject){   
      state.loadingStates.sendingPost = true
      const res = await axios.post(url, {
         text: newPostObject.text,
         user: newPostObject.user
      }) 
     commit('post_sent',res.data);
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

   fetching_post: (state) => state.loadingStates.fetchingPost = true,

   posts_received: (state, posts) => {
      state.posts = posts;
      state.loadingStates.fetchingPost = false;
      state.postsError = '';
   },

   fetching_post_err: (state, error) => {
      state.loadingStates.fetchingPost = false;
      state.postsError = error
   },
   
   post_sent: (state, post) => {      
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
   }
};

export default{
   state,
   getters,
   actions,
   mutations
}