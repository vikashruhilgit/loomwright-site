
    (function millMotion() {
      const laws = [...document.querySelectorAll(".laws .law")];
      const lanes = [...document.querySelectorAll(".lanes button")];
      if (laws.length) {
        const pin = (index) => {
          const on = laws[index].getAttribute("aria-pressed") !== "true";
          laws.forEach((el, i) => el.setAttribute("aria-pressed", i === index && on ? "true" : "false"));
          lanes.forEach((el, i) => el.setAttribute("aria-pressed", i === index && on ? "true" : "false"));
        };
        laws.forEach((el, i) => el.addEventListener("click", () => pin(i)));
        lanes.forEach((el, i) => el.addEventListener("click", () => pin(i)));
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("off-stage", !entry.isIntersecting));
      }, { threshold: 0.12 });
      document.querySelectorAll(".lanes, .laws, .road").forEach((el) => io.observe(el));
    })();

    (function problemLanes() {
      const lanes = [...document.querySelectorAll(".lanes.story .lane")];
      const chapters = [...document.querySelectorAll(".chapters .chapter")];
      if (!lanes.length || !chapters.length) return;
      const light = (index) => {
        lanes.forEach((el, i) => {
          if (i === index) el.setAttribute("aria-current", "true");
          else el.removeAttribute("aria-current");
        });
        chapters.forEach((el, i) => el.classList.toggle("on", i === index));
      };
      const flash = (el) => {
        el.classList.remove("flash");
        void el.offsetWidth;
        el.classList.add("flash");
      };
      lanes.forEach((el, i) => {
        el.addEventListener("click", () => {
          light(i);
          flash(chapters[i]);
        });
      });
      const fromHash = () => {
        const id = location.hash.slice(1);
        const index = chapters.findIndex((el) => el.id === id);
        if (index >= 0) light(index);
      };
      fromHash();
      window.addEventListener("hashchange", fromHash);
      if (!("IntersectionObserver" in window)) return;
      const spy = new IntersectionObserver((entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const index = chapters.indexOf(hit.target);
        if (index >= 0) light(index);
      }, { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.4, 0.7] });
      chapters.forEach((el) => spy.observe(el));
    })();

    const plays = {
      new: {
        tag: "Recommended first play",
        title: "Ship one goal, stacked",
        body: "Use /autonomous when you have one requirement and you want Launch Pad + Supervisor chained, with stacked PRs if it takes more than one pass.",
        cmd: `<span class="c">/autonomous</span> <span class="g">"players can retry a daily challenge without losing the streak"</span>`
      },
      pr: {
        tag: "Existing work",
        title: "Heal an open pull request",
        body: "Point /review-pr at any PR URL. Bounded review → fix → re-review. It pushes fixes. It never merges. Add --until-mergeable to drain bot review until READY.",
        cmd: `<span class="c">/review-pr</span> <span class="g">https://github.com/you/repo/pull/42</span>`
      },
      queue: {
        tag: "Many goals",
        title: "Walk a backlog, one cloth at a time",
        body: "/automate turns a prompt, folder, or _BACKLOG.md into a queue. Default cap is five processed items. Auto-merge is off.",
        cmd: `<span class="c">/automate</span> <span class="g">"the remaining shop and league tickets"</span>\n<span class="c">/automate --folder</span> .supervisor/requirements`
      },
      stories: {
        tag: "Before code",
        title: "Write the problem as stories",
        body: "Product Owner reads CLAUDE.md, checks overlap, and writes acceptance criteria. Use --brainstorm when the idea is still a fight.",
        cmd: `<span class="c">/product-owner problem:</span> <span class="g">"players bounce after the first loss"</span> <span class="c">--brainstorm</span>`
      },
      attack: {
        tag: "Before production",
        title: "Red-team the risky surface",
        body: "Independent adversarial audit. Use it on auth, billing, migrations, and anything that orchestrates other agents. Findings are advisory.",
        cmd: `<span class="c">/red-team-reviewer</span>`
      },
      qa: {
        tag: "User-visible flows",
        title: "Strategy, then execution",
        body: "QA Strategist classifies risk. QA Executor discovers the app, writes Playwright, and debates the gaps. Skip this on a comment-only change.",
        cmd: `<span class="c">/qa-strategist</span> src/\n<span class="c">/qa-executor</span>`
      },
      lessons: {
        tag: "After a week",
        title: "Keep only what you accept",
        body: "/dreaming proposes lessons from session logs. You accept item by item. Nothing auto-writes into CLAUDE.md.",
        cmd: `<span class="c">/dreaming --sessions</span> 8\n<span class="c">/rules suggest</span>`
      },
      hand: {
        tag: "Handoff",
        title: "Two minutes to inherit the mill",
        body: "/handoff is the per-item catch-up. /insights is the scoreboard. /obsidian is the vault you can actually browse.",
        cmd: `<span class="c">/handoff</span>\n<span class="c">/insights</span>`
      }
    };

    const card = document.getElementById("play-card");
    if (card) document.querySelectorAll("#mill-picks button").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#mill-picks button").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        const p = plays[btn.dataset.play];
        card.innerHTML = `<p class="tag">${p.tag}</p><h3>${p.title}</h3><p>${p.body}</p><pre class="cmd">${p.cmd}</pre>`;
      });
    });

    const installs = {
      cli: {
        tag: "macOS, Linux, WSL — Terminal",
        title: "Claude Code CLI",
        html: `<p>Use this when you type in Terminal, iTerm, Ghostty, or Cursor’s terminal panel. <code>claude</code> is a shell command. <code>/plugin</code> is not.</p>
          <ol class="how">
            <li>Install the Claude Code CLI from <a href="https://code.claude.com/docs/en/quickstart">code.claude.com</a> if <code>which claude</code> prints nothing. Reopen the terminal after install so PATH updates.</li>
            <li>Paste the two commands below into the shell. First line registers the GitHub marketplace. Second line installs the plugin as <code>loomwright@atelier</code>.</li>
            <li>Confirm with <code>claude plugin list</code>. You should see loomwright from marketplace atelier.</li>
            <li><code>cd</code> into a git repo, then start a session with <code>claude</code>. If slash commands are missing, type <code>/reload-plugins</code> in that session.</li>
          </ol>`,
        copy: "claude plugin marketplace add vikashruhilgit/loomwright\nclaude plugin install loomwright@atelier"
      },
      code: {
        tag: "Interactive session — not zsh",
        title: "Claude Code chat / TUI",
        html: `<p>Type these in a Claude Code session: the <code>claude</code> TUI, the Claude Code IDE panel, or VS Code / JetBrains with the Claude Code extension. Do not type them in the system shell.</p>
          <ol class="how">
            <li>Open the git project you want to ship in. Start Claude Code there.</li>
            <li>Type <code>/plugin marketplace add vikashruhilgit/loomwright</code> and submit. That only registers the catalog.</li>
            <li>Type <code>/plugin install loomwright@atelier</code>. Pick user scope unless this repo should pin the plugin for the team.</li>
            <li>Optional: type <code>/plugin</code> and open the Installed tab. If this session was already running, type <code>/reload-plugins</code>.</li>
          </ol>`,
        copy: "/plugin marketplace add vikashruhilgit/loomwright\n/plugin install loomwright@atelier"
      },
      cursor: {
        tag: "Agent chat or Claude Code in Cursor",
        title: "Cursor",
        html: `<p>Loomwright is a Claude Code plugin, not a listing on cursor.com/marketplace. Install it as Claude Code tooling inside Cursor. Never paste <code>/plugin</code> into Cursor’s Terminal panel — zsh treats the leading slash as a path.</p>
          <ol class="how">
            <li><strong>Agent chat:</strong> open Agent (not Terminal). Type <code>/plugin marketplace add vikashruhilgit/loomwright</code>, then <code>/plugin install loomwright@atelier</code>.</li>
            <li><strong>Claude Code in Cursor:</strong> install the Claude Code CLI or the Claude Code extension. In Cursor’s terminal run the two <code>claude plugin</code> commands from the Claude CLI tab, then start <code>claude</code> in the repo.</li>
            <li>Reload the window or type <code>/reload-plugins</code> in the Claude Code session if <code>/setup</code> does not appear.</li>
            <li><strong>Teams / Enterprise only:</strong> an admin can open Dashboard → Plugins → Import from Repo and paste <code>https://github.com/vikashruhilgit/loomwright</code>. Individuals should use steps 1 or 2. Native Cursor plugins and Claude Code plugins are different catalogs.</li>
          </ol>`,
        copy: "/plugin marketplace add vikashruhilgit/loomwright\n/plugin install loomwright@atelier"
      },
      desktop: {
        tag: "Desktop chat and Cowork — paid plans",
        title: "Claude Desktop",
        html: `<p>Paid Claude (Pro, Max, Team, Enterprise). Skills can show up in Desktop chat. Hooks, sub-agents, git worktrees, and <code>/supervisor</code> are mill machinery — use Claude Code for the full mill.</p>
          <ol class="how">
            <li>Open Claude Desktop. If you use Cowork, switch to the Cowork tab first.</li>
            <li>Left sidebar: <strong>Customize</strong> → <strong>Plugins</strong>.</li>
            <li>Under Personal plugins, click <strong>+</strong> → <strong>Add marketplace</strong> → <strong>Add from a repository</strong>.</li>
            <li>Enter <code>vikashruhilgit/loomwright</code> (or the full GitHub URL) and sync. If it fails, update the app from Help → Check for updates and retry.</li>
            <li>Find <strong>loomwright</strong> in the list and click Install. Type <code>/</code> in a conversation to see the skills that loaded.</li>
            <li>For <code>/setup</code>, stacked PRs, and worktrees, install via Claude CLI or Claude Code and run those commands there.</li>
          </ol>`,
        copy: "vikashruhilgit/loomwright"
      }
    };

    const installCard = document.getElementById("install-card");
    const installCmd = document.getElementById("install-cmd");
    const copyBtn = document.getElementById("copy-btn");
    let copyRestore = "Copy commands";

    function showInstall(key) {
      if (!installCard || !installCmd || !copyBtn) return;
      const app = installs[key];
      installCard.innerHTML = `<p class="tag">${app.tag}</p><h3>${app.title}</h3>${app.html}`;
      installCmd.textContent = app.copy;
      copyRestore = key === "desktop" ? "Copy repo id" : "Copy commands";
      copyBtn.textContent = copyRestore;
    }

    if (installCard) {
      document.querySelectorAll(".apps button").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".apps button").forEach((b) => b.setAttribute("aria-pressed", "false"));
          btn.setAttribute("aria-pressed", "true");
          showInstall(btn.dataset.app);
        });
      });
      showInstall("cli");
    }

    const knobs = [...document.querySelectorAll("#knobs .knob")];
    const policyJson = document.getElementById("policy-json");
    const policyCmd = document.getElementById("policy-cmd");
    const policyCopy = document.getElementById("policy-copy");

    if (knobs.length && policyJson && policyCmd && policyCopy) {
    function renderPolicy() {
      const cfg = {};
      knobs.filter((k) => k.dataset.scope === "cfg")
        .forEach((k) => { cfg[k.dataset.key] = k.dataset.value === "true"; });
      policyJson.textContent = JSON.stringify(cfg, null, 2);

      const val = (key) => knobs.find((k) => k.dataset.key === key).dataset.value;
      const flags = [];
      if (val("cost") === "cheap") flags.push("--cheap");
      const w = val("workers");
      if (w === "sequential") flags.push("--sequential");
      else if (w !== "2") flags.push("--max-workers " + w);
      const b = val("base");
      if (b !== "main") flags.push("--base-branch " + b);
      policyCmd.textContent = '/autonomous "the next thing your users can feel"'
        + (flags.length ? " \\\n  " + flags.join(" ") : "");

      knobs.forEach((k) => {
        const on = k.dataset.value !== k.dataset.default;
        k.dataset.active = String(k.dataset.scope === "cfg" ? k.dataset.value === "true" : on);
        k.setAttribute("aria-pressed", String(k.dataset.active === "true"));
        k.querySelector("i").textContent = k.dataset.value;
      });
    }

    knobs.forEach((k) => {
      k.addEventListener("click", () => {
        if (k.dataset.cycle) {
          const opts = k.dataset.cycle.split(",");
          k.dataset.value = opts[(opts.indexOf(k.dataset.value) + 1) % opts.length];
        } else {
          k.dataset.value = k.dataset.value === "true" ? "false" : "true";
        }
        renderPolicy();
      });
    });
    renderPolicy();

    policyCopy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(policyJson.textContent);
        policyCopy.textContent = "Copied";
        setTimeout(() => { policyCopy.textContent = "Copy config"; }, 1600);
      } catch {
        policyCopy.textContent = "Copy failed";
      }
    });
    }

    if (copyBtn && installCmd) copyBtn.addEventListener("click", async () => {
      const text = installCmd.textContent;
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied";
        setTimeout(() => { copyBtn.textContent = copyRestore; }, 1600);
      } catch {
        copyBtn.textContent = "Copy failed";
      }
    });
  

    (function chapters() {
      const nodes = document.querySelectorAll(".chapter");
      if (!nodes.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        nodes.forEach((el) => el.classList.add("in"));
        return;
      }
      if (!("IntersectionObserver" in window)) {
        nodes.forEach((el) => el.classList.add("in"));
        return;
      }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      }, { threshold: 0.28 });
      nodes.forEach((el) => io.observe(el));
    })();

    (function shareMill() {
      const buttons = [...document.querySelectorAll("[data-share]")];
      if (!buttons.length) return;
      const origin = "https://vikashruhilgit.github.io/loomwright-site";
      const shareUrl = () => {
        const here = new URL(location.href);
        if (here.hostname === "127.0.0.1" || here.hostname === "localhost") {
          const file = here.pathname.split("/").pop() || "index.html";
          const path = !file || file === "index.html" ? "/" : "/" + file;
          return origin + path + here.hash;
        }
        here.search = "";
        return here.toString();
      };
      const payload = () => ({
        title: document.title,
        text: "A messy goal in. A reviewed pull request out. You only show up when it actually needs you.",
        url: shareUrl()
      });
      buttons.forEach((btn) => {
        const label = btn.textContent;
        btn.addEventListener("click", async () => {
          const data = payload();
          try {
            if (navigator.share) {
              await navigator.share(data);
              return;
            }
          } catch (err) {
            if (err && err.name === "AbortError") return;
          }
          let copied = false;
          try {
            await navigator.clipboard.writeText(data.url);
            copied = true;
          } catch {
            const ta = document.createElement("textarea");
            ta.value = data.url;
            ta.setAttribute("readonly", "");
            ta.style.cssText = "position:fixed;left:-9999px";
            document.body.appendChild(ta);
            ta.select();
            copied = document.execCommand("copy");
            ta.remove();
          }
          btn.textContent = copied ? "Link copied" : "Copy failed";
          setTimeout(() => { btn.textContent = label; }, 1600);
        });
      });
    })();
