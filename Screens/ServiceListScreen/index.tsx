import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Touchable, Pressable } from "react-native";
import { Card, Text, Badge, Searchbar } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { getServiceListItems } from "../../Services/apiRequests";
import colors from "../../Styles/colors";
import { globalStyles } from "../../Styles/global";
import {formatDate} from '../../Services/commonUtils';
interface Item {
  id: string;
  name: string;
  company: string;
  status: string;
  date: string;
}
interface SRDetail {
  Name: string;
  ID: string;
  createddate: string;
  SubmittedDate__c: string | null;
  account__r_name: string;
  recordtype: string;
  ServiceName: string;
}

interface InputData {
  value: string | null;
  label: string;
  API_Name: string;
}

interface SRData {
  SRDetails: InputData[][];
  isError: boolean;
  debug: any;
}

const data: Item[] = [
  {
    id: "1",
    name: "License Deregistration",
    company: "Eco HR Middle East Ltd",
    status: "COMPLETED",
    date: "10/06/2024",
  },
  {
    id: "2",
    name: "Permit Renewal",
    company: "ABC Corp",
    status: "PENDING",
    date: "12/06/2024",
  },
  {
    id: "3",
    name: "Employee Onboarding",
    company: "XYZ Ltd",
    status: "COMPLETED",
    date: "15/06/2024",
  },
  // Add more items as needed
];

const TaskCard: React.FC<{ item: SRDetail, navigation: any }> = ({ item, navigation }) => (
  <Card style={globalStyles.card}>
    <Pressable onPress={() => navigation.navigate("ServiceStepsScreen", { SRId: item.ID })}>
    <Card.Content>
      <View style={styles.row}>
        <Text style={styles.srNumber}>{item.Name}</Text>
        <View style={styles.column2}>
          <Text style={styles.title}>{item.ServiceName}</Text>
          <Text style={styles.company}>{item.account__r_name}</Text>
          <Badge style={styles.status}>{item.ServiceName}</Badge>
        </View>
        <Text style={styles.date}>{formatDate(item.SubmittedDate__c, 'DD-MM-YYYY')}</Text>
      </View>
    </Card.Content>
    </Pressable>
  </Card>
);

const ServiceListScreen: React.FC<any> = ({ navigation }: { navigation: any }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [listData, setListData] = useState<SRDetail[]>([]);
  const [filteredData, setFilteredData] = useState<SRDetail[]>(listData);

  useEffect(() => {
    getListItems();
  }, []);

  const formatData = (data: SRData): SRDetail[] => {
    return data.SRDetails.map(detailArray => {
      const detailObject: { [key: string]: string | null } = {};
      detailArray.forEach(detail => {
        // Replace dots with underscores to create valid keys
        const key = detail.API_Name.replace('.', '_');
        detailObject[key] = detail.value;
      });
  
      return {
        Name: detailObject['Name'],
        ID: detailObject['ID'],
        createddate: detailObject['createddate'],
        SubmittedDate__c: detailObject['SubmittedDate__c'],
        account__r_name: detailObject['account__r_name'],
        recordtype: detailObject['recordtype'],
        ServiceName: detailObject['ServiceName']
      } as SRDetail;
    });
  };
  

  const getListItems = (async () => {
    let response = await getServiceListItems();
     setFilteredData(formatData(response));
  });


  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const newData = listData.filter((item) => {
        const itemData = `${item.Name.toUpperCase()} ${item.Name.toUpperCase()}`;
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(listData);
    }
  };

  const renderItem = ({ item }: { item: SRDetail }) => <TaskCard item={item} navigation={navigation} />;

  return (
    <View style={globalStyles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(SRDetail) => SRDetail.ID}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  column2: {
    width: '55%'
  }, 
  searchbar: {
    margin: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: '100%',
    padding: 4
  },
  srNumber: {
    color: "#F79256",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 16, 
    width: '18%'
  },
  date: {
    color: colors.GREY60,
    fontSize: 10,
    alignSelf: "flex-end", 
    flexDirection: 'row-reverse',
    width: '18%'

  },
  title: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 4,
  },
  company: {
    color: "#888",
    fontSize: 12,
    marginBottom: 10,
  },
  status: {
    backgroundColor: colors.PRIMARY_COLOR,
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingHorizontal: 8,
    width: '80%'
    // paddingVertical: 4,
  },
});

export default ServiceListScreen;
