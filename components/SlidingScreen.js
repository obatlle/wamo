import React, { Component }  from 'react'
import {
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  TouchableHighlight
} from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'

const {height, width} = Dimensions.get('window')


class SlidingScreen extends Component {
  static defaultProps = {
    draggableRange: {
      top: height / 1.1,
      bottom: 120
    }
  }

  _draggedValue = new Animated.Value(-120)

  constructor(props) {
    super(props)

    this._renderFavoriteIcon = this._renderFavoriteIcon.bind(this)
  }

  _renderFavoriteIcon() {
    const {top, bottom} = this.props.draggableRange
    const draggedValue = this._draggedValue.interpolate({
      inputRange: [-(top + bottom) / 2, -bottom],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const transform = [{scale: draggedValue}]

    return (
      <Animated.View style={[styles.favoriteIcon, {transform}]}>
      <TouchableHighlight  underlayColor='rgba(52, 52, 52, 0)' onPress={()=> navigate('SlidingScreen')}>
        <View style={styles.addTripAlign}>
          <Text style={styles.addTripText}>Post a trip</Text>
          <View style={styles.addTripShadow}>
            <View style={styles.addTripView}>
              <Text style={styles.addTripSymbol}>+</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
      </Animated.View>
    )
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text>Hello world</Text>
        <SlidingUpPanel
          visible
          showBackdrop={false}
          ref={(c) => {this._panel = c}}
          draggableRange={this.props.draggableRange}
          onDrag={(v) => this._draggedValue.setValue(v)}>
          <View style={styles.panel}>
            {this._renderFavoriteIcon()}
            <View style={styles.panelHeader}>
              <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
            </View>
            <View style={styles.container}>
              <Text>Bottom Sheet Content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    )
  }
}

export default (SlidingScreen)


const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    top: 72,
    width: width*0.97,
    left: width*0.015,
  },
  panelHeader: {
    height: 50,
    borderTopLeftRadius:29,
    borderTopRightRadius:29,
    overflow: 'hidden',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -70,
    right: 20,
    zIndex: 1
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
}
