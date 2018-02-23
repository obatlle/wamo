import React, { Component } from 'react'
import { StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  SectionList,
  Platform,
  Alert,
  Image,
  TouchableHighlight } from 'react-native';

import polygon from '../assets/Polygon.png'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CalendarList} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Entypo';


import { connect } from 'redux-zero/react';
import actions from '../app/actions';

const mapToProps = ({ seats,tripDate }) => ({ seats,tripDate });

const { width, height } = Dimensions.get('window');


class TripInfo extends Component {

  state = {
    origin:'New York City',
    destination:'Washington DC.',
    choosingDate: false,
    choosingSeats: false,
    currentDate: new Date(),
  }



  render() {

    const { navigate } = this.props.navigation;
    const { seats, decrementSeats, incrementSeats, tripDate, setDate, rebootSeats, rebootTripDate } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.navbarView}>
          <View style={{marginLeft:10}}>
            <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=> {navigate('TripList');}}>
              <FontAwesome name="arrow-left" size={28} color="white"/>
            </TouchableHighlight>
          </View>
          <View style={styles.originDestinationText}>
            <Text style={styles.screenTitle}>{this.state.origin}
              <Text style={styles.toText}> to
                <Text style={styles.screenTitle}> {this.state.destination}
                </Text>
              </Text>
            </Text>
            <View style={styles.tripOptionsView}>
              <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=> {this.setState({choosingDate:true, choosingSeats:false})}}>
                <View style={{flexDirection:'row'}}>
                  <FontAwesome name="calendar-o" size={16} color="white"/>
                  {this.props.tripDate==''?(
                    <Text style={styles.tripOptionsText}> Choose a date</Text>
                  ):(
                    <Text style={[styles.tripOptionsText,{left:6}]}>{this.props.tripDate}</Text>
                  )}
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=> {this.setState({choosingSeats:true, choosingDate:false})}}>
                <View style={{flexDirection:'row'}}>
                  <MaterialCommunityIcons name="seat-recline-normal" size={18} color="white"/>
                  {this.props.seats>1?(
                    <Text style={styles.tripOptionsText}>{this.props.seats} seats</Text>
                  ):(
                    <Text style={styles.tripOptionsText}>{this.props.seats} seat</Text>
                  )}
                </View>
              </TouchableHighlight>
              <View style={{width:50}}>
              </View>
            </View>
          </View>
          <View style={{width:1}}/>
        </View>
        <View style={styles.contentCardView}>
         {this.state.choosingDate?(
           <View style={{width:width, height: height, position: 'absolute', backgroundColor:'black',opacity: 0.7}}>
            <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=>{this.setState({choosingDate:false})}}>
              <View style={{height:height, width:width}}>
              </View>
            </TouchableHighlight>
           </View>
         ):(
           <View>
           </View>
         )}
         {this.state.choosingDate?(
           <View style={{width:width*0.95, height:370, backgroundColor:'#FCC745', position: 'absolute',top:8,alignSelf: 'center',borderTopLeftRadius:10, borderTopRightRadius:10,}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'700', textAlign:'center', margin:4}}>Choose a date</Text>
             <CalendarList
               style={{margin: 2,
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
               onDayPress={(day) => {setDate(day);this.setState({choosingDate: false});}}
               markedDates={{[this.props.tripDate]: {selected: true}}}
               theme={{
                 selectedDayBackgroundColor: '#007D8C',
                 selectedDayTextColor: 'white',
                 todayTextColor: '#FCC745',
               }}
             />
           </View>
         ):(
           <View>
           </View>
         )}
         {this.state.choosingSeats?(
           <View style={{width:width, height: height, position: 'absolute', backgroundColor:'black',opacity: 0.7,}}>
            <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=>{this.setState({choosingSeats:false})}}>
              <View style={{height:height, width:width}}>
              </View>
            </TouchableHighlight>
           </View>
         ):(
           <View>
           </View>
         )}
         {this.state.choosingSeats?(
           <View style={{width:width*0.95, height:200, backgroundColor:'#FCC745', position: 'absolute',top:8,alignSelf: 'center',borderTopLeftRadius:10, borderTopRightRadius:10}}>
            <Text style={{color:'white', fontSize:20, fontWeight:'700', textAlign:'center', margin:4}}>Choose how many seats</Text>
            <View style={{backgroundColor:'white', width:width*0.95-4,flex:1, margin:2, flexDirection:'row', justifyContent:'center', alignSelf:'center', alignItems:'center'}}>
              <View style={{}}>
                <Icon.Button name="circle-with-minus" size={30} color="#7dcdcd" backgroundColor="white" onPress={decrementSeats}/>
              </View>
              <Text style={styles.seatsText}>{this.props.seats}</Text>
              <View style={{left:20}}>
                <Icon.Button name="circle-with-plus" size={30} color="#7dcdcd" backgroundColor="white" onPress={incrementSeats}/>
              </View>
            </View>
           </View>
         ):(
           <View>
           </View>
         )}
        {this.state.choosingDate?(
          <Image style={{alignSelf: 'center', top:92, left:85, position:'absolute'}} source={polygon}/>
        ):(
          <View>
          </View>
        )}
        {this.state.choosingSeats?(
          <Image style={{alignSelf: 'center', top:92, left:230, position:'absolute'}} source={polygon}/>
        ):(
          <View>
          </View>
        )}
        </View>
      </View>
    )
  }
};



export default connect(mapToProps, actions)(TripInfo)


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#033D7D'
  },
  navbarView:{
    marginTop:20,
    width:width,
    height: 75,
    flexDirection:'row',
    alignItems:'center' ,
    justifyContent: 'space-between'
  },
  toText:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'400',
    color:'#14BBF2',

  },
  screenTitle:{
    textAlign:'left',
    fontSize:20,
    fontWeight:'600',
    color:'white',

  },
  tripOptionsView:{
    flexDirection:'row',
    justifyContent:'space-between',
    top:10
  },
  originDestinationText:{
    top: -5,
    left: 6,
    flexDirection:'column',
    width: width-60
  },
  contentCardView:{
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    overflow: 'hidden',
    backgroundColor:'white',
    width:width,
    height: height-95,
  },
  tripOptionsText:{
    color:'#FDC848'
  },
  seatsText:{
    color:'#555555',
    fontSize:80,
    fontWeight:'600',
    left: 12,
    right:32
  },
});
