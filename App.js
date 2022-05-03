import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
import Nav from './nav';

export default function App() {

  const STORAGE_KEY = "@toDos";
  const [business, setBusiness] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    loadToDos();
  }, []);

  const busi = () => setBusiness(true);
  const Life = () => setBusiness(false);
  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    console.log(s);
    setToDos(JSON.parse(s));
  };

  const addToto = async () => {
    if (text === "") {
      return;
    }
    // const newToDos = Object.assign(
    //   {}, //비어있는 object(target object)
    //   toDos,  //이전 todo
    //   { [Date.now()]: { text, busi: business } });  //새로운 todo 합침

    const newToDos = {
      ...toDos,   // spread 문법
      [Date.now()]: { text, business },
    };

    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };


  const deleteToDo = (key) => {
    Alert.alert("Delete To DO?", "Are you sure?", [
      { text: "Cancle" },
      {
        text: "Sure",
        style: "destructive",
        onPress: async () => {
          const newToDos = { ...toDos }
          delete newToDos[key]
          setToDos(newToDos);
          await saveToDos(newToDos);
        }
      },
    ]);

  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <TouchableOpacity onPress={busi}>
          <Text style={{
            ...styles.btnText,
            color: business ? "white" : theme.grey
          }}>
            Businees
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={Life}>
          <Text style={{
            ...styles.btnText,
            color: !business ? "white" : theme.grey
          }}>
            Life
          </Text>
        </TouchableOpacity>
      </View>


      <View>

        <TextInput
          onSubmitEditing={addToto}
          onChangeText={onChangeText}
          returnKeyType="done"
          placeholder={
            business ? "Add a To Do" : "How are you today?"
          }
          value={text}
          style={styles.input} />

        <ScrollView>{
          Object.keys(toDos).map(key => (
            toDos[key].business === business ?
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText} >{toDos[key].text}</Text>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name='trash' size={18} color={theme.grey} />
                </TouchableOpacity>
              </View> : null
          ))}
        </ScrollView>

        <Nav />

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between"
  },
  btnText: {
    fontSize: 25,
    fontWeight: "600",
    color: "white"
  },
  input: {
    backgroundColor: "white",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    fontSize: 18
  },
  toDo: {
    backgroundColor: theme.toDoBackgorund,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

});
