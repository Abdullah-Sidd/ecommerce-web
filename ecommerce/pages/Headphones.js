import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client';
import { client } from '../lib/client';
const Headphones = ({products}) => {
  // console.log(products)
  return (
    <div>
        <section class="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
      <div className="flex flex-wrap m-12">
         {products.map((item)=>{ 
        return  <Link href ={`/product/${item.slug.current}`}>
         <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-7">
         <a className="block relative rounded overflow-hidden">
            <img alt="ecommerce" className="m-auto md:m-0 h-[30vh] md:h-[36vh]" src={urlFor(item.image && item.image[0])}/>
          </a>
          <div className="mt-4 text-center md:text-left">
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.details}</h3>
            <h2 className="text-gray-900 title-font text-lg font-medium">{item.name}</h2>
            <p className="mt-1">₹{item.price}</p>
          </div>
        </div>
        </Link>
        })} 
      </div>
    </div>
</section>
    </div>
  )
}


export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products}
  }
}

export default Headphones