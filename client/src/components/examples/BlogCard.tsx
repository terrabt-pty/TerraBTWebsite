import BlogCard from "../BlogCard";
import blogImage from "@assets/generated_images/Fiori_development_blog_image_eb27dacf.webp";

export default function BlogCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <BlogCard
        image={blogImage}
        category="Development"
        title="Building Modern Fiori Applications with SAP BTP"
        excerpt="Learn how to create responsive, user-friendly Fiori applications that leverage the full power of SAP Business Technology Platform."
        readTime="5 min"
      />
    </div>
  );
}
