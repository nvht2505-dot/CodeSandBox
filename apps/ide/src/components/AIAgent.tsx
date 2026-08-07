export default function AIAgent() {
  return (
    <div className="ai-agent">
      <div className="panel-title">AI Agent</div>

      <select>
        <option>GPT-5</option>
        <option>Claude</option>
        <option>Gemini</option>
      </select>

      <textarea
        rows={10}
        placeholder="Describe what you want to build..."
      />

      <button>Generate</button>

      <div className="build-log">
        <h4>Plan</h4>
        <p>Waiting...</p>

        <h4>Logs</h4>
        <p>Ready.</p>
      </div>
    </div>
  );
}
