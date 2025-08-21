"use client"

import {
  Avatar,
  HStack,
  Select,
  createListCollection,
  useSelectContext,
} from "@chakra-ui/react"
import PenPreviewIcon from "../../icons/PenPreviewIcon";

const SelectValue = () => {
  const select = useSelectContext();
  const items = select.selectedItems;
  const { color } = items[0]
  return (
    <Select.ValueText placeholder="Select member">
        <PenPreviewIcon width='50px' color={color}/>
    </Select.ValueText>
  )
}

const PenColorSelector = () => {
  return (
    <Select.Root
      mt='0'
      bg='surface-container-highest'
      // borderColor='outline-variant'
      // borderWidth='1px'
      collection={colors}
      size="sm"
      width="100px"
      overflow='hidden'
      defaultValue={["blue"]}
      positioning={{ sameWidth: true }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger >
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup >
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content color='on-surface' bg='surface-container-highest'>
          {colors.items.map((item) => (
            <Select.Item _hover={{'bg': 'inverse-primary'}} item={item} key={item.id} justifyContent="flex-start">
              <PenPreviewIcon width='50px' color={item.color}/>
              {/* {item.name} */}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}

const colors = createListCollection({
  items: [
    {
      // name: "",
      id: "red",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100",
      color: 'red'
    },
    {
      // name: "",
      id: "blue",
      avatar:
        "https://images.unsplash.com/photo-1523477800337-966dbabe060b?w=100",
      color: 'blue'
    },
    {
      // name: "",
      id: "green",
      avatar:
        "https://images.unsplash.com/photo-1609712409631-dbbb050746d1?w=100",
      color: 'green'
    },
  ],
  // itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
  // itemToString: (item) => item.color,
});


export default PenColorSelector;