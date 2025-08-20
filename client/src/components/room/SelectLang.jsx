"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"

const SelectLang = () => {
  return (
    <Select.Root bg='surface-container-highest'  collection={frameworks} size="sm" width='125px' >
      {/* <Select.HiddenSelect />
      <Select.Label>Select framework</Select.Label> */}
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText  color='on-surface' placeholder="Python" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal >
        <Select.Positioner>
          <Select.Content color='on-surface' bg='surface-container-highest'>
            {frameworks.items.map((framework) => (
              <Select.Item _hover={{'bg': 'inverse-primary'}} item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}


const frameworks = createListCollection({
  items: [
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
  ],
})

export default SelectLang;