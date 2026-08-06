import BlogPost from "@/pages/BlogPost";
import teamImage from "@assets/generated_images/Team_collaboration_consulting_image_41a26f7b.webp";

export default function FindingUsersAcrossSAPBTPLandscape() {
  return (
    <BlogPost
      title={"Finding Users Across Your SAP BTP Landscape: The Hidden Audit Problem"}
      category={"Security & Audit"}
      readTime={"6 min"}
      image={teamImage}
      seoDescription={"When a user leaves, can you tell every Sub-Account, CF Org and Space they have access to? For most SAP BTP teams, the honest answer is no. Here's why, and how to fix it."}
      path="/blog/finding-users-across-sap-btp-landscape"
      backTo="/products/btp-xid"
      backToLabel="Back to BTP xID"
      content={
        <div className="space-y-6 text-foreground [&_strong]:text-foreground [&_em]:text-foreground [&_li]:text-foreground [&_p]:text-foreground">
          <p className="text-lg leading-relaxed">
            Someone leaves your company on a Friday afternoon. Monday morning your security team asks a fair question: <em>where exactly did they have access?</em> You open the SAP BTP cockpit. That is where the trouble starts.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">The question nobody can answer in under a minute</h2>
          <p className="leading-relaxed">
            If a user leaves your company tomorrow can you tell, in under a minute, every Sub-Account, Cloud Foundry Org and Space they have access to across your SAP BTP landscape? For most SAP BTP teams the honest answer is no.
          </p>
          <p className="leading-relaxed">
            There is no native way to do it. The cockpit shows you what is <em>in</em> a sub-account. It cannot tell you, given a user, where they exist. So you end up clicking through every sub-account, every Cloud Foundry Org and every Space one by one, hoping you have not missed one. With ten sub-accounts that is tedious. With fifty it is a full afternoon. The result is only as good as your patience that day.
          </p>
          <p className="leading-relaxed">
            That is not a process. That is a security risk wearing a meeting suit.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">Why the cockpit cannot help you here</h2>
          <p className="leading-relaxed">
            SAP BTP is by design a federation of accounts. Global Account contains directories and sub-accounts. Sub-accounts contain Cloud Foundry environments. CF environments contain Orgs. Orgs contain Spaces. Each layer has its own user model, its own role concepts and its own admin screens. There is no top-level "show me everywhere this person exists" view because the platform was never built around that question.
          </p>
          <p className="leading-relaxed">
            That is fine when you are standing up one sub-account on a Tuesday. It is painful when you are off-boarding a contractor who touched seven of them.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">SAP IAS does not fill this gap either</h2>
          <p className="leading-relaxed">
            A common assumption is that SAP Identity Authentication Service (IAS), or its successor Cloud Identity Services, solves this. It does not. IAS is good at what it does: authentication, single sign-on and group-to-Role-Collection mapping at the sub-account level. But IAS does not assign Cloud Foundry Org or Space roles. It cannot tell you whether a user has Org Manager somewhere or whether they are a Space Developer in three Spaces. That visibility is simply not there.
          </p>
          <p className="leading-relaxed">
            So if your audit trail says "this user is in such-and-such IAS group" that is only half the picture. The Cloud Foundry side of their access lives outside IAS. That is the half that lets people deploy code, push services and modify environments.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">The everyday cost</h2>
          <p className="leading-relaxed">
            It is not just leavers. It also shows up in:
          </p>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li><strong>Audits.</strong> "List every user with privileged access in production sub-accounts." Fine. See you next week.</li>
            <li><strong>Role reviews.</strong> Quarterly reviews require knowing where everyone is. With dozens of sub-accounts the spreadsheets multiply.</li>
            <li><strong>Onboarding.</strong> A new starter needs the same access as an existing employee. Where is that employee's access, exactly?</li>
            <li><strong>Investigations.</strong> A change went out at 2am from someone's account. Across which Spaces did they even have permission to do that?</li>
          </ul>
          <p className="leading-relaxed">
            Each of these is a slow error-prone manual lookup today. Each of them is a question your auditors and CISOs will keep asking.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">The way it should work</h2>
          <p className="leading-relaxed">
            You should be able to type a user's email and instantly see every Global Account, Sub-Account, Cloud Foundry Org and Space they exist in across your SAP BTP landscape along with their roles. That is the missing report.
          </p>
          <p className="leading-relaxed">
            That is the report we built BTP xID around. Not as an afterthought feature buried in a menu but as the core thing. Open the app, type an email, see everywhere they are. Off-board them with one click across the whole landscape. Add them to a new Cloud Foundry Org without hand-crafting the JSON payload that SAP Note 3249765 walks you through manually.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">Two minutes that change the conversation</h2>
          <p className="leading-relaxed">
            The fastest way to see the difference is to try it. Download BTP xID, open the app and click Demo below the logon fields. No SAP credentials are needed for the demo. It just gives you a feel for what landscape-wide user search looks like when it actually works.
          </p>
          <p className="leading-relaxed">
            <a href="/products/btp-xid" className="text-primary underline hover:no-underline">Download BTP xID</a>, open the app and click <strong>Demo</strong> below the logon fields. Type a user and watch them appear across every Global Account, Sub-Account, CF Org and Space at once. Then ask yourself how long that report would have taken in the cockpit.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">Closing thought</h2>
          <p className="leading-relaxed">
            SAP BTP is a solid platform. The cockpit is competent at managing one piece at a time. But "one piece at a time" is the wrong unit when your real questions are about the whole landscape. You need a tool that treats the BTP landscape as a single thing, because that is how your auditors, your security team and your customers see it. BTP xID is that tool.
          </p>
        </div>
      }
    />
  );
}
