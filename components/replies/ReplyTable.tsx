type Reply = {
  leadId: number;
  name: string;
  company: string;
  email: string;
  replyStatus: string;
  replyLabel: string;
  lastActivity: string;
  activityDate: string;
  smtp: string;
};

type Props = {
  replies: Reply[];
};

export default function ReplyTable({ replies }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900">
      <table className="min-w-[760px] w-full">
        <thead className="border-b border-zinc-800 bg-zinc-950">
          <tr className="text-left text-sm text-zinc-400">
            <th className="px-6 py-4">Lead</th>
            <th className="px-6 py-4">Company</th>
            <th className="px-6 py-4">Reply Status</th>
            <th className="px-6 py-4">Reply Label</th>
            <th className="px-6 py-4">SMTP</th>
            <th className="px-6 py-4">Last Activity</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {replies.map((reply) => (
            <tr
              key={reply.leadId}
              className="border-b border-zinc-800 hover:bg-zinc-800/40"
            >
              <td className="px-6 py-4 font-medium text-white">
                {reply.name}
              </td>

              <td className="px-6 py-4 text-zinc-300">
                {reply.company}
              </td>

              <td className="px-6 py-4 text-zinc-300">
                {reply.replyStatus || "-"}
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                  {reply.replyLabel || "-"}
                </span>
              </td>

              <td className="px-6 py-4 text-zinc-300">
                {reply.smtp}
              </td>

              <td className="px-6 py-4 text-zinc-400">
                {reply.lastActivity}
              </td>

              <td className="px-6 py-4 text-zinc-400">
                {reply.activityDate || "-"}
              </td>

              <td className="px-6 py-4 text-right">
                <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-500">
                  View
                </button>
              </td>
            </tr>
          ))}

          {replies.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="py-10 text-center text-zinc-500"
              >
                No replies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}