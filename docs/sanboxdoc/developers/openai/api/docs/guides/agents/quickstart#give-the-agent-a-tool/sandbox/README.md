# Sandbox CodeX

> Next Generation AI Sandbox IDE

Sandbox CodeX là một AI Sandbox IDE thế hệ mới giúp lập trình viên xây dựng, chạy thử và triển khai ứng dụng ngay trên trình duyệt trong môi trường cô lập (Sandbox).

## Mục tiêu

- AI Agent
- Secure Sandbox
- Multi AI Models
- Browser IDE
- Docker Workspace
- Live Preview
- Terminal
- Git Integration
- API Integration
- OpenAI Sandbox AI Integration

## Hỗ trợ AI

- OpenAI
- Claude
- Gemini
- Grok
- DeepSeek
- Qwen
- Mistral
- Llama

## Chức năng

- Code Editor
- AI Assistant
- AI Agent
- Browser Preview
- Linux Terminal
- Docker Sandbox
- File Manager
- Git
- Extension System
- Plugin Marketplace


## Thiết kế OpenAI Sandbox AI

Sandbox CodeX định hướng tích hợp OpenAI Platform để xây dựng OpenClaw, trợ lý AI chính của Eios, có khả năng tự động chuyển yêu cầu người dùng thành ứng dụng production-ready trong sandbox. Xem bản thiết kế chi tiết tại [`docs/OPENAI_SANDBOX_INTEGRATION.md`](docs/OPENAI_SANDBOX_INTEGRATION.md).

## Trạng thái

🚧 Đang phát triển

Version 0.1.0 Alpha

## Mục tiêu cuối cùng

Repository này sẽ là nền tảng để phát triển Sandbox CodeX từ phiên bản Alpha đến v1.0, bao gồm:

- Landing Page hiện đại
- AI Agent
- IDE trên trình duyệt
- Sandbox Runtime
- Docker Container
- Terminal
- File Manager
- GitHub Integration
- Plugin System
- Marketplace
- Tài liệu đầy đủ
- Triển khai lên môi trường production

## Lộ trình phát triển

1. **Giai đoạn 1:** Hoàn thiện tài liệu và landing page.
2. **Giai đoạn 2:** Xây dựng giao diện IDE.
3. **Giai đoạn 3:** Thêm AI Agent và Sandbox.
4. **Giai đoạn 4:** Hoàn thiện backend, xác thực và triển khai bản phát hành đầu tiên (v1.0.0).



# Build from Docs to a Finished Agent

A step-by-step build path that starts with OpenAI docs, moves into Agents, and continues through implementation, testing, and final polish.

## Intro

In this guide, we’ll start with the OpenAI docs foundation, build your first agent, connect it to project-specific tools, and then finish with testing and iteration so the project can move from idea to working app.

