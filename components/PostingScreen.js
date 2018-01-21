import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, StatusBar, Dimensions, Image, TouchableWithoutFeedback, Keyboard, TouchableHighlight, KeyboardAvoidingView } from 'react-native';

import origin from '../assets/origin.png';
import destination from '../assets/destination.png';
import leftIcon from '../assets/leftIcon.png';
import rightIcon from '../assets/rightIcon.png';

const { width, height } = Dimensions.get('window');

class PostingScreen extends Component {

  state = {
    originText:'Barcelona',
    destinationText:'',
    inputTextFocus:true,
    keyboardHeight:0
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }


  _keyboardDidHide = () => {
    this.setState({inputTextFocus:false})
    console.log(this.state.inputTextFocus)
  }

  _keyboardDidShow= (e) => {
    this.setState({keyboardHeight:e.endCoordinates.height})
    console.log(height)
    console.log(e.endCoordinates.height)

}



  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.navbarView}>
          <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=> navigate('MapScreen')}>
            <Image style={{alignSelf: 'center', height:25, width:25, left:10}} source={leftIcon}/>
          </TouchableHighlight>
          <Text style={styles.screenTitle}>Posting a Trip</Text>
          <View style={{width:25}}/>
        </View>
        <View style={styles.contentCardView}>
          <View>
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
          </View>
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
              onFocus={() => this.setState({inputTextFocus:true})}
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
              onFocus={() => this.setState({inputTextFocus:true})}
              onChangeText={(destinationText) => this.setState({destinationText})}
              value={this.state.destinationText}
              onSubmitEditing={(destinationText) => this.setState({destinationText})}
            />
          </View>
          <View style={{top:80, height:height-320}}>
            <View style={{height:height-385-this.state.keyboardHeight}}>
            </View>
            <View style={{ justifyContent:'flex-end', flexDirection:'row', marginBottom:4}}>
              {this.state.destinationText.length>0 && this.state.originText.length>0 ?  (
              <View style={styles.nextButton}>
                <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=> navigate('MapScreen')}>
                  <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
                    <Text style={styles.nextText}>Next</Text>
                    <Image style={{alignSelf: 'center', height:25, width:25, left:30, top:20}} source={rightIcon}/>
                  </View>
                </TouchableHighlight>
              </View>
              ):(
              <View style={styles.nextButtonDisabled}>
                <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' >
                  <View  style={{flexDirection:'row', flex:1, alignItems:'center'}}>
                    <Text style={styles.nextText}>Next</Text>
                    <Image style={{alignSelf: 'center', height:25, width:25, left:30, top:20}} source={rightIcon}/>
                  </View>
                </TouchableHighlight>
              </View>
            )}
            </View>
            <View style={styles.stepsAlign}>
              <View style={styles.stepSelected}/>
              <View style={styles.stepView}/>
              <View style={styles.stepView}/>
            </View>
          </View>
        </View>
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
    flexDirection:'row',
    alignItems:'center' ,
    justifyContent: 'space-between'
  },
  screenTitle:{
    textAlign:'center',
    fontSize:24,
    fontWeight:'800',
    color:'white',
  },
  contentCardView:{
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    overflow: 'hidden',
    backgroundColor:'white',
    width:width,
    height: height-88,
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
  },
  viewKeyboardDisappears:{
    flex:2,
    top:95
  },
  nextAlign:{
    top:95,
    flex:1,
    flexDirection:'row',
    overflow:'hidden',
    justifyContent:'flex-end'
  },
  nextButton:{
    backgroundColor:'#007D8C',
    width: 123,
    height:40,
    borderRadius: 60,
    marginRight:10,
    marginBottom:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1,
  },
  nextButtonDisabled:{
    backgroundColor:'#EDEDED',
    width: 123,
    height:40,
    borderRadius: 60,
    marginRight:10,
    marginBottom:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 1,
  },
  nextText:{
    color:'white',
    fontSize:20,
    fontWeight:'900',
    top:20,
    left: 20
  },
  stepsAlign:{
    flexDirection:'row',
    height:7,
    marginRight:6,
    marginLeft:2,
    marginBottom:10,
  },
  stepView:{
    flex:1,
    height:7,
    borderRadius:5,
    marginLeft:4,
    backgroundColor:'#EEE3F5'
  },
  stepSelected:{
    flex:1,
    height:7,
    borderRadius:5,
    marginLeft:4,
    backgroundColor:'#572577'
  }
});
