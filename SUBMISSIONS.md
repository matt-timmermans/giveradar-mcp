# Directory submissions: paste-ready copy

Where the GiveRadar MCP server is listed, and the copy to use for new listings. Keep every field consistent with README.md and server.json.

## Status

| Where | Status |
|---|---|
| Official MCP Registry (registry.modelcontextprotocol.io) | Published, com.giveradar/charity-registry 1.2.0 |
| Glama (glama.ai/mcp/servers/matt-timmermans/giveradar-mcp) | Listed (pulls from this repo) |
| Awesome MCP Servers (github.com/punkpeye/awesome-mcp-servers) | Pull request #13700 open |
| Cursor Directory (cursor.directory/plugins/new) | To submit |
| MCP.Directory (mcp.directory/submit) | To submit |
| MCP Marketplace (mcp-marketplace.io/submit) | To submit |
| Reddit r/mcp (showcase flair) | To post |

## Fields

- Name: GiveRadar Charity Registry
- One line (100 chars): Search, verify and compare 7.9M+ nonprofits from official charity registries in 100+ countries.
- Short description: GiveRadar is a free charity intelligence platform built on official government charity registries and tax authorities: 7.9 million+ nonprofits in 100+ countries. The MCP server exposes four read-only tools: search_charities (name search with country filter), verify_charity (lookup by EIN, charity number or registry ID), compare_charities (integrity assessment and financials side by side) and find_similar (peers by country and cause). Keyless free tier of 10 requests a day; a GiveRadar API key raises the limit and unlocks financial fields. Email, phone and officer names are never exposed.
- Endpoint (remote, streamable HTTP): https://giveradar.com/mcp/
- Transport: streamable-http (JSON-RPC 2.0 over HTTPS); stdio bridge: npx -y github:matt-timmermans/giveradar-mcp
- Repository: https://github.com/matt-timmermans/giveradar-mcp
- Website: https://giveradar.com/for-developers/#ai
- Docs: https://giveradar.com/mcp/
- Manifest: https://giveradar.com/.well-known/mcp.json
- Categories: Data, Research, Finance, Nonprofit, Due diligence
- Tags: charity, nonprofit, ngo, registry, due-diligence, philanthropy, 501c3, charity-commission
- Auth: none required (optional Bearer API key)
- Pricing: free tier; Pro from $99/month (https://giveradar.com/api/)
- Licence: code MIT; data free for individual use under https://giveradar.com/terms/, bulk and commercial per contract
- Logo: https://giveradar.com/static/img/GiveRadar-logo.png
- Contact: info@giveradar.com

## Install snippets

Claude Code: `claude mcp add giveradar --transport http https://giveradar.com/mcp/`

Claude Desktop / Cursor / Gemini CLI: see README.md "Connect".

## Reddit r/mcp post (showcase flair)

Title: GiveRadar MCP server: look up any of 7.9M nonprofits from official government registries, no key needed

Body:

I run GiveRadar, a free charity intelligence site built on official government charity registers and tax filings (IRS, Charity Commission, ACNC and about 50 others), 7.9M+ organizations in 100+ countries.

We host an MCP server at https://giveradar.com/mcp/ with four read-only tools: search a charity by name, verify one by EIN or charity number, compare two or more on integrity assessment and financials, and find similar organizations in the same country and cause. It works without a key at 10 requests a day; a free API key does the same and a paid key raises the limit and adds financial fields. Contact details and officer names are never exposed through it.

Connect with one line in Claude Code: claude mcp add giveradar --transport http https://giveradar.com/mcp/ . Config for Claude Desktop, Cursor, Gemini CLI and ChatGPT is in the repo: https://github.com/matt-timmermans/giveradar-mcp

Disclosure: I am the founder. Happy to answer questions about the data sources or the integrity assessment, which measures disclosure, not impact.
