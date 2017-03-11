import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  Animated
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class Cal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      segmentSelectedIndex : 0,
      billAmount : 0,
      result : 0,
      tipAmount : 0,
      fadeAnim: new Animated.Value(0),
      calInput: 0 // init opacity 0
    }
  }

  componentDidMount() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      {toValue: 1}            // Configuration
    ).start();                // Don't forget start!
  }

  componentDidUpdate() {
    this.calInput.focus()
  }

  handleSegmentChange(index) {
    this.setState({
      segmentSelectedIndex : index
    })

    this.handleBillAmountChange(this.state.billAmount, index)
  }

  handleBillAmountChange(bill, index) {
    if (!bill){
      bill = 0
    }
    this.setState({
      billAmount : bill
    })

    if (!index && index != 0) {
      index = this.state.segmentSelectedIndex
    }

    bill = parseFloat(bill)
    var percent = this.segmentValues()[index] //10% 15% 50%
    percent = parseFloat(percent)/100

    var result = bill + (bill * percent)

    this.setState({
      result : result,
      tipAmount : bill * percent
    })
  }

  segmentValues() {
    return ["10%", "15%", "50%"]
  }

  render() {
    return (
      <View style={{marginTop: 50}}>

        <Animated.View>
          <Text style={styles.title}>Tip Calculator</Text>
        </Animated.View>

        <Animated.View style={{opacity: this.state.fadeAnim, flexDirection:'row', alignItems: 'center', margin: 10}}>
          <Text style={styles.labelMedium}>Bill Amount</Text>
          <TextInput style={styles.textinput}
            ref={(input) => { this.calInput = input; }}
            onChangeText={(billAmount) => this.handleBillAmountChange(billAmount)}
            keyboardType='numeric'
            maxLenght={10}/>
        </Animated.View>

        <Animated.View style={styles.content}>
          <Text style={styles.labelMedium}>Tip amount: {this.state.tipAmount}</Text>
        </Animated.View>

        <Animated.View style={styles.content}>
          <SegmentedControlTab
            values={this.segmentValues()}
            onTabPress= {index => this.handleSegmentChange(index)}
            />
        </Animated.View>

        <Animated.View style={styles.content}>
          <Text style={styles.labelSmall}>Bill amount: {this.state.billAmount} </Text>
          <Text style={styles.labelSmall}>Tip amount: {this.state.tipAmount}</Text>
          <Text style={styles.labelSmall}>Percent: {this.segmentValues()[this.state.segmentSelectedIndex]}</Text>
        </Animated.View>

        <Animated.View style={styles.content}>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>Result: {this.state.result}</Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10
  },
  textinput: {
    flex: 0.8,
    height: 40,
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 10,
  },
  labelMedium: {
    fontSize: 18
  },
  labelSmall: {
    fontSize: 12
  },
  content: {
    margin: 10
  }
});

module.export = Cal
