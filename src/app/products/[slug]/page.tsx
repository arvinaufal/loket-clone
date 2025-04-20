import Card from '@/components/navbar/Card';
import Footer from '@/components/navbar/Footer';
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import { FaMagnifyingGlass, FaHeart, FaRegHeart, FaArrowRight } from "react-icons/fa6";
import InfiniteScroll from 'react-infinite-scroll-component'; //USE THIS FOR PAGINATION
import { IoIosArrowForward } from "react-icons/io";
import { MyResponse, ProductType } from '@/db/type';
import WishlistButtonDetail from '@/components/fragments/WishlistButtonDetail';
import { Report } from 'notiflix';
import { cookies } from 'next/headers';


type GetProductType = {
  message: string;
  data: ProductType;
};
export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const getProduct = async (): Promise<GetProductType> => {
    "use server"
    const products = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.slug}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Cookie: cookies().toString()
        }
      }
    );

    return products.json();
  }

  const { data } = await getProduct();

  let formattedPrice: (string | number) = Number(data.price);
  formattedPrice = formattedPrice.toLocaleString('id-ID');
  let formattedTags = data.tags.map(tag => `#${tag}`).join(' ');


  
  return (
    <section className='min-h-screen w-full bg-white flex flex-col'>
      <section className='w-full h-full flex-col pb-24'>
        <div className='w-full flex justify-center content-center items-center pt-8' style={{ height: "10%" }}>
          <div className='flex flex-row w-3/4 '>
            <div className='flex gap-4 text-center items-center pr-4'>
              <span className='text-sm text-blue-700'>Home</span>
              <IoIosArrowForward size={14} />
            </div>
            <div className='flex gap-4 text-center items-center pr-4'>
              <span className='text-sm text-blue-700'>Produk</span>
              <IoIosArrowForward size={14} />
            </div>
            <div className='flex gap-4 text-center items-center'>
              <span className='text-md text-blue-700'>{data.slug}</span>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center content-center items-center pt-8 h-80 pb-8'>
          <div className='flex flex-row w-3/4 h-full gap-8 '>
            <div className='flex w-2/3  h-full content-center items-center justify-center'>
              <img src={`${data.images[0]}`} className="w-full h-full rounded-xl" />
            </div>
            <div className='flex w-1/3 shadow-xl rounded-xl'>
              <div className='flex h-full w-full rounded-xl flex-col'>
                <div className='flex flex-col justify-between p-4 h-full'>
                  <div className='h-5/6'>
                    <div>
                      <h2 className="font-semibold text-lg pb-1 px-1 whitespace-nowrap overflow-hidden" style={{ textOverflow: 'ellipsis' }}>{data.name}</h2>
                    </div>
                    <div className='pt-2'>
                      <span className='font-semibold text-md bg-green-400 rounded-full px-4 py-1 text-white'>Rp. {formattedPrice},-</span>
                    </div>

                    <div className='pt-2'>
                      <span className='font-normal text-sm italic text-blue-800'>{formattedTags}</span>
                    </div>

                  </div>
                  <hr className="w-full border-t border-gray-300 mb-4 mt-2" />
                  <div className='h-1/6 '>

                  <WishlistButtonDetail _id={data._id} isWishlist={data.isWishlist}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center content-center items-center pt-8 pb-8'>
          <div className='flex flex-col w-3/4 h-full gap-4'>

            <div className='w-2/3 flex justify-center content-center items-center'>
              <span className='font-semibold text-2xl border-b-4 border-sky-800 border-solid pb-3'>Deskripsi</span>
            </div>
            <div className='w-2/3 pt-8'>
              {data.description}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  )
}
