export const ASSETS = {
  models: {
    boy: require('@/assets/models/one.glb'),
    girl: require('@/assets/models/girl.glb'),
  },
  animations: {
    boy: {
      dance: require('@/assets/animations/male/M_Dances_002.glb'),
      idle: require('@/assets/animations/male/M_Standing_Idle_002.glb'),
      jog: require('@/assets/animations/male/M_Jog_003.glb'),
      talk: require('@/assets/animations/male/M_Talking_Variations_008.glb'),
    },
    girl: {
      dance: require('@/assets/animations/female/F_Dances1.glb'),
      idle: require('@/assets/animations/female/F_Standing_Idle_001.glb'),
      jog: require('@/assets/animations/female/F_Jog_001.glb'),
      talk: require('@/assets/animations/female/F_Talking_Variations_001.glb'),
    },
    // jump: require('@/assets/animations/F_Jog_Jump_Small_001.glb'),
  },
};
