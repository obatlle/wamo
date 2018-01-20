import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, StatusBar, Dimensions, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';

import origin from '../assets/origin.png';
import destination from '../assets/destination.png';
import leftIcon from '../assets/leftIcon.png';

const { width, height } = Dimensions.get('window');

class PostingScreen extends Component {

  state = {
    originText:'Barcelona',
    destinationText:''
  }

  componentWillMount() {


  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.navbarView}>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.contentCardView}>
              <Text style={styles.textHeader}>Select the
                <Text style={[styles.textHeader,styles.textOriginColor]}> origin
                  <Text style={styles.textHeader}> and the
                    <Text style={[styles.textHeader,styles.textDestinationColor]}> destination
                      <Text style={styles.textHeader}> of your trip:
                      </Text>
                    </Text>
                  </Text>
                </Text>
              </Text>
              <View style={styles.originAlign}>
                <View style={styles.originFrom}>
                  <Image style={{alignSelf: 'center', height:25, width:25}} source={origin}/>
                  <Text style={styles.fromText}>From:</Text>
                </View>
                <TextInput
                  style={styles.fromTextInput}
                  placeholder='from...'
                  placeholderTextColor ='#E7E7E7'
                  clearButtonMode='always'
                  onChangeText={(originText) => this.setState({originText})}
                  value={this.state.originText}
                  onSubmitEditing={(originText) => this.setState({originText})}
                />
              </View>
              <View style={styles.fromToLine}>
              </View>
              <View style={[styles.originAlign, {top:55}]}>
                <View style={styles.originFrom}>
                  <Image style={{alignSelf: 'center', height:25, width:25}} source={destination}/>
                  <Text style={styles.fromText}>To:</Text>
                </View>
                <TextInput
                  style={styles.fromTextInput}
                  placeholder='Destination'
                  placeholderTextColor ='#E7E7E7'
                  clearButtonMode='always'
                  autoFocus={true}
                  onChangeText={(destinationText) => this.setState({destinationText})}
                  value={this.state.destinationText}
                  onSubmitEditing={(destinationText) => this.setState({destinationText})}
                />
              </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }


};



export default (PostingScreen)


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#5D287F'
  },
  navbarView:{
    marginTop:20,
    width:width,
    height: 70,
  },
  contentCardView:{
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    overflow: 'hidden',
    backgroundColor:'white',
    width:width,
    height: height-90,
  },
  textHeader:{
    top:30,
    width: width*0.8,
    textAlign:'center',
    fontSize:24,
    fontWeight:'600',
    color:'gray',
    alignSelf:'center',
  },
  textOriginColor:{
    color: '#572576',
    fontWeight:'900',
  },
  textDestinationColor:{
    color: '#007D8C',
    fontWeight:'900',
  },
  originAlign:{
    top:50,
    alignSelf:'center',
    width:width*0.8,
    flexDirection:'row',
    justifyContent:'space-around',
  },
  originFrom:{
    top:6,
    flexDirection:'row',
    alignItems:'center' ,
    alignSelf:'flex-start',
  },
  fromText:{
    marginLeft:8,
    fontSize:20,
    color:'#9E9E9E',
  },
  fromTextInput:{
    left:8,
    flex:1,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'normal' ,
    color: '#2D9CDB',
    backgroundColor:'#F9F9F9',
    borderRadius:5,
    paddingTop:6,
    paddingBottom:6,
  },
  fromToLine:{
    width:1,
    height:22,
    top:52,
    left:49,
    backgroundColor:'#DAD5D5',
  }
});
