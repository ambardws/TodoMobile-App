import * as React from "react";
import { useEffect, useState } from "react";
import { Text, Box, VStack, Center } from "native-base";
import { API } from "../config/api";
import { FlatList } from "react-native";

export default function HomeTodo() {
  const [todos, setTodos] = useState(null);
  const [onProgressTodos, setOnProgressTodos] = useState(null);
  const [doneTodos, setDoneTodos] = useState(null);
  //   const [inputTodo, setInputTodo] = React.useState("");
  //   const [form, setForm] = useState({
  //     description: "",
  //   });
  const getTodos = async () => {
    try {
      const response = await API.get("/todo");

      const getAllTodos = response.data.data.length;
      setTodos(getAllTodos);

      const getOnProgress = response.data.data.filter((todo) => {
        return todo.status === "On Progress";
      });
      setOnProgressTodos(getOnProgress.length);

      const getDone = response.data.data.filter((todo) => {
        return todo.status === "Done";
      });
      setDoneTodos(getDone.length);

      //   setTodo(getOnProgress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Box bg="#1F1D36" flex={1} alignItems="center" justifyContent="center">
      <Text
        fontFamily="body"
        fontWeight={400}
        fontStyle="italic"
        fontSize={30}
        marginTop={10}
        position="absolute"
        top={10}
      >
        Overview You Todo
      </Text>
      <VStack space={4} alignItems="center" justifyContent="center">
        <Center w="64" h="20" bg="primary.500" rounded="md" shadow={3}>
          <Text
            fontFamily="body"
            fontWeight={400}
            fontSize={20}
            textAlign="center"
          >
            All Todo
            {`\n`}
            {todos}
          </Text>
        </Center>
        <Center w="64" h="20" bg="secondary.500" rounded="md" shadow={3}>
        <Text
            fontFamily="body"
            fontWeight={400}
            fontSize={20}
            textAlign="center"
          >
            On Progress Todo
            {`\n`}
            {onProgressTodos}
          </Text>
        </Center>
        <Center w="64" h="20" bg="emerald.500" rounded="md" shadow={3}>
        <Text
            fontFamily="body"
            fontWeight={400}
            fontSize={20}
            textAlign="center"
          >
            Done Todo
            {`\n`}
            {doneTodos}
          </Text>
        </Center>
      </VStack>
    </Box>
  );
}
