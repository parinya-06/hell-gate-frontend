import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin } from '../functions/auth'

const AdminRoute = ({children}) => {
    const { user } = useSelector((state)=> ({...state}))
    const [ok, setOk] = useState(false)

    useEffect(()=>{

    if(user && user.token){
        console.log("currentAdmin");
        console.log('username',user.username);
        currentAdmin(user.username)
        .then(res=>{
            //res
            console.log('res=',res)
            setOk(true)
        }).catch(err=>{
            //err
            console.log('err=',err)
            setOk(false)
        })
    }   

    },[user])


    return ok
    ? children
    : <LoadingToRedirect />
}

export default AdminRoute