### Resources
- [Building agents guide](https://platform.openai.com/docs/guides/agents) - Official guide to building agents using the OpenAI platform.
- [OpenAI showcase apps](https://developers.openai.com/showcase?source=openai&app_type=app) - Browse OpenAI-created app examples in the developer showcase.

## Start with the docs foundation

Begin by reading the agent-building overview and the quickstart so you understand the basic parts: the model, instructions, tools, state, and the run loop. Treat this as your project planning step: write down the user task your agent will solve, the data it needs, and the actions it should be allowed to take.

### Guide extract

#### Create and run your first agent

[Read full section](https://developers.openai.com/api/docs/guides/agents/quickstart#create-and-run-your-first-agent)

## Create and run your first agent

Start with one focused agent and one turn. The SDK handles the model call and returns a result object with the final output plus the run history.

<CodeSample
  client:load
  title="Create and run an agent"
  defaultLanguage="typescript"
  code={examples.quickstartFirstRun}
/>

You should see a concise answer in the terminal. Once that loop works, keep the same shape and add capabilities incrementally rather than starting with a large multi-agent design.

### Resources
- [Quickstart](https://developers.openai.com/api/docs/guides/agents/quickstart) - Build your first agent with the OpenAI Agents SDK, add tools and handoffs, and understand where to go next.
- [Agents SDK quickstart](https://openai.github.io/openai-agents-python/quickstart/) - Quickstart project for building agents with the Agents SDK.

## Build the first agent loop

Implement the smallest possible agent first: one clear instruction, one user input, and one response. Once that works, carry state between turns so the agent can remember the current task, user preferences, or project context without requiring the user to repeat everything.

### Code example

```python
from agents import Agent, Runner

agent = Agent(
    name="Project helper",
    instructions="Help the user complete project tasks. Ask concise clarifying questions when needed."
)

result = Runner.run_sync(agent, "What should I do next to finish this project?")
print(result.final_output)
```

### Guide extract

#### Carry state into the next turn

[Read full section](https://developers.openai.com/api/docs/guides/agents/quickstart#carry-state-into-the-next-turn)

## Carry state into the next turn

The first run result is also how you decide what the second turn should use as state.

| If you want                                           | Start with                                                                                                                               |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Keep the full history in your application             | <SdkTerm client:load defaultLanguage="typescript" typescript="result.history" python="result.to_input_list()" />                         |
| Let the SDK load and save history for you             | A session                                                                                                                                |
| Let OpenAI manage continuation state                  | A server-managed continuation ID                                                                                                         |
| Resume a run that paused for approval or interruption | <SdkTerm client:load defaultLanguage="typescript" typescript="result.state" python="result.to_state()" />, together with `interruptions` |

After handoffs, reuse <SdkTerm client:load defaultLanguage="typescript" typescript="lastAgent" python="last_agent" /> for the next turn when that specialist should stay in control.

## Connect tools and project actions

Add tools only after the base loop works. Start with one safe, high-value tool such as searching project notes, creating a task, reading a file, or calling an internal API. If the project grows into multiple specialized responsibilities, split them into separate agents with handoffs rather than making one agent handle everything.

### Guide extract

#### Give the agent a tool

[Read full section](https://developers.openai.com/api/docs/guides/agents/quickstart#give-the-agent-a-tool)

## Give the agent a tool

The first capability you add is often a function tool or a hosted OpenAI tool such as web search or file search.

<CodeSample
  client:load
  title="Add a function tool"
  defaultLanguage="typescript"
  code={examples.quickstartTool}
/>

Use the shared [Using tools](https://developers.openai.com/api/docs/guides/tools#usage-in-the-agents-sdk) guide when you need hosted tools, tool search, or agents-as-tools.

### Resources
- [Orchestrating multiple agents](https://openai.github.io/openai-agents-python/multi_agent/) - Guide to coordinating multiple agents with shared context.
- [Orchestrating Agents: Routines and Handoffs](https://developers.openai.com/cookbook/examples/orchestrating_agents) - Cookbook for orchestrating agent workflows with routines and handoffs.

## Use Codex to implement the next slices

Once the architecture is clear, hand implementation slices to Codex: add the agent module, wire it into the UI or backend route, connect one tool, then run the app and fix integration issues. Work in small checkpoints so each change can be reviewed before moving to the next feature.

### Resources
- [Use your computer with Codex](https://developers.openai.com/codex/use-cases/use-your-computer-with-codex) - Use Computer Use to hand off multi-step tasks across Mac apps, windows, and files.

## Test, evaluate, and finish

Finish by testing the main user journeys: happy path, unclear request, tool failure, and edge cases. Add a lightweight eval set for representative prompts, then use app QA to catch UI or workflow bugs before final polish and release.

### Resources
- [Getting Started with Evals](https://platform.openai.com/docs/guides/evaluation-getting-started) - Step-by-step guide to setting up your first eval.
- [QA your app with Computer Use](https://developers.openai.com/codex/use-cases/qa-your-app-with-computer-use) - Use Computer Use to exercise key flows, catch issues, and finish with a bug report.
