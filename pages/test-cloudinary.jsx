import "../public/stylesheets/projects.css";
import { CldImage } from 'next-cloudinary';

export default function TestCloudinary() {
  return (
    <>
      <h1>Test cloudinary</h1>
      <CldImage
        width="1989"
        height="1120"
        src="Alien_Bag_Front_View_Background_NEW_RESCam_front_001_purxqj.webp"
      />
    </>
  )
}
