import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceListScreen from "./Screens/ServiceListScreen";
const Stack = createNativeStackNavigator();
import { globalStyles } from './Styles/global';
import { StepsScreen } from "./Screens/StepsScreen";
import { DocumentUpload } from "./Screens/DocumentUpload";
import SalesforceLogin from "./Screens/Salesforce";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Salesforce"
        screenOptions={{
          headerBackTitle: "",
          headerShown: true,
          headerStyle: globalStyles.headerStyle,
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          component={ServiceListScreen}
          name="ServiceListScreen"
          options={{ title: "Service List" }}
        />
        <Stack.Screen
          component={StepsScreen}
          name="ServiceStepsScreen"
          options={{ title: "Service Steps Screen" }}
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
