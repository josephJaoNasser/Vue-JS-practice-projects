import axios from 'axios';

const url = "/api/userManagement/";

export default class UserManagementService {

    //get the users
    static getUsers(){
        return new Promise((resolve,reject) => {
            axios.get(url).then( res => {
                const data = res.data;

                resolve(
                    data.map( thePassedUsers => ({
                        ...thePassedUsers,
                        joinedOn: new Date(thePassedUsers.joinedOn)
                    }) )
                );
            }
            ).catch((error) => reject(error))
        })
    }

    //registration
    static registerUser(username,displayName,password, email, bio){
        return axios.post(url, {
                username,
                displayName,
                password,
                email,
                bio
            })
        
    }   

    //login


}
