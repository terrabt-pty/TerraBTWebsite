import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";

export default function FioriApplicationsSAPBTP() {
  return (
    <BlogPost
      title={"Modernių Fiori programų kūrimas su SAP BTP"}
      category={"Kūrimas"}
      readTime={"8 min"}
      image={fioriImage}
      seoDescription={"Sužinokite, kaip kurti modernias ir adaptyvias Fiori programas naudojant SAP BTP įrankius."}
      path="/blog/fiori-applications-sap-btp"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {"SAP Fiori yra verslo programinės įrangos ateitis, siūlanti vieningą patirtį visuose įrenginiuose. Per SAP Business Technology Platform (BTP) kūrimo procesas tapo produktyvesnis ir labiau optimizuotas."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{"Kodėl SAP BTP Fiori kūrimui"}</h2>
          <p className="leading-relaxed">
            {"SAP BTP siūlo specialiai Fiori sukurtų įrankių ir paslaugų rinkinį. Platforma apima viską — nuo programavimo aplinkų iki talpinimo. Tai leidžia komandoms susikoncentruoti į gerą UI/UX, o ne į serverių priežiūrą."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Pagrindiniai principai ir praktika"}</h2>
          <p className="leading-relaxed">
            {"Modernios Fiori programos naudoja SAP Fiori Elements, kurie suteikia paruoštus modulius ir šablonus. Tai užtikrina konsistenciją ir trumpina darbo laiką. Kartu su SAPUI5 kompetencija, kūrėjai sukuria sprendimus, tiksliai atitinkančius verslo poreikius."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Integracija su BTP paslaugomis"}</h2>
          <p className="leading-relaxed">
            {"Vienas pagrindinių privalumų yra lengvas ryšys su kitomis debesijos paslaugomis. Nuo saugumo per SAP Cloud Identity iki duomenų bazių SAP HANA Cloud — kūrėjai turi prieigą prie visko vienoje vietoje."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Adaptyvus dizainas visiems ekranams"}</h2>
          <p className="leading-relaxed">
            {"Programos SAP BTP aplinkoje automatiškai prisitaiko prie monitoriaus, planšetės ar telefono. Šis funkcionalumas yra sistemos branduolyje, todėl drastiškai mažėja mobiliųjų versijų kūrimo sąnaudos."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Greičio optimizavimas"}</h2>
          <p className="leading-relaxed">
            {"SAP BTP suteikia įvairius metodus darbui pagreitinti, įskaitant Lazy Loading ir kešavimą. Tai užtikrina, kad programos startuotų greitai ir veiktų sklandžiai net su dideliais duomenų kiekiais."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Išvada"}</h2>
          <p className="leading-relaxed">
            {"Fiori kūrimas SAP BTP aplinkoje sujungia įmonės infrastruktūros galią ir modernias technologijas. Naudodamos šias galimybes, įmonės sukuria įrankius, kurie realiai didina darbuotojų produktyvumą."}
          </p>
        </div>
      }
    />
  );
}
