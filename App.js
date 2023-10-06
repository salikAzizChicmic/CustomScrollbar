import React, {useState, useRef} from 'react';
import { widthPercentageToDP as wp,heightPercentageToDP as hp,} from 'react-native-responsive-screen';
import {View,ScrollView,Dimensions,Image,PanResponder,TouchableOpacity,} from 'react-native';

const {width, height} = Dimensions.get('window'); //mobile height
const image = require('./logo.png');
const App = () => {
  const [position, setPosition] = useState({y: 0}); // position of scrollbar
  const [toggle, settoggle] = useState(true); // avoid multiple function call of touch start and move
  const scrollViewRef = useRef(); //get reference of scrollview
  const [contentHeight, setContentHeight] = useState(0); // dynamic height of scrollview 
  const [percentage,setpercentage]=useState(0) 

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      if (gesture.moveY < 1) {
        setPosition({
          y: 0,
        });
      } else if (gesture.moveY <= hp('100%')-hp('10%')) {
        setPosition({
          y: gesture.moveY,
        });
      } 
      else {
        setPosition({
          y: hp('100%')-hp('10%'),
        });
      }
     },
  });

  const handleTouch = event => {
    const {locationX, locationY} = event.nativeEvent;
    const t=hp('100%')-hp('10%');
    let per11=((locationY/t)*100) //position where user clicks
    scrollViewRef.current.scrollTo({x: 0, y: ((contentHeight-(height))*per11)/100 , animated: false}); // position where scrollview have to move
     if(locationY>hp('100%')-hp('10%')){
        setPosition({y: hp('100%')-hp('10%')}); //setting bar position
     }else {
        setPosition({y: locationY}); //setting bar position
     }
  };
  
  const handleScreenPress = event => {
    const t=hp('100%')-hp('10%'); //bar height
    const per1=((position.y/t)*100); // current position of gesture
    setpercentage(per1) //setting bar position
    scrollViewRef.current.scrollTo({x: 0, y: ((contentHeight-(height))*percentage)/100 , animated: false}); //adjusting scrollview
  };

  function handleOnScroll(event) {
    const t=hp('100%')-hp('10%'); //bar height
    const offsetY = event.nativeEvent.contentOffset.y;
    let p1 = (offsetY / ((contentHeight - height))) * 100 //calculating percentage to move
    if (toggle == false) {
      setPosition({y: (t*p1)/100});
    }
  }
  const handleContentSizeChange = (contentWidth, contentHeight) => { //trigger when content changes and return new height
    setContentHeight(contentHeight);
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onContentSizeChange={handleContentSizeChange}
        onTouchStart={()=>settoggle(false)}>
        <View style={{height:'100%'}}>
          <Image
            source={image}
            style={{height: 100, width: 200, marginBottom: 15,objectFit:'contain'}}></Image>
          <Image
            source={image}
            style={{height:  300, width: 200, marginBottom: 15,objectFit:'fill'}}></Image>
          <Image
            source={image}
            style={{height:  500, width: 200, marginBottom: 15,objectFit:'fill'}}></Image>
          <Image
            source={image}
            style={{height:  200, width: 200, marginBottom: 15,objectFit:'fill'}}></Image>
        <Image
            source={image}
            style={{height:  400, width: 200, marginBottom: 15,objectFit:'fill'}}></Image>
        <Image
            source={image}
            style={{height:  700, width: 200, marginBottom: 15,objectFit:'fill'}}></Image>
          
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: wp('15%'),
          height: hp('100%'),
          backgroundColor: 'lightgray',
        }}
        onTouchMove={handleScreenPress}
        onTouchStart={()=>settoggle(true)}
        {...panResponder.panHandlers}>
        <TouchableOpacity
          style={{height: '100%', width: '100%'}}
          activeOpacity={1}
          onPress={handleTouch}>
          <View
            style={{
              height:hp('10%'),
              backgroundColor: 'darkgrey',
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
    </View>
  );
};

export default App;