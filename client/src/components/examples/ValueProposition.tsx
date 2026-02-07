import ValueProposition from "../ValueProposition";
import valueImage from "@assets/generated_images/Team_collaboration_consulting_image_41a26f7b.webp";

export default function ValuePropositionExample() {
  return (
    <div className="p-6">
      <ValueProposition
        image={valueImage}
        badge="Our Focus"
        title="100% SAP BTP Specialization"
        description="Unlike generalist consulting firms, we exclusively focus on SAP Business Technology Platform, ensuring deep expertise and cutting-edge solutions."
        points={[
          "Dedicated team of certified SAP BTP experts",
          "Up-to-date with latest BTP features and best practices",
          "Proven track record across multiple industries",
        ]}
      />
    </div>
  );
}
