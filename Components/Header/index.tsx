import React from 'react';
import { View,  StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
const Header = ( { children } : any) => {
  const navigation = useNavigation();
  const routesCount = useNavigationState(state => state.routes.length);
  return (
    <View style={styles.headerContainer}>
     {routesCount > 1 && <Ionicons name="chevron-back" style={styles.backIcon} size={24} color="white" onPress={() => navigation.goBack()}/>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // marginTop: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#008b8b',
  },
 backIcon:{ 
  marginRight: 10,
  top: 2
 }
});

export default Header;
