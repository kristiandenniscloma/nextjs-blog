import Image from "next/image"
import Link from "next/link"

export default function Shop(){


    return (
        <div>
            <div>
                <Image 
                    src="/images/shirt1.jpg" 
                    height={200}
                    width={150}
                />
                <div>Black Shirt</div>
                <Link href="/?amount=0.01&transactionid=111">
                    BUY 0.01 PHP
                </Link>
            </div>
            <div>
                <Image 
                    src="/images/shirt2.jpg" 
                    height={200}
                    width={150}
                />
                <div>Yellow Shirt</div>
                <Link href="/?amount=0.02&transactionid=222">
                    BUY 0.02 PHP
                </Link>
            </div>
        </div>
    )
}