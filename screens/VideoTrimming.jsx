import * as React from 'react';
import { useEffect } from 'react';

import { NativeEventEmitter, NativeModules, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { isValidVideo, showEditor } from 'react-native-video-trim';
import { launchImageLibrary } from 'react-native-image-picker';

const VideoTrimming = () => {
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
    const subscription = eventEmitter.addListener('VideoTrim', event => {
      switch (event.name) {
        case 'onShow': {
          console.log('onShowListener', event);
          break;
        }
        case 'onHide': {
          console.log('onHide', event);
          break;
        }
        case 'onStartTrimming': {
          console.log('onStartTrimming', event);
          break;
        }
        case 'onFinishTrimming': {
          console.log('onFinishTrimming', event);
          break;
        }
        case 'onCancelTrimming': {
          console.log('onCancelTrimming', event);
          break;
        }
        case 'onError': {
          console.log('onError', event);
          break;
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          console.log('onPress')
          const result = await launchImageLibrary({
            mediaType: 'video',
          });
          console.log(result);
          isValidVideo(result.assets[0]?.uri || '').then(res =>
            console.log(res),
          ).catch((error) => {
            console.log(error)
          });

          await showEditor(result.assets[0]?.uri || '', {
            maxDuration: 20,
          });
        }}
        style={{padding: 10, backgroundColor: 'red'}}>
        <Text>Launch Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log("WORKING")
          isValidVideo('invalid file path').then(res => console.log(res));
        }}
        style={{
          padding: 10,
          backgroundColor: 'blue',
          marginTop: 20,
        }}>
        <Text>Check Video Valid</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VideoTrimming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
