import { useMoralis, useMoralisQuery } from 'react-moralis'
import Login from '../components/Login'
import Signin from '../components/Signin'
import PaymentTransactions from '../components/PaymentTransactions'
import { tr } from 'date-fns/locale'
import { useState } from 'react'


export default function Home() {
  //import moralis hooks
  const { Moralis, isAuthenticated, logout, authenticate, user, setUserData, userError, isUserUpdating } = useMoralis()
  

  //check if not login
  //if not return sign in and login componenents
  if (!isAuthenticated){
    return (
      <div>
        <Signin />
        <Login />
      </div>
    )
  }

  //if login get user address
  const user_address = user.get('ethAddress')

  //save updated data function
  function setData(){
    setUserData({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    })
  }  
  
  //get all payment transaction of user
  function getPayTrans(address){
    const { data, error, isLoading } = useMoralisQuery("Pay", query =>
      query
        .equalTo('address_from', address),
      { live: true }
    );

    return data
  }

  //submit payment async
  async function pay(){
    //get amount and trans id value from front end
    let amount = document.getElementById("amount").value
    let transaction_id = document.getElementById("transaction_id").value

    //initialize new pay row
    const Pay = new Moralis.Object.extend("Pay");
    const pay = new Pay();

    //save address,amount and trans id in new row
    pay.set("address_from", user_address);
    pay.set("amount", parseFloat(amount));
    pay.set("transaction_id", transaction_id)
    await pay.save();

    alert('new pay saved')
  }

  //get users bsc transaction
  const { data , error, isLoading } = useMoralisQuery("BscTransactions", query =>
    query
      .equalTo('from_address',user_address),
    { live: true }
  );
  const bsc_trans_data = data;

  let transactions = ''
  let total_transactions = 0
  
  //loop bsc user's transaction to get transaction text
  //and transaction total
  for (let i = 0; i < data.length; i++) {
    const object = data[i]
    transactions =  transactions + '<br />' + object.get('value')
    total_transactions += parseFloat(object.get('value'))
  }

  //get user payment transactions
  const payments = getPayTrans(user.get("ethAddress"))
  let payment_total = 0

  //loop user payment transaction to get total
  for(let i2 = 0; i2 < payments.length; i2++){
    const object = payments[i2]
    const amount = object.get('amount')
    payment_total += parseFloat(amount)
  }

  //get url parameter values
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  let amount_to_pay = getUrlVars()["amount"];
  let transaction_id = getUrlVars()["transactionid"];

  const [count, setCount] = useState(0)
  
  return (
    <div>
      {/* user account details */}
      <div>Count: {count}</div>
      <button onClick={()=>setCount(count + 1)}>Click me!!!</button>
      <h5>Welcome {user.get("username")} !</h5>
      <h5>Wallet address: {user.get("ethAddress")}</h5>
      <h5>Wallet balance: { Moralis.Units.FromWei(total_transactions.toString(), 18)}</h5>
      <h5>Wallet balance(spent deducted): { Moralis.Units.FromWei(total_transactions.toString(), 18) - payment_total}</h5>
      <h5>Total spent: { payment_total.toFixed(2) }</h5><br />
      <button onClick={logout}>Signout</button>
      <br /><br />
      <div>
        {/* update username and password */}
        <input type='text' name='username' id='username' placeholder='username'/><br />
        <input type='text' name='password' id='password' placeholder='password'/><br />
        <button onClick={setData}
        disabled={isUserUpdating}>Update username and password</button>
        <br /><br/>
        {/* payment form */}
        Your Paying : {amount_to_pay} PHP
        <input type='hidden' name='amount' id='amount' placeholder='Amount' value={amount_to_pay} /><br />
        Transaction #: {transaction_id}
        <input type='hidden' name='transaction_id' id='transaction_id' placeholder='Amount' value={transaction_id} /><br />
        <button onClick={pay}>Pay</button>
      </div>
      <br />
      {/* users payment transaction table */}
      <PaymentTransactions address={user_address} />            
    </div>
  )
}


