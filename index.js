#!/usr/bin/env node
/**
 * GiveRadar MCP stdio bridge.
 *
 * GiveRadar runs a hosted MCP server at https://giveradar.com/mcp/ (JSON-RPC
 * 2.0 over HTTPS). This tiny script bridges the MCP stdio transport to that
 * remote endpoint: it reads newline-delimited JSON-RPC messages from stdin,
 * forwards each to the GiveRadar server over HTTP, and writes the responses
 * to stdout. Both sides speak the same JSON-RPC, so this is a thin forwarder
 * with no dependencies (Node 18+ built-in fetch).
 *
 * Use it from any stdio MCP client (Claude Desktop, Cursor, etc.) or as the
 * launch command in a sandbox that wraps stdio servers.
 *
 * Env:
 *   GIVERADAR_MCP_URL  override the endpoint (default https://giveradar.com/mcp/)
 *   GIVERADAR_API_KEY  optional gr_xxxxx key for higher quota / Pro fields
 */
"use strict";

const ENDPOINT = process.env.GIVERADAR_MCP_URL || "https://giveradar.com/mcp/";
const API_KEY = process.env.GIVERADAR_API_KEY || "";

const HEADERS = { "Content-Type": "application/json", "Accept": "application/json" };
if (API_KEY) HEADERS["Authorization"] = "Bearer " + API_KEY;

function writeLine(obj) {
  process.stdout.write(JSON.stringify(obj) + "\n");
}

async function forward(msg) {
  // Requests have an id and expect a response; notifications (no id) do not.
  const isNotification = msg.id === undefined || msg.id === null;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(msg),
    });
    const text = (await res.text()).trim();
    if (isNotification) return;
    if (!text) {
      writeLine({ jsonrpc: "2.0", id: msg.id, error: { code: -32603, message: "Empty response from GiveRadar MCP server (HTTP " + res.status + ")" } });
      return;
    }
    // Pass the upstream JSON-RPC response straight through.
    process.stdout.write(text + "\n");
  } catch (e) {
    if (isNotification) return;
    writeLine({ jsonrpc: "2.0", id: msg.id, error: { code: -32603, message: "GiveRadar bridge error: " + (e && e.message ? e.message : String(e)) } });
  }
}

let buf = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buf += chunk;
  let nl;
  while ((nl = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, nl).trim();
    buf = buf.slice(nl + 1);
    if (!line) continue;
    let msg;
    try {
      msg = JSON.parse(line);
    } catch (_e) {
      continue; // ignore non-JSON lines
    }
    forward(msg);
  }
});
process.stdin.on("end", () => process.exit(0));
