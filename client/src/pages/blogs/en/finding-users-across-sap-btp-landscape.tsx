import BlogPost from "@/pages/BlogPost";
import teamImage from "@assets/generated_images/Team_collaboration_consulting_image_41a26f7b.webp";

export default function FindingUsersAcrossSAPBTPLandscape() {
  return (
    <BlogPost
      title={"Finding Users Across Your SAP BTP Landscape — The Hidden Audit Problem"}
      category={"Security & Audit"}
      readTime={"6 min"}
      image={teamImage}
      seoDescription={"When a user leaves, can you tell every Sub-Account, CF Org and Space they have access to? For most SAP BTP teams, the honest answer is no. Here's why — and how to fix it."}
      path="/blog/finding-users-across-sap-btp-landscape"
      content={
        <div className="space-y-6 text-foreground [&_strong]:text-foreground [&_em]:text-foreground [&_li]:text-foreground [&_p]:text-foreground">
          <p className="text-lg leading-relaxed">
            Picture this: someone leaves your company on a Friday afternoon. Monday morning, your security team asks a fair question — <em>where exactly did they have access?</em> You open the SAP BTP cockpit, and that's when the awkwardness begins.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">The question nobody can answer in under a minute</h2>
          <p className="leading-relaxed">
            If a user leaves your company tomorrow, can you tell — in under a minute — every Sub-Account, Cloud Foundry Org and Space they have access to across your SAP BTP landscape? For most SAP BTP teams, the honest answer is no.
          </p>
          <p className="leading-relaxed">
            There's no native way to do it. The cockpit shows you what's <em>in</em> a sub-account, but it can't tell you, given a user, where they exist. So you end up clicking through every sub-account, every Cloud Foundry Org, every Space, one by one — hoping you haven't missed one. With ten sub-accounts that's tedious. With fifty, it's a full afternoon. And the result is only ever as good as your patience that day.
          </p>
          <p className="leading-relaxed">
            That's not a process. That's a security risk in a meeting suit.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">Why the cockpit can't help you here</h2>
          <p className="leading-relaxed">
            SAP BTP is, by design, a federation of accounts. Global Account contains directories and sub-accounts. Sub-accounts contain Cloud Foundry environments. CF environments contain Orgs. Orgs contain Spaces. Each layer has its own user model, its own role concepts, its own admin screens. There is no top-level "show me everywhere this person exists" view because the platform was never built around that question.
          </p>
          <p className="leading-relaxed">
            That's fine when you're standing one sub-account up on a Tuesday. It's painful when you're trying to off-board a contractor who touched seven of them.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">SAP IAS doesn't fill this gap either</h2>
          <p className="leading-relaxed">
            A common assumption is that SAP Identity Authentication Service (IAS) — or its successor Cloud Identity Services — solves this. It doesn't. IAS is excellent at what it does: authentication, single sign-on, group-to-Role-Collection mapping at the sub-account level. But IAS doesn't assign Cloud Foundry Org or Space roles. It can't tell you whether a user has Org Manager somewhere, or whether they're a Space Developer in three Spaces. That visibility simply isn't there.
          </p>
          <p className="leading-relaxed">
            So if your audit trail says "this user is in such-and-such IAS group," that's only half the picture. The Cloud Foundry side of their access lives outside of IAS — and that's the half that lets people deploy code, push services, and modify environments.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">The everyday cost</h2>
          <p className="leading-relaxed">
            It's not just leavers. It's also:
          </p>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li><strong>Audits.</strong> "List every user with privileged access in production sub-accounts" — fine, see you next week.</li>
            <li><strong>Role reviews.</strong> Quarterly reviews require knowing where everyone is. With dozens of sub-accounts, the spreadsheets multiply.</li>
            <li><strong>Onboarding.</strong> A new starter needs the same access as someone existing — but where is that someone, exactly?</li>
            <li><strong>Investigations.</strong> A change went out at 2am from someone's account. Across which Spaces did they have permission to do that?</li>
          </ul>
          <p className="leading-relaxed">
            Each of these is a slow, error-prone, manual lookup today. Each of them is a question your auditors and CISOs are going to keep asking.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">The way it should work</h2>
          <p className="leading-relaxed">
            You should be able to type a user's email — and instantly see every Global Account, Sub-Account, Cloud Foundry Org and Space they exist in across your SAP BTP landscape, with their roles. That's the missing report.
          </p>
          <p className="leading-relaxed">
            That's the report we built BTP xID around. Not as an afterthought feature buried in a menu — as the core thing. Open the app, type an email, see everywhere they are. Off-board them with one click across the whole landscape. Add them to a new Cloud Foundry Org without hand-crafting the JSON payload that SAP Note 3249765 walks you through manually.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">Two minutes that change the conversation</h2>
          <p className="leading-relaxed">
            The fastest way to feel the difference is to try it. Download BTP xID, open the app, and click Demo below the logon fields — no SAP credentials needed for the demo, just a feel for what landscape-wide user search looks like when it actually works.
          </p>
          <p className="leading-relaxed">
            <a href="/products/btp-xid" className="text-primary underline hover:no-underline">Download BTP xID</a>, open the app, and click <strong>Demo</strong> below the logon fields. Type a user, watch them appear across every Global Account, Sub-Account, CF Org and Space at once. Then ask yourself how long that report would have taken in the cockpit.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">Closing thought</h2>
          <p className="leading-relaxed">
            SAP BTP is a brilliant platform. The cockpit is competent at managing one piece at a time. But "one piece at a time" is the wrong unit when your real questions are about the whole landscape. You need a tool that treats the BTP landscape as a single thing — because that's how your auditors, your security team and your customers see it. BTP xID is that tool.
          </p>
        </div>
      }
    />
  );
}
