import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";

import { FormEvent, useState } from "react";

export default function BihonProduction() {
  const [action, setAction] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    alert("On Submit");
  }

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
        onReset={() => setAction("reset")}
        onSubmit={onSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-full">
          <h2 className="font-semibold text-sm">BH Production</h2>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Cornstarch Used"
            name="cornstarch"
            placeholder="in kg"
            type="text"
            size="sm"
          />
          <p className="text-xs mt-2">Current: {0} kgs</p>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Reworks Used"
            name="reworks"
            placeholder="in kg"
            type="text"
            size="sm"
          />
          <p className="text-xs mt-2">Current: {0} kgs</p>
        </div>

        <div>
          <p className="text-sm">
            <strong className="font-semibold">Total Input to be added:</strong>{" "}
            {0} kgs
          </p>
        </div>

        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Troubles</h2>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Machine Trouble"
            name="machine-trouble"
            placeholder="0"
            type="text"
            size="sm"
          />

          <p className="text-xs mt-2">Current: {0}</p>
        </div>

        <div>
          <Textarea
            className="max-w-full"
            label="Additional Information"
            placeholder="Enter your description"
          />
        </div>

        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Total Hours</h2>
        </div>

        <div>
          <p>Inverting Plate</p>

          <div className="flex gap-2">
            <Input
              errorMessage="Please enter a valid value"
              label="Hour/s"
              name="ip-hrs"
              placeholder="0"
              type="text"
              size="sm"
            />

            <Input
              errorMessage="Please enter a valid value"
              label="Minute/s"
              name="ip-mins"
              placeholder="0"
              type="text"
              size="sm"
            />
          </div>

          <p className="text-xs mt-2">Current: {0}</p>
        </div>

        <div>
          <p>Changing Plate</p>

          <div className="flex gap-2">
            <Input
              errorMessage="Please enter a valid value"
              label="Hour/s"
              name="ip-hrs"
              placeholder="0"
              type="text"
              size="sm"
            />

            <Input
              errorMessage="Please enter a valid value"
              label="Minute/s"
              name="ip-mins"
              placeholder="0"
              type="text"
              size="sm"
            />
          </div>

          <p className="text-xs mt-2">Current: {0}</p>
        </div>

        <div>
          <p>Downtime</p>

          <div className="flex gap-2">
            <Input
              errorMessage="Please enter a valid value"
              label="Hour/s"
              name="ip-hrs"
              placeholder="0"
              type="text"
              size="sm"
            />

            <Input
              errorMessage="Please enter a valid value"
              label="Minute/s"
              name="ip-mins"
              placeholder="0"
              type="text"
              size="sm"
            />
          </div>

          <p className="text-xs mt-2">Current: {0}</p>
        </div>

        <div className="col-span-full">
          <h2 className="font-semibold text-sm">BH Packing</h2>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Local Output"
            name="bh-local-output"
            placeholder="in kg"
            type="text"
            size="sm"
          />
          <p className="text-xs mt-2">Current: {0} kgs</p>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Export Output"
            name="bh-local-output"
            placeholder="in kg"
            type="text"
            size="sm"
          />
          <p className="text-xs mt-2">Current: {0} kgs</p>
        </div>

        <div className="col-span-full">
          <h2 className="font-semibold text-sm">Packing Rejections</h2>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Trimmings"
            name="trimmings"
            placeholder="in kg"
            type="text"
            size="sm"
          />
          <p className="text-xs mt-2">Current: {0} kgs</p>
        </div>

        <div>
          <Input
            errorMessage="Please enter a valid value"
            label="Rejects"
            name="rejects"
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
