import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";

export default function FioriApplicationsSAPBTP() {
  return (
    <BlogPost
      title={"Kaasaegset Fiori rakenduste ehitamine SAP BTP"}
      category={"Arendus"}
      readTime={"8 min"}
      image={fioriImage}
      seoDescription={"Õpi, kuidas ehitada kaasaegset, vastutavat Fiori rakendusi kasutades SAP BTP võimsaid arenduse tööriiste ja raamistikud."}
      path="/blog/fiori-applications-sap-btp"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {"SAP Fiori kujutab edasi ettevõtte rakenduste tulevikku, pakkudes ühtselt kasutaja kogemuse kõigi seadmete ja juurutamise valikute üle. SAP Business Technology Platform (BTP) abil on kaasaegset Fiori rakenduste ehitamine muutnud rationaliseeritud ja võimsama kui kunagi varem."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{"SAP BTP võimus Fiori arendusele"}</h2>
          <p className="leading-relaxed">
            {"SAP BTP pakub terviklikku tööriistade komplekti ja teenuseid, mis on spetsiaalselt kujundatud Fiori rakenduste arendusele. Platvorm pakub kõike arenduse keskkonnast juurutamise infrastruktuurini, võimaldades meeskondadel fokusseeruda erakordse kasutaja kogemuste loomisele asemel infrastruktuuri haldamise."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{undefined}</h2>
          <p className="leading-relaxed">
            {undefined}
          </p>
        </div>
      }
    />
  );
}
