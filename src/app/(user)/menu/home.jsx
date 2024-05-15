import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBar from "../../../components/HeaderBar";
import ProductCard from "../../../components/ProductCard";
import { COLORS } from "../../../constants/theme2";
import { supabase } from "../../../lib/supabase";
import { Stack } from "expo-router";
import LoadingP from "../../../components/LoadingP";

// Hiển thị danh mục để lọc sản phẩm theo tên
function getCategoriesFromData(data) {
  let temp = {};
  for (let i = 0; i < data?.length; i++) {
    if (temp[data[i]?.name] == undefined) {
      temp[data[i]?.name] = 1;
    } else {
      temp[data[i]?.name]++;
    }
  }
  let categories = Object?.keys(temp); // Lấy tất cả các danh mục
  categories?.unshift("All"); // Thêm "All" vào đầu mảng
  return categories;
}

// Lấy sản phẩn theo từng danh mục
function getProductList(category, data) {
  if (category == "All") {
    return data;
  } else {
    let productlist = data?.filter((item) => item?.name == category);
    return productlist;
  }
}

export default function MenuScreen() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      setProducts(data); // Cập nhật trạng thái products trực tiếp
      setError(error);
      setIsLoading(false); // Set loading sang false sau khi lấy dữ liệu thành công
      setCategories(getCategoriesFromData(data) || []); // Cập nhật categories
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error); //
      setError(error); // Cập nhật trạng thái lỗi nếu lấy dữ liệu thất bại
      setIsLoading(false); // Reset trạng thái tải
    }
  };

  const [searchText, setSearchText] = useState("");

  const ListRef = useRef();

  function resetsearchProduct() {
    // Cuộn danh sách sản phẩm về đầu:
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });

    setCategoryIndex({ index: 0, category: categories[0] });
    setsortedProduct([...products]); // Sắp xếp thành tất cả sản phẩm
    setSearchText("");
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [categories, setCategories] = useState([]); // Danh mục
  const [categoryIndex, setCategoryIndex] = useState({}); // Lưu trữ thông tin về danh mục hiện tại
  const [sortedProduct, setsortedProduct] = useState([]); // Chứa danh sách sản phẩm đã được lọc và sắp xếp theo danh mục và từ khóa tìm kiếm

  useEffect(() => {}, [isLoading, products]);

  useEffect(() => {
    setCategoryIndex({
      index: 0,
      category: categories[0],
    });
  }, [searchText]);

  useEffect(() => {
    setCategoryIndex({
      index: 0,
      category: categories[0],
    });
  }, [categories]);

  useEffect(() => {
    if (!products) return; // Trả về nếu products chưa được lấy

    const filteredProducts = searchText
      ? products.filter((item) =>
          item?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
        )
      : [...products]; // Hiển thị tất cả sản phẩm nếu searchText trống hoặc sai

    setsortedProduct(getProductList(categoryIndex.category, filteredProducts));
  }, [products, categoryIndex, searchText]); // Cập nhật khi products, category hoặc search thay đổi

  if (isLoading) {
    // return <ActivityIndicator />;
    return <LoadingP />;
  }

  if (error) {
    return <Text>Faild to fetch data</Text>;
  }

  return (
    <View style={styles.ScreenContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor={COLORS.primaryBlackHex} hidden={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar title="Home Screens" />

        <Text style={styles.ScreenTitle}>Find the best{"\n"}food for you</Text>

        {/* Search Input */}
        <View style={styles.InputContainerComponent}>
          <Ionicons
            style={styles.InputIcon}
            name="search"
            size={18}
            color={
              searchText?.length > 0
                ? COLORS.primaryOrangeHex
                : COLORS.primaryWhiteHex
            }
          />
          <TextInput
            placeholder="Find Your Food..."
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            placeholderTextColor={COLORS.primaryWhiteHex}
            style={styles.TextInputContainer}
          />
          {searchText?.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetsearchProduct();
              }}
            >
              <Ionicons
                style={styles.InputIcon}
                name="close"
                size={16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {/* Hiển thị Danh mục Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {categories?.map((data, index) => (
            <View key={index} style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                // Cuộn danh sách sản phẩm về đầu khi click vào danh mụcu mới
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });

                  setCategoryIndex({
                    index: index,
                    category: categories[index],
                  });
                  setsortedProduct([
                    ...getProductList(categories[index], products),
                  ]);
                }}
                style={styles.CategoryScrollViewItem}
              >
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex?.index == index
                      ? { color: COLORS.primaryOrangeHex }
                      : { color: "#230c02" },
                  ]}
                >
                  {data}
                </Text>
                {categoryIndex?.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.CoffeBeansTitle}>Best Food</Text>

        {/* Product FlatList */}
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Product Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedProduct}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <ProductCard
                  id={item?.id}
                  type={item?.type}
                  roasted={item?.roasted}
                  image={item?.image}
                  name={item?.name}
                  special_ingredient={item?.special_ingredient}
                  average_rating={item?.average_rating}
                  price={item?.price}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    // backgroundColor: COLORS.primaryBlackHex,
    backgroundColor: "#EEDCC6",
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: 28,
    // color: COLORS.primaryWhiteHex,
    color: "#230C02",
    fontWeight: "bold",
    paddingLeft: 30,
  },
  InputContainerComponent: {
    flexDirection: "row",
    margin: 30,
    borderRadius: 20,
    backgroundColor: "#4d3429",
    alignItems: "center",
  },
  InputIcon: {
    marginHorizontal: 20,
  },
  TextInputContainer: {
    flex: 1,
    height: 60,
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: 20,
    // marginBottom: 20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: 20,
    // backgroundColor: "red",
    borderRadius: 20,
  },
  CategoryScrollViewItem: {
    alignItems: "center",
    borderRadius: 20,
  },
  ActiveCategory: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryText: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: 4,
  },
  FlatListContainer: {
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  CoffeBeansTitle: {
    fontSize: 18,
    marginLeft: 30,
    // marginTop: 20,
    fontWeight: "600",
    color: COLORS.secondaryLightGreyHex,
    color: "#230C02",
  },
  InputIcon: {
    marginHorizontal: 20,
  },
  EmptyListContainer: {
    width: Dimensions.get("window").width - 60,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36 * 3.6,
  },
});
