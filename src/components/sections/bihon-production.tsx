import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { FormEvent, useState } from "react";
import axios from "axios";
import { GAS_DEPLOYMENT_LINK } from "../../../link";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";

export default function BihonProduction() {
  /* ===== State ===== */
  const [values, setValues] = useState<Record<string, number>>({});
  const [linesRunning, setLinesRunning] = useState("");
  const [trouble, setTrouble] = useState("");
  const [shift, setShift] = useState("Day Shift");
  const [loading, setLoading] = useState(false);

  function setNumber(name: string, value: string) {
    setValues((prev) => ({
      ...prev,
      [name]: Number(value || 0),
    }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(
        GAS_DEPLOYMENT_LINK,
        JSON.stringify({
          action: "set-bihon-prod",
          ...values,
          linesRunning,
          troubleNotes: trouble,
          shift,
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

  /* ===== Derived values ===== */
  const cornstarch = values.cornstarch || 0;
  const reworks = values.reworks || 0;
  const totalInput = cornstarch + reworks;

  const localOutput = values.localOutput || 0;
  const exportOutput = values.exportOutput || 0;
  const totalOutput = localOutput + exportOutput;

  const trimmings = values.trimmings || 0;
  const rejects = values.rejects || 0;
  const sweepings = values.sweepings || 0;
  const totalRejects = trimmings + rejects + sweepings;

  // const invertingMinutes = (values.ipHours || 0) * 60 + (values.ipMinutes || 0);

  // const changingMinutes = (values.cpHours || 0) * 60 + (values.cpMinutes || 0);

  // const downtimeMinutes =
  //   (values.downHours || 0) * 60 + (values.downMinutes || 0);

  return (
    <section>
      <header>
        <h2 className="font-semibold">Bihon Production</h2>
        <p className="text-sm text-gray-500">
          Enter and manage production and packing data for bihon manufacturing.
        </p>
      </header>

      <Divider className="my-4" />

      <Form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* ===== BH Production ===== */}
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">BH Production</h2>
        </div>

        <div>
          <Input
            label="Cornstarch Used"
            type="number"
            step={"any"}
            onValueChange={(v) => setNumber("cornstarch", v)}
          />
        </div>

        <div>
          <Select
            className="w-full"
            label="Select shift"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          >
            <SelectItem key="Day Shift">Day Shift</SelectItem>
            <SelectItem key="Night Shift">Night Shift</SelectItem>
          </Select>
        </div>

        <div>
          <Input
            label="Reworks Used"
            type="number"
            step={"any"}
            onValueChange={(v) => setNumber("reworks", v)}
          />
        </div>

        <div className="col-span-full">
          <p className="text-sm">
            <strong>Total Input:</strong> {totalInput} kgs
          </p>
        </div>

        {/* ===== BH Packing ===== */}
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">BH Packing</h2>
        </div>

        <div>
          <Input
            label="Local Output"
            type="number"
            step={"any"}
            onValueChange={(v) => setNumber("localOutput", v)}
          />
        </div>

        <div>
          <Input
            label="Export Output"
            type="number"
            step={"any"}
            onValueChange={(v) => setNumber("exportOutput", v)}
          />
        </div>

        <div className="col-span-full">
          <p className="text-sm">
            <strong>Total Output:</strong> {totalOutput} kgs
          </p>
        </div>

        {/* ===== Total Hours ===== */}
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Total Hours</h2>
        </div>

        <div>
          <p>Inverting Plate</p>
          <div className="flex gap-2">
            <Input
              label="Hours"
              type="number"
              onValueChange={(v) => setNumber("ipHours", v)}
            />
            <Input
              label="Minutes"
              type="number"
              onValueChange={(v) => setNumber("ipMinutes", v)}
            />
          </div>
        </div>

        <div>
          <p>Changing Plate</p>
          <div className="flex gap-2">
            <Input
              label="Hours"
              type="number"
              onValueChange={(v) => setNumber("cpHours", v)}
            />
            <Input
              label="Minutes"
              type="number"
              onValueChange={(v) => setNumber("cpMinutes", v)}
            />
          </div>
        </div>

        <div>
          <p>Machine Trouble</p>
          <div className="flex gap-2">
            <Input
              label="Hours"
              type="number"
              onValueChange={(v) => setNumber("mtHours", v)}
            />
            <Input
              label="Minutes"
              type="number"
              onValueChange={(v) => setNumber("mtMins", v)}
            />
          </div>
        </div>

        {/* ===== Packing Rejections ===== */}
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Packing Rejections</h2>
        </div>

        <div>
          <Input
            label="Trimmings"
            type="number"
            step={"any"}
            onValueChange={(v) => setNumber("trimmings", v)}
          />
        </div>

        <div>
          <Input
            label="Rejects"
            type="number"
            step={"any"}
            onValueChange={(v) => setNumber("rejects", v)}
          />
        </div>

        <div>
          <Input
            label="Sweepings"
            type="number"
            step={"any"}
            onValueChange={(v) => setNumber("sweepings", v)}
          />
          <p className="text-xs mt-2">Total Rejects: {totalRejects} kgs</p>
        </div>

        {/* ===== Notes ===== */}
        <div className="col-span-full">
          <Textarea
            label="Lines Running"
            placeholder="*3 Lines running (1, 3, & 5)"
            value={linesRunning}
            onValueChange={setLinesRunning}
          />
        </div>

        {/* <div>
          <Input
            label="Machine Trouble (count)"
            type="number"
            className="w-full"
            onValueChange={(v) => setNumber("machineTrouble", v)}
          />
        </div> */}

        <div className="">
          <Textarea
            label="Trouble"
            placeholder="Describe machine or production issues"
            value={trouble}
            onValueChange={setTrouble}
          />
        </div>

        <footer className="col-span-full">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </footer>
      </Form>
    </section>
  );
}
