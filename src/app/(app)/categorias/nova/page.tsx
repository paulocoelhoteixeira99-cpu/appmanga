import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CreateCategoryForm } from "./create-category-form";

export default async function CreateCategoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return <CreateCategoryForm />;
}
