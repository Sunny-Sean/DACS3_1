import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";

import Button from "../../../components/Button";
import { defaultPizzaImage } from "../../../components/ProductListItem_Admin";

import Colors from "../../../constants/Colors";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "../../../api/products";

import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../../lib/supabase";
import RemoteImage from "../../../components/RemoteImage";

function CreateProductScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [roasted, setRoasted] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [specialIngredient, setSpecialIngredient] = useState("");
  const [ratingsCount, setRatingsCount] = useState("");
  const [type, setType] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy id từ url, nếu tồn tại id thì update
  const { id: idString } = useLocalSearchParams();
  // console.log("idString: " + idString?.[0]);
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );
  // console.log("id: " + id);
  const isUpdating = !!id;

  const router = useRouter();

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { data: updatingProduct } = useProduct(id);

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
      setDescription(updatingProduct.description);
      setRoasted(updatingProduct.roasted);
      setIngredients(updatingProduct.ingredients);
      setSpecialIngredient(updatingProduct.special_ingredient);
      setAverageRating(updatingProduct.average_rating.toString());
      setRatingsCount(updatingProduct.ratings_count);
      setType(updatingProduct.type);
    }
  }, [updatingProduct]);

  function resetFields() {
    setName("");
    setDescription("");
    setRoasted("");
    setIngredients("");
    setSpecialIngredient("");
    setAverageRating("");
    setRatingsCount("");
    setType("");
    setPrice("");
  }

  // Xác thực đầu vào
  function validateInput() {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!description) {
      setErrors("Description is required");
      return false;
    }
    if (!roasted) {
      setErrors("Roasted is required");
      return false;
    }
    if (!ingredients) {
      setErrors("Ingredients is required");
      return false;
    }
    if (!specialIngredient) {
      setErrors("Special Ingredient is required");
      return false;
    }
    if (!ratingsCount) {
      setErrors("Ratings Count is required");
      return false;
    }
    if (!type) {
      setErrors("Type is required");
      return false;
    }
    if (!averageRating) {
      setErrors("Average Rating is required");
      return false;
    }
    if (isNaN(parseFloat(averageRating))) {
      setErrors("Average Rating is not a number");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }
    return true;
  }

  async function onCreate() {
    setLoading(true);
    // Xác thực đầu vào sai thì return
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    // console.warn("Creating product: ", name);

    // Save trong database
    insertProduct(
      {
        name,
        price: parseFloat(price),
        image: imagePath,
        description,
        roasted,
        ingredients,
        specialIngredient,
        averageRating: parseFloat(averageRating),
        ratingsCount,
        type,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
    setLoading(false);
  }

  async function onUpdate() {
    // Xác thực đầu vào sai thì return
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    // console.warn("Updating product: ");

    // Save trong database
    updateProduct(
      {
        id,
        name,
        price: parseFloat(price),
        image: imagePath,
        description,
        roasted,
        ingredients,
        specialIngredient,
        averageRating: parseFloat(averageRating),
        ratingsCount,
        type,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  }

  function onSubmit() {
    if (isUpdating) {
      setLoading(true);
      onUpdate();
      setLoading(false);
    } else {
      setLoading(true);
      onCreate();
      setLoading(false);
    }
  }

  function onDelete() {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)");
      },
    });
    // console.warn("Delete");
  }

  function confirmDelete() {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // upload hình ảnh lên Supabase Storage
  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    console.log(error);

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <Stack.Screen
          options={{ title: isUpdating ? "Update Product" : "Create Product" }}
        />
        {!isUpdating ? (
          <Image
            source={{
              uri:
                image ||
                "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
            }}
            style={styles.image}
          />
        ) : (
          <RemoteImage
            path={image}
            fallback={
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"
            }
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Text onPress={pickImage} style={styles.textButton}>
          Select Image
        </Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          style={styles.input}
        />

        <Text style={styles.label}>Roasted</Text>
        <TextInput
          value={roasted}
          onChangeText={setRoasted}
          placeholder="Roasted"
          style={styles.input}
        />

        <Text style={styles.label}>Ingredients</Text>
        <TextInput
          value={ingredients}
          onChangeText={setIngredients}
          placeholder="Ingredients"
          style={styles.input}
        />

        <Text style={styles.label}>Special Ingredient</Text>
        <TextInput
          value={specialIngredient}
          onChangeText={setSpecialIngredient}
          placeholder="Special Ingredient"
          style={styles.input}
        />

        <Text style={styles.label}>Average Rating</Text>
        <TextInput
          value={averageRating}
          onChangeText={setAverageRating}
          placeholder="Average Rating"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Ratings Count</Text>
        <TextInput
          value={ratingsCount}
          onChangeText={setRatingsCount}
          placeholder="Ratings Count"
          style={styles.input}
        />

        <Text style={styles.label}>Type</Text>
        <TextInput
          value={type}
          onChangeText={setType}
          placeholder="Type"
          style={styles.input}
        />

        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="9.99"
          style={styles.input}
          keyboardType="numeric"
        />

        <Text style={{ color: "red" }}>{errors}</Text>
        <Button
          onPress={onSubmit}
          text={
            isUpdating
              ? loading
                ? "Updating"
                : "Update"
              : loading
              ? "Creating"
              : "Create"
          }
          disabled={loading}
        />
        {isUpdating && (
          <Text onPress={confirmDelete} style={styles.textButton}>
            Delete
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default CreateProductScreen;
