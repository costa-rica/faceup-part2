import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';
const FontAwesome = _FontAwesome as React.ElementType;

import { useEffect, useState, useRef } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera/legacy';
import { useIsFocused } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import { addPhoto } from "../reducers/user";

export default function SnapScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();//<-- utilse directement comme ça>
  let cameraRef: any = useRef(null);
  // const [type, setType] = useState(CameraType.front);
  const [cameraDirection, cameraDirectionSetter] = useState(CameraType.back)
  const [cameraFlash, cameraFlashSetter] = useState(FlashMode.on)
  
  useEffect(() => {
    (async () => {//<-- function IIFE>
      const result = await Camera.requestCameraPermissionsAsync();
      // CameraType.front

      console.log('- CameraType -')
      console.log(CameraType)
      if (result) {
        setHasPermission(result.status === 'granted');//<-- ternery true ou false>
      }
    })();
  }, []);

  const btnFlip = () => {
    console.log("- dans btnFlip 📸");
    cameraDirectionSetter(cameraDirection === CameraType.back ? CameraType.front : CameraType.back);
  }

  const btnFlash = () => {
    console.log("- dans btnFlash 📸");


    cameraFlashSetter(cameraFlash === FlashMode.on ? FlashMode.off : FlashMode.on)
    console.log(`cameraFlash est: ${cameraFlash}`)
  }


  const btnPrendrePhoto = async() => {
    console.log("- dans btnPrendrePhoto 📸");
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    // const photoUri: string = photo.uri
    // dispatch(addPhoto(photoUri))
    console.log(photo);
  }


  if (!hasPermission || !isFocused) {
    return (
      <View style={styles.container}>
        <Text>SnapScreen</Text>
      </View>
    );
  }

  return (
    <Camera ref={(ref) => cameraRef = ref} type={cameraDirection} 
    flashMode={cameraFlash}
    style={styles.vwCamera}>

      <TouchableOpacity onPress={() => btnFlip()}
        style={styles.touchOpacityFlip}
        activeOpacity={0.8}>
        <FontAwesome name='rotate-right' size={20}  style={styles.fontAwesomeFlip}/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => btnFlash()}
        style={styles.touchOpacityFlash}
        activeOpacity={0.8}>
        {/* <FontAwesome name='flash' size={20}  style={styles.fontAwesomeFlash}/> */}
        <FontAwesome name='flash' size={20}  style={cameraFlash===FlashMode.off ? {"color":'black'} : {"color":'white'}}/>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => btnPrendrePhoto()}
        style={styles.touchOpacityPrendrePhoto}
        activeOpacity={0.8}>
        <FontAwesome name='circle-thin' size={50}  style={styles.fontAwesomePrendrePhoto}/>
      </TouchableOpacity>

    </Camera>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vwCamera: {
    flex: 1,
  },
  touchOpacityFlip: {
    marginTop: 70,
    marginLeft:20,
  },
  fontAwesomeFlip:{color:'white'},
  touchOpacityFlash:{
    marginTop: -20,
    marginLeft:270,
  },
  fontAwesomeFlash:{color:'white'},
  touchOpacityPrendrePhoto:{
    marginTop: 450,
    marginLeft: 140

  },
  fontAwesomePrendrePhoto:{color:'white'},
});
