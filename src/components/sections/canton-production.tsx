import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select"; // ✅ HeroUI Select
import axios from "axios";
import { FormEvent, useState } from "react";
import { GAS_DEPLOYMENT_LINK } from "../../../link";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { DatePicker } from "@heroui/date-picker";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function CantonProduction() {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(today(getLocalTimeZone()));

  // State for dynamic SKUs, including unit
  const [skus, setSkus] = useState<
    { id: number; name: string; kgs: string; qty: string; unit: string }[]
  >([
    {
      id: 1,
      name: "Canton tartrazine 454g x 12",
      kgs: "",
      qty: "",
      unit: "bdl",
    },
  ]);

  function addSKU() {
    const nextId = skus.length + 1;
    setSkus([...skus, { id: nextId, name: "", kgs: "", qty: "", unit: "bdl" }]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    // Create FormData from form
    const formData = new FormData(e.currentTarget);

    // Convert to plain object
    const data = Object.fromEntries(formData.entries());

    const totalOutput = skus.reduce(
      (sum, sku) => sum + (parseFloat(sku.kgs) || 0),
      0,
    );

    const totalInput = parseFloat(data["totalInput"] as string) || 0;

    const yieldValue = totalInput ? (totalOutput / totalInput) * 100 : 0;

    const rejectionPercent = totalOutput
      ? (((parseFloat(data["sweepings"] as string) || 0) +
          (parseFloat(data["scrap"] as string) || 0)) /
          totalOutput) *
        100
      : 0;

    console.log({
      action: "set-canton-prod",
      ...data,
      skus,
      totalOutput,
      yieldValue,
      rejectionPercent,
      date,
    });

    try {
      await axios.post(
        GAS_DEPLOYMENT_LINK,
        JSON.stringify({
          action: "set-canton-prod",
          ...data,
          skus,
          totalOutput,
          yieldValue,
          rejectionPercent,
          date: date.toString(),
        }),
      );

      addToast({
        title: "Submitted",
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Submission Failed",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
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
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* ===== Canton Production ===== */}
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Canton Production</h2>
        </div>

        <div>
          <DatePicker
            className="w-full"
            label="Select date"
            value={date}
            onChange={(value) => {
              if (value) setDate(value);
            }}
          />
        </div>

        <div>
          <Input
            label="Flour Used"
            name="flour"
            step={"any"}
            type="number"
            size="sm"
          />
        </div>

        <div>
          <Input
            label="Total Input"
            name="totalInput"
            step={"any"}
            type="number"
            size="sm"
          />
        </div>

        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Packing Rejection</h2>
        </div>

        <div>
          <Input
            label="Scrap"
            name="scrap"
            step={"any"}
            type="number"
            size="sm"
          />
        </div>

        <div>
          <Input
            label="Sweepings"
            step={"any"}
            name="sweepings"
            type="number"
            size="sm"
          />
        </div>

        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Machine Trouble</h2>
        </div>

        <div>
          <Input
            label="Machine Trouble"
            name="machineTrouble"
            type="number"
            size="sm"
          />
        </div>

        <Textarea
          label="Trouble"
          name="trouble"
          placeholder="Describe machine or production issues"
        />

        {/* ===== Canton Packing - Dynamic SKUs with HeroUI Select ===== */}
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Canton Packing</h2>
        </div>

        {skus.map((sku, index) => (
          <div
            key={sku.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 col-span-full"
          >
            <div className="col-span-full">
              <Input
                label="SKU Name"
                name={`skuName_${sku.id}`}
                value={sku.name}
                onChange={(e) => {
                  const newSkus = [...skus];
                  newSkus[index].name = e.target.value;
                  setSkus(newSkus);
                }}
                size="sm"
              />
            </div>

            <div>
              <Input
                label="KGS"
                step={"any"}
                name={`skuKGS_${sku.id}`}
                value={sku.kgs}
                onChange={(e) => {
                  const newSkus = [...skus];
                  newSkus[index].kgs = e.target.value;
                  setSkus(newSkus);
                }}
                type="number"
                size="sm"
              />
            </div>

            <div>
              <Input
                label="QTY"
                step={"any"}
                name={`skuQTY_${sku.id}`}
                value={sku.qty}
                onChange={(e) => {
                  const newSkus = [...skus];
                  newSkus[index].qty = e.target.value;
                  setSkus(newSkus);
                }}
                type="number"
                size="sm"
              />
            </div>

            <div>
              <Select
                label="Unit"
                size="sm"
                className="w-full"
                value={sku.unit} // controlled value
                onChange={(e) => {
                  const newSkus = [...skus];
                  newSkus[index].unit = e.target.value; // get value from event
                  setSkus(newSkus);
                }}
              >
                <SelectItem key="bdl">bdl</SelectItem>
                <SelectItem key="pcs">pcs</SelectItem>
                <SelectItem key="pack">pack</SelectItem>
                <SelectItem key="case">case</SelectItem>
              </Select>
            </div>
          </div>
        ))}

        <Button type="button" onClick={addSKU} className="mt-2 col-span-full">
          Add SKU
        </Button>

        {/* ===== Remarks & Lines Running ===== */}
        <Textarea label="Remarks" name="remarks" placeholder="Remarks" />

        <Textarea
          label="Lines Running"
          name="linesRunning"
          placeholder="Lines Running"
        />

        <footer className="col-span-full">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </footer>
      </Form>
    </section>
  );
}
