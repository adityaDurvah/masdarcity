import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceListScreen from "./Screens/ServiceListScreen";
import { globalStyles } from './Styles/global';
import { StepsScreen } from "./Screens/StepsScreen";
import { DocumentUpload } from "./Screens/DocumentUpload";
import SalesforceLogin from "./Screens/Salesforce";
import ServiceRequestList from "./Screens/ServiceList/index";
import ConnectedApps from "./Screens/ConnectedApps";
import ServiceSteps from "./Screens/ServiceSteps";
import Header from "./Components/Header";

type RootParamList = {
  ServiceListScreen: undefined;
  StepsScreen: undefined;
  DocumentUpload: undefined;
  Salesforce: undefined;
  ServiceRequestList: undefined;
  ConnectedApps: undefined;
  ServiceSteps: undefined;
};

const Stack = createNativeStackNavigator <RootParamList>();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ConnectedApps"
        screenOptions={{
          headerBackTitle: "",
          // header:Header,
          headerShown: false,
          // headerStyle: globalStyles.headerStyle,
          // headerTintColor: "#fff",
          // headerTitleStyle: {
          //   fontWeight: "bold",
          // },
        }}
      >
        <Stack.Screen
          component={ConnectedApps}
          name="ConnectedApps"
          options={{ title: "ConnectedApps" }}
        />
        <Stack.Screen
          component={ServiceRequestList}
          name="ServiceListScreen"
          options={{ title: "Service List" }}
        />
        <Stack.Screen
          component={ServiceSteps}
          name="ServiceSteps"
        />
        <Stack.Screen
          component={DocumentUpload}
          name="DocumentUpload"
          options={{ title: "Document Upload" }}
        />
        <Stack.Screen
          component={SalesforceLogin}
          name="Salesforce"
          options={{ title: "Salesforce" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
