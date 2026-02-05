import { Tabs, Tab } from "@heroui/tabs";
import { Divider } from "@heroui/divider";
import { useEffect, useState } from "react";
import BihonProduction from "@/components/sections/bihon-production";
import CantonProduction from "@/components/sections/canton-production";

export default function IndexPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const handleChange = () => setIsDesktop(mq.matches);
    handleChange();

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <div>
      <h1 className="text-lg font-semibold">
        Production Packing Output Monitoring System
      </h1>

      <Divider className="my-4" />

      <Tabs
        aria-label="Options"
        size="sm"
        isVertical={isDesktop}
        classNames={{
          tabList: isDesktop ? "w-56" : "",
        }}
      >
        {/* <Tab key="overview" title="Overview">
          <Overview />
        </Tab> */}

        <Tab key="bihon-production" title="Bihon">
          <BihonProduction />
        </Tab>

        <Tab key="canton-production" title="Canton">
          <CantonProduction />
        </Tab>
      </Tabs>
    </div>
  );
}
