import { Divider } from "@heroui/divider";

export default function Overview() {
  return (
    <section>
      <header>
        <h2 className="font-semibold">Overview</h2>
        <p className="text-sm text-gray-500">
          Real-time visibility into production packing performance.
        </p>
      </header>

      <Divider className="my-4" />
    </section>
  );
}
