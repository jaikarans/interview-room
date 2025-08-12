import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  variants: {
    variant: {
      filled: {
        bg: "primary",
        color: "on-primary",
        h: "3rem",
        fontSize: "1rem",
        fontWeight: "medium",
        pl: "1rem",
        pr: "1rem",
        w: "7.5rem",
        borderRadius: "2rem",
        _hover: {
          _before: {
            content: '""',
            position: "absolute",
            inset: 0,
            bg: "on-primary", // the on-color
            opacity: 0.08,   // 8% for hover
            pointerEvents: "none",
          }
        },
      },
      textButton: {
        bg: "background",
        color: "on-surface",
        borderRadius: '2rem',
        h: "3rem",
        _hover: {
          bg: "primary-container",
          color: "on-primary-container",
        }, 
      },   
    },
  },
});
