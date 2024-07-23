import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Badge, Searchbar } from "react-native-paper";
import { getServiceListItems } from "../../Services/apiRequests";
import { globalStyles } from "../../Styles/global";

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

const TaskCard: React.FC<{ item: SRDetail }> = ({ item }) => (
  <Card style={globalStyles.card}>
    <Card.Content>
      <View style={styles.row}>
        <Text style={styles.srNumber}>{item.Name}</Text>
        <View style={styles.column2}>
          <Text style={styles.title}>{item.recordtype}</Text>
          <Text style={styles.company}>{item.account__r_name}</Text>
          <Badge style={styles.status}>{item.ServiceName}</Badge>
        </View>
        <Text style={styles.date}>{item.SubmittedDate__c}</Text>
      </View>
    </Card.Content>
  </Card>
);

const ServiceListScreen: React.FC = () => {
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

  const renderItem = ({ item }: { item: SRDetail }) => <TaskCard item={item} />;

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
    width: '60%'
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
  },
  srNumber: {
    color: "#F79256",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 16, 
    width: '20%'
  },
  date: {
    color: "#000",
    fontSize: 14,
    alignSelf: "flex-end", 
    width: '10%'

  },
  title: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  company: {
    color: "#888",
    fontSize: 14,
    marginBottom: 10,
  },
  status: {
    backgroundColor: "#C2FDEB",
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingHorizontal: 8,
    // paddingVertical: 4,
  },
});

export default ServiceListScreen;
