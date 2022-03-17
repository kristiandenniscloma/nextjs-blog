import { useMoralis, useMoralisQuery } from "react-moralis"

export default function Home(){
    const { data, error, isLoading } = useMoralisQuery("BscTransactions", query =>
    query
      .equalTo('from_address','0xadd3ebf2b044aabc55012754807dabaac00ae05a'),
    { live: true }
  );

    res.status(200).json({ text: data })
}