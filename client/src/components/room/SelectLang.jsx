"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useAppContext } from "../../AppContext"


const SelectLang = () => {

  const { setLang } = useAppContext();

  return (
    <Select.Root bg='surface-container-highest'  collection={frameworks} size="sm" width='125px'
      positioning={{ sameWidth: true }}
      overflow='hidden'
      defaultValue={['Python']}
      onChange={(event) => {
        const lang = event.nativeEvent.target.value;
        // console.log('jjjj',lang);
        setLang(lang);
      }}
    >
      <Select.HiddenSelect />
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
  itemToValue: (item) => item.value,
})

export default SelectLang;