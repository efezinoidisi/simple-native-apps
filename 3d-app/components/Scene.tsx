import { ASSETS } from '@/constants';
import type { Character, CharacterData } from '@/types';
import {
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei/native';
import { Suspense, useEffect, useRef } from 'react';
import { Group } from 'three';

useGLTF.preload(ASSETS.models.boy);
useGLTF.preload(ASSETS.models.girl);

Object.values(ASSETS.animations.girl).forEach((animation) => {
  useGLTF.preload(animation);
});

Object.values(ASSETS.animations.boy).forEach((animation) => {
  useGLTF.preload(animation);
});

const Character = ({
  modelPath,
  type = 'girl',
  data,
}: {
  modelPath: any;
  type?: Character;
  data: CharacterData;
}) => {
  const group = useRef<Group>(null);

  const { scene } = useGLTF(modelPath) as any;

  const animationPath =
    type === 'boy'
      ? ASSETS.animations.boy[data.animation]
      : ASSETS.animations.girl[data.animation];

  const { animations } = useGLTF(animationPath) as any;

  const { actions, names } = useAnimations(animations, group);

  const animationName = names[0] || '';

  useEffect(() => {
    if (!animations?.length || !animationPath) return;

    if (actions[animationName]) {
      actions[animationName].reset().fadeIn(0.5).play();
    }

    return () => {
      if (actions[animationName]) {
        actions[animationName].fadeOut(0.5).stop();
      }
    };
  }, [data.animation, names]);

  return (
    <group ref={group} position={data.position} rotation={data.rotation}>
      <primitive object={scene} scale={[1.2, 1.2, 1.2]} />
    </group>
  );
};

export const Scene = ({
  data,
}: {
  data: { boy: CharacterData; girl: CharacterData };
}) => {
  return (
    <>
      <ambientLight intensity={0.1} />

      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize={1024}
      />
      {/* <color attach='background' args={['#ffbf40']} /> */}

      <Suspense fallback={null}>
        <Character modelPath={ASSETS.models.girl} data={data.girl} />

        <Character modelPath={ASSETS.models.boy} data={data.boy} type='boy' />

        <Environment
          files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr'
          ground={{ height: 5, radius: 40, scale: 20 }}
        />
      </Suspense>

      <OrbitControls enableZoom={false} enableRotate={true} />
    </>
  );
};
