export const getImage = (name: string) => {
   switch (name) {
      case "PROD-001":
         return require("@/assets/images/products/PROD-001.png");
      case "PROD-002":
         return require("@/assets/images/products/PROD-002.png");
      case "PROD-003":
         return require("@/assets/images/products/PROD-003.png");
      case "PROD-004":
         return require("@/assets/images/products/PROD-004.png");
      default:
         return require("@/assets/images/products/PROD-001.png");
   }
};
