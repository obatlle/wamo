import React, { Component } from 'react';
import { TouchableWithoutFeedback,Keyboard,StyleSheet, Text, View, TouchableHighlight , Dimensions, TextInput, Image, Animated,Button, Platform} from 'react-native';

import MapView from 'react-native-maps'

import origin from '../assets/origin.png';
import logo from '../assets/logo.png';
import polygon from '../assets/Polygon.png'
import inversePolygon from '../assets/InversePolygon.png'

import dismissKeyboard from 'react-native-dismiss-keyboard'

const { width, height } = Dimensions.get('window');

import SlidingUpPanel from 'rn-sliding-up-panel'

import { connect } from 'redux-zero/react';
import actions from '../app/actions';


const customStyle = [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    }
];
const ASPECT_RATIO = width / height;
const LATITUDE = 41.3818;
const LONGITUDE = 2.1685;
const LATITUDE_DELTA = 2.2;
const LONGITUDE_DELTA = 2.2;
const SPACE = 0.01;

const mapToProps = ({ postingStep }) => ({ postingStep });

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}


const DEFAULT_PADDING = {  top: 0, right: 0, bottom: 0, left: 0 };

class LinksScreen extends Component {


  static defaultProps = {
    draggableRange: {
      top: height / 1.19,
      bottom: 120
    }
  }

  _draggedValue = new Animated.Value(-120)

  constructor(props) {
    dismissKeyboard()
    super(props);
    this._renderFavoriteIcon = this._renderFavoriteIcon.bind(this)
    this._translateYAnimation = new Animated.Value(this._animatedValueY)
    this.transitionTo = this.transitionTo.bind(this)
    this.state = { text: '' ,
                   dragStatus:'messages',
                   dragOnTop:false,
                  a: {
                        latitude: LATITUDE + SPACE,
                        longitude: LONGITUDE + SPACE,
                      },
                  b: {
                    latitude: LATITUDE - SPACE,
                    longitude: LONGITUDE - SPACE,
                  },
                  region: {
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  },
                };


  }

  componentWillMount(){
    dismissKeyboard()
  }



  onRegionChange(region) {
    try{
      this.setState({ region })
    } catch (error) {
   // Error changing location
   }
  }




  onMapPress(e,lat,lng,lat_delta,lng_delta) {
    dismissKeyboard()
    try{
     this.setState({
       a: {
             latitude: e.nativeEvent.coordinate.latitude,
             longitude: e.nativeEvent.coordinate.longitude,
           },
      region:{
        latitude: lat,
        longitude: lng,
        latitudeDelta: lat_delta,
        longitudeDelta: lng_delta,
      }
     });
   } catch (error) {
  // Error changing location
  }
 }

 componentWillReceiveProps(nextProps) {
     if (nextProps.visible && !this.props.visible) {
       this.transitionTo(-this.props.draggableRange.top)
     }

     if (
       nextProps.draggableRange.top !== this.props.draggableRange.top ||
       nextProps.draggableRange.bottom !== this.props.draggableRange.bottom
     ) {
       const {top, bottom} = nextProps.draggableRange
       this._flick = new FlickAnimation(this._translateYAnimation, -top, -bottom)
     }
   }

   transitionTo(value, onAnimationEnd = () => {}) {
       const animationConfig = {
         toValue: -Math.abs(value),
         duration: 260,
         // eslint-disable-next-line no-undefined, max-len
         delay: Platform.OS === 'android' ? 166.67 : undefined // to make it looks smooth on android
       }

       Animated.timing(this._translateYAnimation, animationConfig).start(onAnimationEnd)
     }

