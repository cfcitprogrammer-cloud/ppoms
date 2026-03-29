import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/date-picker";
import { getLocalTimeZone, today } from "@internationalized/date";
import { addToast } from "@heroui/toast";
import { FormEvent, useState } from "react";
import axios from "axios";
import { GAS_DEPLOYMENT_LINK } from "../../../link";

/* =========================
   Type Definitions
========================= */
type ShiftType = "Day" | "Night" | "";
type MarketType = "Local" | "Export" | "US" | "";

type MultiWeigherEntry = {
  sku: string;
  market: MarketType;
  quantity: number;
  unit: string;
};

type PackingEntry = {
  item: string;
  quantity: number;
  unit: string;
};

const UNIT_OPTIONS = ["pcs", "bdl", "kg", "cases", "bags"];

/* =========================
   Component
========================= */
export default function SFProductionReport() {
  /* =========================
     State
  ========================= */
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [shift, setShift] = useState<ShiftType>("");
  const [totalBatches, setTotalBatches] = useState<number>(0);

  const [multiWeigherOutput, setMultiWeigherOutput] = useState<
    MultiWeigherEntry[]
  >([{ sku: "SC 100g", market: "Local", quantity: 0, unit: "pcs" }]);

  const [packingOutput, setPackingOutput] = useState<PackingEntry[]>([
    { item: "CHZ 100g x 40", quantity: 0, unit: "bdl" },
  ]);

  const [machineTroubles, setMachineTroubles] = useState("");
  const [running, setRunning] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     Multi Weigher Handlers
  ========================= */
  const updateMW = (
    index: number,
    field: keyof MultiWeigherEntry,
    value: string,
  ) => {
    setMultiWeigherOutput((prev) =>
      prev.map((entry, i) =>
        i === index
          ? {
              ...entry,
              [field]: field === "quantity" ? Number(value) || 0 : value,
            }
          : entry,
      ),
    );
  };

  const addMW = () =>
    setMultiWeigherOutput((prev) => [
      ...prev,
      { sku: "", market: "", quantity: 0, unit: "pcs" },
    ]);

  const removeMW = (index: number) =>
    setMultiWeigherOutput((prev) => prev.filter((_, i) => i !== index));

  /* =========================
     Packing Handlers
  ========================= */
  const updatePacking = (
    index: number,
    field: keyof PackingEntry,
    value: string,
  ) => {
    setPackingOutput((prev) =>
      prev.map((entry, i) =>
        i === index
          ? {
              ...entry,
              [field]: field === "quantity" ? Number(value) || 0 : value,
            }
          : entry,
      ),
    );
  };

  const addPacking = () =>
    setPackingOutput((prev) => [
      ...prev,
      { item: "", quantity: 0, unit: "bdl" },
    ]);

  const removePacking = (index: number) =>
    setPackingOutput((prev) => prev.filter((_, i) => i !== index));

  /* =========================
     Submit
  ========================= */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        GAS_DEPLOYMENT_LINK,
        JSON.stringify({
          action: "set-sf1-prod",
          date: date.toString(),
          shift,
          totalBatches,
          multiWeigherOutput,
          packingOutput,
          machineTrouble: machineTroubles,
          runningNotes: running,
        }),
      );

      addToast({ title: "Report Submitted", color: "success" });
    } catch (error) {
      addToast({ title: "Submission Failed", color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <section className="p-4">
      <header>
        <h2 className="font-semibold">Snackfood Production Report</h2>
        <p className="text-sm text-gray-500">
          Production input, packing output, and machine status.
        </p>
      </header>

      <Divider className="my-4" />

      <Form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Production Date */}
        <DatePicker
          label="Production Date"
          value={date}
          onChange={(v) => v && setDate(v)}
        />

        {/* Shift Select */}
        <Select
          label="Select Shift"
          selectedKeys={shift ? [shift] : []}
          onSelectionChange={(keys) =>
            setShift(Array.from(keys)[0] as ShiftType)
          }
        >
          <SelectItem key="Day">Day Shift</SelectItem>
          <SelectItem key="Night">Night Shift</SelectItem>
        </Select>

        {/* Total Batches */}
        <Input
          label="Total Batches Produced"
          type="number"
          value={totalBatches.toString()}
          onValueChange={(v) => setTotalBatches(Number(v) || 0)}
          className="col-span-full"
        />

        {/* ================= Multi Weigher ================= */}
        <div className="col-span-full rounded-lg space-y-4">
          <h3 className="font-semibold">SF Multi Weigher Output</h3>

          {multiWeigherOutput.map((entry, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
            >
              <Input
                label="SKU"
                value={entry.sku}
                onValueChange={(v) => updateMW(index, "sku", v)}
              />

              <Select
                label="Market"
                selectedKeys={entry.market ? [entry.market] : []}
                onSelectionChange={(keys) =>
                  updateMW(index, "market", Array.from(keys)[0] as string)
                }
                className="min-w-[130px]"
              >
                <SelectItem key="Local">Local</SelectItem>
                <SelectItem key="Export">Export</SelectItem>
                <SelectItem key="US">US</SelectItem>
              </Select>

              <Input
                label="Quantity"
                type="number"
                value={entry.quantity.toString()}
                onValueChange={(v) => updateMW(index, "quantity", v)}
              />

              <Select
                label="Unit"
                selectedKeys={[entry.unit]}
                onSelectionChange={(keys) =>
                  updateMW(index, "unit", Array.from(keys)[0] as string)
                }
              >
                {UNIT_OPTIONS.map((unit) => (
                  <SelectItem key={unit}>{unit}</SelectItem>
                ))}
              </Select>

              <Button
                type="button"
                color="danger"
                variant="flat"
                onClick={() => removeMW(index)}
                className="col-span-full"
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="flat"
            onClick={addMW}
            className="w-full"
          >
            + Add SKU
          </Button>
        </div>

        {/* ================= Packing Output ================= */}
        <div className="col-span-full rounded-lg space-y-4">
          <h3 className="font-semibold">SF Packing Output</h3>

          {packingOutput.map((entry, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            >
              <Input
                label="Item"
                value={entry.item}
                onValueChange={(v) => updatePacking(index, "item", v)}
              />

              <Input
                label="Quantity"
                type="number"
                value={entry.quantity.toString()}
                onValueChange={(v) => updatePacking(index, "quantity", v)}
              />

              <Select
                label="Unit"
                selectedKeys={[entry.unit]}
                onSelectionChange={(keys) =>
                  updatePacking(index, "unit", Array.from(keys)[0] as string)
                }
              >
                {UNIT_OPTIONS.map((unit) => (
                  <SelectItem key={unit}>{unit}</SelectItem>
                ))}
              </Select>

              <Button
                type="button"
                color="danger"
                variant="flat"
                onClick={() => removePacking(index)}
                className="col-span-full"
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="flat"
            onClick={addPacking}
            className="w-full"
          >
            + Add SKU
          </Button>
        </div>

        {/* Machine Troubles */}
        <Textarea
          label="Machine Troubles"
          value={machineTroubles}
          onValueChange={setMachineTroubles}
          className="col-span-full"
        />

        {/* Running */}
        <Textarea
          label="Running"
          value={running}
          onValueChange={setRunning}
          className="col-span-full"
        />

        {/* Submit */}
        <footer className="col-span-full pt-4">
          <Button
            type="submit"
            isLoading={loading}
            color="primary"
            className="w-full"
          >
            Submit Report
          </Button>
        </footer>
      </Form>
    </section>
  );
}
