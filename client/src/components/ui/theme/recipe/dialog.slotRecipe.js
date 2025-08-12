import { defineSlotRecipe } from "@chakra-ui/react";

export const dialogRecipe = defineSlotRecipe({

  slots: ["root", "content", "header", "body", "closeTrigger"],

  base: {
    root: {
      motionPreset: "slide-in-bottom",
    },
    
    content: {
      bg: "surface-bright",
      color: "on-surface",
      userSelect: "none",
      borderRadius: "28px",
      maxW: "22.5rem",

    },
    header: {
      position: "relative",
      pl: "24px",
      pr: "24px",
      pt: "24px",
      pb: "16px",
      fontFamily: "header",
      fontWeight: "medium",
      fontSize: "1.5rem",
      lineHeight: "2rem",

    },
    body: {
      fontFamily: "body",
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.5rem",
      pl: "24px",
      pr: "24px",
      pb: "24px",
      pt: "0px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      color: "on-surface-variant",
      minH: "9.375rem",
      minW: "18.74rem",

    },
    closeTrigger: {
      position:"absolute",
      top: "50%",
      transform:"translateY(-50%)",
      w: "48px",
      h: "48px",
      _hover: {borderRadius:'full', bg:'surface-container-highest'},
      
    },
        
  },

});