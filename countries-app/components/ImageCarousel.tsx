import { ImageCarouselProps } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import React, { useRef } from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

const ImageCarousel = ({ data, isDarkMode }: ImageCarouselProps) => {
  const scrollOffsetValue = useSharedValue<number>(0);

  const carouselRef = useRef<ICarouselInstance>(null);

  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View className='mt-4 mb-6 rounded-lg overflow-hidden'>
      <Carousel
        ref={carouselRef}
        loop={true}
        width={320}
        height={200}
        snapEnabled={true}
        pagingEnabled={true}
        data={data}
        defaultScrollOffsetValue={scrollOffsetValue}
        onProgressChange={progress}
        onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
          'worklet';
          g.enabled(false);
        }}
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: item.image }}
              style={{ width, height: 200 }}
              className='w-full bg-gray-50/20 dark:bg-gray-600/20 self-center'
              resizeMode='cover'
              alt={item.alt}
            />
          );
        }}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          backgroundColor: '#999999',
          borderRadius: '50%',
          width: 8,
          height: 8,
        }}
        activeDotStyle={{ backgroundColor: isDarkMode ? '#F2F4F7' : 'white' }}
        onPress={onPressPagination}
        containerStyle={{ gap: 2, position: 'absolute', bottom: 16 }}
      />

      {/* Navigation Arrows */}
      <View className='absolute top-1/2 -translate-y-1/2 flex-row w-full justify-between items-center'>
        <Pressable
          className={
            'ml-4 text-white p-1 rounded-[20px] bg-white/30 dark:bg-gray-100/30'
          }
        >
          <Feather
            name='chevron-left'
            size={24}
            color={isDarkMode ? '#F2F4F74D' : '#FCFCFD'}
          />
        </Pressable>
        <Pressable className='mr-4 text-white p-1 rounded-[20px] bg-white/30 dark:bg-gray-100/30'>
          <Feather
            name='chevron-right'
            size={24}
            color={isDarkMode ? '#F2F4F74D' : '#FCFCFD'}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ImageCarousel;
