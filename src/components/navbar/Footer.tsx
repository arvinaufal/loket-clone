import Image from 'next/image'
import Link from 'next/link';
import { FaMagnifyingGlass, FaHeart, FaRegHeart, FaArrowRight } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";

export default function Footer() {
  return (
    <section className='w-full h-32 flex flex-col'>
      <div className='w-full h-auto flex flex-col gap-8 px-8 py-4' style={{ backgroundColor: "#182c54" }}>
        <div className='w-full flex flex-row '>
          <div className=' w-1/2 p-4'>
            <div className='pb-6'>
              <span className='text-xl font-bold text-white italic'>Tentang Loket</span>
            </div>
            <p className='text-white pb-4'>
              LOKET adalah platform yang memiliki Ticketing Management Service (TMS) dengan teknologi unggul dalam mendukung seluruh penyelenggara event, mulai dari distribusi & manajemen tiket hingga penyediaan laporan analisis event di akhir acara.
            </p>

            <ul className="list-disc list-inside  ">
              <li className='text-white'>Distributor tiket terlengkap yang telah bekerja sama dengan LOKET untuk menjual tiket Anda.</li>
              <li className='text-white'>Sistem pembayaran yang beragam dan aman memberikan kemudahan kepada calon pembeli, untuk mendapatkan konversi yang lebih tinggi.</li>
              <li className='text-white'>Gate management yang paling aman dan nyaman untuk akses saat event berlangsung. Sehingga, event dengan jumlah penonton yang besar dapat ditangani dengan mudah.</li>
              <li className='text-white'>Sistem analisis data yang lengkap dan komprehensif setelah acara berlangsung untuk memudahkan penyelenggara event dalam menentukan strategi event selanjutnya.</li>
            </ul>

            <p className='text-white pt-4'>
              Sudah ada ratusan event yang bekerja sama dengan kami dan semuanya tersebar di seluruh Indonesia. Kini, saatnya perkenalkan event Anda pada dunia untuk membawa penonton yang lebih banyak lagi bersama kami!
            </p>
          </div>
          <div className=' w-1/2 p-4'>
            <div className='pb-6'>
              <span className='text-xl font-bold text-white italic'>Tentang Loket Clone</span>
            </div>
            <p className='text-white pb-4'>
              Aplikasi Loket Clone merupakan aplikasi clone yang bertujuan hanya untuk proses pembelajaran NextJs, segala bentuk elements dan assets (gambar, logo, tema warna, dll.) yang berkaitan dengan Loket merupakan hak cipta milik Loket sepenuhnya. Silakan kunjungi <a href="https://www.loket.com/" className='underline italic font-semibold'>Website Resmi Loket</a>
            </p>
            <p className='text-white pb-4'>
              Aplikasi Loket Clone memungkinkan pengguna dalam mengelola barang-barang dalam bentuk berbagai macam tiket dengan konsep wishlist. Aplikasi ini memungkinkan pengguna untuk mencari tiket, menambahkan tiket ke dalam wishlist hingga menghapus tiket yang sudah tidak masuk ke dalam wishlist
            </p>
          </div>
        </div>

        <div className='h-full w-full flex flex-row gap-14 justify-center content-center items-center'>
          <div style={{ position: 'relative', width: '26px', height: '26px' }}>
            <Image
              src="https://assets.loket.com/web/legacy/img/social/logo-socmed-fb.svg"
              alt="Deskripsi gambar"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div style={{ position: 'relative', width: '26px', height: '26px' }}>
            <Image
              src="https://assets.loket.com/web/legacy/img/social/logo-socmed-ig.svg"
              alt="Deskripsi gambar"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div style={{ position: 'relative', width: '26px', height: '26px' }}>
            <Image
              src="https://assets.loket.com/web/legacy/img/social/logo-socmed-twtr.svg"
              alt="Deskripsi gambar"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div style={{ position: 'relative', width: '26px', height: '26px' }}>
            <Image
              src="https://assets.loket.com/web/legacy/img/social/logo-socmed-lnkdin.svg"
              alt="Deskripsi gambar"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div style={{ position: 'relative', width: '26px', height: '26px' }}>
            <Image
              src="https://assets.loket.com/web/legacy/img/social/logo-socmed-yt.svg"
              alt="Deskripsi gambar"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
      <div className='w-full h-auto flex justify-center items-center content-center gap-8 px-8' style={{ backgroundColor: "#083c9c" }}>
        <span className='text-white text-xs tracking-wider font-medium'>
          Loket - Loket Clone
        </span>
      </div>
    </section>
  )
}
