# GiveRadar MCP Server

Remote [MCP](https://modelcontextprotocol.io) server exposing **7.9 million+ nonprofits across 100+ countries**, sourced from official government charity registries and tax authorities (IRS, Charity Commission, ACNC, and dozens more). Read-only, no key required to start.

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

Clients with native streamable-HTTP support connect directly to `https://giveradar.com/mcp/`. Setup for every client with screenshots: [giveradar.com/for-developers/#ai](https://giveradar.com/for-developers/#ai).

**Claude Code** (one line):

```bash
claude mcp add giveradar --transport http https://giveradar.com/mcp/
```

**Claude Desktop** (`claude_desktop_config.json`), via the generic remote bridge:

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

or via the zero-dependency stdio bridge in this repo (`index.js`):

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

**Cursor** (`.cursor/mcp.json`): `{"mcpServers": {"giveradar": {"url": "https://giveradar.com/mcp/"}}}`

**Gemini CLI** (`~/.gemini/settings.json`): `{"mcpServers": {"giveradar": {"httpUrl": "https://giveradar.com/mcp/"}}}`

**ChatGPT**: Settings, Connectors, Advanced, enable Developer mode, then Create with server URL `https://giveradar.com/mcp/` and authentication none (paid plans).

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
| Anonymous | 10 / day / IP | All free fields |
| Free API key | 10 / day | All free fields |
| Pro | 10,000 / day | + financials, donation/report URLs |
| Enterprise | 100,000 / day | + financials, donation/report URLs |

Handshake methods (`initialize`, `ping`, `tools/list`) are free and do not count; `tools/call` and `resources/read` do. `tools/call` is also capped at 60 per minute per IP. Authenticate with `Authorization: Bearer gr_xxxxx`; get a key at [giveradar.com/api](https://giveradar.com/api/). Email, phone, and officer names are never exposed, at any tier.

## Also available

- **Python client and CLI:** `pip install giveradar` ([giveradar-python](https://github.com/matt-timmermans/giveradar-python)); its `verify()` calls this server's `verify_charity` tool.
- **REST API:** [giveradar.com/api/docs](https://giveradar.com/api/docs/), OpenAPI spec at [/api/openapi.yaml](https://giveradar.com/api/openapi.yaml).
- **For LLMs:** [/llms.txt](https://giveradar.com/llms.txt) (index) and [/llms-full.txt](https://giveradar.com/llms-full.txt) (complete reference: endpoints, tools, integrity method, data sources by country).

## About

The MCP server is hosted (the implementation lives in the main GiveRadar codebase); this repo holds the public metadata plus the stdio bridge for local and sandbox use. This code is MIT licensed. Data: free for individual use under the [GiveRadar Terms](https://giveradar.com/terms/); bulk and commercial access is licensed per contract (info@giveradar.com); methodology documentation and data schemas are CC BY 4.0. Attribution requested: "GiveRadar (giveradar.com)". Issues and feature requests welcome here.
