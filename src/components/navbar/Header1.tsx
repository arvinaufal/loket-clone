"use client"
import Image from 'next/image'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaMagnifyingGlass, FaHeart, FaRegHeart, FaArrowRight } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import LogoutButton from '../fragments/LogoutButton';
import WishlistButton from '../fragments/WishlistButton';
import { type } from 'os';
import { usePathname } from 'next/navigation'
import { logout } from './auth';
import WishlistButton2 from '../fragments/WishlistButton2';
import { toWishlist } from './toWishlistHandler';
import { useState } from 'react';

type Props = {
  isLoggedIn: boolean
}

export default function Header1({ isLoggedIn }: Props) {
  const [searchHome, setSearchHome] = useState<any>("");
  const pathname = usePathname()
  const currentPage = pathname.split('/')[1] !== "" ? pathname.split('/')[1] : 'home';

  const handleSearchHome = async () => {
      try {
        // return redirect("/products?q=" + searchHome);
        window.location.href = `/products?q=${searchHome}`;
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <>
      {
        currentPage === 'products'
        &&
        <section className='w-full h-32 flex flex-col'>
          <div className='w-full h-12 flex justify-end items-center content-center gap-8 px-8' style={{ backgroundColor: "#083c9c" }}>
            <span className='text-white text-xs tracking-wider font-medium'>
              Tentang Loket
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Mulai Jadi Event Creator
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Biaya
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Blog
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Hubungi Kami
            </span>
          </div>
          <div className='w-full h-full flex flex-row gap-8 px-8 py-4' style={{ backgroundColor: "#182c54" }}>
            <div className='h-full flex'>
              <div style={{ position: 'relative', width: '172px', height: '46px' }}>
                <Image
                  src="/images/logo_loket.png"
                  alt="Deskripsi gambar"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>

            <div className='h-full flex flex-row justify-center items-center content-center w-full gap-8 cursor-pointer'>
              <Link href={'/'} className={`h-10 flex justify-center content-center items-center hover:border-b-4 hover:border-b-solid hover:border-b-white"`}>
                <span className='text-white font-medium text-xl'>Beranda</span>
              </Link>
              <Link href={'/products'} className={`h-10 flex justify-center content-center items-center hover:border-b-4 hover:border-b-solid hover:border-b-white border-b-4 border-b-solid border-b-white`}>
                <span className='text-white font-medium text-xl'>Produk</span>
              </Link>
              <WishlistButton2 status={isLoggedIn}  currentPage={currentPage} />

            </div>
            <div className='h-full flex flex-row justify-center items-center content-center w-1/5 gap-4 '>
              {
                isLoggedIn === false
                  ?
                  <>
                    <Link href={'/register'} className='h-10 bg-transparent rounded-lg border border-white flex justify-center content-center items-center w-1/2 cursor-pointer' >
                      <span className='text-white font-normal'>Daftar</span>
                    </Link>
                    <Link href={'/login'} className='h-10 bg-transparent rounded-lg border flex justify-center content-center items-center w-1/2 cursor-pointer' style={{ backgroundColor: "#084ccc", borderColor: "#084ccc" }}>
                      <span className='text-white font-normal'>Masuk</span>
                    </Link>
                  </>
                  :
                  <LogoutButton logout={logout} />
              }
            </div>
          </div>
        </section>
      }

      {
        currentPage === 'wishlist'
        &&
        <section className='w-full h-32 flex flex-col'>
          <div className='w-full h-12 flex justify-end items-center content-center gap-8 px-8' style={{ backgroundColor: "#083c9c" }}>
            <span className='text-white text-xs tracking-wider font-medium'>
              Tentang Loket
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Mulai Jadi Event Creator
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Biaya
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Blog
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Hubungi Kami
            </span>
          </div>
          <div className='w-full h-full flex flex-row gap-8 px-8 py-4' style={{ backgroundColor: "#182c54" }}>
            <div className='h-full flex'>
              <div style={{ position: 'relative', width: '172px', height: '46px' }}>
                <Image
                  src="/images/logo_loket.png"
                  alt="Deskripsi gambar"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>

            <div className='h-full flex flex-row justify-center items-center content-center w-full gap-8 cursor-pointer'>
              <Link href={'/'} className={`h-10 flex justify-center content-center items-center hover:border-b-4 hover:border-b-solid hover:border-b-white"`}>
                <span className='text-white font-medium text-xl'>Beranda</span>
              </Link>
              <Link href={'/products'} className={`h-10 flex justify-center content-center items-center hover:border-b-4 hover:border-b-solid hover:border-b-white`}>
                <span className='text-white font-medium text-xl'>Produk</span>
              </Link>
              <WishlistButton2 status={isLoggedIn} currentPage={currentPage} />

            </div>
            <div className='h-full flex flex-row justify-center items-center content-center w-1/5 gap-4 '>
              {
                isLoggedIn === false
                  ?
                  <>
                    <Link href={'/register'} className='h-10 bg-transparent rounded-lg border border-white flex justify-center content-center items-center w-1/2 cursor-pointer' >
                      <span className='text-white font-normal'>Daftar</span>
                    </Link>
                    <Link href={'/login'} className='h-10 bg-transparent rounded-lg border flex justify-center content-center items-center w-1/2 cursor-pointer' style={{ backgroundColor: "#084ccc", borderColor: "#084ccc" }}>
                      <span className='text-white font-normal'>Masuk</span>
                    </Link>
                  </>
                  :
                  <LogoutButton logout={logout} />
              }
            </div>
          </div>
        </section>
      }

      {
        currentPage === 'home'
        &&
        <section className='w-full h-32 flex flex-col'>
          <div className='w-full h-12 flex justify-end items-center content-center gap-8 px-8' style={{ backgroundColor: "#083c9c" }}>
            <span className='text-white text-xs tracking-wider font-medium'>
              Tentang Loket
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Mulai Jadi Event Creator
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Biaya
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Blog
            </span>
            <span className='text-white text-xs tracking-widest font-medium'>
              Hubungi Kami
            </span>
          </div>
          <div className='w-full h-full flex flex-row gap-8 px-8 py-4' style={{ backgroundColor: "#182c54" }}>
            <div className='h-full flex'>
              <div style={{ position: 'relative', width: '172px', height: '46px' }}>
                <Image
                  src="/images/logo_loket.png"
                  alt="Deskripsi gambar"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <div className='h-full flex flex-col w-3/5 '>
              <div className='flex flex-row w-full justify-center'>
                <input
                  type="text"
                  id="search"
                  value={searchHome}
                  onChange={(e) => setSearchHome(e.target.value)}
                  placeholder='Cari event seru di sini'
                  className="bg-white focus:outline-none p-4 rounded-l-lg h-8 border-opacity-10 pr-10"
                  style={{ width: "80%" }}
                />
                <div className='w-10 flex justify-center items-center content-center rounded-r-md' style={{ backgroundColor: "#084ccc" }} onClick={handleSearchHome}>
                  <FaMagnifyingGlass style={{ color: "#ffffff", fontWeight: "bold" }} size={14} />
                </div>
              </div>
              <div className='flex flex-row w-full justify-center mt-4 gap-8 '>
                <span className='text-xs text-white font-normal'>
                  #LoketScreen
                </span>
                <span className='text-xs text-white font-normal'>
                  #DidangdutinFest
                </span>
                <span className='text-xs text-white font-normal'>
                  #SteveAoki&apos;sCakeParty
                </span>
                <span className='text-xs text-white font-normal'>
                  #LOKET_Promo
                </span>
                <span className='text-xs text-white font-normal'>
                  #LOKET_Musik
                </span>
              </div>
            </div>
            <div className='h-full flex flex-row w-2/5'>
              <WishlistButton status={isLoggedIn} confirmWishlist={toWishlist} />
              <Link href={'/products'} className='w-1/4 flex flex-row gap-2 justify-center content-center h-full items-center'>
                <div className='h-8' >
                  <IoTicket size={28} color={"white"} />
                </div>
                <div className='h-7 flex justify-center content-center items-center'>
                  <span className='font-bold text-xs text-white'>
                    Produk
                  </span>
                </div>
              </Link>
              <div className='h-full flex flex-row justify-center items-center content-center w-1/2 gap-4 ml-4 '>
                {
                  isLoggedIn === false
                    ?
                    <>
                      <Link href={'/register'} className='h-10 bg-transparent rounded-lg border border-white flex justify-center content-center items-center w-1/2 cursor-pointer' >
                        <span className='text-white font-normal'>Daftar</span>
                      </Link>
                      <Link href={'/login'} className='h-10 bg-transparent rounded-lg border flex justify-center content-center items-center w-1/2 cursor-pointer' style={{ backgroundColor: "#084ccc", borderColor: "#084ccc" }}>
                        <span className='text-white font-normal'>Masuk</span>
                      </Link>
                    </>
                    :
                    <LogoutButton logout={logout} />
                }

              </div>
            </div>
          </div>
        </section>

      }

    </>
  )
}
