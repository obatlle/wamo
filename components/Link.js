import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

class Link extends Component {
  render() {
    console.log(this.props.link.description);
    return (
      <View>
        <Text>{this.props.link.color} ({this.props.link.color})</Text>
      </View>
    )
  }

  _voteForLink = async () => {
    // ... you'll implement this in chapter 6
  }

}

export default Link
