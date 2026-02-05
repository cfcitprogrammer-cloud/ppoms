import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import axios from "axios";
import { FormEvent, useState } from "react";
import { GAS_DEPLOYMENT_LINK } from "../../../link";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

export default function CantonProduction() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    // Create a FormData object from the form
    const formData = new FormData(e.currentTarget);

    // Convert FormData to a plain object
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    try {
      await axios.post(
        GAS_DEPLOYMENT_LINK,
        JSON.stringify({
          action: "set-canton-prod",
          ...data,
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

        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Canton Packing</h2>
        </div>

        <div className="col-span-full">
          <h3 className="font-semibold text-sm">Canton tartrazine 454g x 12</h3>
        </div>

        <div>
          <Input
            label="KGS"
            step={"any"}
            name="itm1KGS"
            type="number"
            size="sm"
          />
        </div>

        <div>
          <Input
            label="QTY"
            step={"any"}
            name="itm1QTY"
            type="number"
            size="sm"
          />
        </div>

        <div className="col-span-full">
          <h3 className="font-semibold text-sm">
            Canton tartrazine 227g - BDLS
          </h3>
        </div>

        <div>
          <Input
            label="KGS"
            step={"any"}
            name="itm2KGS"
            type="number"
            size="sm"
          />
        </div>

        <div>
          <Input
            label="QTY"
            step={"any"}
            name="itm2QTY"
            type="number"
            size="sm"
          />
        </div>

        <div className="col-span-full">
          <h3 className="font-semibold text-sm">
            Canton tartrazine 227g - PCS
          </h3>
        </div>

        <div>
          <Input
            label="KGS"
            step={"any"}
            name="itm3KGS"
            type="number"
            size="sm"
          />
        </div>

        <div>
          <Input
            label="QTY"
            step={"any"}
            name="itm3QTY"
            type="number"
            size="sm"
          />
        </div>

        <div className="col-span-full">
          <h3 className="font-semibold text-sm">Chow mee 400g x 5</h3>
        </div>

        <div>
          <Input
            label="KGS"
            step={"any"}
            name="itm4KGS"
            type="number"
            size="sm"
          />
        </div>

        <div>
          <Input
            label="QTY"
            step={"any"}
            name="itm4QTY"
            type="number"
            size="sm"
          />
        </div>

        <div className="col-span-full">
          <h3 className="font-semibold text-sm">Rapsa canton x 1 kilo</h3>
        </div>

        <div>
          <Input
            label="KGS"
            step={"any"}
            name="itm5KGS"
            type="number"
            size="sm"
          />
        </div>

        <div>
          <Input
            label="QTY"
            step={"any"}
            name="itm5QTY"
            type="number"
            size="sm"
          />
        </div>

        <div className="col-span-full">
          <h3 className="font-semibold text-sm">
            Pancit canton loose 454g x 5-packs
          </h3>
        </div>

        <div>
          <Input
            label="KGS"
            step={"any"}
            name="itm6KGS"
            type="number"
            size="sm"
          />
        </div>

        <div>
          <Input
            label="QTY"
            step={"any"}
            name="itm6QTY"
            type="number"
            size="sm"
          />
        </div>

        <Textarea label="Remarks" name="remarks" placeholder="Remarks" />

        <Textarea
          label="Lines Running"
          name="linesRunning"
          placeholder="Lines Running"
        />

        <footer>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </footer>
      </Form>
    </section>
  );
}
