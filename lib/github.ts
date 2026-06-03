import { cacheLife } from "next/cache";
import localProfile from "../public/info/profile.json";

export interface MediaAsset {
  url: string;
  alt: string;
  caption: string;
}

export interface ProjectRouting {
  repo_name: string;
  project_name: string;
  hero_image?: string | "";
}

export interface ProjectMeta {
  role: string;
  development_phase: string;
  languages: string[];
  frameworks_and_tools: string[];
}

export interface MeasurableMetrics {
  execution_latency: string;
  ui_performance: string;
  operational_cost: string;
}

export interface StarChallenge {
  situation: string;
  action: string;
  result: string;
  inline_image?: string | "";
}

export interface ArchitecturalDeepDive {
  text: string;
  illustration?: MediaAsset | null;
}

export interface PortfolioProject {
  routing: ProjectRouting;
  project_meta: ProjectMeta;
  comprehensive_description: string;
  engineering_highlights: string[];
  measurable_metrics: MeasurableMetrics;
  star_challenges: StarChallenge[];
  architectural_deep_dive: ArchitecturalDeepDive;
  lessons_learned: string;
}

export interface Repository {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  languages: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  homepage?: string | null;
  portfolio: PortfolioProject;
}

export interface GithubProfile {
  username: string;
  name: string;
  headline: string;
  followers: number;
  following: number;
  website: string;
  linkedIn: string;
  githubUrl: string;
  public_repos: number;
}

export const FALLBACK_PROFILE: GithubProfile = {
  username: "HoodieYlya13",
  name: "Ylya Martchenko",
  headline: "Software Engineer / Next.js Expert / Full Stack Developer",
  followers: 7,
  following: 6,
  website: "http://HY13dev.com",
  linkedIn: "https://www.linkedin.com/in/ylya-martchenko",
  githubUrl: "https://github.com/HoodieYlya13",
  public_repos: 20,
};

