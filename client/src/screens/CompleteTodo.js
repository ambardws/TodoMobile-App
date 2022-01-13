import * as React from "react";
import { useEffect, useState } from "react";
import { Text, Box, Input, HStack, VStack, Button } from "native-base";
import { API } from "../config/api";
import { FlatList } from "react-native";

export default function CompleteTodo() {
  const [todos, setTodo] = useState([]);
  const [inputTodo, setInputTodo] = React.useState("");
  const [form, setForm] = useState({
    description: "",
  });
  const getTodos = async () => {
    try {
      const response = await API.get("/todo");

      const getDone = response.data.data.filter((todo) => {
        return todo.status === "Done";
      });
      setTodo(getDone);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (param) => {
    try {
      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const response = await API.delete(`/todo/${param}`, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getTodos();
  }, [todos]);

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
            backgroundColor={"#FF0000"}
            borderColor={"#F5F5F5"}
            borderRadius={5}
            onPress={() => {
              deleteTodo(item.id);
            }}
          >
            <Text>Delete</Text>
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
        Complete Todo
      </Text>
      <FlatList
        data={todos}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </Box>
  );
}
