import { useMoralis, useMoralisQuery } from 'react-moralis'
import Login from '../../components/Login'
import Signin from '../../components/Signin'


export default function Home() {
  const { Moralis, isAuthenticated, logout, authenticate, user, setUserData, userError, isUserUpdating } = useMoralis()

  

  if (!isAuthenticated){

    return (
      <div>
        <Signin />
        <Login />
      </div>
    )
  }

  const user_address = user.get('ethAddress')



  function setData(){
    setUserData({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    })
  }    

  function getPayTrans(address){
    const { data, error, isLoading } = useMoralisQuery("Pay", query =>
      query
        .equalTo('address_from', address),
      { live: true }
    );

    return data
  }

  async function pay(){
    let amount = document.getElementById("amount").value

    const Pay = new Moralis.Object.extend("Pay");
     const pay = new Pay();

      pay.set("address_from", user_address);
      pay.set("amount", parseFloat(amount));

      await pay.save();

      alert('new pay saved')
  }

  

  /*
  const [limit, setLimit] = useState(3);
  const { data, error, isLoading } = useMoralisQuery(
    "GameScore",
    query =>
      query
        .greaterThanOrEqualTo("score", 100)
        .descending("score")
        .limit(limit),
    [limit],
    {
      live: true,
    },
  );
  */
  const { data, error, isLoading } = useMoralisQuery("BscTransactions", query =>
    query
      .equalTo('from_address',user_address),
    { live: true }
  );

  const bsc_trans_data = data;


  let transactions = ''
  let total_transactions = 0
  

  for (let i = 0; i < data.length; i++) {
    const object = data[i]
    transactions =  transactions + '<br />' + object.get('value')
    total_transactions += parseFloat(object.get('value'))
  }

  const payments = getPayTrans(user.get("ethAddress"))
  let payments_text = ''
  let payment_total = 0

  for(let i2 = 0; i2 < payments.length; i2++){
    const object = payments[i2]
    const amount = object.get('amount')
    payments_text += amount + '<br />'
    payment_total += parseFloat(amount)
  }


  return (
    <div>

      <h5>Welcome {user.get("username")} !</h5>
      <h5>Wallet balance: { Moralis.Units.FromWei(total_transactions.toString(), 18)}</h5>
      <h5>Wallet balance(deducted): { Moralis.Units.FromWei(total_transactions.toString(), 18) - payment_total}</h5>
      <h5>Wallet address: {user.get("ethAddress")}</h5>
      <h5>Total spent: {payment_total}</h5><br />
      <button onClick={logout}>Signout</button>
      <br /><br />
      <div>
        <input type='text' name='username' id='username' placeholder='username'/><br />
        <input type='text' name='password' id='password' placeholder='password'/><br />
        <button onClick={setData}
        disabled={isUserUpdating}>Update username and password</button>
        <br /><br/>
        <input type='text' name='amount' id='amount' placeholder='Amount'/><br />
        <button onClick={pay}>Pay</button>
      </div>
      <br />
      <h5>Payment history</h5> 
      {payments_text}
      
      
      {/*<pre>{ JSON.stringify(getPayTrans(user.get("ethAddress"), undefined, 2)) }</pre>*/}
      
    </div>
  )
}


