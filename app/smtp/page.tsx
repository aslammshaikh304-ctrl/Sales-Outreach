import AppLayout from "../../components/layout/AppLayout";
import SMTPTable from "../../components/smtp/SMTPTable";
import { getSMTPData } from "@/lib/smtp";

export default async function SMTPPage() {
  const data = await getSMTPData();

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">SMTP</h1>
          <p className="mt-2 text-zinc-400">
            Manage SMTP accounts and monitor email health
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Your four stat cards */}
        </div>

        {/* SMTP Table */}
        <SMTPTable smtpAccounts={data.smtpAccounts} />

      </div>
    </AppLayout>
  );
}