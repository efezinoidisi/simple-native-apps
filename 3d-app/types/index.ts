export type CharacterData = {
  position: [number, number, number];
  animation: Animation;
  rotation: [number, number, number];
};

export type Animation = 'dance' | 'jog' | 'idle' | 'talk';

export type Character = 'boy' | 'girl';
