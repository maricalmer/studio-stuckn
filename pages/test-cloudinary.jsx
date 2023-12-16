import "../public/stylesheets/projects.css";
import { CldImage } from 'next-cloudinary';

export default function TestCloudinary() {
  return (
    <>
      <h1>Test cloudinary</h1>
      <CldImage
        width="1989"
        height="1120"
        src="3d_blue_bag_front_big"
        alt="3d bag"
      />
    </>
  )
}
