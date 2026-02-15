import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";

export default function UserCenteredInnovationDesignThinking() {
  return (
    <BlogPost
      title={"Gebruiker-Entrerde Innovasie met Design Thinking"}
      category={"Ontwerp"}
      readTime={"6 min"}
      image={fioriImage}
      seoDescription={"Hoe om Design Thinking beginsels toe te pas om te verseker dat jou SAP BTP oplossings werklike gebruiker probleme oplos en maksimum gebruiker waarde lewer."}
      path="/blog/user-centered-innovation-with-design-thinking"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {"Die bou van groot sagteware is nie net oor tegnologie nie; dit gaan oor die oplossing van menslike probleme. Design Thinking verskaf 'n gestruktureerde benadering tot innovasie wat die gebruiker in die middel van die ontwikkeling siklus plaas, en verseker dat die finale produk werklik aan hul behoeftes voldoen."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{"Die Vyf Fases van Design Thinking"}</h2>
          <p className="leading-relaxed">
            {"Die proses behels vyf sleutel fases: Verdiep je in gebruikers, Definieer hul behoeftes, Genereer kreatiewe oplossings, Protipeer vinnig, en Toets met regte gebruikers. Hierdie iteratiewe lus verseker dat die projek gefokus bly op die gebruiker se werklike uitdagings."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Empatie: Die Begrip van 'Hoekom'"}</h2>
          <p className="leading-relaxed">
            {"Voordat ons 'n enkele reël kode skryf, spandeer ons tyd met gebruikers om hul werkvloei, frustrasies, en motiverings te verstaan. Hierdie diep empatie is die sleutel tot die identifisering van die 'verborge' vereiste wat tradisionele vereiste insameling dikwels mis."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Ideasie en Divergente Denke"}</h2>
          <p className="leading-relaxed">
            {"Tydens ideasie, moedig ons spanne aan om buite die kis te dink en baie moontlike oplossings sonder oordeel te verken. Hierdie wye reeks idees word dan vernou na die mees belowende konsepte vir prototipering."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Vinnige Prototipering op SAP BTP"}</h2>
          <p className="leading-relaxed">
            {"SAP BTP gereedskap soos SAP Build Apps en Fiori Elements laat ons toe om funksionele prototipes ongelooflik vinnig te bou. Hierdie prototipes laat gebruikers toe om die oplossing te 'voel' en terugvoer te gee voordat beduidende ontwikkeling poging belê word."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Toetsing en Iterasie"}</h2>
          <p className="leading-relaxed">
            {"Toetsing met regte gebruikers openbaar dikwels onverwagte insigte. Ons gebruik hierdie insigte om op ons ontwerpe te itereer, en verfyne die oplossing totdat dit perfek pas by die gebruiker se geestemodel en hul besigheidsproses optimaliseer."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Gevolgtrekking"}</h2>
          <p className="leading-relaxed">
            {"Design Thinking is die brug tussen tegnologie en besigheidswaarde. Deur hierdie beginsels op SAP BTP projekte toe te pas, verseker ons dat ons oplossings bou wat gebruikers liefhet en 'n duidelike opbrengs op belegging lewer."}
          </p>
        </div>
      }
    />
  );
}
