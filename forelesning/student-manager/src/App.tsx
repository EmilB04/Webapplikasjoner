import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { addStudent, addSubject, getStudent, getStudentSubjects } from './services/StudentServices';

export default function App() {
  const [studentName, setStudentName] = useState<string>("");
  const [studentSubjects, setStudentSubjects] = useState<Array<{ id: string; name: string; grade: string }>>([]);
  
  useEffect(() => {
    addStudent({ 
      id: '1',
      name: 'Emil Berglund',
      subjects: []
    })
    addSubject("1", { id: "ITF1111", name: "Mobilprogrammering", grade: 'A' });
    addSubject("1", { id: "ITF2222", name: "Webutvikling", grade: 'B' });
    addSubject("1", { id: "ITF3333", name: "Databasesystemer", grade: 'C' });

    getStudentSubjects("1");
    const subjects = getStudentSubjects("1");
    const emilb = getStudent("1");

    if (emilb) {
      setStudentName(emilb.name);
      setStudentSubjects(subjects);
    }
  });

  return (
    <View style={styles.container}>
      <h1>📚 Student Manager</h1>
      <h2>Name:</h2>
      <Text style={styles.textContent}>{studentName}</Text>
      <h2>Subjects:</h2>
      {studentSubjects.map((subject) => (
        <Text key={subject.id} style={styles.textContent}>{subject.name}: {subject.grade}</Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    fontSize: 18,
    marginVertical: 8,
  },
});