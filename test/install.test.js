const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const packageRoot = path.resolve(__dirname, "..");
const installer = path.join(packageRoot, "bin", "install.js");

function run(args) {
  return spawnSync(process.execPath, [installer, ...args], {
    cwd: packageRoot,
    encoding: "utf8",
  });
}

let failures = 0;

function test(name, callback) {
  try {
    callback();
    console.log(`PASS ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${name}`);
    console.error(error.stack || error.message);
  }
}

test("prints help without installing", () => {
  const result = run(["--help"]);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
});

test("installs the managed skill payload at project scope", () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "project-explainer-"));
  try {
    const result = run(["install", "codex", "--scope", "project", "--cwd", tempRoot]);
    const destination = path.join(tempRoot, ".agents", "skills", "project-explainer");

    assert.equal(result.status, 0, result.stderr);
    assert.ok(fs.existsSync(path.join(destination, "SKILL.md")));
    assert.ok(fs.existsSync(path.join(destination, "agents", "openai.yaml")));
    assert.ok(fs.existsSync(path.join(destination, "references", "report-template.md")));
    assert.equal(fs.existsSync(path.join(destination, "README.md")), false);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test("rejects unsupported targets", () => {
  const result = run(["install", "unknown"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unsupported target/);
});

test("reports missing option values clearly", () => {
  const result = run(["install", "codex", "--cwd"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Missing value for "--cwd"/);
});

if (failures > 0) {
  process.exitCode = 1;
} else {
  console.log("All installer tests passed.");
}
