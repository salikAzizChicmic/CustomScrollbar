import React, {useState, useRef} from 'react';
import {View, ScrollView, Text, Dimensions, Image, PanResponder} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const image = {uri: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'};


const Final = () => {
  const [position, setPosition] = useState({  y: 0 });
  const [tog,settog]=useState(true)
  const [touchend1,settouchend1]=useState(true)
  const scrollViewRef = useRef();
  const transformRef = useRef();
  const [scrollY, setScrollY] = useState(0);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      console.log("pp", gesture.moveY)
      if (gesture.moveY < 0) {
        setPosition({
          y:0
        })
      }
      else if(gesture.moveY<600){
        setPosition({
          y: gesture.moveY, // Adjust for the box height
        });
      }else{
        setPosition({
          y: 585, // Adjust for the box height
        });
      }
      
    },
  });
  const panResponder1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      console.log(gesture.moveY)
     console.log("hi")
    },
  });
  const lmn = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    
console.log(locationY)


// if(locationY<600){
  scrollViewRef.current.scrollTo({ x: 0, y: locationY, animated: false });
  setPosition({y:locationY})

  };
  const handleScreenPress = event => {
    const {locationX, locationY} = event.nativeEvent;
    scrollViewRef.current.scrollTo({x: 0, y: position.y, animated: false});
    
  }

  const handleScroll = event => {
      const {locationX, locationY} = event?.nativeEvent;
      const offsetY = event.nativeEvent.contentOffset?.y;
       //setScrollY(offsetY);
       if(offsetY){
        console.log("object")
        setPosition({y:offsetY})
       }else{
        console.log(locationX)
        setPosition({y:locationY})
       }
  };
  
  function abc(event){

    const offsetY = event.nativeEvent.contentOffset.y;
console.log(offsetY)
if(tog==false){
  setPosition({y:offsetY})
}
//setPosition({y:offsetY})
  }
  function pqr(){
    console.log("u8")
    settog(false)
  }
  function xyz(){
    settog(true)
  }
  return (
    <View style={{flex: 1}}  >
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={abc}
      onTouchStart={pqr}
        >
        <View style={{height: "100%"}} >
          <Image
            source={image}
            style={{ height: 300, width: 200, marginBottom: 15,objectFit:'contain' }}></Image>
          <Image
            source={image}
            style={{ height: 300, width: 200, marginBottom: 15,objectFit:'contain'  }}></Image>
          
          <Image
            source={image}
            style={{height: 300, width: 200, marginBottom: 15,objectFit:'contain' }}></Image>
          
          <Image
            source={image}
            style={{ height: 300, width: 200, marginBottom: 15, objectFit: 'contain' }}></Image>

        </View>
      </ScrollView>
      
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          //bottom: 680,
          width: 40,
          //
          height:height,
          backgroundColor: 'gray', 
          borderRadius: 3,
        }}
       onTouchMove={handleScreenPress}
        onTouchStart={xyz}
        // onTouchEnd={lmn}
        //onTouchEndCapture={lmn}
        
        
        >
        <View
       // onTouchMove={handleScreenPress1}
          style={{
             position: 'relative',
            height: 99,
            backgroundColor: '#047BD5',
            borderRadius:20,
            transform: [
              {
                translateY: position.y
              },
            ],
          }}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
};

export default Final;
