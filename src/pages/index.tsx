import DefaultLayout from "@/layouts/default";
import { Tabs, Tab } from "@heroui/tabs";
import { Divider } from "@heroui/divider";
import Overview from "@/components/sections/overview";
import BihonProduction from "@/components/sections/bihon-production";
import CantonProduction from "@/components/sections/canton-production";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <h1 className="text-lg font-semibold">
        Production Packing Output Monitoring System
      </h1>

      <Divider className="my-4" />

      <Tabs aria-label="Options" size="sm">
        <Tab key={"overview"} title={"Overview"}>
          <Overview />
        </Tab>

        <Tab key={"bihon-production"} title={"Bihon Production"}>
          <BihonProduction />
        </Tab>

        <Tab key={"canton-production"} title={"Canton Production"}>
          <CantonProduction />
        </Tab>
      </Tabs>
    </DefaultLayout>
  );
}
