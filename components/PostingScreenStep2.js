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


import { CalendarList} from 'react-native-calendars';
import DateTimePicker from 'react-native-modal-datetime-picker';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { connect } from 'redux-zero/react';
import actions from '../app/actions';

const mapToProps = ({ postingStep }) => ({ postingStep });

const { width, height } = Dimensions.get('window');



class PostingScreenStep2 extends Component {

  state = {
    destinationText:'',
    keyboardHeight:0,
    markedDays: '',
    currentDate: new Date(),
    isDateTimePickerVisible: false,
    departureTime:'',
    initialHour: new Date('2018-01-29T08:00:00.000Z')
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

  onDayPress(day) {
    this.setState({
    markedDays: day.dateString,
    isDateTimePickerVisible: true
    });

  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    hour=date.getHours()
    minute=date.getMinutes()

    if (hour<10){hour='0'+hour}
    if (minute<10){minute='0'+minute}

    dateString = this.state.markedDays+" "+hour+":"+minute+":00"
  , reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/
  , [, year, month, day, hours, minutes, seconds] = reggie.exec(dateString)
  , dateObject = new Date(year, month-1, day, hours, minutes, seconds);
  console.log(dateObject)
  this.setState({
    departureTime: dateObject,
  });
    this._hideDateTimePicker();
  };



  render() {

    const { navigate } = this.props.navigation;
    const { postingStep, moveNextStep, rebootSteps } = this.props;

    return (
      <View style={styles.contentCardView}>
        <View>
          <Text style={[styles.textHeader,styles.textOriginColor]}>When
            <Text style={styles.textHeader}> are you going to travel?
            </Text>
          </Text>
        </View>
        <View style={{top:50,height:370}}>
          <CalendarList
            style={{paddingTop: 5,
                    height:370}}
            minDate={this.state.currentDate}
            // Callback which gets executed when visible months change in scroll view. Default = undefined
            onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={0}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={12}
            // Enable or disable scrolling of calendar list
            scrollEnabled={true}
            // Enable or disable vertical scroll indicator. Default = false
            showScrollIndicator={true}
            onDayPress={(day) => {this.onDayPress(day)}}
            markedDates={{[this.state.markedDays]: {selected: true}}}
            theme={{
              selectedDayBackgroundColor: '#007D8C',
              selectedDayTextColor: 'white',
              todayTextColor: '#FCC745',
            }}
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
            mode={'time'}
            titleIOS={'At what time are you going to pick up your passengers?'}
            titleStyle={[styles.textHeader,{top:0, fontSize:18, fontWeight:'400',}]}
            date={this.state.initialHour}
            cancelTextIOS={"I don't know yet"}
          />
        </View>
        <View style={{top:85, height:height-772}}>
          <View style={{height:height-772-this.state.keyboardHeight}}>
          </View>
          <View style={{ justifyContent:'flex-end', flexDirection:'row', marginBottom:4}}>
            {this.state.markedDays.length>0 ?  (
              <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={moveNextStep}>
                <View style={styles.nextButton}>
                  <View style={{flexDirection:'row', flex:1, alignItems:'center', top:-20}}>
                    <Text style={styles.nextText}>Next</Text>
                    <View style={{left:30, top:20}}>
                      <FontAwesome name="arrow-right" size={25} color="white"/>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            ):(
            <View style={styles.nextButtonDisabled}>
              <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' >
                <View  style={{flexDirection:'row', flex:1, alignItems:'center'}}>
                  <Text style={styles.nextText}>Next</Text>
                  <View style={{left:30, top:20}}>
                    <FontAwesome name="arrow-right" size={25} color="white"/>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          )}
          </View>
          <View style={styles.stepsAlign}>
            <View style={styles.stepSelected}/>
            <View style={styles.stepSelected}/>
            <View style={styles.stepView}/>
          </View>
        </View>
      </View>

    )
  }


};



export default connect(mapToProps, actions)(PostingScreenStep2)


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
  }
});
