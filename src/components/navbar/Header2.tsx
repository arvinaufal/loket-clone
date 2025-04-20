// "use client"
// // import { cookies } from 'next/headers';
// import Image from 'next/image'
// import Link from 'next/link';
// import { redirect } from 'next/navigation';
// import { useState } from 'react';
// import LogoutButton from '../fragments/LogoutButton';
// import { confirmWishlist, logout } from './auth';
// import WishlistButton2 from '../fragments/WishlistButton2';
// // import isLoggedIn from './isLoggedIn';

// type Props = {
//   currentPage: string;
//   isLoggedIn?: any;
// };
// export default function Header2({ currentPage, isLoggedIn }: Props) {
//   // const myToken = cookies().get('Authorization');
//   // let status: string;
//   // if (myToken) {
//   //   if (myToken.value.split(' ')[1]) {
//   //     status = 'login'
//   //   } else {
//   //     status = 'logout'
//   //   }
//   // } else {
//   //   status = 'logout'
//   // }
//   // console.log(isLoggedIn())

  

//   return (
//     <section className='w-full h-32 flex flex-col'>
//       <div className='w-full h-12 flex justify-end items-center content-center gap-8 px-8' style={{ backgroundColor: "#083c9c" }}>
//         <span className='text-white text-xs tracking-wider font-medium'>
//           Tentang Loket
//         </span>
//         <span className='text-white text-xs tracking-widest font-medium'>
//           Mulai Jadi Event Creator
//         </span>
//         <span className='text-white text-xs tracking-widest font-medium'>
//           Biaya
//         </span>
//         <span className='text-white text-xs tracking-widest font-medium'>
//           Blog
//         </span>
//         <span className='text-white text-xs tracking-widest font-medium'>
//           Hubungi Kami
//         </span>
//       </div>
//       <div className='w-full h-full flex flex-row gap-8 px-8 py-4' style={{ backgroundColor: "#182c54" }}>
//         <div className='h-full flex'>
//           <div style={{ position: 'relative', width: '172px', height: '46px' }}>
//             <Image
//               src="/images/logo_loket.png"
//               alt="Deskripsi gambar"
//               layout="fill"
//               objectFit="contain"
//             />
//           </div>
//         </div>

//         <div className='h-full flex flex-row justify-center items-center content-center w-full gap-8 cursor-pointer'>
//           <Link href={'/'} className={`h-10 flex justify-center content-center items-center hover:border-b-4 hover:border-b-solid hover:border-b-white" ${currentPage === 'beranda' ? "border-b-4 border-b-solid border-b-white" : ""}`}>
//             <span className='text-white font-medium text-xl'>Beranda</span>
//           </Link>
//           <Link href={'/products'} className={`h-10 flex justify-center content-center items-center hover:border-b-4 hover:border-b-solid hover:border-b-white ${currentPage === "produk" ? "border-b-4 border-b-solid border-b-white" : ""}`}>
//             <span className='text-white font-medium text-xl'>Produk</span>
//           </Link>
//           {/* <Link href={'/wishlist'} className={`h-10 flex justify-center content-center items-center hover:border-b-4 hover:border-b-solid hover:border-b-white ${currentPage === "wishlist" ? "border-b-4 border-b-solid border-b-white" : ""}`}>
//             <span className='text-white font-medium text-xl'>Wishlist</span>
//           </Link> */}
//           {/* <WishlistButton2 status={status} confirmWishlist={confirmWishlist} currentPage={currentPage} /> */}
          
//         </div>
//         <div className='h-full flex flex-row justify-center items-center content-center w-1/5 gap-4 '>
//           {
//             status == 'logout'
//               ?
//               <>
//                 <Link href={'/register'} className='h-10 bg-transparent rounded-lg border border-white flex justify-center content-center items-center w-1/2 cursor-pointer' >
//                   <span className='text-white font-normal'>Daftar</span>
//                 </Link>
//                 <Link href={'/login'} className='h-10 bg-transparent rounded-lg border flex justify-center content-center items-center w-1/2 cursor-pointer' style={{ backgroundColor: "#084ccc", borderColor: "#084ccc" }}>
//                   <span className='text-white font-normal'>Masuk</span>
//                 </Link>
//               </>
//               :
//               <LogoutButton logout={logout} />
//           }
//         </div>
//       </div>
//     </section>
//   )
// }