export const FALLBACK_REPOS: Repository[] = [
  {
    name: "teslimitless",
    description:
      "An advanced hardware-software vehicle integration platform engineered to safely intercept, decode, and customize the communication networks of a Tesla Model 3 Highland.",
    html_url: "https://github.com/HoodieYlya13/teslimitless",
    language: "C++",
    languages: ["C++", "TypeScript"],
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "2026-05-24T12:00:00Z",
    portfolio: {
      routing: {
        repo_name: "teslimitless",
        project_name: "TesLimitless",
        hero_image: "https://hy13dev.com/img/teslimitless-app.png",
      },
      project_meta: {
        role: "Lead Embedded & Mobile Systems Engineer",
        development_phase: "Functional Prototype (4th-Year Capstone)",
        languages: ["C++", "TypeScript"],
        frameworks_and_tools: [
          "ESP32",
          "FreeRTOS",
          "Arduino Core",
          "React Native",
          "LIN-bus (TJA1021)",
          "CAN-bus (MCP2515)",
          "react-native-ble-plx",
          "SPI & UART Protocols",
          "Resistor Ladder Network",
          "CAD",
        ],
      },
      comprehensive_description:
        "An advanced hardware-software vehicle integration platform engineered to safely intercept, decode, and customize the communication networks of a Tesla Model 3 Highland. Running a custom asymmetric dual-core FreeRTOS C++ firmware stack on an ESP32, the system acts as a real-time Man-in-the-Middle (MITM) gateway at 19200 baud between the car body controller and steering wheel capacitive button clusters on the physical LIN-bus. When a steering button (such as turn signals, high beams, camera, wipers, or thumbwheels) is pressed, the ESP32 intercepts the frame, transmits a mock 'idle' payload to the vehicle body controller over LIN to mask the factory command, and translates the input into a custom CAN-bus macro injected safely via the vehicle's diagnostic port. The landscape React Native companion app acts as both a real-time HUD (displaying speedometer, state-of-charge, active turn signals, and dynamic power/regen arcs) and a customization mapping controller. Users can dynamically remap steering wheel controls via the mobile UI—for example, binding a left turn signal input to toggle the vehicle's Comfort Mode profile—streaming configuration mapping tables over BLE to the ESP32 for active execution.",
      engineering_highlights: [
        "Architected an active Man-in-the-Middle (MITM) LIN-bus gateway (19200 baud) using dual HardwareSerial lines on the ESP32 to intercept and rewrite capacitive turn signal, wiper, camera, and thumbwheel commands.",
        "Developed a custom remapping system that intercepts steering wheel LIN-bus frames, dynamically injects spoofed 'idle' payloads to mask physical inputs from the vehicle body controller, and translates those inputs into custom CAN-bus macros.",
        "Designed a non-invasive CAN integration connecting the ESP32 to the high-speed vehicle network strictly through the Tesla diagnostic port, reading live telemetry and injecting remapped command frames safely.",
        "Leveraged high-priority FreeRTOS task pinning to bind safety-critical LIN-bus frame interception loops directly to Core 1, ensuring microsecond-accurate determinism with zero risk of processing starvation.",
        "Engineered an analog resistor-ladder button network (SW1 to SW5) on ESP32 GPIO 34 as a secondary input simulator for bench-testing CAN-bus injection routines prior to physical LIN-bus integration.",
        "Designed a custom, landscape-optimized React Native cockpit HUD using react-native-ble-plx that performs smooth state-interpolation of telemetry, rendering an interactive, color-coded battery status indicator and a dynamic SVG power/regen visualization arc.",
      ],
      measurable_metrics: {
        execution_latency:
          "Sub-1.5ms LIN-bus active MITM interception and forwarding latency; under 10ms CAN-bus sniffing and decoding cycle; sub-16ms update periods for BLE telemetry streaming.",
        ui_performance:
          "Hardware-accelerated rendering of the dynamic SVG power/regen visualization arc; telemetry state changes processed with sub-16ms UI updates matching the BLE streaming cycle.",
        operational_cost:
          "Zero server or external runtime expenses utilizing strictly direct on-device peripheral decoding and local P2P Bluetooth communication.",
      },
      star_challenges: [
        {
          situation:
            "Real-time LIN-bus master-slave communication on the Tesla Model 3 Highland requires steering wheel responses to body controller poll queries to be processed and forwarded within a strict 1-2ms response window to prevent frame timeout errors. Executing slow BLE transport, analog polling, or high-throughput CAN sniffing on a single-thread loop caused execution delays, leading to LIN response timeouts, haptic system dropouts, and vehicle communication error codes.",
          action:
            "Leveraged an asymmetric dual-core FreeRTOS C++ firmware layout on the ESP32. Locked the safety-critical, time-sensitive LIN-bus MITM transceiver listener and injector tasks directly to Core 1 using high-priority FreeRTOS task pinning, while offloading high-throughput CAN packet sniffing, analog edge-trigger checks, and BLE client streaming to Core 2.",
          result:
            "Completely isolated the physical LIN-bus MITM intercept loop from networking and display overhead, guaranteeing deterministic sub-1.5ms response forwarding with zero LIN-bus timeout errors or haptic system dropouts.",
          inline_image: "",
        },
        {
          situation:
            "Initial attempts to hijack capacitive turn signals and column commands directly on the high-speed chassis CAN-bus suffered from severe bus noise, packet collisions, and could not easily bypass or prevent the car's default factory responses to physical stalk presses.",
          action:
            "Shifted the engineering strategy to place the ESP32 directly as a physical MITM gateway on the steering wheel LIN-bus. Reverse-engineered the capacitive button touch profiles and programmed the ESP32 to selectively overwrite these packets, returning a spoofed 'idle' state to the car's body controller over LIN-bus while generating and transmitting customized commands over the high-speed CAN-bus instead.",
          result:
            "Enabled absolute control over Highland capacitive inputs—effectively remapping turn signals, wipers, and media scrolls to custom macros without triggering default factory actions or dashboard error alerts.",
          inline_image: "",
        },
        {
          situation:
            "Streaming large JSON telemetry payloads or raw packets directly via Bluetooth Low Energy saturated the characteristic bandwidth, causing packet buffering, lagging speedometers, and jerky HUD UI updates in the React Native companion app.",
          action:
            "Implemented an efficient, compacted telemetry data structure mapping compressed values directly to the BLE GATT server notification loop, coupled with a customized requestAnimationFrame-based timing interpolator in the React Native state manager.",
          result:
            "Bypassed mobile OS Bluetooth transmission buffers, delivering fluid, jitter-free dashboard telemetry updates and achieving a response lag below 16ms for real-time turn signal and power animations.",
          inline_image: "",
        },
      ],
      architectural_deep_dive: {
        text: "The platform connects a dual-core ESP32 processor to an MCP2515 CAN controller via high-speed SPI (GPIO 5 as CS) and a dual TJA1021 LIN-bus transceiver array. The LIN interface acts as a physical MITM gateway (pins 16/17 for body controller, pins 32/33 for capacitive steering assembly) to capture turn signal and stalk inputs. By returning mock idle payloads over LIN, the ESP32 overrides standard vehicle controls. For CAN integration, the controller interfaces directly with the vehicle's diagnostic port, reading high-speed telemetry frames and injecting remapped actions safely. These low-level processing domains are isolated on-chip using FreeRTOS core-affinity mapping, broadcasting dynamic state changes up to the landscape React Native cockpit HUD app over a custom BLE GATT notification service (12345678-1234-5678-1234-56789abcdef0), which concurrently transmits user customization mappings back to the transceiver controller.",
        illustration: {
          url: "https://hy13dev.com/img/teslimitless-schema.png",
          alt: "TesLimitless Asymmetric Dual-Core System Architecture Schema",
          caption:
            "Hardware and software layer separation routing Core 1 and Core 2 tasks through physical transceivers.",
        },
      },
      lessons_learned:
        "When dealing with real-time vehicle electronics integration, safety-critical bus loops must enforce strict hardware-level isolation boundaries and deterministic watchdog safety circuits using multi-core OS features like FreeRTOS before introducing high-level networking features.",
    },
  },
  {
    name: "ylya-bot",
    description:
      "An event-driven, decoupled Retrieval-Augmented Generation (RAG) agent and chat interface that acts as an interactive professional clone of Ylya Martchenko.",
    html_url: "https://github.com/HoodieYlya13/ylya-bot",
    language: "TypeScript",
    languages: ["TypeScript", "SQL"],
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "2026-05-22T12:00:00Z",
    homepage: "https://www.hy13dev.com/ylya-bot",
    portfolio: {
      routing: {
        repo_name: "ylya-bot",
        project_name: "YlyaBot",
        hero_image: "",
      },
      project_meta: {
        role: "Lead Systems Architect & AI Engineer",
        development_phase: "Production-Ready Recruiter Agent & RAG Portal",
        languages: ["TypeScript", "SQL"],
        frameworks_and_tools: [
          "Next.js 16.2.6",
          "React 19",
          "Supabase",
          "pgvector",
          "OpenAI API",
          "Vercel AI SDK",
          "Git Submodules",
          "Reciprocal Rank Fusion (RRF)",
        ],
      },
      comprehensive_description:
        "An event-driven, decoupled Retrieval-Augmented Generation (RAG) agent and chat interface that acts as an interactive professional clone of Ylya Martchenko. The system implements a dynamic Git Submodule pattern to expose the bot as a standalone module inside a core Next.js host while retaining a decoupled repository structure. Leveraging a hybrid PostgreSQL search function, the bot matches recruiting queries with microsecond latency, merging vector cosine similarity (via pgvector) and full-text token search through Reciprocal Rank Fusion to deliver perfect precision on developer frameworks, career milestones, and engineering highlights.",
      engineering_highlights: [
        "Architected a Decoupled RAG Architecture using Git Submodules to host the YlyaBot agent independently, separating presenting layers from ingestion codebases while keeping global workspace configurations clean.",
        "Designed a Hybrid Search Engine in PostgreSQL, combining text-embedding-3-small vectors with pg_trgm full-text indices to achieve high precision and general semantic flexibility.",
        "Integrated Reciprocal Rank Fusion (RRF) via PL/pgSQL database triggers to dynamically merge sparse keyword search scores with dense vector similarities, guaranteeing accurate technical keyword matching.",
        "Engineered an automated event-driven vector pipeline triggered exclusively by GitHub Actions pushes, chunking and embedding repository updates into the database with zero runtime server costs.",
        "Built a mobile-first, high-fidelity chat dashboard utilizing the Vercel AI SDK, optimizing response times to under 150ms time-to-first-token using React Server Component streaming.",
      ],
      measurable_metrics: {
        execution_latency:
          "Under 150ms time-to-first-token token streaming; sub-10ms PostgreSQL hybrid retrieval time.",
        ui_performance:
          "60 FPS responsive animations utilizing CSS theme variables and strict layout containment supporting dynamic mobile height calculations (svh).",
        operational_cost:
          "Under $0.01 per 100 recruiter conversational sessions with complete zero-dollar background database sync infrastructure.",
      },
      star_challenges: [
        {
          situation:
            "Traditional RAG pipelines require continuous polling servers or expensive always-on extraction endpoints to index portfolio data changes.",
          action:
            "Engineered an event-driven ingestion script executed purely within serverless ephemeral GitHub Actions runners, triggered instantly by code pushes.",
          result:
            "Completely eliminated runtime compute overhead and reduced system operational maintenance costs to zero.",
          inline_image: "",
        },
        {
          situation:
            "Pure vector search frequently causes precision drops when recruiters search for strict technical keywords (e.g., 'React 19' vs 'Next.js 16').",
          action:
            "Designed a custom PostgreSQL database function combining Vector Cosine Similarity with Full-Text Token search, using Reciprocal Rank Fusion (RRF) to merge ranks.",
          result:
            "Ensured 100% deterministic precision on framework matches while retaining broad conversational semantics.",
          inline_image: "",
        },
      ],
      architectural_deep_dive: {
        text: "The engine matches input queries against vectorized segments of profile.json and individual repository records. High-fidelity embedding is achieved via text-embedding-3-small (1536 dimensions), which is stored and indexed in a Supabase PostgreSQL instance using pgvector. Recruiter chat events are processed by standard Edge Routes, combining standard system instructions with relevant semantic snippets retrieved via our database hybrid ranking hook.",
        illustration: null,
      },
      lessons_learned:
        "Injecting structural key data (like languages or contact details) directly into system contexts guarantees deterministic truth, while keeping semantic RAG strictly for project implementation logs yields the highest conversational coherence.",
    },
  },
  {
    name: "codemafia",
    description:
      "A modern, reverse-engineered revival of Code Mafia. Built with Next.js 16, React 19, Tailwind v4, WebSockets (PartyKit), and in-browser Python (Pyodide).",
    html_url: "https://github.com/HoodieYlya13/codemafia",
    language: "TypeScript",
    languages: ["TypeScript", "Python"],
    stargazers_count: 4,
    forks_count: 1,
    fork: false,
    updated_at: "2026-05-11T12:00:00Z",
    homepage: "https://vibecoder.hy13dev.com",
    portfolio: {
      routing: {
        repo_name: "codemafia",
        project_name: "Vibe Coder",
        hero_image: "",
      },
      project_meta: {
        role: "Solo Creator & Reverse-Engineer",
        development_phase: "Production-Ready Multiplayer Revival",
        languages: ["TypeScript", "Python"],
        frameworks_and_tools: [
          "Next.js 16.2.4",
          "React 19.2.4",
          "Tailwind CSS v4",
          "React Compiler",
          "PartyKit",
          "PartySocket (Reconnecting Socket API)",
          "Zustand",
          "Yjs CRDTs",
          "HTML5 Web Workers API",
          "Pyodide (WebAssembly)",
          "Monaco Editor",
          "Framer Motion",
          "Retro Pixel-Art CSS Animation Engine",
        ],
      },
      comprehensive_description:
        "A high-performance multiplayer social deduction game for developers supporting up to 20 concurrent users per lobby. Rebuilt from the ground up by reverse-engineering obfuscated, minified legacy production web assets retrieved from the Wayback Machine. The project was engineered specifically as an interactive, custom collaborative icebreaker built to engage my corporate team and host a live multiplayer gaming session during the end of our spring sprint retrospective and planning meeting. The platform integrates real-time state synchronization, collaborative coding environments using conflict-free replicated data types (CRDTs), and client-side, sandboxed execution of user-submitted code.",
      engineering_highlights: [
        "Reverse-Engineered Legacy Assets: Dissected minified production bundles from Internet Archive Wayback Machine mirrors to recover game state transition logic, Python level schemas, and sabotage verification cases.",
        "Multiplexed Event Protocol: Engineered a custom hybrid socket layer that multiplexes Zustand global game state updates, presence tracking, and Monaco editor Yjs CRDT document sync events into a single JSON-based PartyKit channel.",
        "Sandboxed Client-Side Execution: Integrated Pyodide WebAssembly to execute Python validations and unit tests in-browser, achieving zero remote code execution (RCE) vulnerabilities and zero cloud hosting costs.",
        "Watchdog Thread Isolation: Developed a dedicated Web Worker wrapper for Pyodide with an active 5-second supervisor watchdog that terminates and regenerates the thread to handle infinite loop exploits gracefully.",
        "Multiplayer Collision Interception: Intercepted Monaco Editor commands to deactivate high-risk keyboard shortcuts (e.g. Cmd+A select all, mass undo/redo, cut, search-replace), blocking collaborative text degradation during concurrent edits.",
        "Dynamic Remote Cursors: Designed a low-overhead decoration engine rendering custom CSS-styled remote cursors colored dynamically per player, including real-time floating name tags, without dropping visual frame rates.",
      ],
      measurable_metrics: {
        execution_latency:
          "0ms server round-trip execution latency for user-written Python code due to in-browser WebAssembly compilation.",
        ui_performance:
          "Sustained a lock-tight 60 FPS frame rate by isolating Yjs delta processing and Pyodide Wasm execution entirely within background Web Worker threads.",
        operational_cost:
          "Zero cloud database or isolated sandboxing cost, enabling infinite horizontal scalability without server-side overhead.",
      },
      star_challenges: [
        {
          situation:
            "The original source code was completely lost, leaving behind only minified, compressed, and obfuscated client assets on Wayback Machine archive mirrors.",
          action:
            "Systematically mapped obfuscated variable names, reverse-engineered the core state machine, restored the level and sabotage test mechanics, and refactored the UI into a clean, modern Next.js 16 + React 19 codebase.",
          result:
            "Successfully revived and modernized a lost social deduction game, establishing a robust, fully-typed source-available architecture running concurrent React 19.",
          inline_image: "",
        },
        {
          situation:
            "Standard binary-over-WebSocket Yjs collaboration crashed on Cloudflare edge proxy routing when transferring large document updates due to token frame truncation.",
          action:
            "Constructed a custom serialization protocol that encodes binary Yjs update buffers into standard JSON number arrays and routes them as standard messages through the unified PartyKit socket.",
          result:
            "Bypassed Cloudflare's binary proxy limits entirely, enabling highly stable real-time document synchronization with zero packet truncation anomalies and zero extra socket connections.",
          inline_image: "",
        },
        {
          situation:
            "Standard collaborative coding platforms are highly vulnerable to concurrent text desynchronizations or destructive edits (e.g., players selecting all text and deleting it, or spamming global undo), rendering multiplayer gameplay impossible.",
          action:
            "Hijacked Monaco Editor's underlying command registry on initialization, systematically disabling global keyboard actions (Undo, Redo, Cut, Select All, Select All Occurrences, and Find-and-Replace) and confining actions to localized ranges.",
          result:
            "Guaranteed lobby stability and continuous playability for up to 20 active developers typing in the same shared Monaco instance, completely preventing editor lockouts and accidental text wipes.",
          inline_image: "",
        },
      ],
      architectural_deep_dive: {
        text: "The system uses Next.js 16 and Zustand for frontend presentation, communicating with a PartyKit WebSocket server. Real-time document syncing is handled by Monaco Editor linked to a local Y.Doc text node. Document updates are serialized as JSON and multiplexed inside the single game socket connection. Python compilation and unit testing are offloaded to Pyodide (running inside a sandboxed Web Worker), featuring a custom supervisor hook that automatically terminates and restarts the worker thread when an infinite loop or runaway calculation is detected.",
        illustration: {
          url: "https://img.youtube.com/vi/sFrKx15_XEM/0.jpg",
          alt: "Vibe Coder Original Design Concept Video Thumbnail",
          caption:
            "The original conceptual design layout and gameplay flow of Code Mafia, which served as the primary specification for this high-fidelity revival.",
        },
      },
      lessons_learned:
        "Offloading complex WebAssembly operations (like Pyodide compilation) and real-time serialization tasks to background Web Workers is essential for modern web applications. Executing these operations on the main UI thread immediately disrupts the React rendering pipeline and drops frames. Furthermore, implementing active thread watchdogs is crucial to preventing user-submitted infinite loops from freezing the browser.",
    },
  },
];

