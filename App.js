import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import teams from './components/Teams';
import players from './components/Players';
import details from './components/details';



var AppNavigator = createStackNavigator(
  {
    teams: teams,
    players: players,
    details: details
  },
  {
    initialRouteName: "teams"
  }
)

export default createAppContainer(AppNavigator);