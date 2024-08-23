import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import StepCard from './card';
import Header from '../../Components/Header';
import { useRoute } from '@react-navigation/native';

const steps = [
    {
        stepNumber: '01',
        title: 'INITIAL VERIFICATION',
        created: '12/08/2021',
        modified: '10/07/2022',
        closed: '11/09/2023',
        owner: 'GOVERNMENT SERVICES',
        comments: 'CANCELLATION WITHOUT ORIGINAL DOCUMENTS',
        status: 'APPROVED BY ICP',
        open: true,
    },
    {
        stepNumber: '02',
        title: 'COLLECT PASSPORT',
        created: '12/08/2021',
        modified: '10/07/2022',
        closed: '11/09/2023',
        owner: 'GOVERNMENT SERVICES',
        comments: 'CANCELLATION WITHOUT ORIGINAL PASSPORT',
        status: 'PASSPORT COLLECTED BY CLIENT',
        open: false,
    },
    {
        stepNumber: '03',
        title: 'SUBMIT EXIT PROOF',
        created: '12/08/2021',
        modified: '10/07/2022',
        closed: '11/09/2023',
        owner: 'GOVERNMENT SERVICES',
        comments: 'CANCELLATION WITHOUT ORIGINAL DOCUMENTS',
        status: 'AWAITING EXIT PROOF',
        open: false,
    }
];
const ServiceSteps = ({navigation}:any) => {
    const route = useRoute<any>();

    const { title, srNumber } = route.params;
    return (
        <>
        <Header ><Text style={styles.headerTitle}>{srNumber} - {title}</Text></Header>
      
        <View style={styles.container}>
            <FlatList data={steps} renderItem={({ item }) => <StepCard {...item} />} />
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    headerTitle: {
        fontSize: 18,
        color: 'white',
        // fontWeight: 'bold',
      },
      notificationIcon: {
        width: 25,
        height: 25,
        backgroundColor: '#fff',
        borderRadius: 12.5,
      },
});

export default ServiceSteps;
