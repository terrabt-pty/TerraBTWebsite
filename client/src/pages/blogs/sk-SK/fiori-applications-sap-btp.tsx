import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";

export default function FioriApplicationsSAPBTP() {
  return (
    <BlogPost
      title={"Budovanie moderných aplikácií Fiori na SAP BTP"}
      category={"Vývoj"}
      readTime={"8 min"}
      image={fioriImage}
      seoDescription={"Naučte sa budovať moderné, responzívne aplikácie Fiori pomocou nástrojov SAP BTP."}
      path="/blog/fiori-applications-sap-btp"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {"SAP Fiori predstavuje budúcnosť enterprise aplikácií. So SAP BTP je vývoj týchto aplikácií jednoduchší a efektívnejší."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{"Sila SAP BTP pre vývoj Fiori"}</h2>
          <p className="leading-relaxed">
            {"SAP BTP obsahuje kompletný balík nástrojov od vývojového prostredia po infraštruktúru nasadenia."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Kľúčové vlastnosti a best practices"}</h2>
          <p className="leading-relaxed">
            {"Aplikácie využívajú Fiori Elements na zabezpečenie konzistencie a zníženie času vývoja."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Integrácia so službami platformy"}</h2>
          <p className="leading-relaxed">
            {"Výhodou je hladké prepojenie s Identity Services alebo SAP HANA Cloud priamo v aplikácii."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Responzívny dizajn"}</h2>
          <p className="leading-relaxed">
            {"Fiori aplikácie na BTP sa automaticky prispôsobujú tabletu, mobilu aj desktopu bez potreby extra vývoja."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Optimalizácia výkonu"}</h2>
          <p className="leading-relaxed">
            {"Platforma ponúka techniky ako lazy loading a cachovanie, ktoré zabezpečujú rýchlu odozvu pri veľkých dátach."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Záver"}</h2>
          <p className="leading-relaxed">
            {"Vývoj Fiori na SAP BTP spája silu podnikovej infraštruktúry s modernými prvkami, čím zvyšuje produktivitu."}
          </p>
        </div>
      }
    />
  );
}
