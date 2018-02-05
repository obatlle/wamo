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

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { connect } from 'redux-zero/react';
import actions from '../app/actions';

const mapToProps = ({ postingStep }) => ({ postingStep });

const { width, height } = Dimensions.get('window');


class TripList extends Component {

  state = {
    origin:'New York City',
    destination:'Washington DC.',
    findingSeats:1
  }

  GetSectionListItem=(item)=>{
      Alert.alert(item.departureTime)
  };

  render() {

    const { navigate } = this.props.navigation;
    const { postingStep, moveNextStep, rebootSteps, movePreviousStep } = this.props;

    var A = [{departureTime:'9:00',arrivalTime:'10:00', ratingUser:5, userImage:'https://randomuser.me/api/portraits/women/28.jpg', origin:'New York City', destination: 'Washington DC.' , price:12.50, currency:'$'}, {departureTime:'10:15',arrivalTime:'11:00',ratingUser:4, userImage:'https://randomuser.me/api/portraits/men/66.jpg', origin:'New York City', destination: 'Washington DC.', price:11.00, currency:'$'}, {departureTime:'10:20',arrivalTime:'14:25',ratingUser:3, userImage:'https://randomuser.me/api/portraits/women/18.jpg', origin:'New York City', destination: 'Washington DC.', price:12.00, currency:'$'}] ;
    var B = [{departureTime:'8:30',arrivalTime:'9:40',ratingUser:5, userImage:'https://randomuser.me/api/portraits/women/32.jpg', origin:'New York City', destination: 'Washington DC.', price:9.50, currency:'$'}, {departureTime:'8:45',arrivalTime:'10:00',ratingUser:2, userImage:'https://randomuser.me/api/portraits/women/50.jpg', origin:'New York City', destination: 'Washington DC.', price:10.50, currency:'$'}, {departureTime:'14:25',arrivalTime:'15:00',ratingUser:1, userImage:'https://randomuser.me/api/portraits/men/82.jpg', origin:'New York City', destination: 'Washington DC.', price:11.00, currency:'$'}, {departureTime:'17:15',arrivalTime:'19:00',ratingUser:5, userImage:'https://randomuser.me/api/portraits/men/37.jpg', origin:'New York City', destination: 'Washington DC.', price:12.50, currency:'$'}, {departureTime:'17:15',arrivalTime:'9:00',ratingUser:5, userImage:'https://randomuser.me/api/portraits/women/71.jpg', origin:'New York City', destination: 'Washington DC.', price:12.50, currency:'$'}] ;
    var C = [{departureTime:'9:00',arrivalTime:'11:30',ratingUser:5, userImage:'https://randomuser.me/api/portraits/men/44.jpg', origin:'New York City', destination: 'Washington DC.', price:12.50, currency:'$'}, {departureTime:'13:15',arrivalTime:'14:45',ratingUser:0, userImage:'https://randomuser.me/api/portraits/women/82.jpg', origin:'New York City', destination: 'Washington DC.', price:13.00, currency:'$'}] ;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.navbarView}>
          <View style={{marginLeft:10}}>
            <TouchableHighlight underlayColor='rgba(52, 52, 52, 0)' onPress={()=> {navigate('MapScreen')}}>
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
              <View style={{flexDirection:'row'}}>
                <FontAwesome name="calendar" size={16} color="white"/>
                <Text style={styles.tripOptionsText}> Choose a date</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons name="seat-recline-normal" size={18} color="white"/>
                {this.state.findingSeats>1?(
                  <Text style={styles.tripOptionsText}>{this.state.findingSeats} seats</Text>
                ):(
                  <Text style={styles.tripOptionsText}>{this.state.findingSeats} seat</Text>
                )}
              </View>
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
                    <Text style={styles.SectionListItemStyle} onPress={this.GetSectionListItem.bind(this, item)}>{item.departureTime}
                    </Text>
                    <Text style={styles.cityItemStyle} onPress={this.GetSectionListItem.bind(this, item)}>{item.origin}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.SectionListItemStyle} onPress={this.GetSectionListItem.bind(this, item)}>{item.arrivalTime}
                    </Text>
                    <Text style={styles.cityItemStyle} onPress={this.GetSectionListItem.bind(this, item)}>{item.destination}
                    </Text>
                  </View>
                </View>
                <View style={{width:70, justifyContent:'center'}}>
                  <Text style={styles.currencyText} onPress={this.GetSectionListItem.bind(this, item)}>{item.currency}
                    {item.price%1==0? (
                      <Text style={styles.priceText} onPress={this.GetSectionListItem.bind(this, item)}>{item.price.toString()+'.0'}
                      </Text>
                    ):(
                      <Text style={styles.priceText} onPress={this.GetSectionListItem.bind(this, item)}>{item.price.toString()}
                      </Text>
                    )}
                  </Text>
                </View>
                <View style={{justifyContent:'center', top:-4}}>
                  <MaterialCommunityIcons name="chevron-right" size={25} color="#E7E7E7"/>
                </View>
              </View>
              <View style={{backgroundColor:'#E7E7E7', width:width*0.8, height:0.5, alignSelf:'center'}}>
              </View>
            </View>
            }
            keyExtractor={(item,index)=>index}
           />
           <TouchableHighlight  underlayColor='rgba(52, 52, 52, 0)' onPress={()=>{navigate('PostingScreen');moveNextStep()}}>
             <View style={styles.addTripAlign}>
               <View style={styles.addTripShadow}>
                 <View style={styles.addTripView}>
                   <Text style={styles.addTripText}>Post a trip to
                     <Text style={[styles.addTripText,{color:'white'}]}> {this.state.destination}
                     </Text>
                   </Text>
                 </View>
               </View>
             </View>
           </TouchableHighlight>
          </View>
        </View>
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
    textAlign:'center',
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
    flexDirection:'column'
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
    fontSize : 24,
    fontWeight:'900',
    color: 'gray',
    paddingLeft:20,
    backgroundColor:'white',
    width:width,
    paddingBottom:8,
    paddingTop : 8
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
});
