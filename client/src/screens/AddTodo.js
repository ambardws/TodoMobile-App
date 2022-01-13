import * as React from "react";
import { useEffect, useState } from "react";
import { Text, Box, Input, HStack, VStack, Button } from "native-base";
import { API } from "../config/api";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddTodo() {
  const [todos, setTodo] = useState([]);
  const [inputTodo, setInputTodo] = React.useState("");

  const getTodos = async () => {
    try {
      const response = await API.get("/todo");

      const getOnProgress = response.data.data.filter((todo) => {
        return todo.status === "On Progress";
      });
      setTodo(getOnProgress);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (param) => {
    try {
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // const formData = new FormData();
      // formData.set("description", form.description);

      const response = await API.post("/todo", {"description": `${param}`}, config);
      getTodos()
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (param) => {
    try {
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const response = await API.patch(`/todo/${param}`, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  //   Create Component List
  const _renderItem = ({ item }) => {
    return (
      <VStack alignItems="center">
        <HStack space={2} margin={3}>
          <Box
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              letterSpacing: "lg",
            }}
            marginTop={10}
            width={250}
            borderWidth={2}
            borderColor={"#F5F5F5"}
            backgroundColor={"#292C6D"}
            borderRadius={5}
            padding={2}
          >
            {item.description}
          </Box>
          <Button
            mx="3"
            w={{
              base: "25%",
              md: "25%",
            }}
            marginTop={10}
            backgroundColor={"#2FDD92"}
            borderColor={"#F5F5F5"}
            borderRadius={5}
            onPress={() => {
              updateTodo(item.id);
            }}
          >
            <Text>Done</Text>
          </Button>
        </HStack>
      </VStack>
    );
  };

  return (
    <Box bg="#1F1D36" flex={1} textAlign="center">
      <Text
        fontFamily="body"
        fontWeight={400}
        fontStyle="italic"
        fontSize={30}
        marginTop={10}
      >
        List On Progress Todo
      </Text>
      <HStack space={2} margin={3}>
        <Input
          mx="3"
          placeholder="Input Todo"
          w={{
            base: "80%",
            md: "25%",
          }}
          marginTop={10}
          borderWidth={2}
          borderColor={"#F5F5F5"}
          borderRadius={5}
          backgroundColor={"#F5F5F5"}
          color={"121212"}
          onChangeText={(text) => { setInputTodo(text) 
            console.log(inputTodo)}}
          value={inputTodo}
        />

        <Button
          primary
          mx="3"
          w={{
            base: "15%",
            md: "25%",
          }}
          marginTop={10}
          mar
          onPress={() => {
            addTodo(inputTodo);
            setInputTodo("");
          }}
        >
          <Text>+</Text>
        </Button>
      </HStack>

      <FlatList
        data={todos}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </Box>
  );
}
