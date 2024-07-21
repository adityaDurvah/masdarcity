import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Badge, Searchbar } from "react-native-paper";

interface Item {
  id: string;
  name: string;
  company: string;
  status: string;
  date: string;
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

const TaskCard: React.FC<{ item: Item }> = ({ item }) => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.row}>
        <Text style={styles.srNumber}>{item.id}</Text>
        <View style={styles.column2}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.company}>{item.company}</Text>
          <Badge style={styles.status}>{item.status}</Badge>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </Card.Content>
  </Card>
);

const ServiceListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Item[]>(data);

  useEffect(() => {

  }, []);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const newData = data.filter((item) => {
        const itemData = `${item.name.toUpperCase()} ${item.company.toUpperCase()}`;
        const textData = query.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const renderItem = ({ item }: { item: Item }) => <TaskCard item={item} />;

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  column2: {
    width: '60%'
  }, 
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchbar: {
    margin: 10,
    borderRadius: 10,
  },
  card: {
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
  },
  date: {
    color: "#000",
    fontSize: 14,
    alignSelf: "flex-end", 

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
