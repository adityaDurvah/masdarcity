import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceListScreen from "./Screens/ServiceListScreen";
const Stack = createNativeStackNavigator();
import { globalStyles } from './Styles/global';
import { StepsScreen } from "./Screens/StepsScreen";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ServiceStepsScreen"
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
          options={{ title: "ServiceListScreen" }}
        />
        <Stack.Screen
          component={StepsScreen}
          name="ServiceStepsScreen"
          options={{ title: "ServiceStepsScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
