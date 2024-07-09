import {jwtDecode} from "jwt-decode";
import { useCookie, useLocalStorage } from 'react-use';
export const isAdmin = () => {
    const [tokenExt, setTokenExt] = useCookie('token');
    console.log("tokenExt: ",tokenExt)
    if(tokenExt){
        const rol = jwtDecode(tokenExt)
        console.log("rol: ",rol)
        if(rol.role==='admin'){
            console.log("Ingresa")
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}