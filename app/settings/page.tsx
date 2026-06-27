import AppLayout from "../../components/layout/AppLayout";

import GeneralSettings from "../../components/settings/GeneralSettings";
import AISettings from "../../components/settings/AISettings";
import SMTPSettings from "../../components/settings/SMTPSettings";
import GoogleSheetSettings from "../../components/settings/GoogleSheetSettings";
import N8NSettings from "../../components/settings/N8NSettings";
import SendingSettings from "../../components/settings/SendingSettings";
import AccountSettings from "../../components/settings/AccountSettings";

import { getSettings } from "@/lib/settings";

export default async function SettingsPage() {
  const data = await getSettings();

  return (
    <AppLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-5xl font-bold">Settings</h1>

          <p className="mt-2 text-zinc-400">
            Manage your workspace, integrations and sending configuration.
          </p>
        </div>

        <GeneralSettings company={data.company} />

        <AISettings ai={data.ai} />

        <SMTPSettings smtp={data.smtp} />

        <GoogleSheetSettings sheets={data.sheets} />

        <N8NSettings n8n={data.n8n} />

        <SendingSettings sending={data.sending} />

        <AccountSettings account={data.account} />

      </div>
    </AppLayout>
  );
}