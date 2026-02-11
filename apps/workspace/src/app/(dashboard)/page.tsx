"use client";

import Link from "next/link";
import { useAuth } from "@crm/shared/hooks";
import { useEffect, useState } from "react";
import type { Lead } from "@/lib/types";
import { LEAD_STATUSES, LEAD_STATUS_OPTIONS } from "@/lib/constants";

type StatusCounts = Record<string, number>;

export default function WorkspaceHome() {
  const { client, workspace_id, user, loading: authLoading } = useAuth();
  const [counts, setCounts] = useState<StatusCounts>({});
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  useEffect(() => {
    if (!client || workspace_id == null) {
      if (!authLoading) setLoading(false);
      return;
    }
    setLoading(true);
    client
      .from("leads")
      .select("status")
      .eq("workspace_id", workspace_id)
      .eq("disabled", false)
      .limit(10000)
      .then(({ data, error }) => {
        if (error) {
          setCounts({});
          setLoading(false);
          return;
        }
        const next: StatusCounts = {};
        LEAD_STATUSES.forEach((s) => {
          next[s.value] = 0;
        });
        (data ?? []).forEach((row: { status: string }) => {
          const s = row.status?.toLowerCase() ?? "new";
          next[s] = (next[s] ?? 0) + 1;
        });
        setCounts(next);
        setLoading(false);
      });
  }, [client, workspace_id, authLoading]);

  useEffect(() => {
    if (!selectedStatus || !client || workspace_id == null) return;
    const fetchLeads = async () => {
      setLeadsLoading(true);
      const { data, error } = await client
        .from("leads")
        .select("*")
        .eq("workspace_id", workspace_id)
        .eq("disabled", false)
        .eq("status", selectedStatus)
        .order("created_at", { ascending: false })
        .limit(100);
      if (!error && data) {
        setLeads(data as Lead[]);
      } else {
        setLeads([]);
      }
      setLeadsLoading(false);
    };
    fetchLeads();
  }, [selectedStatus, client, workspace_id]);

  const handleStatusClick = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    if (!client || workspace_id == null) return;
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;
    setUpdatingStatusId(leadId);
    const { error: updateError } = await client
      .from("leads")
      .update({ status: newStatus })
      .eq("id", leadId)
      .eq("workspace_id", workspace_id);
    if (!updateError) {
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      const description =
        lead.status !== newStatus
          ? `Status changed from ${lead.status} to ${newStatus}`
          : `Status updated to ${newStatus}`;
      await client.from("lead_activities").insert({
        workspace_id,
        lead_id: leadId,
        type: "updated",
        description,
        metadata: { status: newStatus },
        created_by: user?.id ?? null,
      });
    }
    setUpdatingStatusId(null);
  };

  return (
    <div className="p-0 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Workspace</h1>
        <Link
          href="/leads"
          className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
        >
          Leads
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {LEAD_STATUSES.map((status) => (
            <div
              key={status.value}
              onClick={() => handleStatusClick(status.value)}
              className={`rounded-xl border p-4 shadow-sm flex flex-col gap-3 cursor-pointer transition-all ${
                selectedStatus === status.value
                  ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-slate-600">
                  {status.label}
                </span>
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${status.pillClass}`}
                >
                  {status.label}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {counts[status.value] ?? 0}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedStatus && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              {LEAD_STATUSES.find((s) => s.value === selectedStatus)?.label} Leads
            </h2>
            <button
              onClick={() => setSelectedStatus(null)}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              ✕ Close
            </button>
          </div>

          {leadsLoading ? (
            <p className="text-slate-500">Loading leads…</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                      Email
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                      Phone
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                      Company
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                      Channel
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                      Status
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">
                      Owner
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-3 py-6 text-center text-gray-500 text-sm"
                      >
                        No leads found.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id}>
                        <td className="px-3 py-2 text-sm font-medium">
                          {lead.name}
                        </td>
                        <td className="px-3 py-2 text-sm">{lead.email}</td>
                        <td className="px-3 py-2 text-sm">{lead.phone}</td>
                        <td className="px-3 py-2 text-sm">
                          {lead.company ?? "—"}
                        </td>
                        <td className="px-3 py-2 text-sm capitalize">
                          {lead.channel ?? "—"}
                        </td>
                        <td className="px-3 py-2 text-sm">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value)
                            }
                            disabled={updatingStatusId === lead.id}
                            className="capitalize rounded border border-slate-300 px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 cursor-pointer"
                          >
                            {LEAD_STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2 text-sm">
                          {lead.owner ?? "—"}
                        </td>
                        <td className="px-3 py-2 text-right text-sm">
                          <Link
                            href={`/leads/${lead.id}`}
                            className="text-indigo-600 hover:underline"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <p className="text-slate-600 text-sm">
        Independent routing and layout for the workspace app.
      </p>
    </div>
  );
}
