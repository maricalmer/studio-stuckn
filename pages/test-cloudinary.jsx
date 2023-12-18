import "../public/stylesheets/projects.css";
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';

import boots from '../public/img/3d_black_boots_profile_big_lrce4p.webp'
import bag from '../public/img/3d_blue_bag_front_big.webp'
import sneakers from '../public/img/3d_orange_sneaker_detail_big_eqpeti.webp'

export default function TestCloudinary() {
  return (
    <>
      <h1>Test cloudinary</h1>
      <div className="carousel h-[60vh] flex mt-20 gap-3 overflow-scroll overscroll-contain relative">
        <CldImage
          width="1991"
          height="1120"
          src="3d_orange_sneaker_detail_big_eqpeti"
          alt="3d bag"
          className="h-full w-auto"
          loading="lazy"
        />
      </div>
      <div className="carousel h-[60vh] flex mt-20 gap-3 overflow-scroll overscroll-contain relative">
        <Image
          width="1991"
          height="1120"
          src="https://res.cloudinary.com/dq41jyzzc/image/upload/v1702740188/3d_orange_sneaker_detail_big_eqpeti.webp"
          alt="3d bag"
          className="h-full w-auto"
          loading="lazy"
          placeholder="blur"
          blurDataURL="https://res.cloudinary.com/dq41jyzzc/image/upload/e_blur/v1702740154/3d_blue_bag_front_big.webp"
        />
      </div>
      <div className="carousel h-[60vh] flex mt-20 gap-3 overflow-scroll overscroll-contain relative">
        <Image
          src={sneakers}
          alt="3d bag"
          className="h-full w-auto"
          loading="lazy"
          placeholder="blur"
        />
      </div>
    </>
  )
}
