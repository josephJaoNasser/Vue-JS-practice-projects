import axios from 'axios';

const url = "/api/posts/";

export default class PostService{
    
    //get posts
    static getPost(){
        return new Promise ((resolve,reject) => {
            
            //get the data from url
            axios.get(url).then((res) => {
                
                const data = res.data;//store the data from the axios response

                //if successful, resolve() will return the data
                resolve(
                    //map() is a high level iterator. It can also return arrays
                    data.map(thePassedPost => ({
                        ...thePassedPost,
                        createdAt: new Date(thePassedPost.createdAt)
                    }))
                );
            }).catch((err)=> {
                reject(err);
            })

           
            
        });

    }

    //create posts
    static insertPost(text){
        return axios.post(url, {
            text
        })
    }

    //delete posts
    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }
}

