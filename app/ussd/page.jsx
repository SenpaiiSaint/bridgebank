import SMSUSSDSimulator from "@/components/SMSUSSDSimulator";

export default function USSDPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">SMS/USSD Fallback Simulation</h1>
      <SMSUSSDSimulator />
    </div>
  );
}
