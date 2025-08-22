import React, { useEffect } from 'react';
import { Editor, useMonaco } from '@monaco-editor/react';
import { customTheme } from '../../ui/theme';
import { useColorMode, useColorModeValue } from '../../ui/color-mode';
import editorLangs from './editorLangs';
import { useAppContext } from '../../../AppContext';

function CustomEditor() {

  const monaco = useMonaco();
  const { lang, setCode } = useAppContext();

  // editor background color
  const colorSurfaceContainerHigh = customTheme.theme.semanticTokens.colors['surface-container-high'].value;
  const bg = useColorModeValue(colorSurfaceContainerHigh.base, colorSurfaceContainerHigh._dark);

  // current highlighted line border color
  const colorSurfaceContainerLow = customTheme.theme.semanticTokens.colors['surface-container-highest'].value;
  const borderColor = useColorModeValue(colorSurfaceContainerLow.base, colorSurfaceContainerLow._dark);
  
  // text color on code
  const colorOnSurface = customTheme.theme.semanticTokens.colors['on-surface'].value;
  const fontColor = useColorModeValue(colorOnSurface.base, colorOnSurface._dark);
  
  const colorMode = useColorMode().colorMode;
  console.log("mode: ",colorMode);

  // redefine Monaco themes whenever colorMode changes
  useEffect(() => {
    if (!monaco) return;

    monaco.editor.defineTheme('customThemeDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        "editor.background": bg,
        "editor.lineHighlightBorder": borderColor,
        "editor.foreground": fontColor,
      },
    });

    monaco.editor.defineTheme('customThemeLight', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        "editor.background": bg,
        "editor.lineHighlightBorder": borderColor,
        "editor.foreground": fontColor,
      },
    });

    monaco.editor.setTheme(colorMode === 'light' ? 'customThemeLight' : 'customThemeDark');
  }, [monaco, colorMode, bg, borderColor, fontColor]);

  const setRunCode = (value) => {
    setCode(value);
  }

  return (
    <div style={{'width': '100%', 'height': '100%'}}>
      <Editor
        width="100%"
        height="100%"
        theme={colorMode === 'light' ? 'customThemeLight' : 'customThemeDark'}
        language={`${lang}`}
        value={`${editorLangs[lang]}`}
        defaultValue={`${editorLangs[lang]}`}
        onChange={setRunCode}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: "20px",
          
        }}
      />
    </div>
  );
}

export default CustomEditor;
