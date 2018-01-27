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

import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { connect } from 'redux-zero/react';
import actions from '../app/actions';

const mapToProps = ({ postingStep }) => ({ postingStep });

const { width, height } = Dimensions.get('window');

import Icon from 'react-native-vector-icons/Entypo';
const plusIcon = (<Icon name="circle-with-plus" size={20} color="#900" />)


class PostingScreenStep3 extends Component {

  state = {
    destinationText:'',
    keyboardHeight:0,
    availableSeats:3,
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
          <Text style={styles.textHeader}>How many
            <Text style={[styles.textHeader,styles.textOriginColor]}> seats
              <Text style={styles.textHeader}> are you sharing?
              </Text>
            </Text>
          </Text>
        </View>
        <View style={{}}>
          <View style={{top:80,height:270, flexDirection:'row', alignItems:'center', alignSelf:'center'}}>
            <View style={{}}>
              <Icon.Button name="circle-with-minus" size={30} color="#7dcdcd" backgroundColor="white" onPress={()=>{this.setState({availableSeats: Math.max(this.state.availableSeats-1,0)})}}/>
            </View>
            <Text style={styles.seatsText}>{this.state.availableSeats}</Text>
            <View style={{left:20}}>
              <Icon.Button name="circle-with-plus" size={30} color="#7dcdcd" backgroundColor="white" onPress={()=>{this.setState({availableSeats: Math.max(this.state.availableSeats+1,0)})}}/>
            </View>
          </View>
        </View>
        <View style={{ height:height-482}}>
          <View style={{height:height-482-this.state.keyboardHeight}}>
          </View>
          <View style={{ justifyContent:'flex-end', flexDirection:'row', marginBottom:4}}>
            <View style={styles.nextButton}>
              <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={moveNextStep}>
                <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
                  <Text style={styles.nextText}>Next</Text>
                  <View style={{left:30, top:20}}>
                    <FontAwesome name="arrow-right" size={25} color="white"/>
                  </View>
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



export default connect(mapToProps, actions)(PostingScreenStep3)


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
  fromToLine:{
    width:1,
    height:22,
    top:52,
    left:49,
    backgroundColor:'#DAD5D5',
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
  },
  seatsText:{
    color:'#555555',
    fontSize:186,
    fontWeight:'600',
    left: 12,
    right:32
  }
});
