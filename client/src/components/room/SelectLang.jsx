"use client"

import { Portal, Select, createListCollection, useSelectContext } from "@chakra-ui/react"
import PenPreviewIcon from "../icons/PenPreviewIcon";

const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems;
  const { value } = items[0];
  return (
    <Select.ValueText placeholder="Select member">
        {value}
    </Select.ValueText>
  )
}

const SelectLang = () => {
  return (
    <Select.Root bg='surface-container-highest'  collection={frameworks} size="sm" width='125px'
      defaultValue={['python']}
      positioning={{ sameWidth: true }}
      overflow='hidden'
    >
      {/* <Select.HiddenSelect />
      <Select.Label>Select framework</Select.Label> */}
      <Select.Control
        bg='surface-container-highest'
        borderWidth='1px'
        _hover={{ borderColor: 'outline-variant' }}
      >
        <Select.Trigger cursor='pointer'>
          <Select.ValueText  color='on-surface' placeholder="Python" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal >
        <Select.Positioner>
          <Select.Content color='on-surface' bg='surface-container-high'
            borderWidth="1px"
            _hover={{ borderColor: 'outline-variant' }}
          >
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}
                _hover={{ bg: 'surface-container-highest' }}
                _selected={{ bg: 'primary-container', color: 'on-primary-container' }}
              >
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