const FALLBACK_PINNED_NAMES = ["teslimitless", "ylya-bot", "codemafia"];

function sanitizeContent<T>(obj: T): T {
  if (typeof obj === "string") {
    let sanitized = obj.replace(/\\n/g, "\n");
    const hy13Regex = /https?:\/\/(?:[a-zA-Z0-9-]+\.)*hy13dev\.com\/?/gi;
    if (hy13Regex.test(sanitized))
      sanitized = sanitized.replace(hy13Regex, () => "/").replace(/\/+/g, "/");
    return sanitized as unknown as T;
  }
  if (Array.isArray(obj))
    return obj.map((item) => sanitizeContent(item)) as unknown as T;
  if (obj !== null && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    const objAsRecord = obj as Record<string, unknown>;
    for (const key in objAsRecord)
      if (Object.prototype.hasOwnProperty.call(objAsRecord, key))
        result[key] = sanitizeContent(objAsRecord[key]);
    return result as T;
  }
  return obj;
}

async function fetchPortfolio(
  username: string,
  repoName: string,
  headers: Record<string, string>,
): Promise<PortfolioProject | null> {
  const branches = ["main", "master"];
  for (const branch of branches) {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/portfolio.json`,
      );
      if (res.ok) {
        const json = await res.json();
        if (json && json.routing && json.project_meta)
          return sanitizeContent(json) as PortfolioProject;
      }
    } catch {
      // Continue to next branch
    }
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/contents/portfolio.json`,
      {
        headers: {
          ...headers,
          Accept: "application/vnd.github.v3.raw",
        },
      },
    );
    if (res.ok) {
      const json = await res.json();
      if (json && json.routing && json.project_meta)
        return sanitizeContent(json) as PortfolioProject;
    }
  } catch {
    // Ignore
  }

  return null;
}

