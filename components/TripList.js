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

const mapToProps = ({ seats,tripDate, originCity, destinationCity }) => ({ seats,tripDate, originCity, destinationCity });

const { width, height } = Dimensions.get('window');


class TripList extends Component {

  state = {
    origin:'New York City',
    destination:'Washington DC.',
    choosingDate: true,
    choosingSeats: false,
    currentDate: new Date(),
  }


  render() {

    const { navigate } = this.props.navigation;
    const { seats, decrementSeats, incrementSeats, tripDate, setDate, rebootSeats, rebootTripDate, destinationCity, originCity, rebootOriginCity, rebootDestinationCity, setOriginCity, setDestinationCity } = this.props;

    var A = [{departureTime:'9:00',arrivalTime:'10:00', ratingUser:5, userImage:'https://randomuser.me/api/portraits/women/28.jpg', origin:'New York City', destination: 'Washington DC.' , price:12.50, currency:'$'}, {departureTime:'10:15',arrivalTime:'11:00',ratingUser:4, userImage:'https://randomuser.me/api/portraits/men/66.jpg', origin:'New York City', destination: 'Washington DC.', price:11.00, currency:'$'}, {departureTime:'10:20',arrivalTime:'14:25',ratingUser:3, userImage:'https://randomuser.me/api/portraits/women/18.jpg', origin:'New York City', destination: 'Washington DC.', price:12.00, currency:'$'}] ;
    var B = [{departureTime:'8:30',arrivalTime:'9:40',ratingUser:5, userImage:'https://randomuser.me/api/portraits/women/32.jpg', origin:'New York City', destination: 'Washington DC.', price:9.50, currency:'$'}, {departureTime:'8:45',arrivalTime:'10:00',ratingUser:2, userImage:'https://randomuser.me/api/portraits/women/50.jpg', origin:'New York City', destination: 'Washington DC.', price:10.50, currency:'$'}, {departureTime:'14:25',arrivalTime:'15:00',ratingUser:1, userImage:'https://randomuser.me/api/portraits/men/82.jpg', origin:'New York City', destination: 'Washington DC.', price:11.00, currency:'$'}, {departureTime:'17:15',arrivalTime:'19:00',ratingUser:5, userImage:'https://randomuser.me/api/portraits/men/37.jpg', origin:'New York City', destination: 'Washington DC.', price:12.50, currency:'$'}, {departureTime:'17:15',arrivalTime:'9:00',ratingUser:5, userImage:'https://randomuser.me/api/portraits/women/71.jpg', origin:'New York City', destination: 'Washington DC.', price:12.50, currency:'$'}] ;
    var C = [{departureTime:'9:00',arrivalTime:'11:30',ratingUser:5, userImage:'https://randomuser.me/api/portraits/men/44.jpg', origin:'New York City', destination: 'Washington DC.', price:12.50, currency:'$'}, {departureTime:'13:15',arrivalTime:'14:45',ratingUser:0, userImage:'https://randomuser.me/api/portraits/women/82.jpg', origin:'New York City', destination: 'Washington DC.', price:13.00, currency:'$'}] ;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.navbarView}>
          <View style={{marginLeft:10}}>
            <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=> {navigate('MapScreen'); rebootSeats();rebootTripDate(); rebootOriginCity(); rebootDestinationCity()}}>
              <FontAwesome name="arrow-left" size={28} color="white"/>
            </TouchableHighlight>
          </View>
          <View style={styles.originDestinationText}>
            <Text style={styles.screenTitle}>{this.props.originCity}
              <Text style={styles.toText}> to
                <Text style={styles.screenTitle}> {this.props.destinationCity}
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
          <View style={{  }}>
          <SectionList
            sections={[
              { title: '5th August 2017', data: A },
              { title: '6th August 2017', data: B },
              { title: '7th August 2017', data: C },
            ]}
            renderSectionHeader={({section}) => <Text style={styles.SectionHeaderStyle}>{section.title}</Text>}
            renderItem={({item}) =>
              <View style={{flexDirection:'column'}}>
              <View style={styles.itemView}>
                <View style={{flexDirection:'column', width:50, alignItems:'center'}}>
                  <Image
                    style={styles.profileView}
                    source={{uri: item.userImage}}
                  />
                  <View style={{flexDirection:'row', width:50, left:10, top:-4, alignItems:'center', justifyContent:'center', backgroundColor:'rgba(52, 52, 52, 0)'}}>
                  {item.ratingUser>=5? (
                    <View style={{flexDirection:'row'}}>
                      <FontAwesome name="star" size={12} color="#F2C94C"/>
                      <FontAwesome name="star" size={12} color="#F2C94C"/>
                      <FontAwesome name="star" size={12} color="#F2C94C"/>
                      <FontAwesome name="star" size={12} color="#F2C94C"/>
                      <FontAwesome name="star" size={12} color="#F2C94C"/>
                    </View>
                  ):(
                    <View>
                    {item.ratingUser==4? (
                      <View style={{flexDirection:'row'}}>
                        <FontAwesome name="star" size={12} color="#F2C94C"/>
                        <FontAwesome name="star" size={12} color="#F2C94C"/>
                        <FontAwesome name="star" size={12} color="#F2C94C"/>
                        <FontAwesome name="star" size={12} color="#F2C94C"/>
                      </View>
                    ):(
                      <View>
                      {item.ratingUser==3? (
                        <View style={{flexDirection:'row'}}>
                          <FontAwesome name="star" size={12} color="#F2C94C"/>
                          <FontAwesome name="star" size={12} color="#F2C94C"/>
                          <FontAwesome name="star" size={12} color="#F2C94C"/>
                        </View>
                      ):(
                        <View>
                        {item.ratingUser==2? (
                          <View style={{flexDirection:'row'}}>
                            <FontAwesome name="star" size={12} color="#F2C94C"/>
                            <FontAwesome name="star" size={12} color="#F2C94C"/>
                          </View>
                        ):(
                          <View>
                          {item.ratingUser>=1? (
                            <FontAwesome name="star" size={12} color="#F2C94C"/>
                          ):(
                            <View>
                            </View>
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
                </View>
                <View style={{flexDirection:'column', top:-3}}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.SectionListItemStyle} onPress={()=>{navigate('TripInfo')}}>{item.departureTime}
                    </Text>
                    <Text style={styles.cityItemStyle} onPress={()=>{navigate('TripInfo')}}>{item.origin}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.SectionListItemStyle} onPress={()=>{navigate('TripInfo')}}>{item.arrivalTime}
                    </Text>
                    <Text style={styles.cityItemStyle} onPress={()=>{navigate('TripInfo')}}>{item.destination}
                    </Text>
                  </View>
                </View>
                <View style={{width:70, justifyContent:'center'}}>
                  <Text style={styles.currencyText} onPress={()=>{navigate('TripInfo')}}>{item.currency}
                    {item.price%1==0? (
                      <Text style={styles.priceText} onPress={()=>{navigate('TripInfo')}}>{item.price.toString()+'.0'}
                      </Text>
                    ):(
                      <Text style={styles.priceText} onPress={()=>{navigate('TripInfo')}}>{item.price.toString()}
                      </Text>
                    )}
                  </Text>
                </View>
                <View style={{justifyContent:'center', top:-4}} >
                  <MaterialCommunityIcons name="chevron-right" size={25} color="#E7E7E7" onPress={(x)=>{navigate('TripInfo')}}/>
                </View>
              </View>
              <View style={{backgroundColor:'#E7E7E7', width:width*0.8, height:0.5, alignSelf:'center'}}>
              </View>
            </View>
            }
            keyExtractor={(item,index)=>index}
           />
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
           <TouchableHighlight  underlayColor='rgba(52, 52, 52, 0)' onPress={()=>{navigate('PostingScreen');moveNextStep();rebootSeats();rebootTripDate();}}>
             <View style={styles.addTripAlign}>
               <View style={styles.addTripShadow}>
                 <View style={styles.addTripView}>
                   <Text style={styles.addTripText}>Post a trip to
                     <Text style={[styles.addTripText,{color:'white'}]}> {this.props.destinationCity}
                     </Text>
                   </Text>
                 </View>
               </View>
             </View>
           </TouchableHighlight>
          </View>
        </View>
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
    )
  }
};



export default connect(mapToProps, actions)(TripList)


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
  SectionHeaderStyle:{
    fontSize : 21,
    fontWeight:'800',
    color: 'gray',
    paddingLeft:20,
    backgroundColor:'white',
    width:width,
    paddingBottom:6,
    paddingTop : 6
  },
  SectionListItemStyle:{
    fontSize : 18,
    padding: 4,
    color: 'black',
    left:10,
    fontWeight:'700',
    width:70,
    textAlign:'center',
    backgroundColor:'rgba(52, 52, 52, 0)'
  },
  cityItemStyle:{
    fontSize : 18,
    padding: 4,
    color: 'gray',
    left:1,
    fontWeight:'500',
    width:width-225,
    textAlign:'left'
  },
  itemView:{
    height:80,
    flexDirection:'row',
    flex:1,
    paddingLeft:4,
    paddingTop:10
  },
  priceText:{
    alignSelf:'center',
    fontSize:22,
    fontWeight:'900',
    color:'black',
    top:-6
  },
  currencyText:{
    alignSelf:'center',
    fontSize:16,
    fontWeight:'600',
    color:'black',
    top:-6
  },
  profileView: {
        width: 50,
        height: 50,
        left:10,
        borderRadius:25,
        overflow: 'hidden',
    },
    addTripAlign: {
      flex:1,
      flexDirection: 'row',
      position: 'absolute',
      top: -90,
      alignSelf: 'center',
      zIndex: 1
    },
    addTripText: {
      marginTop: 18 ,
      fontSize: 18,
      fontWeight: 'bold' ,
      color: '#5D287F',
      textAlign:'center',
      fontWeight:'700'
    },
    addTripView: {
        width: width*0.8,
        height: 58,
        borderRadius:29,
        overflow: 'hidden',
        backgroundColor: '#29E1CB',
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
    seatsText:{
      color:'#555555',
      fontSize:80,
      fontWeight:'600',
      left: 12,
      right:32
    },
});
