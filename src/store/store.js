import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import products from "../../assets/data/products";

export const useStore = create(
  persist(
    (set, get) => ({
      productList: products,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
    }),
    {
      name: "DACS3_1",
      // storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
