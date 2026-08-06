import BlogPost from "@/pages/BlogPost";
import fioriImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";

export default function UserCenteredInnovationDesignThinking() {
  return (
    <BlogPost
      title={"User-Centered Innovation with Design Thinking"}
      category={"Design"}
      readTime={"6 min"}
      image={fioriImage}
      seoDescription={"How to apply Design Thinking principles to ensure your SAP BTP solutions solve real user problems and deliver maximum user value."}
      path="/blog/user-centered-innovation-with-design-thinking"
      content={
        <div className="space-y-6 text-foreground">
          <p className="text-lg leading-relaxed">
            {"Building good software is not only about the technology stack. It is about solving a real problem for a real person. Design Thinking gives us a structured way to keep the user at the center of the development lifecycle. It helps make sure the final product actually meets their needs, not just the requirements written in a document."}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">{"The Five Stages of Design Thinking"}</h2>
          <p className="leading-relaxed">
            {"The process has five stages. Empathize with users. Define their needs. Ideate on possible solutions. Prototype quickly. Test with real users. It is an iterative loop, not a straight line. Each pass keeps the project anchored to what the user actually deals with day to day."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Empathy: Understanding the Why"}</h2>
          <p className="leading-relaxed">
            {"Before writing a single line of code we spend time with the actual users. We watch their workflows and note where they get stuck or frustrated. This is where the hidden requirements show up. A standard requirements gathering session usually misses these. This usually gets found in a security review, not before, and the same is true for usability gaps if nobody watches the user work."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Ideation and Divergent Thinking"}</h2>
          <p className="leading-relaxed">
            {"During ideation we ask the team to put forward as many ideas as possible without judging them early. No idea is dismissed at this stage. Once we have a wide set of options we narrow it down to the concepts worth prototyping."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Rapid Prototyping on SAP BTP"}</h2>
          <p className="leading-relaxed">
            {"SAP BTP tools such as SAP Build Apps and Fiori Elements let us put together working prototypes quickly. A prototype gives the user something to click through and react to. Feedback at this stage costs a lot less than feedback collected after the build is mostly done."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Testing and Iteration"}</h2>
          <p className="leading-relaxed">
            {"Testing with real users tends to surface things the team did not expect. We take those findings back into the design and refine it again. The goal is a solution that matches how the user actually thinks about the task, and one that fits their business process instead of fighting it."}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">{"Conclusion"}</h2>
          <p className="leading-relaxed">
            {"Design Thinking connects the technical build to actual business value. Applying it on SAP BTP projects keeps the team honest about who the solution is for. The result is software people are willing to use and one that pays for itself."}
          </p>
        </div>
      }
    />
  );
}
