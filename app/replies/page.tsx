import AppLayout from "../../components/layout/AppLayout";
import ReplyStats from "../../components/replies/ReplyStats";
import ReplyTable from "../../components/replies/ReplyTable";
import { getRepliesData } from "@/lib/replies";
export default async function RepliesPage() {
  const data = await getRepliesData();

  return (
    <AppLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-5xl font-bold">Replies</h1>
          <p className="mt-2 text-zinc-400">
            Monitor all incoming email replies
          </p>
        </div>

        <ReplyStats stats={data.stats} />

        <ReplyTable replies={data.replies} />

      </div>
    </AppLayout>
  );
}