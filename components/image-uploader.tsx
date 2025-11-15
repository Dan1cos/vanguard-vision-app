import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Platform, StyleSheet } from "react-native";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [classifiedObject, setClassifiedObject] = useState<{
    name: string;
    confidence: number;
  } | null>(null);

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Media library permission is required");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      base64: true,
    });

    if (res.canceled) return;

    setImage(res.assets[0].uri);

    uploadToBackend(res.assets[0]);
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Camera permission is required");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
      base64: true,
    });

    if (res.canceled) return;

    setImage(res.assets[0].uri);

    uploadToBackend(res.assets[0]);
  };

  const uploadToBackend = async (asset: any) => {
    let formData = new FormData();
    if (Platform.OS === "web") {
      formData.append("file", asset.file);
    } else {
      formData.append("file", {
        uri: asset.uri,
        name: "upload.jpg",
        type: asset.mimeType || "image/jpeg",
      } as any);
    }

    const res = await fetch("http://127.0.0.1:8000/api/image", {
      method: "POST",
      body: formData,
    });

    const json: any = await res
      .json()
      .then((data) => {
        setClassifiedObject({ name: data.top_name, confidence: data.top_conf });
      })
      .catch((e) => console.log(`Error ${e}`));
  };

  const openChoiceDialog = () => {
    Alert.alert("Select image", "Chose a source:", [
      { text: "Camera", onPress: pickFromCamera },
      { text: "Gallery", onPress: pickFromGallery },
      { text: "Cancel" },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedButton
        title="Pick & Upload Image"
        onPress={openChoiceDialog}
        accent
      />

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      {classifiedObject && (
        <ThemedText type="default">
          Name: {classifiedObject.name}, confidence:{" "}
          {classifiedObject.confidence}
        </ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 40,
    marginTop: 80,
  },
  imagePreview: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default ImageUploader;
