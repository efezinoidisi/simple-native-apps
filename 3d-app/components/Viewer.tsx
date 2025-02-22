import { ASSETS } from '@/constants';
import { type Animation, type Character, type CharacterData } from '@/types';
import {
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

  //  const modelPath = require('../assets/models/girl.glb');

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

const Scene = ({
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

const Controls = ({
  animations,
  handleAnimationChange,
  character,
  activeAnimation,
}: {
  animations: Array<string>;
  handleAnimationChange: (
    name: Character,
    key: keyof typeof ASSETS.animations.boy
  ) => void;
  character: Character;
  activeAnimation: keyof typeof ASSETS.animations.boy;
}) => {
  return (
    <View style={styles.animationsContainer}>
      {animations.map((key) => {
        const isActiveAnimation = activeAnimation === key;

        return (
          <TouchableOpacity
            key={key}
            onPress={() => handleAnimationChange(character, key as Animation)}
            style={{
              paddingVertical: 6,
              borderWidth: isActiveAnimation ? 0 : 0.5,
              alignItems: 'center',
              backgroundColor: isActiveAnimation ? '#f05c85' : 'transparent',
              borderRadius: 9,
            }}
          >
            <Text
              style={[
                styles.controlsText,
                {
                  color: isActiveAnimation ? '#fafafa' : '#000',
                },
              ]}
            >
              {key}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Viewer = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [activeAnimation, setActiveAnimation] = useState<{
    boy: keyof typeof ASSETS.animations.boy;
    girl: keyof typeof ASSETS.animations.girl;
  }>({
    boy: 'idle',
    girl: 'idle',
  });

  const [activeCharacter, setActiveCharacter] = useState<Character>('girl');

  const characters: ['boy', 'girl'] = ['boy', 'girl'];

  const toggleActiveCharacter = (character: Character) => {
    setActiveCharacter(character);
  };

  const [movements, setMovements] = useState<{
    boy: CharacterData;
    girl: CharacterData;
  }>({
    boy: {
      position: [1, -0.4, 0],
      animation: 'idle',
      rotation: [0, -Math.PI / 2, 0],
    },
    girl: {
      position: [-0.4, -0.4, 0],
      animation: 'idle',
      rotation: [0, Math.PI / 2, 0],
    },
  });

  const handleAnimationChange = (
    name: 'girl' | 'boy',
    animation: Animation
  ) => {
    setMovements((prev) => {
      const updatedMovements = { ...prev };

      if (activeCharacter === 'boy') {
        updatedMovements.girl.animation = 'idle';
      } else {
        updatedMovements.boy.animation = 'idle';
      }

      updatedMovements[name].animation = animation;

      return updatedMovements;
    });

    setActiveAnimation((prev) => ({ ...prev, [name]: animation }));
  };

  return (
    <View style={styles.container}>
      <Canvas
        camera={{ position: [1, 4, 3.2] }}
        onCreated={() => setIsLoading(false)}
        style={{}}
      >
        <Scene data={movements} />
      </Canvas>

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={'#d30f3f'} size={'large'} />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.controls}>
          <View style={styles.controlsHeader}>
            {characters.map((avatar) => {
              const isActiveCharacter = activeCharacter === avatar;
              return (
                <TouchableOpacity
                  onPress={() => toggleActiveCharacter(avatar)}
                  style={[
                    styles.controlsHeaderBtn,
                    {
                      backgroundColor: isActiveCharacter
                        ? '#d30f3f'
                        : 'rgba(22, 22, 29,0.1)',
                    },
                  ]}
                  key={avatar}
                >
                  <Text
                    style={{
                      color: isActiveCharacter ? '#fff' : '#000',
                      textTransform: 'capitalize',
                      fontSize: 20,
                      opacity: isActiveCharacter ? 1 : 0.4,
                    }}
                  >
                    {avatar}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {activeCharacter === 'girl' ? (
            <Controls
              handleAnimationChange={handleAnimationChange}
              animations={Object.keys(ASSETS.animations.girl)}
              activeAnimation={activeAnimation.girl}
              character='girl'
            />
          ) : (
            <Controls
              handleAnimationChange={handleAnimationChange}
              animations={Object.keys(ASSETS.animations.boy)}
              activeAnimation={activeAnimation.boy}
              character='boy'
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Viewer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    width: 200,
    borderWidth: 0.2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  controlsHeader: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 2,
    backgroundColor: '#f5ede0',
    borderColor: 'rgba(0,0,0,0.5)',
  },
  controlsHeaderBtn: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  controlsText: {
    textTransform: 'capitalize',
  },
  animationsContainer: {
    backgroundColor: '#f5ede0',
    width: '100%',
    paddingVertical: 10,
    gap: 6,
    paddingHorizontal: 5,
  },
});
