type Lead = {
  "First Name"?: string;
  "Last Name"?: string;
  "Business Name"?: string;
  Email?: string;
  Status?: string;
  "SMTP Used"?: string;
  "Reply Status"?: string;
  "Last Activity"?: string;
};

export default function AnalyticsTable({
  leads,
}: {
  leads: Lead[];
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-lg font-semibold">Recent Leads</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-zinc-800 text-left text-sm text-zinc-400">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">SMTP</th>
              <th className="px-6 py-4">Reply</th>
              <th className="px-6 py-4">Last Activity</th>
            </tr>
          </thead>

          <tbody>
            {leads.slice(0, 10).map((lead, index) => (
              <tr
                key={index}
                className="border-b border-zinc-800 last:border-none hover:bg-zinc-800/40"
              >
                <td className="px-6 py-4 font-medium">
                  {lead["First Name"]} {lead["Last Name"]}
                </td>

                <td className="px-6 py-4">
                  {lead["Business Name"] || "-"}
                </td>

                <td className="px-6 py-4">
                  {lead.Email || "-"}
                </td>

                <td className="px-6 py-4">
                  {lead.Status || "-"}
                </td>

                <td className="px-6 py-4">
                  {lead["SMTP Used"] || "-"}
                </td>

                <td className="px-6 py-4">
                  {lead["Reply Status"] || "-"}
                </td>

                <td className="px-6 py-4">
                  {lead["Last Activity"] || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}