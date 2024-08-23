import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <AntDesign name="search1" size={24} color="black" style={styles.searchIcon}/>
      <TextInput style={styles.searchInput} placeholder="Search the list..." />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    position:'relative',
    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 10,
    paddingLeft: 40,
  },
  searchIcon: {
    position:'absolute',
    left:'5%',
    zIndex:2
  },
});

export default SearchBar;
