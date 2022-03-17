import { useMoralis, useMoralisQuery } from 'react-moralis'


function PaymentTransactions({ address }){
    const { data, error, isLoading } = useMoralisQuery("Pay", query => 
        query.equalTo('address_from', address),
            { live: true }
    )

    let payments = ""
    let payment_total = 0

    for(let i = 0; i < data.length; i++){
        const object = data[i]
        const amount = object.get('amount')
        payments += amount + '<div />'
        payment_total += parseFloat(amount)
    }

    return  (
        <div>
            <h5>Payment history</h5>
            <table border='1'>
                <tr>
                    <th>Trans #</th>
                    <th>Amount</th>
                </tr>
                {data.map(function(data, i){
                    return  <tr>
                        <td>{data.get('transaction_id')}</td>
                        <td>{data.get('amount')}</td>
                    </tr>
                })}
            </table>
        </div>
    )
}

export default PaymentTransactions