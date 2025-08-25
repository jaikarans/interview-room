/**
 * Be cautious before using ESLint or Prettier on this page.
 * The HTML string content for the iframe containing Python code
 * may be incorrect, and Python indentation could be broken.
 */

import React, { useState, useEffect } from 'react';
import { Box, Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";
import { LuMinus } from 'react-icons/lu';
import { customTheme } from '../ui/theme';
import { useColorModeValue } from '../ui/color-mode';


export default function Codebox() {
  const { lang, code, runCodeTrigger, showOutputBox, setShowOutputBox } = useAppContext();
  const [iframeSrc, setIframeSrc] = useState('');

  const colorSurfaceContainerLow = customTheme.theme.semanticTokens.colors['surface-container-low'].value;
  const background = useColorModeValue(colorSurfaceContainerLow.base, colorSurfaceContainerLow._dark);

  const colorOnSurface = customTheme.theme.semanticTokens.colors['on-surface'].value;
  const textColor = useColorModeValue(colorOnSurface.base, colorOnSurface._dark);

  const colorSurfaceContainerLowest = customTheme.theme.semanticTokens.colors['surface-container-lowest'].value;
  const trackColor = useColorModeValue(colorSurfaceContainerLowest.base, colorSurfaceContainerLowest._dark);
  
  const colorPrimaryContainerHigh = customTheme.theme.semanticTokens.colors['surface-container-high'].value;
  const thumbColor = useColorModeValue(colorPrimaryContainerHigh.base, colorPrimaryContainerHigh._dark);
  // background, textColor, trackColor, thumbColor, thumbHoverColor
  
  const colorSurfaceContainerHighest = customTheme.theme.semanticTokens.colors['surface-container-highest'].value;
  const thumbHoverColor = useColorModeValue(colorSurfaceContainerHighest.base, colorSurfaceContainerHighest._dark);

  useEffect(() => {
    let blobUrl = null;

    if (runCodeTrigger > 0) {
      let content = '';
      if (lang.toLowerCase() === 'javascript') {
        // Javascript logic remains the same
        content = `
          <html>
            <body style="font-family: monospace; white-space: pre-wrap; color: ${textColor}; background-color: ${background};">
              <pre id="output"></pre>
              <script>
                const log = (...args) => {
                  const text = document.createTextNode(args.join(" ") + "\\n");
                  document.getElementById("output").appendChild(text);
                  document.body.style.backgroundColor = '${background}';
                  document.body.style.fontColor = '${textColor}';
                  document.body.style.margin = '0';
                  document.body.style.padding = '0';
                };
                console.log = log;
                try {
                  ${code}
                } catch (err) {
                  log("Error:", err.message);
                }
              </script>
              <style>
                * {
                  padding: 0;
                  margin: 0;
                }
                body {
                  background-color: ${background};
                  margin: 0;
                  padding: 0;
                }

                /**
                  * Style the scrollbar for
                  * Chrome, Edge, Safari Browsers
                  *
                */
                *::-webkit-scrollbar {
                  width: 12px;
                  width: 12px;
                }

                *::-webkit-scrollbar-track {
                  background: ${trackColor};
                }

                *::-webkit-scrollbar-thumb {
                  background: ${thumbColor};
                  // border-radius: 4px;
                }

                *::-webkit-scrollbar-thumb:hover {
                  background: ${thumbHoverColor};
                }
              </style>
            </body>
          </html>
        `;
      } else if (lang.toLowerCase() === 'python') {
        
        // const indentedCode = code.split('\n').map(line => `  ${line}`).join('\n');

        content = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>PyScript Runner</title>
		<link rel="stylesheet" href="https://pyscript.net/releases/2024.1.1/core.css"/>
		<script type="module" src="https://pyscript.net/releases/2024.1.1/core.js"></script>
		<style>
      * {
        padding: 0;
        margin: 0;
        overflow: hidden;
      }
			body {
				background-color: ${background};
				margin: 0;
				padding: 0;
			}

      /**
        * Style the terminal background when
        * python code has some errors.
        * other styles are set by python at runtime
        * in case python code has error this style
        * helps to look ui colors regular
        *
        */
			.xterm-rows {
				font-family: Sans-serif;
				background-color: ${background};
			}

      /**
        * Style the scrollbar for
        * Chrome, Edge, Safari Browsers
        *
      */
			*::-webkit-scrollbar {
				width: 12px;
				width: 12px;
			}

			*::-webkit-scrollbar-track {
				background: ${trackColor};
			}

			*::-webkit-scrollbar-thumb {
				background: ${thumbColor};
				// border-radius: 4px;
			}

			*::-webkit-scrollbar-thumb:hover {
				background: ${thumbHoverColor};
			}
			
		</style>
	</head>
	<body>
		<script type="py" terminal>
# ________________________________________________________________
#|##### Importing Pyscript to change the style of terminal #######|
#|________________________________________________________________|
from pyscript import document

# ________________________________________________________________
#|########### Change the backgroundColor of terminal #############|
#|________________________________________________________________|
classes = document.querySelectorAll('.xterm, .xterm-viewport')
for c in classes:
  c.style.backgroundColor = '${background}'

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


# ________________________________________________________________
#|############## Style the terminal fonts ########################|
#|________________________________________________________________|
xterm_rows = document.querySelectorAll('.xterm-rows')
for c in xterm_rows:
  c.style.color = '${textColor}'
  # c.style.fontSize = '50px'
  c.style.fontFamily = 'Sans-serif'
  # c.style.fontWeight = 'bold'

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


# ________________________________________________________________
#|######################## User Code Start #######################|
#|________________________________________________________________|
${code}

print()
print()
print()
# ________________________________________________________________
#|######################## User Code End #########################|
#|________________________________________________________________|
		</script>
	</body>
</html>
        `;
      }

      if (content) {
        const blob = new Blob([content], { type: 'text/html' });
        blobUrl = URL.createObjectURL(blob);
        setIframeSrc(blobUrl);
      }
    }

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [
      runCodeTrigger,
      lang,
      background,
      textColor,
      trackColor,
      thumbColor,
      thumbHoverColor
    ]);

  return (
    <Box
      bg='surface-container-low'
      position='relative'      
      right='0'
      bottom='10'
      zIndex={`${showOutputBox}`}
      w="50vw"
      h="50vh"
      borderRadius="md"
      boxShadow="lg"
      overflow='hidden'
      display='flex'
      flexDirection='column'
    >
      <HStack
        width='100%'
        pl='1em'
        py='0.2em'
        mb='0.6em'
        bg='surface-container-highest'
        color='on-surface'
      >
        <Text> Output: </Text>
        <Spacer />
        <Button bg='surface-container-highest' color='on-surface' _hover={{ borderColor: 'outline-variant' }}
          onClick={ () => (setShowOutputBox('hide'))}
        >
          <LuMinus />
        </Button>

      </HStack>

      <Box
        bg='surface-container-low'
        flex={1}
        pl={2}
        overflow='hidden'
        display='flex'
        flexDirection='column'
      >
        <Box
          as="iframe"
          flex={1}
          src={iframeSrc || 'about:blank'}
          title="Code Output"
          mb='0.6em'
          bg="surface-container-low"
          sandbox="allow-scripts allow-same-origin"
          overflow='hidden'
        />
      </Box>
    </Box>
  );
}

