import React, { useState, useEffect } from 'react';
import { Box } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext";

export default function JsCodebox() {
  // 1. Get code and the new runCodeTrigger from context
  const { lang, code, runCodeTrigger } = useAppContext();
  const [iframeContent, setIframeContent] = useState('');
  console.log('iframe code', code);
  console.log('iframe lang', lang);

  // 2. Use useEffect to run code when the trigger changes
  useEffect(() => {
    // We check if runCodeTrigger > 0 to avoid running on the initial render
    if (runCodeTrigger > 0 && lang.toLowerCase() === 'javascript') {
      const wrappedCode = `
        <html>
          <body style="font-family: sans-serif; padding:10px;">
            <pre id="output"></pre>
            <script>
              const log = (...args) => {
                document.getElementById("output").innerText += args.join(" ") + "\\n";
              };
              console.log = log;
              try {
                ${code}
              } catch (err) {
                log("Error:", err.message);
              }
            </script>
          </body>
        </html>
      `;
      setIframeContent(wrappedCode);
    }
  }, [runCodeTrigger]); // Dependency array: re-run when trigger or code changes

  return (
    <Box
      bg='surface-container-highest' // Changed for style
      position='absolute'
      top='10'
      right='10'
      zIndex='max'
      w="400px"
      h="400px"
      p={4}
      borderRadius="md"
      boxShadow="lg"
    >
      {/* The button is no longer needed here */}
      <Box
        as="iframe"
        srcDoc={iframeContent}
        title="JavaScript Code Output"
        w="100%"
        h="100%"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        bg="white"
      />
    </Box>
  );
}