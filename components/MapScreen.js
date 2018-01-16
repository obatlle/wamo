import React, { Component } from 'react';
import { TouchableWithoutFeedback,Keyboard,StyleSheet, Text, View, TouchableHighlight , Dimensions, TextInput, Image} from 'react-native';

import MapView from 'react-native-maps'

import locationImg from '../assets/locationImg.png';

const { width, height } = Dimensions.get('window');

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

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}


class LinksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' ,
                  a: {
                        latitude: LATITUDE + SPACE,
                        longitude: LONGITUDE + SPACE,
                      },
                  b: {
                    latitude: LATITUDE - SPACE,
                    longitude: LONGITUDE - SPACE,
                  },
                };
  }

  onMapPress(e) {
   this.setState({
     a: {
           latitude: e.nativeEvent.coordinate.latitude,
           longitude: e.nativeEvent.coordinate.longitude,
         },
   });
 }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
        <MapView
            provider={MapView.PROVIDER_GOOGLE}
            style={styles.map}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={false}
            rotateEnabled={false}
            customMapStyle={customStyle}
            onPress={(e) => this.onMapPress(e)}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <MapView.Marker
              coordinate={this.state.a}
              onSelect={(e) => log('onSelect', e)}
              onDrag={(e) => log('onDrag', e)}
              onDragStart={(e) => log('onDragStart', e)}
              onDragEnd={(e) => log('onDragEnd', e)}
              onPress={(e) => log('onPress', e)}
              image={locationImg}
              draggable/>
          </MapView>
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
          <TouchableHighlight style={styles.addTripContainer} underlayColor='rgba(52, 52, 52, 0)' onPress={()=> navigate('PostingScreen')}>
            <View style={styles.addTripAlign}>
              <Text style={styles.addTripText}>Post a trip</Text>
              <View style={styles.addTripShadow}>
                <View style={styles.addTripView}>
                  <Text style={styles.addTripSymbol}>+</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default LinksScreen;

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
    addTripContainer: {
          position: 'absolute',
          top: height-100,
          right: 30,
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
