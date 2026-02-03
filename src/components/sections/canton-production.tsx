import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { FormEvent, useState } from "react";

interface PackingItem {
  name: string;
  quantity: string;
  weight: string;
}

export default function CantonProduction() {
  const [action, setAction] = useState<string | null>(null);
  const [packingItems, setPackingItems] = useState<PackingItem[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemWeight, setItemWeight] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("Submitted Packing Items:", packingItems);
  }

  function addPackingItem() {
    if (!itemName || !itemQuantity || !itemWeight) return;
    setPackingItems([
      ...packingItems,
      { name: itemName, quantity: itemQuantity, weight: itemWeight },
    ]);
    setItemName("");
    setItemQuantity("");
    setItemWeight("");
  }

  function removePackingItem(index: number) {
    setPackingItems(packingItems.filter((_, i) => i !== index));
  }

  return (
    <section>
      <header>
        <h2 className="font-semibold">Canton Production</h2>
        <p className="text-sm text-gray-500">
          Enter and manage production and packing data for canton manufacturing.
        </p>
      </header>

      <Divider className="my-4" />

      <Form
        onReset={() => setAction("reset")}
        onSubmit={onSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Canton Production</h2>
        </div>
        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Flour Used"
            name="flour"
            placeholder="in kg"
            type="text"
            size="sm"
          />
          <p className="text-xs mt-2">Current: {0} kgs</p>
        </div>
        <div>
          <Textarea
            className="max-w-full"
            label="Note"
            placeholder="Enter your additional notes"
          />
        </div>
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Troubles</h2>
        </div>
        <div>
          <Textarea
            className="max-w-full"
            label="Machine Trouble"
            placeholder="Enter your description"
          />
        </div>
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Canton Packing</h2>
        </div>
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Canton Packing</h2>
        </div>
        {/* Packing Item Inputs */}
        <div>
          <Input
            label="Item Name"
            placeholder="e.g., Canton tartrazine 454g x 12"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            size="sm"
          />
        </div>
        <div>
          <Input
            label="Quantity / Bundles"
            placeholder="e.g., 154 bdls"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            size="sm"
          />
        </div>
        <div>
          <Input
            label="Weight (kgs)"
            placeholder="e.g., 838.992 kgs"
            value={itemWeight}
            onChange={(e) => setItemWeight(e.target.value)}
            size="sm"
          />
        </div>
        <div className="col-span-full mt-2">
          <Button type="button" color="primary" onClick={addPackingItem}>
            Add Item
          </Button>
        </div>
        {/* List of Added Packing Items */}
        {packingItems.length > 0 && (
          <div className="col-span-full mt-4">
            <h3 className="font-semibold text-sm mb-2">Packing Items List</h3>
            <ul className="list-disc ml-5 space-y-1">
              {packingItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {item.name} - {item.quantity} ({item.weight})
                  </span>
                  <Button
                    type="button"
                    color="danger"
                    size="sm"
                    onPress={() => removePackingItem(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <p>Total Output: {0} kgs</p>
          <p>Current Total Output: {0} kgs</p>
        </div>

        <div>
          <p>Yield: {0} %</p>
          <p>Current Yield {0} %</p>
        </div>

        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Packing Rejections</h2>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Scrap"
            name="scrap"
            placeholder="in kg"
            type="text"
            size="sm"
          />
          <p className="text-xs mt-2">Current: {0} kgs</p>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Sweepings"
            name="sweepings"
            placeholder="in kg"
            type="text"
            size="sm"
          />
          <p className="text-xs mt-2">Current: {0} kgs</p>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Percentage"
            name="percentage"
            placeholder="in kg"
            type="text"
            size="sm"
          />
          <p className="text-xs mt-2">Current: {0} %</p>
        </div>

        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Lines Running</h2>
        </div>

        <div>
          <Textarea
            className="max-w-full"
            label="Lines Running"
            placeholder="*3 Lines running (1, 3, & 5)"
          />
        </div>

        <footer className="col-span-full">
          <Button className="w-full">Submit</Button>
        </footer>
      </Form>
    </section>
  );
}
