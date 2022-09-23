import axios from 'axios';
import {showAlert} from './alert'


export const login = async (email,password)=>{
    try{
       const res = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/login',
            data:{
                email,
                password
            },
        })

        if(res.data.status==="success"){
            const {cookieOptions,token} = res.data  
            // document.cookie = `jwt=${token}`;
            showAlert('success',"Logged in Successfully")
            window.setTimeout(()=>{
                location.assign('/')
            },1500)
        }
    

    }catch(err){
        showAlert('error',err.response.data.message)
    }
}



export const logout = async ()=>{
    console.log('hello')
    try{
        const res = await axios({
            method:'GET',
            url:'http://localhost:3000/api/v1/users/logout', 
        })

        

        if(res.data.status = 'success'){
            location.reload(true)
        }
        window.location.replace("/");
        

            
    }catch(err){
        showAlert('error','Error Logging out!!! Try again...')
    }
}

