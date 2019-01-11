import rq from "request-promise";
import  User    from    "../models/User";
import API_CONFIG from "../../configs/api_config.json";
import { userInfo } from "os";


/**declare class */
class UserRepo{
    constructor(){};
    /**
     * getAll for users
     */
    getAll(){
        let method="UserRepo/getAll";
        console.log(method+" -->start");

        const options={
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:API_CONFIG.api_ip+':'+API_CONFIG.api_port+API_CONFIG.api_url+"user/list",
            json:true
        };

        return new Promise((resolve,reject)=>{
            rq(options,function(error,result){
                if(error){
                    console.log(method+' -->fail');
                    return reject(new Error(error));
                }else{
                    console.log(method+' -->success');
                    return resolve(result.body);
                }
            });
        });
    };

/**
 * insert the user
 * @param {*} _user 
 */
    insert(_user){
        let method="UserRepo/insert";
        console.log(method+" -->start");

        const options={
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:API_CONFIG.api_ip+':'+API_CONFIG.api_port+API_CONFIG.api_url+"user/add",
            body: {
                "name": _user.name,
                "email":_user.email,
                "phone":_user.phone
            },
            json:true
        };

        return new Promise((resolve,reject)=>{
            rq(options,function(error,result){
                if(error){
                    console.log(method+' -->fail');
                    return reject(new Error(error));
                }else{
                    console.log(method+' -->success');
                    return resolve(result.body);
                }
            });
        });
    };

/**
 * getUserByID
 * @param {*} _userID 
 */
    getUserByID(_userID){
        let method="UserRepo/getUserByID()";
        console.log(method+" -->start");

        const options={
            method:"GET",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:API_CONFIG.api_ip+':'+API_CONFIG.api_port+API_CONFIG.api_url+"user/getUserByID/"+_userID,
            json:true
        };

        return new Promise((resolve,reject)=>{
            rq(options,function(error,result){
                if(error){
                    console.log(method+' -->fail');
                    return reject(new Error(error));
                }else{
                    console.log(method+' -->success');
                    return resolve(result.body);
                }
            });
        });
    };


/**
 * Update the User
 * @param {*} _user 
 */
    update(_user){
        let method="UserRepo/update()";
        console.log(method+" -->start");

        const options={
            method:"PUT",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:API_CONFIG.api_ip+':'+API_CONFIG.api_port+API_CONFIG.api_url+"user/update/"+_user.id,
            body: {
                "name": _user.name,
                "email":_user.email,
                "phone":_user.phone
            },
            json:true
        };

        return new Promise((resolve,reject)=>{
            rq(options,function(error,result){
                if(error){
                    console.log(method+' -->fail');
                    return reject(new Error(error));
                }else{
                    console.log(method+' -->success');
                    return resolve(result.body);
                }
            });
        });
    };

/**
 * Delete the user
 * @param {*} _userID 
 */
    delete(_userID){
        let method="UserRepo/delete()";
        console.log(method+" -->start");

        const options={
            method:"DELETE",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:API_CONFIG.api_ip+':'+API_CONFIG.api_port+API_CONFIG.api_url+"user/delete/"+_userID,
            json:true
        };

        return new Promise((resolve,reject)=>{
            rq(options,function(error,result){
                if(error){
                    console.log(method+' -->fail');
                    return reject(new Error(error));
                }else{
                    console.log(method+' -->success');
                    return resolve(result.body);
                }
            });
        });
    };

/**
 * get the user by name
 * @param {*} _userName 
 */
    getUserByName(_userName){
        let method="UserRepo/getUserByName()";
        console.log(method+" -->start");

        const options={
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            uri:API_CONFIG.api_ip+':'+API_CONFIG.api_port+API_CONFIG.api_url+"user/search",
            body: {
                "keyword": _userName
            },
            json:true
        };

        return new Promise((resolve,reject)=>{
            rq(options,function(error,result){
                if(error){
                    console.log(method+' -->fail');
                    return reject(new Error(error));
                }else{
                    console.log(method+' -->success');
                    return resolve(result.body);
                }
            });
        });
    };
};

/**export */
module.exports=UserRepo;