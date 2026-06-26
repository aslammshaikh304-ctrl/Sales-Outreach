import AppLayout from "../../components/layout/AppLayout";
import LeadTable from "../../components/leads/LeadTable";
import { getLeads } from "../../lib/leads";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">Leads</h1>
            <p className="mt-2 text-zinc-400">
              Manage all your outreach leads
            </p>
          </div>

          <button className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-500">
            + Add Lead
          </button>
        </div>

        <input
          type="text"
          placeholder="Search leads..."
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none"
        />

        <LeadTable leads={leads} />
      </div>
    </AppLayout>
  );
}