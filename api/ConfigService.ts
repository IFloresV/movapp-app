// api/ConfigService.ts
import axios from "axios";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig?.extra as Record<string, string>;

const Service = {
   // --- Config ---
   getCountries: async () => {
      const response = await axios.get(`${API_URL}config/paises`, {
         validateStatus: () => true,
      });
      return response;
   },
};

export default Service;
