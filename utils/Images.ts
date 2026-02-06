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

      case "LINKTREE - FACEBOOK":
         return require("@/assets/images/linktree/LINKTREE - FACEBOOK.png");
      case "LINKTREE - INSTAGRAM":
         return require("@/assets/images/linktree/LINKTREE - INSTAGRAM.png");
      case "LINKTREE - WEB OFICIAL":
         return require("@/assets/images/linktree/LINKTREE - WEB OFICIAL.png");
      case "LINKTREE - TIK TOK":
         return require("@/assets/images/linktree/LINKTREE - TIK TOK.png");
      case "LINKTREE - YOUTUBE":
         return require("@/assets/images/linktree/LINKTREE - YOUTUBE.png");
      case "LINKTREE - LOGO":
         return require("@/assets/images/linktree/LINKTREE - LOGO.png");
      case "LINKTREE - PARRAFO":
         return require("@/assets/images/linktree/LINKTREE - PARRAFO.png");

      default:
         return require("@/assets/images/products/PROD-001.png");
   }
};
