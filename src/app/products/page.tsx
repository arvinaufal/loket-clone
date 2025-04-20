"use client"
import Card from '@/components/navbar/Card';
import Footer from '@/components/navbar/Footer';
import { MyResponse, ProductType } from '@/db/type';
import Image from 'next/image'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaMagnifyingGlass, FaHeart, FaRegHeart, FaArrowRight } from "react-icons/fa6";
import InfiniteScroll from 'react-infinite-scroll-component'; //USE THIS FOR PAGINATION
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix, { Report } from 'notiflix';
import { useSearchParams } from 'next/navigation'

// import isLoggedIn from '@/components/navbar/isLoggedIn';

type ProductsType = {
  updatedProducts: ProductType[];
};

type GetProductsType = {
  message: string;
  data: ProductsType;
};

export default function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams()


  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?limit=4&page=${page}&q=${q}`,
        {
          method: 'GET',
          cache: 'no-store'
        }
      );
      
      const result: GetProductsType = await response.json();

      const newProducts: ProductType[] = result.data.updatedProducts;

      setProducts([...products, ...newProducts]);

      if (products.length == 20) {
        setHasMore(false);
      } else {
        setPage(page + 1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const search = searchParams.get('q');

        if (search !== null) {
          setQ(search);
        } else {
          await fetchMoreData();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleSearch = async () => {
    try {
      const products = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/a?limit=10&q=${q}`,
        {
          method: "GET",
          cache: "no-store"
        }
      );

      const result = await products.json();
      setProducts(result.data.updatedProducts);

    } catch (error) {
      console.log(error);
    }
  }

  // const callLog = () => {
  //   console.log('Test debounce');
  // }

  // const  testDebounce = (callback, timeout = 1000) => {
  //   let timer: any;

  //   return (...args: any) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => { callback.apply(this, args) }, timeout)
  //   }
  // }



  // const handleDebounce = testDebounce(() => callLog());


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
    }else{
      Report.success(
        'Sukses',
        'Berhasil menambahkan wishlist',
        'Ok',
        () => {
          // Redirect to '/wishlist' after the user clicks "Ok"
          window.location.href = '/wishlist';
        }
      );
    }
  }

  return (
    <section className='min-h-screen w-full bg-white flex flex-col'>
      <section className='w-full h-full flex-col pb-24'>
        <div className='w-full flex flex-col justify-center items-center content-center my-8' style={{ height: "20%" }}>
          <div className='w-1/3'>
            <div className='flex flex-row w-full justify-center'>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder='Cari event seru di sini'
                className="bg-white focus:outline-none rounded-l-full border-r-0 pr-4 pl-4 pt-2 pb-2 border border-solid border-slate-800"
                style={{ width: "80%" }}
              />
              <div className='w-14 flex justify-center items-center content-center bg-blue-800 hover:bg-blue-600 rounded-r-full border border-solid border-slate-800 border-l-0' onClick={handleSearch}>
                <FaMagnifyingGlass style={{ color: "white", fontWeight: "bold" }} size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center content-center' style={{ height: "30%" }}>
          <div className='w-5/6 flex mb-6'>
            <span className='font-bold text-2xl'>Tiket</span>
            {/* <div className='px-2 py-1 bg-orange-500 text-white' onClick={handleDebounce}>
              Click here
            </div> */}
          </div>
          {/* {
              products
              &&
              products.map((product, index) => (
                <Card currentPage='produk' product={product} key={index} />
              ))
            } */}
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className='flex row-full items-center justify-center content-center pt-8 gap-32'>
                <div className="flex flex-col gap-4 w-52">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex flex-col gap-4 w-52">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex flex-col gap-4 w-52">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex flex-col gap-4 w-52">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            }
            endMessage={
              <div className='flex row-full items-center justify-center content-center pt-8 gap-32'>
                <span className='italic font-semibold text-sm'>--- Loket Clone ---</span>
              </div>
            }
            scrollableTarget='parentScrollDiv'
          >
            <div className='w-full flex flex-row gap-4 content-center justify-center flex-wrap pb-8'>

              {products.map((product, index) => (
                <Card currentPage='produk' product={product} key={index} addWishlist={addWishlist} />
              ))}
            </div>
          </InfiniteScroll>


        </div>
      </section>
      <Footer />
    </section>
  )
}
