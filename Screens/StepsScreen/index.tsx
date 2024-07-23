import React, { useEffect } from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { StepCard } from '../../Components/StepCard';
import { getApiData } from '../../Services/apiManager';

interface Step {
  stepfields: [{
    API_Name: string,
    label: string,
    value: any
  }],
  currentStatus: string,
  statusMasterList: [],
  statusList: []
}
interface StepField {
  value: string | null;
  label: string | null;
  API_Name: string;
}

interface Data {
  Steps: Step[];
  SRInputParameter: string;
  SRDetails: StepField[];
  recordTypeName: string;
  isError: boolean;
  debug: any;
}
interface Data {
  Steps: Step[];
}
export const StepsScreen: React.FC<any> = ({ navigation, route }) => {
  const { data, getData } = getApiData<Data>('/SRDetails', { SRId: '123234' || route.params.SRId });
  useEffect(() => {
    getData()
  }, [])

  return (
    <FlatList
      style={styles.container}
      data={data?.Steps.sort((a, b) => {
        // Extracting StepNumber__c value from stepfields
        let stepNumberA = parseFloat(a?.stepfields?.find(field => field.API_Name === "StepNumber__c")?.value);
        let stepNumberB = parseFloat(b?.stepfields?.find(field => field.API_Name === "StepNumber__c")?.value);

        // Compare the step numbers
        return stepNumberB - stepNumberA;
      })}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <StepCard {...item} />}
      ListHeaderComponent={
        <View style={styles.stepContainer}>
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderId}>SR-30458</Text>
            <Text style={styles.subHeaderTitle}> - License Deregistration</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>REQUEST STEPS</Text>
          </View>
        </View>
      }
      ListHeaderComponentStyle={styles.subHeader}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  stepContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  subHeader: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center'
  },
  subTitle: { textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  subHeaderId: {
    color: '#FF6A00',
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  subHeaderTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
