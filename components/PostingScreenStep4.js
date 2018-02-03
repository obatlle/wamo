import React, { Component } from 'react'
import { StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  StatusBar,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  KeyboardAvoidingView } from 'react-native';

import congratsImage from '../assets/congratsImage.png'

import { connect } from 'redux-zero/react';
import actions from '../app/actions';

const mapToProps = ({ postingStep }) => ({ postingStep });

const { width, height } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import dismissKeyboard from 'react-native-dismiss-keyboard'




class PostingScreenStep4 extends Component {

  state = {
    destinationText:'',
    keyboardHeight:0,
    savingPerPassenger:14,
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
    const { postingStep, moveNextStep, rebootSteps } = this.props;

    return (
      <View style={styles.contentCardView}>
        <View>
          <Text style={styles.textHeader}>CONGRATULATIONS!</Text>
          <Text style={[styles.textHeader,{color:'#CACACA', fontWeight:'200', fontSize:18, marginTop:8}]}>Savings per passenger:</Text>
        </View>
        <Image style={{alignSelf: 'center', marginTop:50, height:230, width:230}} source={congratsImage}/>
        <View style={{top:-160, backgroundColor:'rgba(52, 52, 52, 0)', }}>
          <Text style={styles.currencyText}>$
          {this.state.savingPerPassenger%1==0? (
              <Text style={styles.savingsText}>{this.state.savingPerPassenger.toString()+'.0'}
              </Text>
          ):(
              <Text style={styles.savingsText}>{this.state.savingPerPassenger.toString()}
              </Text>
          )}
          </Text>
        </View>
        <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={moveNextStep}>
          <View style={styles.editPriceAlign}>
            <Feather name="edit" size={12} color="#157EFB"/>
            <Text style={styles.editPriceText}>Edit price</Text>
          </View>
        </TouchableHighlight>
        <View style={{ }}>
          <View style={{height:height-575-this.state.keyboardHeight}}>
          </View>
          <View style={{ justifyContent:'flex-end', flexDirection:'row', marginBottom:4}}>
            <View style={styles.doneButton}>
              <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=>{navigate('MapScreen'); dismissKeyboard(); rebootSteps()}}>
                <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
                  <Text style={styles.doneText}>Done</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.stepsAlign}>
            <View style={styles.stepSelected}/>
            <View style={styles.stepSelected}/>
            <View style={styles.stepSelected}/>
          </View>
        </View>
      </View>

    )
  }


};



export default connect(mapToProps, actions)(PostingScreenStep4)


const styles = StyleSheet.create({
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
    fontWeight:'900',
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
  fromToLine:{
    width:1,
    height:22,
    top:52,
    left:49,
    backgroundColor:'#DAD5D5',
  },
  doneButton:{
    backgroundColor:'#FCC745',
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
  doneText:{
    color:'white',
    fontSize:20,
    fontWeight:'900',
    top:20,
    alignSelf:'center',
    left:35
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
  },
  currencyText:{
    textAlign:'center',
    fontSize:40,
    fontWeight:'600',
    color:'gray',
    alignSelf:'center',
  },
  savingsText:{
    textAlign:'center',
    fontSize:70,
    fontWeight:'900',
    color:'black',
    alignSelf:'center',
  },
  editPriceAlign:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'center',
    top:-60,
    flex:1,
  },
  editPriceText:{
    left:5,
    color:'#157EFB',
    fontSize:12
  }
});
