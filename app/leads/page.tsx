import AppLayout from "../../components/layout/AppLayout";
import LeadTable from "../../components/leads/LeadTable";
import { getLeads } from "../../lib/leads";
import LeadHeader from "../../components/leads/LeadHeader";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <AppLayout>
      <div className="space-y-6">
        <LeadHeader />

        {leads.length === 0 ? (
  <div className="rounded-lg border border-zinc-800 p-12 text-center text-zinc-400">
    No leads found.
    <br />
    Click <strong>+ Add Lead</strong> to create your first lead.
  </div>
) : (
  <LeadTable leads={leads} />
)}
      </div>
    </AppLayout>
  );
}