export async function getGithubData() {
  "use cache";
  cacheLife("hours");

  const username = "HoodieYlya13";
  const headers: Record<string, string> = {
    "User-Agent": "portfolio-app-nextjs",
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  if (process.env.GITHUB_TOKEN)
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;

  let targetPinnedNames = FALLBACK_PINNED_NAMES;
  let targetHonorableNames: string[] = [];
  try {
    const profileJson = await getFullProfile();
    if (profileJson) {
      if (profileJson.repositories) {
        if (profileJson.repositories.pinned_repositories)
          targetPinnedNames = profileJson.repositories.pinned_repositories;
        if (profileJson.repositories.honorable_mentions_repositories)
          targetHonorableNames =
            profileJson.repositories.honorable_mentions_repositories;
      } else if (profileJson.pinned_repositories)
        targetPinnedNames = profileJson.pinned_repositories;
    }
  } catch (e) {
    console.warn(
      "Failed retrieving dynamic repositories lists from profile.json, applying default keys fallback.",
      e,
    );
  }

  const lowercasePins = targetPinnedNames.map((name) => name.toLowerCase());
  const lowercaseHonorable = targetHonorableNames.map((name) =>
    name.toLowerCase(),
  );

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        {
          headers,
        },
      ),
    ]);

    if (!profileRes.ok || !reposRes.ok)
      throw new Error(
        `GitHub API returned status: ${profileRes.status} / ${reposRes.status}`,
      );

    const profileData = await profileRes.json();
    const reposData = (await reposRes.json()) as Array<{
      name: string;
      description: string | null;
      html_url: string;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      updated_at: string;
      fork: boolean;
      homepage?: string | null;
    }>;

    const repoPromises = reposData.map(async (repo) => {
      try {
        const portfolio = await fetchPortfolio(username, repo.name, headers);
        if (!portfolio) return null;

        return {
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          language: portfolio.project_meta.languages[0] || repo.language,
          languages: portfolio.project_meta.languages,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          fork: repo.fork,
          updated_at: repo.updated_at,
          homepage: repo.homepage || null,
          portfolio,
        } as Repository;
      } catch (error) {
        console.warn(`Failed parsing portfolio.json for ${repo.name}:`, error);
        return null;
      }
    });

    const resolvedRepos = await Promise.all(repoPromises);
    const allMappedRepos = resolvedRepos.filter(
      (r): r is Repository => r !== null,
    );

    const pinnedRepositories = allMappedRepos
      .filter((repo) => lowercasePins.includes(repo.name.toLowerCase()))
      .sort(
        (a, b) =>
          lowercasePins.indexOf(a.name.toLowerCase()) -
          lowercasePins.indexOf(b.name.toLowerCase()),
      );

    const honorableRepositories = allMappedRepos
      .filter((repo) => lowercaseHonorable.includes(repo.name.toLowerCase()))
      .sort(
        (a, b) =>
          lowercaseHonorable.indexOf(a.name.toLowerCase()) -
          lowercaseHonorable.indexOf(b.name.toLowerCase()),
      );

    const remainingRepositories = allMappedRepos.filter(
      (repo) =>
        !lowercasePins.includes(repo.name.toLowerCase()) &&
        !lowercaseHonorable.includes(repo.name.toLowerCase()),
    );

    return sanitizeContent({
      profile: {
        username: profileData.login,
        name: profileData.name || FALLBACK_PROFILE.name,
        headline: profileData.bio || FALLBACK_PROFILE.headline,
        followers: profileData.followers,
        following: profileData.following,
        website: profileData.blog || FALLBACK_PROFILE.website,
        linkedIn: FALLBACK_PROFILE.linkedIn,
        githubUrl: profileData.html_url,
        public_repos: profileData.public_repos,
      } as GithubProfile,
      pinnedRepositories,
      honorableRepositories,
      repositories: remainingRepositories,
      isLive: true,
    });
  } catch (error) {
    console.error(
      "Failed fetching live GitHub data, falling back to static:",
      error,
    );

    const fallbackPinned = FALLBACK_REPOS.filter((repo) =>
      lowercasePins.includes(repo.name.toLowerCase()),
    ).sort(
      (a, b) =>
        lowercasePins.indexOf(a.name.toLowerCase()) -
        lowercasePins.indexOf(b.name.toLowerCase()),
    );

    const fallbackHonorable = FALLBACK_REPOS.filter((repo) =>
      lowercaseHonorable.includes(repo.name.toLowerCase()),
    ).sort(
      (a, b) =>
        lowercaseHonorable.indexOf(a.name.toLowerCase()) -
        lowercaseHonorable.indexOf(b.name.toLowerCase()),
    );

    const fallbackRemaining = FALLBACK_REPOS.filter(
      (repo) =>
        !lowercasePins.includes(repo.name.toLowerCase()) &&
        !lowercaseHonorable.includes(repo.name.toLowerCase()),
    );

    return sanitizeContent({
      profile: FALLBACK_PROFILE,
      pinnedRepositories: fallbackPinned,
      honorableRepositories: fallbackHonorable,
      repositories: fallbackRemaining,
      isLive: false,
    });
  }
}

