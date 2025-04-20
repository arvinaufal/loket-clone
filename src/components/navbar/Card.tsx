"use client"
import Image from 'next/image'
import Link from 'next/link';
import { FaMagnifyingGlass, FaHeart, FaRegHeart, FaArrowRight } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { useState } from 'react';
import { ProductType } from '@/db/type';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';

type Props = {
  currentPage: string;
  product: ProductType;
  addWishlist?: any;
};


export default function Card({ currentPage, product, addWishlist }: Props) {
  const handleAddWishlist: any = async (productId: ObjectId) => {
    await addWishlist(productId);
  }
  let formattedPrice: (string | number) = Number(product.price);
  formattedPrice = formattedPrice.toLocaleString('id-ID');
  return (
    <div className='relative'>
      <Link href={`/products/${product.slug}`} className="card w-80 bg-base-100 shadow-xl overflow-hidden">
        <figure><img src={product.thumbnail} alt="Shoes" style={{ maxHeight: "150PX", borderTopRightRadius: "12px", borderTopLeftRadius: "12px", }} /></figure>
        <div className="flex flex-col px-4 pt-3">
          <h2 className="font-semibold text-lg pb-1 px-1 whitespace-nowrap overflow-hidden" style={{ textOverflow: 'ellipsis' }}>{product.name}</h2>
          <div className=' rounded-full w-28 flex items-center justify-center content-center bg-green-500 mt-1 mb-2'>
            <span className='font-medium text-sm text-white'>Rp. {formattedPrice}</span>
          </div>
          <p className='font-normal text-sm py-3'>{product.excerpt.substring(0, 30)}...</p>
          <hr className="w-full border-t border-gray-300 mb-4 mt-2" />
          <div className="card-actions justify-end pb-4">
            <button className=" text-white rounded-full p-2" style={{ backgroundColor: "#084ccc" }}><FaArrowRight /></button>
          </div>
        </div>
      </Link>

      <div className='flex absolute justify-center content-center items-center text-center bottom-4 left-4'>
        {
          product.isWishlist === false
            ?
            <div onClick={() => handleAddWishlist(product._id)} className='cursor-pointer hover:bg-pink-200 hover:p-2 hover:rounded-full'>

              <FaRegHeart size={30} color={"red"} />
            </div>
            :
            <div onClick={() => handleAddWishlist(product._id)} className='cursor-pointer hover:bg-pink-200 hover:p-2 hover:rounded-full'>
            <FaHeart size={30} color={"red"} />
            </div>
        }
      </div>
    </div>


  )
}
