import ExpertiseCard from "../ExpertiseCard";
import { Layers } from "lucide-react";

export default function ExpertiseCardExample() {
  return (
    <div className="p-6">
      <ExpertiseCard
        icon={Layers}
        title="BTP Architecture & Design"
        description="Strategic architecture planning and design for scalable SAP BTP solutions tailored to your business needs."
      />
    </div>
  );
}
