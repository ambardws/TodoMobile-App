import * as React from "react";

// Import Navigation Container
import { NavigationContainer } from "@react-navigation/native";

// Import Navigation tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Stack Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Import Icon
import { Ionicons } from "@expo/vector-icons";

// import Theme NativeBase
import { useTheme } from "native-base";

// Import Screen
import CompleteTodo from "./src/screens/CompleteTodo";
import AddTodo from "./src/screens/AddTodo";
import HomeTodo from "./src/screens/HomeTodo";

// Init Stack Navigation
const Stack = createStackNavigator();

// Init Tabs Navigation
const Tab = createBottomTabNavigator();

function MyTab() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeTodo"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "AddTodo") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "CompleteTodo") {
            iconName = focused
              ? "checkmark-done"
              : "checkmark-done-outline";
          } else if (route.name === "HomeTodo") {
          iconName = focused
            ? "home"
            : "home-outline";
        }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary["800"],
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="HomeTodo" component={HomeTodo} />
      <Tab.Screen name="AddTodo" component={AddTodo} />
      <Tab.Screen name="CompleteTodo" component={CompleteTodo} />
    </Tab.Navigator>
  );
}

export default function Container() {
  // Theme use
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Navigation Screen */}
        <Stack.Screen
          name="HomeTodo"
          component={MyTab}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
