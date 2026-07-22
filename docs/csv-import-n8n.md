# CSV lead import: expected n8n workflow

The application does not modify n8n. Configure `N8N_IMPORT_LEADS_WEBHOOK_URL` on the Next.js server with the production webhook URL. It remains server-only.

```text
Webhook: POST /import-leads
  -> Validate payload
  -> Split Out leads
  -> Load existing Leads Data
  -> Check duplicate by Email, Website, or Business Name
  -> Append new lead to Google Sheets
  -> Aggregate imported/duplicate/failed counts
  -> Respond to Webhook
```

Duplicate priority is Email, normalized Website, then normalized Business Name.

The response must be JSON:

```json
{"success":true,"summary":{"total":100,"imported":87,"duplicates":8,"invalid":4,"failed":1}}
```

## Field mapping

| API field | Google Sheet column | Default |
|---|---|---|
| `leadId` | Lead Id | unique UUID |
| `firstName` | First Name | CSV or empty |
| `lastName` | Last Name | CSV or empty |
| `company` | Business Name | CSV or empty |
| `website` | Website | CSV or empty |
| `email` | Email | lowercase CSV or empty |
| `services` | Services | CSV or empty |
| `industry` | Industry | CSV or empty |
| `status` | Status | New |
| `researchSummary` | Research Summary | empty |
| `personalization` | Personalization | empty |
| `generatedSubject` | Generated Subject | empty |
| `generatedEmail` | Generated Email | empty |
| `smtpUsed` | SMTP Used | empty |
| `sentDate` | Sent Date | empty |
| `followupCount` | Followup Count | 0 |
| `replyStatus` | Reply Status | No Reply |
| `lastActivity` | Last Activity | Lead Imported |
| `activityType` | Activity Type | CSV Import |
| `replyDate` | Reply Date | empty |
| `sequenceStatus` | Sequence Status | Not Started |
| `suppressionStatus` | Suppression Status | None |
| `suppressionReason` | Suppression Reason | empty |
| `bounceStatus` | Bounce Status | No |
| `bounceType` | Bounce Type | empty |

The workflow should always return JSON, including partial failures, count duplicates against existing sheet rows, and report append failures without aborting the whole batch.
