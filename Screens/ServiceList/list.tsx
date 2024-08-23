import React from 'react';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ServiceRequestCard from './card';

const serviceRequests = [
  { srNumber: 'SR-43553', title: 'Employment Visa - New', company: 'Flipkart Company', category: 'Government', status: 'SUBMITTED', date: '01/08/2024', open:false },
  { srNumber: 'SR-42775', title: 'Share Affairs', company: 'Global Energy & Environmental Services Limited', category: 'Company', status: 'CLOSED', date: '25/04/2021',open:false  },
  { srNumber: 'SR-43527', title: 'Employment Visa - New', company: 'Aspire Manpower Services (Branch)', category: 'Government', status: 'VISA MEDICAL FITNESS', date: '31/07/2024',open:false  },
  { srNumber: 'SR-43568', title: 'Customer DD', company: 'BD Team', category: 'Compliance', status: 'IN PROGRESS', date: '05/08/2024',open:true  },
  { srNumber: 'SR-43557', title: 'Onsite Inspection', company: 'AG2', category: 'Compliance', status: 'AWAITING VERIFICATION', date: '01/08/2024',open:false  },
];

const ServiceRequestList = ({navigation}:any) => {
  return (
    <FlatList
      data={serviceRequests}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ServiceSteps',{srNumber:item.srNumber,title:item.title})}>
          <ServiceRequestCard {...item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.srNumber}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    backgroundColor: 'white'
  },
});

export default ServiceRequestList;
