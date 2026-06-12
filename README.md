# GiveRadar MCP Server

Remote [MCP](https://modelcontextprotocol.io) server exposing **8.7M+ registered charities across 60+ countries**, sourced from official government registries (IRS, Charity Commission, ACNC, DSD, RNA, and 60+ more). Read-only, no key required to start.

**Endpoint:** `https://giveradar.com/mcp/` (JSON-RPC 2.0 over HTTPS)
**Registry:** [`com.giveradar/charity-registry`](https://registry.modelcontextprotocol.io/v0.1/servers?search=com.giveradar) | **Docs:** [giveradar.com/mcp](https://giveradar.com/mcp/) | **Manifest:** [/.well-known/mcp.json](https://giveradar.com/.well-known/mcp.json)

## Tools

| Tool | What it does |
|---|---|
| `search_charities` | Free-text name search (trigram-indexed), optional country filter |
| `verify_charity` | Look up by EIN / UK Charity Number / RSIN / any official registry ID |
| `compare_charities` | Side-by-side integrity scores + financials, with a verdict |
| `find_similar` | More charities in the same country + category |

Plus `resources/list` / `resources/read` for full schema.org JSON-LD per charity (incl. FAQs). All tools are read-only (`readOnlyHint: true`).

## Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "giveradar": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://giveradar.com/mcp/"]
    }
  }
}
```

Clients with native streamable-HTTP support can connect directly to `https://giveradar.com/mcp/`.

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

This repo holds the public metadata for the hosted server (the implementation lives in the main GiveRadar codebase). Data license: **CC-BY-4.0** - attribute "GiveRadar (giveradar.com)". Issues and feature requests welcome here.
