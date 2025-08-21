"use client"

import {
  Select,
  createListCollection,
  useSelectContext,
} from "@chakra-ui/react"
import PenPreviewIcon from "../../icons/PenPreviewIcon";
import { setPenColor } from "./canvasUtil";

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
      defaultValue={["DE382C"]}
      positioning={{ sameWidth: true }}
      onChange={(event) => {
        const penColorHex = `#${event.target.value}`;
        console.log("A new color was selected:", `${penColorHex}`);
        console.log("A new color was selected:", event.target);
        setPenColor(penColorHex);

      }}
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
      id: "DE382C",
      color: '#DE382C'
    },
    {
      // name: "",
      id: "2C47DE",
      color: '#2C47DE'
    },
    {
      // name: "",
      id: "2CDE4A",
      color: '#2CDE4A'
    },
    {
      // name: "",
      id: "1A1A1A",
      color: '#1A1A1A'
    },
    {
      // name: "",
      id: "E0E0E0",
      color: '#E0E0E0'
    },
  ],
  // itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
  // itemToString: (item) => item.color,
});


export default PenColorSelector;