import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { FormEvent, useState } from "react";
import axios from "axios";
import { GAS_DEPLOYMENT_LINK } from "../../../link";
import { addToast } from "@heroui/toast";
import { DatePicker } from "@heroui/date-picker";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function SF2() {
  /* ===== State ===== */
  const [values, setValues] = useState<Record<string, number>>({});
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");

  /* ===== Helper ===== */
  function setNumber(name: string, value: string) {
    setValues((prev) => ({
      ...prev,
      [name]: Number(value || 0),
    }));
  }

  /* ===== Calculations ===== */
  const totalExtrusion =
    (values.ex1 || 0) + (values.ex2 || 0) + (values.ex3 || 0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        GAS_DEPLOYMENT_LINK,
        JSON.stringify({
          action: "set-sf2-prod",
          date: date.toString(),
          ...values,
          totalExtrusion,
          remarks,
        }),
      );

      addToast({ title: "SF2 Data Submitted", color: "success" });
    } catch (error) {
      addToast({ title: "Submission Failed", color: "danger" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-5xl mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-semibold">SF 2 Report</h2>
          <p className="text-sm text-default-500">
            Mixing, Extrusion, and Packaging Workflow
          </p>
        </div>
        <DatePicker
          className="max-w-[200px]"
          label="Production Date"
          value={date}
          onChange={(v) => v && setDate(v)}
        />
      </header>

      <Form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* --- Inputs --- */}
        <div className="space-y-4 p-4 border rounded-xl bg-content1 shadow-sm">
          <Input
            label="Mixing Batches"
            type="number"
            variant="flat"
            onValueChange={(v) => setNumber("mixingBatches", v)}
          />
          <Input
            label="Extrusion 1 Output (kgs)"
            type="number"
            onValueChange={(v) => setNumber("ex1", v)}
          />
          <Input
            label="Extrusion 2 Output (kgs)"
            type="number"
            onValueChange={(v) => setNumber("ex2", v)}
          />
          <Input
            label="Extrusion 3 Output (kgs)"
            type="number"
            onValueChange={(v) => setNumber("ex3", v)}
          />
          <p className="text-xs font-bold text-right pt-2 text-default-600">
            Total Extrusion: {totalExtrusion.toLocaleString()} kgs
          </p>
        </div>

        <div className="space-y-4 p-4 border rounded-xl bg-content1 shadow-sm">
          <Input
            label="Oven Output (kgs)"
            type="number"
            onValueChange={(v) => setNumber("ovenOutput", v)}
          />
          <Input
            label="Frying Output (kgs)"
            type="number"
            onValueChange={(v) => setNumber("fryingOutput", v)}
          />
          <Input
            label="Flavoring Output (kgs)"
            type="number"
            onValueChange={(v) => setNumber("flavoringOutput", v)}
          />
        </div>

        <div className="space-y-4 p-4 border rounded-xl bg-content1 shadow-sm">
          <Input
            label="Multi Weigher 1 Output (pcs)"
            type="number"
            onValueChange={(v) => setNumber("mw1Pcs", v)}
          />
          <Input
            label="Multi Weigher 2 Output (pcs)"
            type="number"
            onValueChange={(v) => setNumber("mw2Pcs", v)}
          />
          <Divider />
          <Input
            label="Caramel / Puff Glazed"
            placeholder="Kgs/Pcs"
            onValueChange={(v) => setNumber("caramelGlazed", v)}
          />
        </div>

        {/* Inventory Status */}
        <div className="space-y-4 p-4 border rounded-xl bg-content1 shadow-sm">
          <h4 className="text-xs font-bold uppercase text-default-400">
            Inventory Status
          </h4>
          <Input
            label="Unflavored"
            size="sm"
            onValueChange={(v) => setNumber("unflavored", v)}
          />
          <Input
            label="Flavored"
            size="sm"
            onValueChange={(v) => setNumber("flavored", v)}
          />
        </div>

        <div className="space-y-4 p-4 border rounded-xl bg-content1 shadow-sm">
          <Textarea
            label="Remarks / Trouble"
            placeholder="Notes on quality or downtime..."
            value={remarks}
            onValueChange={setRemarks}
          />
        </div>

        <footer className="col-span-full pt-4">
          <Button
            type="submit"
            className="w-full"
            variant="shadow"
            isLoading={loading}
          >
            Submit SF2
          </Button>
        </footer>
      </Form>
    </section>
  );
}
