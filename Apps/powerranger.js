import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Navigator,
  AsyncStorage
} from 'react-native';

import Calculator from "./calculator.js";
import CustomNavBar from "./customNavBar.js";
import Setting from "./settings.js";

export default class PowerRanger extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sceneTransition : 0
    }
  }

  // To navigate to page based on page ID
  renderScene(route, navigator) {
    switch (route.id) {
      case 'CalculatorPage':
      return (
        <Calculator navigator={navigator}/>
      )
      break
      case 'SettingPage':
      return (
        <Setting navigator={navigator}/>
      )
      break
      default:
    }
  }

  // config scene transition, change scene transition based on Setting
  configureScene(route, routeStack){
    //@Todo, change to scene transition from Asynstorage vale
    this.getSceneTransition()
    console.log("Hmm, something when wrong when get data..." + this.state.sceneTransition);
    switch (this.state.sceneTransition) {
      case 'FloatFromRight':
        return Navigator.SceneConfigs.FloatFromRight
        break;
      case 'FloatFromLeft':
        return Navigator.SceneConfigs.FloatFromLeft
        break;
      case 'FloatFromBottom':
        return Navigator.SceneConfigs.FloatFromBottom
        break;
      case 'FloatFromBottomAndroid':
        return Navigator.SceneConfigs.FloatFromBottomAndroid
        break;
      case 'SwipeFromLeft':
        return Navigator.SceneConfigs.SwipeFromLeft
        break;
      case 'HorizontalSwipeJump':
        return Navigator.SceneConfigs.HorizontalSwipeJump
        break;
      case 'HorizontalSwipeJumpFromRight':
        return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
        break;
      default:
        return Navigator.SceneConfigs.FloatFromRight
    }
  }

  // get data to AsyncStorage
  async getSceneTransition(){
    try{
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      // Store value to State
      this.setState({
        sceneTransition : sceneTransitionValue
      })
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  render() {
    return(
      <Navigator
          initialRoute={{id: 'CalculatorPage'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          navigationBar={CustomNavBar}
          configureScene={this.configureScene.bind(this)}
         />
    )
  }
}

module.export = PowerRanger;
