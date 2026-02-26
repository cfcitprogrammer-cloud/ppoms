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

export default function SF1() {
  /* ===== State ===== */
  const [values, setValues] = useState<Record<string, number>>({});
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [flavoringOutput, setFlavoringOutput] = useState(""); // empty initial
  const [trouble, setTrouble] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===== Helpers ===== */
  function setNumber(name: string, value: string) {
    setValues((prev) => ({
      ...prev,
      [name]: Number(value || 0),
    }));
  }

  /* ===== Derived Calculations ===== */
  const totalBatches =
    (values.fryer1 || 0) +
    (values.fryer2 || 0) +
    (values.fryer3 || 0) +
    (values.fryer4 || 0) +
    (values.fryer5 || 0);

  const mw1Percent = values.mw1Output
    ? ((values.mw1Rejects || 0) / values.mw1Output) * 100
    : 0;
  const mw2Percent = values.mw2Output
    ? ((values.mw2Rejects || 0) / values.mw2Output) * 100
    : 0;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        GAS_DEPLOYMENT_LINK,
        JSON.stringify({
          action: "set-sf1-prod",
          date: date.toString(),
          ...values,
          totalBatches,
          mw1Percent: mw1Percent.toFixed(2),
          mw2Percent: mw2Percent.toFixed(2),
          flavoringOutput: Number(flavoringOutput) || 0, // convert to number on submit
          troubleNotes: trouble,
        }),
      );

      addToast({ title: "SF1 Data Submitted", color: "success" });
    } catch (error) {
      addToast({ title: "Submission Failed", color: "danger" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-4">
      <header>
        <h2 className="font-semibold">SF 1 Production Report</h2>
        <p className="text-sm text-gray-500">
          Monitor fryer batches and multiweigher efficiency.
        </p>
      </header>

      <Divider className="my-4" />

      <Form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Basic Info */}
        <div className="col-span-full">
          <DatePicker
            label="Production Date"
            value={date}
            onChange={(v) => v && setDate(v)}
            className="max-w-xs"
          />
        </div>

        {/* ===== Fryer Batches ===== */}
        <div className="space-y-3 border p-4 rounded-lg bg-content1">
          <h3 className="font-bold text-primary">Fryer Batches Produced</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Input
                key={num}
                label={`Fryer ${num}`}
                type="number"
                size="sm"
                onValueChange={(v) => setNumber(`fryer${num}`, v)}
              />
            ))}
          </div>
          <div className="pt-2 border-t">
            <p className="font-semibold">
              Total Batches:{" "}
              <span className="text-blue-600">{totalBatches}</span>
            </p>
          </div>
        </div>

        {/* ===== Flavoring Section ===== */}
        <div className="flex flex-col gap-4">
          <Input
            label="Flavoring Output (kg)"
            type="number"
            value={flavoringOutput}
            onValueChange={setFlavoringOutput}
            placeholder="Enter flavoring output..."
          />
          <Textarea
            label="Trouble"
            placeholder="Describe any machine issues..."
            value={trouble}
            onValueChange={setTrouble}
          />
        </div>

        {/* ===== Multiweigher Output ===== */}
        {[1, 2].map((mw) => (
          <div key={mw} className="space-y-3 border p-4 rounded-lg bg-content1">
            <h3 className="font-bold text-secondary">Multiweigher {mw}</h3>
            <Input
              label="Output (pcs)"
              type="number"
              onValueChange={(v) => setNumber(`mw${mw}Output`, v)}
            />
            <Input
              label="Rejects (pcs)"
              type="number"
              onValueChange={(v) => setNumber(`mw${mw}Rejects`, v)}
            />
            <div className="bg-white/50 p-2 rounded">
              <p className="text-sm font-medium">
                Rejects %:{" "}
                <span className="font-mono">
                  {(mw === 1 ? mw1Percent : mw2Percent).toFixed(2)}%
                </span>
              </p>
            </div>
          </div>
        ))}

        <footer className="col-span-full pt-4">
          <Button className="w-full" type="submit" isLoading={loading}>
            Submit SF1
          </Button>
        </footer>
      </Form>
    </section>
  );
}
