type Activity = {
  name: string;
  company: string;
  activity: string;
  time: string;
};

type Props = {
  activities: Activity[];
};

export default function ActivityTable({ activities }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Recent Activity
      </h2>

      <table className="min-w-[640px] w-full">
        <thead className="border-b border-zinc-800 text-left text-sm text-zinc-500">
          <tr>
            <th className="pb-3">Lead</th>
            <th className="pb-3">Company</th>
            <th className="pb-3">Activity</th>
            <th className="pb-3 text-right">Time</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((item, index) => (
            <tr
              key={index}
              className="border-b border-zinc-800 last:border-0"
            >
              <td className="py-4 font-medium text-white">
                {item.name || "-"}
              </td>

              <td className="py-4 text-zinc-400">
                {item.company || "-"}
              </td>

              <td className="py-4 text-zinc-300">
                {item.activity || "-"}
              </td>

              <td className="py-4 text-right text-zinc-500">
                {item.time || "-"}
              </td>
            </tr>
          ))}

          {activities.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="py-8 text-center text-zinc-500"
              >
                No recent activity.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}