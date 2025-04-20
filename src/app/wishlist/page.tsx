"use client"
import Card from '@/components/navbar/Card';
import Footer from '@/components/navbar/Footer';
import { MyResponse, ProductType } from '@/db/type';
// import { cookies } from 'next/headers';
import Image from 'next/image'
import Link from 'next/link';
import { Report } from 'notiflix';
import { useEffect, useState } from 'react';
import { FaMagnifyingGlass, FaHeart, FaRegHeart, FaArrowRight } from "react-icons/fa6";
import InfiniteScroll from 'react-infinite-scroll-component'; //USE THIS FOR PAGINATION



type WishlistType = {
  wishlists: ProductType[]
};

type GetProductsType = {
  message: string;
  data: ProductType[];
}
type GetWishlistType = {
  message: string;
  data: WishlistType;
}


export default function Wishlist() {
  const [wishlists, setWishlists] = useState<ProductType[]>([]);

  const getWishlistProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      );

      const result: GetWishlistType = await response.json();

      if (result && result.data && result.data.wishlists) {
        const wishlists: ProductType[] = result.data.wishlists;
        setWishlists(wishlists);
      } else {
        console.error('Format respons tidak valid:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // const addWishlist = async (payload: string) => {
  //   // "use server"
  //   console.log({payload})
  //   const productId: (string) = payload;
  //   const handleWishlist = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         productId
  //       }),
  //     }
  //   );

  //   const result = (await handleWishlist.json()) as MyResponse;
  //   console.log(result, 'INI RESULTTTTT')
  // }

  const addWishlist = async (payload: string) => {
    const productId: (string) = payload;
    const handleWishlist = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId
        }),
      }
    );

    const result = (await handleWishlist.json()) as MyResponse;

    if (!result.data) {
      Report.failure(
        'Gagal',
        'Mohon login terlebih dahulu!',
        'Ok',
      );
    } else {
      Report.success(
        'Sukses',
        'Berhasil menghapus wishlist',
        'Ok',
        () => {
          // Redirect to '/wishlist' after the user clicks "Ok"
          window.location.href = '/wishlist';
        }
      );
    }
  }

  useEffect(() => {
    getWishlistProducts();
  }, []);
  
  return (
    <section className='min-h-screen w-full bg-white flex flex-col'>
      <section className='w-full h-full flex-col pb-24 pt-14'>

        <div className='w-full flex flex-col justify-center items-center content-center' style={{ height: "30%" }}>
          <div className='w-5/6 flex mb-6'>
            <span className='font-bold text-2xl'>Wishlist</span>
          </div>
          <div className='w-5/6 flex flex-row gap-4 content-center justify-center flex-wrap'>
            {
              wishlists.length === 0 && (
                <div>
                  Data tidak ada
                </div>
              )
            }

            {
              wishlists.length !== 0 &&
              wishlists.map((product, index) => (
                product._id ? (
                  <Card currentPage='wishlist' product={product} key={index} addWishlist={addWishlist} />
                ) : (
                  <div key={index}>
                    Data tidak ada
                  </div>
                )
              ))
            }
          </div>
        </div>
      </section>
      <Footer />
    </section>
  )
}
