import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  PanResponder,
  TouchableOpacity
} from 'react-native';

const {width, height} = Dimensions.get('window');
const image = {uri: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'};

const Final = () => {
  const [position, setPosition] = useState({y: 0});
  const [tog, settog] = useState(true);
  const scrollViewRef = useRef();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (gesture.moveY <0) {
        setPosition({
          y: -8,
        });
      } 
      else if (gesture.moveY < 750) {
        setPosition({
          y: gesture.moveY,
        });
      } else {
        setPosition({
          y: 750,
        });
      }
    },
  });

  const handleEnd = event => {
    const {locationX, locationY} = event.nativeEvent;
    scrollViewRef.current.scrollTo({x: 0, y: locationY, animated: false});
    setPosition({y: locationY<740?locationY:740});

  };
  const handleScreenPress = event => {
    const {locationX, locationY} = event.nativeEvent;
    scrollViewRef.current.scrollTo({x: 0, y: position.y+10, animated: false});
  };

  function handleScroll(event) {
    const offsetY = event.nativeEvent.contentOffset.y;
      if (tog == false) {
        setPosition({y: offsetY});
      }
  }
  function handleStart() {
    settog(false);
  }
  function xyz() {
    settog(true);
  }
  return (
    <View style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onTouchStart={handleStart}>
        
        <View style={{height: '100%'}}>
          <Image
            source={image}
            style={{height: 300, width: 200, marginBottom: 15,objectFit:'contain'}}></Image>
          <Image
            source={image}
            style={{height: 300, width: 200, marginBottom: 15,objectFit:'contain'}}></Image>
          <Image
            source={image}
            style={{height: 300, width: 200, marginBottom: 15,objectFit:'contain'}}></Image>
          <Image
            source={image}
            style={{ height: 300, width: 200, marginBottom: 15,objectFit:'contain'}}></Image>
          <Image
            source={image}
            style={{height: 300, width: 200, marginBottom: 15,objectFit:'contain'}}></Image>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleEnd}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: 60,
          height: height,
          backgroundColor: 'lightgrey',
         // borderRadius: 3,
        }}
        
      >
        
        <View
          style={{
            width: '100%',
            height:'100%'
          }}
        onTouchMove={handleScreenPress}
        onTouchStart={xyz}
        {...panResponder.panHandlers}
        >
          <TouchableOpacity
          style={{height:'100%',width:'100%'}}
        activeOpacity={1}
        onPress={handleEnd}>
        <View
          style={{
            position: 'relative',
            height: 99,
            backgroundColor: 'grey',
            transform: [
              {
                translateY: position.y,
              },
            ],
          }}
          {...panResponder.panHandlers}
            />
            </TouchableOpacity>
        </View>
        
          
        </TouchableOpacity>
    </View>
  );
};

export default Final;
