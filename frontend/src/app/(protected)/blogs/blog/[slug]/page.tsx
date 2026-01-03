import { Blog } from "@/components/Blog";

export default async function page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <Blog post_id={slug} />
    </div>
  );
}
