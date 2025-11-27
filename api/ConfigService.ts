// api/ConfigService.ts

import axios from "axios";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig?.extra as Record<string, string>;

const Service = {
   // --- Config ---
   getCountries: async () => {
      const response = await axios.get(`${API_URL}config/countries`, {
         validateStatus: () => true,
      });
      return response;
   },
   getPrices: async (idcountry: number) => {
      const response = await axios.get(`${API_URL}config/prices?idcountry=${idcountry}`, {
         validateStatus: () => true,
      });
      return response;
   },
};

export default Service;
