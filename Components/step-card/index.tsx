import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import colors from '../../Styles/colors';

interface StepProps {
  stepfields: [{
    API_Name: string,
    label: string,
    value: any
  }],
  currentStatus: string,
  statusMasterList: [],
  statusList: []
}

export const StepCard: React.FC<any> = (props: StepProps) => {
  const { stepfields, currentStatus, statusMasterList, ...rest } = props
  const values: any = {}
  stepfields.forEach(({ API_Name, value }) => {
    values[API_Name] = value
  })
  const { Name, StepNumber__c, lastmodifieddate, Comments__c, ClosedDateTime__c, createddate } = values
  return (
    <Card style={styles.card}>
      <Card.Content >
        <View style={styles.row}>
          <Text style={styles.stepNumber}>{StepNumber__c}</Text>
          <Text style={styles.stepTitle}>{Name}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.stepDates}>
            Created: {createddate.split(' ')[0]}
          </Text>
          {lastmodifieddate != 'null' ? <Text style={styles.stepDates}>
            Modified: {lastmodifieddate.split(' ')[0]}
          </Text> : null}
          {ClosedDateTime__c != 'null' ? <Text style={styles.stepDates}>
            Closed: {ClosedDateTime__c.split(' ')[0]}
          </Text> : null}
        </View>
        {Comments__c && <Text style={styles.comments}>Comments: {Comments__c}</Text>}
      </Card.Content>
      <View style={styles.divider} />
      <Card.Actions>
        <TouchableOpacity style={[styles.button, ...(statusMasterList.length === 0 ? [styles.disabled] : []),]}>
          <Text style={styles.buttonText}>{currentStatus}</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  stepTitle: {
    fontSize: 18,
    color: '#333',
    flex: 1, flexWrap: 'wrap'
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
    color: 'white',
    fontSize: 14,
  },
  disabled: {
    backgroundColor: colors.DISABLED,
  }
});

