# GiveRadar MCP Server

Remote [MCP](https://modelcontextprotocol.io) server exposing **7 million+ registered charities across 65+ countries**, sourced from official government registries (IRS, Charity Commission, ACNC, and dozens more). Read-only, no key required to start.

**Endpoint:** `https://giveradar.com/mcp/` (JSON-RPC 2.0 over HTTPS)
**Docs:** [giveradar.com/mcp](https://giveradar.com/mcp/) | **Manifest:** [/.well-known/mcp.json](https://giveradar.com/.well-known/mcp.json)

## Tools

| Tool | What it does |
|---|---|
| `search_charities` | Free-text name search (trigram-indexed), optional country filter |
| `verify_charity` | Look up by EIN / UK Charity Number / RSIN / any official registry ID |
| `compare_charities` | Side-by-side integrity scores + financials, with a verdict |
| `find_similar` | More charities in the same country + category |

Plus `resources/list` / `resources/read` for full schema.org JSON-LD per charity (incl. FAQs). All tools are read-only (`readOnlyHint: true`).

## Connect

This repo includes a tiny zero-dependency **stdio bridge** (`index.js`) that forwards the MCP stdio transport to the hosted endpoint, so any stdio MCP client can use it. Add to Claude Desktop's `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "giveradar": {
      "command": "npx",
      "args": ["-y", "github:matt-timmermans/giveradar-mcp"]
    }
  }
}
```

Clients with native streamable-HTTP support can connect directly to `https://giveradar.com/mcp/`. You can also use the generic remote bridge `npx -y mcp-remote https://giveradar.com/mcp/`.

Optional: set `GIVERADAR_API_KEY=gr_xxxxx` in the environment to raise the daily quota and unlock Pro fields.

## Try it

```bash
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"verify_charity","arguments":{"country":"US","id_value":"13-1760110"}}}' \
  https://giveradar.com/mcp/
```

## Quotas & tiers

| Tier | Daily quota | Fields |
|---|---|---|
| Anonymous | 50 / day / IP | All free fields |
| Free API key | 100 / day | All free fields |
| Pro | 10,000 / day | + financials, donation/report URLs |

Authenticate with `Authorization: Bearer gr_xxxxx` - get a key at [giveradar.com/api](https://giveradar.com/api/). Email, phone, and officer names are never exposed, at any tier.

## About

The MCP server is hosted (the implementation lives in the main GiveRadar codebase); this repo holds the public metadata plus the stdio bridge for local and sandbox use. Data license: **CC-BY-4.0** - attribute "GiveRadar (giveradar.com)". Issues and feature requests welcome here.