 _renderFavoriteIcon() {
   const {top, bottom} = this.props.draggableRange
   const draggedValue = this._draggedValue.interpolate({
     inputRange: [-(top + bottom) / 2, -bottom],
     outputRange: [0, 1],
     extrapolate: 'clamp'
   })

   const transform = [{scale: draggedValue}]

   const { navigate } = this.props.navigation;
   const { postingStep, moveNextStep, rebootSteps } = this.props;
   return (
     <Animated.View style={[styles.favoriteIcon, {transform}]}>
     <TouchableHighlight  underlayColor='rgba(52, 52, 52, 0)' onPress={()=>{navigate('PostingScreen'); moveNextStep()}}>
       <View style={styles.addTripAlign}>
         <Text style={styles.addTripText}>Post a trip</Text>
         <View style={styles.addTripShadow}>
           <View style={styles.addTripView}>
             <Text style={styles.addTripSymbol}>+</Text>
           </View>
         </View>
       </View>
     </TouchableHighlight>
     </Animated.View>
   )
 }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
          <MapView
              ref={ref => { this.map = ref } }
              provider={MapView.PROVIDER_GOOGLE}
              style={styles.map}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={false}
              rotateEnabled={false}
              customMapStyle={customStyle}
              onPress={(e) => this.onMapPress(e,this.state.region.latitude,this.state.region.longitude,this.state.region.latitudeDelta,this.state.region.longitudeDelta)}
              region={this.state.region}
              onRegionChange={(e) =>this.onRegionChange(e)}>
              <MapView.Marker
                coordinate={this.state.a}
                onSelect={(e) => log('onSelect', e)}
                onDrag={(e) => log('onDrag', e)}
                onDragStart={(e) => log('onDragStart', e)}
                onDragEnd={(e) => log('onDragEnd', e)}
                onPress={(e) => log('onPress', e)}
                image={origin}
                draggable/>
            </MapView>
            <Image
              style={styles.logoAlign}
              source={logo}
            />
            <View style={styles.profileSearchContainer}>
              <View style={styles.profileSearchAlign}>
                <Image
                  style={styles.profileView}
                  source={{uri: 'https://randomuser.me/api/portraits/women/11.jpg'}}
                />
                <View style={styles.searchView}>
                  <TextInput
                    style={styles.searchText}
                    placeholder='Where to?'
                    placeholderTextColor ='#E7E7E7'
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    onSubmitEditing={()=>navigate('Search')}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <SlidingUpPanel
          visible
          showBackdrop={true}
          ref={(c) => {this._panel = c}}
          draggableRange={this.props.draggableRange}
          onDrag={(v) => {this._draggedValue.setValue(v);if (v<-this.props.draggableRange.top*0.8){this.setState({dragOnTop:true})} else {this.setState({dragOnTop:false})}}}>
          <View style={styles.panel}>
            {this._renderFavoriteIcon()}
            <View style={styles.panelHeader}>
                {this.state.dragStatus == 'messages'? (
                  <View>
                      {!this.state.dragOnTop? (
                        <View style={styles.draggView}>
                          <View style={styles.selectedDragg}>
                            <Button title="Messages"  color='black' onPress={()=> {this.setState({dragStatus: 'messages',dragOnTop:true});console.log('messages');this._panel.transitionTo(-this.props.draggableRange.top, null);Keyboard.dismiss}}/>
                            <Image style={{alignSelf: 'center', top:-5, left:-2}} source={polygon}/>
                          </View>
                          <Button title="Notifications"  color='#9E9E9E' onPress={()=> {this.setState({dragStatus: 'notifications',dragOnTop:true});console.log('notifications');this._panel.transitionTo(-this.props.draggableRange.top, null);Keyboard.dismiss}}/>
                        </View>
                      ):(
                        <View style={styles.draggView}>
                          <View style={styles.selectedDragg}>
                            <Button title="Messages"  color='black' onPress={()=> {this.setState({dragStatus: 'messages',dragOnTop:false});console.log('messages');this._panel.transitionTo(-this.props.draggableRange.bottom, null);Keyboard.dismiss}}/>
                            <Image style={{alignSelf: 'center', top:-5, left:-2}} source={inversePolygon}/>
                          </View>
                          <Button title="Notifications"  color='#9E9E9E' onPress={()=> {this.setState({dragStatus: 'notifications'});console.log('notificationspim');Keyboard.dismiss}}/>
                        </View>
                      )}
                </View>
              ):(
                <View>
                    {!this.state.dragOnTop? (
                      <View style={styles.draggView}>
                        <Button title="Messages"  color='#9E9E9E' onPress={()=> {this.setState({dragStatus: 'messages',dragOnTop:true});console.log('messages');this._panel.transitionTo(-this.props.draggableRange.top, null);Keyboard.dismiss}}/>
                        <View style={styles.selectedDragg}>
                          <Button title="Notifications"  color='black' onPress={()=> {this.setState({dragStatus: 'notifications',dragOnTop:true});console.log('notifications');this._panel.transitionTo(-this.props.draggableRange.top, null);Keyboard.dismiss}}/>
                          <Image style={{alignSelf: 'center', top:-5, left:-2}} source={polygon}/>
                        </View>
                      </View>
                    ):(
                      <View style={styles.draggView}>
                        <Button title="Messages"  color='#9E9E9E' onPress={()=> {this.setState({dragStatus: 'messages'});console.log('messages');Keyboard.dismiss}}/>
                        <View style={styles.selectedDragg}>
                          <Button title="Notifications"  color='black' onPress={()=> {this.setState({dragStatus: 'notifications',dragOnTop:false});console.log('notifications');this._panel.transitionTo(-this.props.draggableRange.bottom, null);Keyboard.dismiss}}/>
                          <Image style={{alignSelf: 'center', top:-5, left:-2}} source={inversePolygon}/>
                        </View>
                      </View>
                    )}
              </View>
              )}
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={styles.container}>
                <Text>Bottom Sheet Content</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

export default connect(mapToProps, actions) (LinksScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  counter: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  map: {
    width: width,
    height: height+80,
    top:300
  },
  logoAlign:{
    position: 'absolute',
    top:40,
    alignItems: 'center',
  },
  profileSearchContainer:{
    position: 'absolute',
    width:width,
    top: 80,
  },
  profileSearchAlign:{
    flex:1,
    flexDirection: 'row',
  },
  profileView: {
        width: 50,
        height: 50,
        left:20,
        borderRadius:25,
        overflow: 'hidden',
        borderColor: 'white',
        borderWidth: 3,
    },
  searchView: {
        width: width-100,
        height: 50,
        left: 30,
        borderRadius:25,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
    },
    searchText:{
      marginTop:10,
      fontSize: 24,
      textAlign: 'right',
      right: 16,
      fontWeight: 'normal' ,
      color: '#979797'
    },
    panel: {
      flex: 1,
      position: 'relative',
      top: 72,
      width: width*0.97,
      left: width*0.015,
    },
    panelHeader: {
      height: 50,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      overflow: 'hidden',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
    draggView:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: width*0.8,
      top:5
    },
    selectedDragg:{
      flexDirection: 'row',
      justifyContent: 'center',
    },
    favoriteIcon: {
      position: 'absolute',
      top: -75,
      right: 10,
      zIndex: 1
    },
    addTripAlign: {
      flex:1,
      flexDirection: 'row',
    },
    addTripText: {
      marginTop: 16 ,
      right: 8,
      fontSize: 18,
      fontWeight: 'bold' ,
      color: '#5D287F'
    },
    addTripView: {
        width: 58,
        height: 58,
        borderRadius:29,
        overflow: 'hidden',
        backgroundColor: '#5D287F',
    },
    addTripShadow:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 1,
    },
    addTripSymbol: {
      marginTop: 4 ,
      textAlign:'center',
      fontSize: 36,
      fontWeight: 'normal' ,
      color: '#7dcdcd'
    },
});
