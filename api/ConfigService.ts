// api/ConfigService.ts

import Env from "@/utils/Config";
import axios from "axios";
const { API_URL } = Env;

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