export async function getGithubRepo(name: string) {
  "use cache";
  cacheLife("hours");

  const username = "HoodieYlya13";
  const headers: Record<string, string> = {
    "User-Agent": "portfolio-app-nextjs",
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  if (process.env.GITHUB_TOKEN)
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;

  try {
    const [repoRes, portfolio] = await Promise.all([
      fetch(`https://api.github.com/repos/${username}/${name}`, {
        headers,
      }),
      fetchPortfolio(username, name, headers),
    ]);

    if (!repoRes.ok || !portfolio)
      throw new Error(
        `Failed to retrieve data. Repo metadata status: ${repoRes.status}. Portfolio parsed: ${!!portfolio}`,
      );

    const repo = await repoRes.json();

    return sanitizeContent({
      repo: {
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: portfolio.project_meta.languages[0] || repo.language,
        languages: portfolio.project_meta.languages,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        fork: repo.fork,
        updated_at: repo.updated_at,
        homepage: repo.homepage || null,
        portfolio,
      } as Repository,
      isLive: true,
    });
  } catch (error) {
    console.error(`Failed fetching live repo ${name}, using static:`, error);
    const fallback = FALLBACK_REPOS.find(
      (r) => r.name.toLowerCase() === name.toLowerCase(),
    );
    return sanitizeContent({
      repo: fallback || null,
      isLive: false,
    });
  }
}

export interface FullProfileData {
  identity: {
    full_name: string;
    birthday: string;
    nationality: string;
    current_location: string;
    current_status: string;
    coding_experience_since: number;
  };
  hero_marquee: string[];
  communication: {
    languages: Array<{
      name: string;
      cefr: string;
      label: string;
    }>;
    channels: Array<{
      platform: string;
      value: string;
      icon: string;
    }>;
    links: {
      live_portfolio: string;
      downloadable_resume: string;
    };
  };
  placement_preferences: {
    target_regions: string[];
    preference: string;
    technical_domains: string[];
  };
  skills_matrix: {
    primary_web_stack: string[];
    backend_and_data: string[];
    polyglot_languages: string[];
    devops_and_systems: string[];
    ai_engineering: string[];
    ecosystem_tools: string[];
    leadership_traits: string[];
  };
  timeline_engineering: Array<{
    range: string;
    role: string;
    company: string;
    location: string;
    bullets: string[];
    main?: boolean;
    meta?: {
      project_url: string;
      note: string;
    };
  }>;
  timeline_foundational: Array<{
    range: string;
    role: string;
    company: string;
    location: string;
    bullets: string[];
  }>;
  academic_history: Array<{
    range: string;
    degree: string;
    institution: string;
    location: string;
    summary: string;
    main?: boolean;
  }>;
  pinned_repositories?: string[];
  repositories?: {
    pinned_repositories?: string[];
    honorable_mentions_repositories?: string[];
  };
}

let cachedProfile: FullProfileData | null = null;
let lastFetched = 0;
const CACHE_TTL = 1000 * 60 * 60;

export async function getFullProfile(): Promise<FullProfileData | null> {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    try {
      return sanitizeContent(localProfile);
    } catch {
      return null;
    }
  }

  const now = Date.now();

  if (cachedProfile && now - lastFetched < CACHE_TTL) return cachedProfile;

  const remoteUrl =
    "https://raw.githubusercontent.com/HoodieYlya13/HoodieYlya13/main/profile.json";

  if (cachedProfile) {
    fetch(remoteUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        cachedProfile = sanitizeContent(data);
        lastFetched = Date.now();
        console.log(
          "⚡ [getFullProfile] Memory cache refreshed in background.",
        );
      })
      .catch((err) => {
        console.warn(
          "⚠️ [getFullProfile] Background cache refresh failed, using stale data:",
          err.message,
        );
      });
    return cachedProfile;
  }

  console.log(
    "⚡ [getFullProfile] Cache empty. Fetching fresh profile from GitHub raw...",
  );
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(remoteUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    cachedProfile = sanitizeContent(data);
    lastFetched = Date.now();
    console.log(
      "✅ [getFullProfile] Fresh profile retrieved and cached on cold start.",
    );
    return cachedProfile;
  } catch (error) {
    console.warn(
      "⚠️ [getFullProfile] Cold start fetch failed, falling back to local file:",
      error instanceof Error ? error.message : String(error),
    );
    try {
      return sanitizeContent(localProfile);
    } catch {
      return null;
    }
  }
}
