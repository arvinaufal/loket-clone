import addWishlistHome from '@/components/fragments/addWishlistHome';
import Card from '@/components/navbar/Card';
import Footer from '@/components/navbar/Footer';
import Header1 from '@/components/navbar/Header1';
import { MyResponse, ProductType } from '@/db/type';
import { cookies } from 'next/headers';
import Image from 'next/image'
import Link from 'next/link';
import { Report } from 'notiflix';
import { FaMagnifyingGlass, FaHeart, FaRegHeart, FaArrowRight } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";

type ProductsType = {
  updatedProducts: ProductType[]
};

type GetProductsType = {
  message: string;
  data: ProductsType;
}

export default async function Home() {
  const getProducts = async (): Promise<GetProductsType> => {
    "use server"
    const products = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?limit=8&q=`,
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


  const { data } = await getProducts();
  // const data: any = [];
  
  return (
    <section className='min-h-screen w-full bg-white flex flex-col'>
      {/* <Header1 /> */}
      <section className='w-full h-full flex-col'>
        <div className='w-full flex flex-col justify-center items-center content-center my-8' style={{ height: "20%" }}>
          <div className='w-5/6'>
            <div className="carousel w-full">
              <div id="slide1" className="carousel-item relative w-full rounded-xl">
                <img src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1700588977_9JKKtS.jpg" className="w-full rounded-xl" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">❮</a>
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
              </div>
              <div id="slide2" className="carousel-item relative w-full rounded-xl">
                <img src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1701368043_KcJIds.jpg" className="w-full rounded-xl" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a>
                  <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
              </div>
              <div id="slide3" className="carousel-item relative w-full rounded-xl">
                <img src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1690260495_PraZyu.jpg" className="w-full rounded-xl" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">❮</a>
                  <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
              </div>
              <div id="slide4" className="carousel-item relative w-full rounded-xl">
                <img src="https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/ss/1690530867_sahQv9.jpg" className="w-full rounded-xl" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">❮</a>
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center content-center' style={{ height: "30%" }}>
          <div className='w-5/6 flex mb-6'>
            <span className='font-bold text-2xl'>Event Pilihan</span>
          </div>
          <div className='w-5/6 flex flex-row gap-4 content-center justify-center flex-wrap'>
            {
              data
              &&
              data.updatedProducts?.map((product, index) => (
                <Card currentPage='beranda' product={product} key={index} addWishlist={addWishlistHome} />
              ))
            }
          </div>
        </div>
        <div className='flex w-full h-36 justify-center content-center items-center pt-2'>
          <Link href={'/products'} className='flex justify-center content-center items-center h-12 w-44 rounded-xl' style={{ backgroundColor: "#084ccc" }}>
            <span className='text-white font-semibold'>See All</span>
          </Link>
        </div>
      </section>
      <Footer />
    </section>
  )
}
