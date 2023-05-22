import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import PressableOpacity from './PressableOpacity';
import Video from 'react-native-video';
import { VideoPlay } from './VideoPlay';

const UploadImage = ({setImage, image, setIsVideo}) => {
  const uploadImageFromLib = async () => {
    launchImageLibrary({mediaType: 'mixed'}, setImage);
  };

  useEffect(() => {
    setIsVideo(image?.assets?.[0]?.type?.includes('video'))
  }, [image]);
  const video = React.useRef(null);

  return (
    <View>
      <PressableOpacity onPress={uploadImageFromLib}>
        {!image?.assets && (
          <View className="bg-red-600 p-2 rounded-sm justify-center items-center mb-2">
            <Text className="text-white">Upload Image / Video</Text>
          </View>
        )}
      </PressableOpacity>
      {image?.assets &&
        image?.assets.map(({uri, type}: {uri: string; type: string}) => (
          <View key={uri} style={styles.imageContainer}>
            {!type?.includes('video') && (
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{uri: uri}}
              />
            )}
            {type?.includes('video') && (
                      <VideoPlay imageUrl={uri} video={video}></VideoPlay>)}

          </View>
        ))}

      {image?.assets && (
        <View className="flex-row gap-2">
          <PressableOpacity
            className="bg-red-400 p-2 mb-2 w-2/4 items-center"
            onPress={setImage}>
            <Text>Clear Image</Text>
          </PressableOpacity>

          <PressableOpacity
            className="bg-red-700 p-2 mb-2 w-2/4 items-center "
            onPress={uploadImageFromLib}>
            <Text className="text-white">Reupload Image</Text>
          </PressableOpacity>
        </View>
      )}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
