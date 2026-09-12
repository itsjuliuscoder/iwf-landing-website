import { connectDb } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";

export async function getRegistrationCount(): Promise<number> {
  try {
    await connectDb();
    return await Registration.countDocuments();
  } catch {
    return 0;
  }
}
