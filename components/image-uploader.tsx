import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Media library permission is required");
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

  const uploadToBackend = async (asset: any) => {
    let localUri = asset.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("file", {
      uri: localUri,
      name: filename,
      type,
    } as any);

    // const res = await fetch("api-endpoint", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: formData,
    // });

    // const json = await res.json();
    alert("Image uploaded");
  };

  return (
    <View style={styles.container}>
      <Button title="Pick & Upload Image" onPress={pickImage} />

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 40,
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
