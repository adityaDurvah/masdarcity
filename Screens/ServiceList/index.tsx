import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from './search';
import ServiceRequestList from './list';
import Header from '../../Components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../../Components/Text';

const ServiceRequestSummaryScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Header >
      <Text style={styles.headerTitle}>SERVICE REQUEST SUMMARY</Text>
        <Ionicons name="notifications" size={24} color="white" style={styles.notificationIcon}/></Header>
      <SearchBar />
      <ServiceRequestList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    marginLeft:0,
    alignSelf: 'center'
  },
  notificationIcon: {
    marginLeft:'auto'
  },
});

export default ServiceRequestSummaryScreen;
