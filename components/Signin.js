import { useState } from "react";
import { useMoralis } from "react-moralis";



function Signin(){
    const {isAuthenticated, login, user} = useMoralis()

   // const [username, setUsername] = useState("kcloma")
   // const [password, setPassword] = useState("123asd")

   const loginUsingUsername = async() => {
       //alert('test')
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value

       let loginResponse = await login(username, password)

       if(!loginResponse){
           alert("invalid login credentials")
       }else{
        location.reload()
       }
   }

    if(!isAuthenticated){
        return (
            <div>
                <input type='text' name='username' id='username'/><br />
                <input type='text' name='password' id='password'/><br />
                <button onClick={() => loginUsingUsername()}>Signin</button>      
            </div>
        )
    }
}

export default Signin