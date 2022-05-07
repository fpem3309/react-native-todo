import { StyleSheet, View } from 'react-native';
import { theme } from './colors';
import TodoList from './todoList';

export default function App() {

  return (

    <View style={styles.container}>

      <TodoList />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },

});
