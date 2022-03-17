import { useMoralis, useMoralisQuery } from 'react-moralis'

export default function Account() {
  const { data, error, isLoading } = useMoralisQuery("BscTransactions")

  if (!isAuthenticated){
    return (
      <div>
        <Signin />
        <Login />
      </div>
    )
  }

  function setData(){
    setUserData({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    })
  }

  return (
    <div>
      <h1>Welcome {user.get("username")}</h1>
      <button onClick={logout}>Signout</button>
      <div>
        <input type='text' name='username' id='username' placeholder='username'/><br />
        <input type='text' name='password' id='password' placeholder='password'/><br />
        <button onClick={setData}
        disabled={isUserUpdating}
        >Sign Up</button>
        {/*<button onClick={() => setUserData({
          username: 'kcloma',
          email: 'cloma.kristian@gmail.com',
          password: '123asd'
        })}
        disabled={isUserUpdating}
        >Sign Up</button>*/}
      </div>
    </div>
  )
}

