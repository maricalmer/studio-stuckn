import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function BagModel({ scale, position, rotation, scrollYProgress }) {
  const { scene } = useGLTF("./3dmodel/grafitti_bag.glb");
  useFrame((state) => {
    state.scene.rotation.set(0, Math.atan(scrollYProgress * Math.PI * 2) * 4, 0);
    state.scene.position.set(0, -2 * (scrollYProgress * 0.1), 0);
    state.camera.position.set(1.7 + scrollYProgress * -0.5, -0.2 + scrollYProgress * 1.9, -0.7 + scrollYProgress * 1.1);
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
};
