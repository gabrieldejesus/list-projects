import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView, // Somente area visivel da aplicação
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    let value = 0;

    const response = await api.post("projects", {
      title: `Projeto bacana`,
      owner: "Gabriel de Jesus",
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      {/* Status bar personalizada */}
      <StatusBar barStyle="light-content" backgroundColor="#212121" />

      {/* Primeira forma */}
      {/* <View style={styles.container}>
        {projects.map((project) => (
					<Text style={styles.project} key={project.id}>
					{project.title}
          </Text>
					))}
				</View> */}

      {/* Lista performatica */}

      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Projetos</Text>
        {/* Exibindo lista de projetos */}
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item: project }) => (
            <View style={styles.project}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectOwner}>{`by: ${project.owner}`}</Text>
            </View>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    justifyContent: "center",
    backgroundColor: "#DBDDF4",
  },

  title: {
    fontSize: 32,
    color: "#011631",
    fontWeight: "bold",
    marginBottom: 32,
    marginLeft: 24,
  },

  project: {
    padding: 24,
    borderRadius: 5,
    borderLeftWidth: 10,
    borderColor: "#61BCFA",
    backgroundColor: "#FFF",
    justifyContent: "center",
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },

  projectTitle: {
    fontSize: 24,
    color: "#011631",
    fontWeight: "700",
    marginBottom: 16,
  },

  projectOwner: {
    fontSize: 16,
    color: "#011631",
    fontWeight: "500",
  },

  button: {
    margin: 24,
    height: 64,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5BC3A1",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});
