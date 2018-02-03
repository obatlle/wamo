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

import PostingScreenStep1 from './PostingScreenStep1'
import PostingScreenStep2 from './PostingScreenStep2'
import PostingScreenStep3 from './PostingScreenStep3'
import PostingScreenStep4 from './PostingScreenStep4'
import PostingScreenStep5 from './PostingScreenStep5'

import { connect } from 'redux-zero/react';
import actions from '../app/actions';

const mapToProps = ({ postingStep }) => ({ postingStep });

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
    const { postingStep, moveNextStep, rebootSteps, movePreviousStep } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.navbarView}>
        {this.props.postingStep==1? (
          <View style={{marginLeft:10}}>
            <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=> {movePreviousStep();navigate('MapScreen')}}>
              <FontAwesome name="arrow-left" size={25} color="white"/>
            </TouchableHighlight>
          </View>
        ):(
          <View style={{marginLeft:10}}>
            <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={movePreviousStep}>
              <FontAwesome name="arrow-left" size={25} color="white"/>
            </TouchableHighlight>
          </View>
        )}
          <Text style={styles.screenTitle}>Posting a Trip</Text>
          <View style={{width:25}}/>
        </View>
        {this.props.postingStep==1? (
          <PostingScreenStep1 navigation={this.props.navigation}/>
        ):(
          <View>
            {this.props.postingStep==2? (
              <PostingScreenStep2 navigation={this.props.navigation}/>
            ):(
              <View>
              {this.props.postingStep==3? (
                <PostingScreenStep3 navigation={this.props.navigation}/>
              ):(
                <View>
                  {this.props.postingStep==4?(
                    <PostingScreenStep4 navigation={this.props.navigation}/>
                  ):(
                    <View>
                    {this.props.postingStep==5?(
                      <PostingScreenStep5 navigation={this.props.navigation}/>
                    ):(
                      <View style={{backgroundColor:'white', flex:1}}></View>
                    )}
                    </View>
                  )}
                </View>
              )}
              </View>
            )}
          </View>
        )}
      </View>
    )
  }


};



export default connect(mapToProps, actions)(PostingScreen)


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
