import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import colors from '../../Styles/colors';
import { Text } from '../Text';
import { formatDate } from '../../Services/commonUtils';

interface StepProps {
  stepfields: [{
    API_Name: string,
    label: string,
    value: any
  }],
  currentStatus: string,
  statusMasterList: [],
  statusList: []
  navigation: any
}

export const StepCard: React.FC<any> = (props: StepProps) => {
  const { stepfields, currentStatus, statusMasterList, navigation, ...rest } = props
  const values: any = {}
  stepfields.forEach(({ API_Name, value }) => {
    values[API_Name] = value
  })
  const { Name, StepNumber__c, lastmodifieddate, Comments__c, ClosedDateTime__c, createddate } = values
  return (
    <Card style={styles.card}>
      <Card.Content >
        <View style={styles.row}>
          <Text style={styles.stepNumber}>{parseInt(StepNumber__c)}</Text>
          <Text style={styles.stepTitle}>{Name}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.stepDates}>
            Created: {formatDate(createddate, 'DD/MM/YYYY')}
          </Text>
          {ClosedDateTime__c == 'null' && lastmodifieddate != 'null' ? <Text style={styles.stepDates}>
            Modified: {formatDate(lastmodifieddate, 'DD/MM/YYYY')}
          </Text> : null}
          {ClosedDateTime__c != 'null' ? <Text style={styles.stepDates}>
            Closed: {formatDate(ClosedDateTime__c, 'DD/MM/YYYY')}
          </Text> : null}
        </View>
        {Comments__c && <Text style={styles.comments}>Comments: {Comments__c}</Text>}
      </Card.Content>
      <View style={styles.divider} />
      <Card.Actions>
        <TouchableOpacity onPress={() => { navigation.navigate('DocumentUpload', { statusList: statusMasterList }) }} style={[styles.button, ...(statusMasterList.length === 0 ? [styles.disabled] : []),]}>
          <Text style={styles.buttonText}>{currentStatus}</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    backgroundColor: '#F0F0F0'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  stepNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 4,
    width: 60
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, flexWrap: 'wrap',
  },
  stepDates: {
    fontSize: 12,
    color: '#999',
    marginVertical: 5,
  },
  comments: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY_COLOR,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
  },
  disabled: {
    backgroundColor: colors.DISABLED,
  }
});

