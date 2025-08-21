import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./theme/recipe/button.recipe";
import { dialogRecipe } from "./theme/recipe/dialog.slotRecipe";

export const customTheme = {
  theme: {
    recipes: {
      button: buttonRecipe,
      // dialog: dialogRecipe,
    },
    slotRecipes: {
      popup: dialogRecipe,
    },
    
    tokens: {
      fonts: {
        header: { value: '"Inter Tight", sans-serif' },
        body: { value: '"Inter", sans-serif' },  
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: { base: "#27567D", _dark: "#A5C9E8" } },
        "surface-tint": { value: { base: "#27567D", _dark: "#A5C9E8" } },
        "on-primary": { value: { base: "#FFFFFF", _dark: "#002F4A" } },
        "primary-container": { value: { base: "#D0E5FF", _dark: "#004368" } },
        "on-primary-container": { value: { base: "#001D32", _dark: "#D0E5FF" } },
        secondary: { value: { base: "#5D82A2", _dark: "#B8D4F2" } },
        "on-secondary": { value: { base: "#FFFFFF", _dark: "#2A4B64" } },
        "secondary-container": { value: { base: "#DCEBFF", _dark: "#40637F" } },
        "on-secondary-container": { value: { base: "#172F42", _dark: "#DCEBFF" } },
        tertiary: { value: { base: "#957753", _dark: "#EAD3B6" } },
        "on-tertiary": { value: { base: "#FFFFFF", _dark: "#4A3E2A" } },
        "tertiary-container": { value: { base: "#FFEEC9", _dark: "#63553F" } },
        "on-tertiary-container": { value: { base: "#2C1D06", _dark: "#FFEEC9" } },
        error: { value: { base: "#BA1A1A", _dark: "#FFB4AB" } },
        "on-error": { value: { base: "#FFFFFF", _dark: "#690005" } },
        "error-container": { value: { base: "#FFDAD6", _dark: "#93000A" } },
        "on-error-container": { value: { base: "#410002", _dark: "#FFDAD6" } },
        background: { value: { base: "#F8F9FF", _dark: "#1A1C1E" } },
        "on-background": { value: { base: "#1A1C1E", _dark: "#E2E2E6" } },
        surface: { value: { base: "#F8F9FF", _dark: "#1A1C1E" } },
        "on-surface": { value: { base: "#1A1C1E", _dark: "#E2E2E6" } },
        "surface-variant": { value: { base: "#DFE2EB", _dark: "#43474E" } },
        "on-surface-variant": { value: { base: "#43474E", _dark: "#C3C6CF" } },
        outline: { value: { base: "#74777F", _dark: "#8D9199" } },
        "outline-variant": { value: { base: "#C3C6CF", _dark: "#43474E" } },
        shadow: { value: { base: "#000000", _dark: "#000000" } },
        scrim: { value: { base: "#000000", _dark: "#000000" } },
        "inverse-surface": { value: { base: "#2F3033", _dark: "#E2E2E6" } },
        "inverse-on-surface": { value: { base: "#F1F0F4", _dark: "#2F3033" } },
        "inverse-primary": { value: { base: "#A5C9E8", _dark: "#27567D" } },
        "primary-fixed": { value: { base: "#D0E5FF", _dark: "#D0E5FF" } },
        "on-primary-fixed": { value: { base: "#001D32", _dark: "#001D32" } },
        "primary-fixed-dim": { value: { base: "#A5C9E8", _dark: "#A5C9E8" } },
        "on-primary-fixed-variant": { value: { base: "#004368", _dark: "#004368" } },
        "secondary-fixed": { value: { base: "#DCEBFF", _dark: "#DCEBFF" } },
        "on-secondary-fixed": { value: { base: "#172F42", _dark: "#172F42" } },
        "secondary-fixed-dim": { value: { base: "#B8D4F2", _dark: "#B8D4F2" } },
        "on-secondary-fixed-variant": { value: { base: "#40637F", _dark: "#40637F" } },
        "tertiary-fixed": { value: { base: "#FFEEC9", _dark: "#FFEEC9" } },
        "on-tertiary-fixed": { value: { base: "#2C1D06", _dark: "#2C1D06" } },
        "tertiary-fixed-dim": { value: { base: "#EAD3B6", _dark: "#EAD3B6" } },
        "on-tertiary-fixed-variant": { value: { base: "#63553F", _dark: "#63553F" } },
        "surface-dim": { value: { base: "#D9DAE0", _dark: "#121316" } },
        "surface-bright": { value: { base: "#F8F9FF", _dark: "#38393C" } },
        "surface-container-lowest": { value: { base: "#FFFFFF", _dark: "#0D0E11" } },
        "surface-container-low": { value: { base: "#F3F4FA", _dark: "#1A1C1E" } },
        "surface-container": { value: { base: "#EDEEF4", _dark: "#1E2022" } },
        "surface-container-high": { value: { base: "#E7E8EE", _dark: "#282A2D" } },
        "surface-container-highest": { value: { base: "#E2E2E6", _dark: "#333538" } },
      },
    },
  },
}

const config = defineConfig(customTheme);

export const system = createSystem(defaultConfig, config);
