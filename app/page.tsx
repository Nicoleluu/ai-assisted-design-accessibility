"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CSS3DObject, CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";

type Canvas = {
  id: string;
  act: string;
  title: string;
  statement: string;
  details?: string[];
  visual: string;
};

const canvases: Canvas[] = [
  {
    id: "question",
    act: "Question",
    title: "Does access to an AI tool provide access to design?",
    statement: "Access to production does not automatically create access to knowledge, judgment, or participation.",
    visual: "Completed opening composition.",
  },
  {
    id: "experiment",
    act: "Encounter",
    title: "Let’s design a physical product.",
    statement: "A person without formal design training asks a general AI chatbot for help. The system generates a concept, and the result appears complete.",
    details: ["A learner wants to design", "They ask a chatbot", "The system generates", "The result appears complete"],
    visual: "Workshop recording and generated chair outcome will be placed here.",
  },
  {
    id: "compression",
    act: "Problem",
    title: "Design is not a one direction sequence.",
    statement: "AI can move rapidly from request to result. Opportunities for research, judgment, experimentation, and learning can disappear.",
    visual: "A compressed AI sequence is compared with an interactive field of possible design processes.",
  },
  {
    id: "investigation",
    act: "Problem",
    title: "What am I actually investigating?",
    statement: "General purpose AI can produce the appearance of a designed object without helping someone develop the knowledge and judgment involved in designing it.",
    details: ["Person", "General purpose AI chatbot", "Design process", "Generated outcome"],
    visual: "A four part system locates the project between the learner, chatbot, process, and outcome.",
  },
  {
    id: "situated",
    act: "Position",
    title: "Why is this question situated?",
    statement: "Where a person lives and what surrounds them can influence which forms of design knowledge, education, mentorship, and material experience are available.",
    details: ["Location", "Language", "Family support", "Social class", "Prior education", "Time and money"],
    visual: "An interactive resource map reveals differences in exposure and resource density.",
  },
  {
    id: "lenses",
    act: "Position",
    title: "Five ideas organize how I investigate the problem.",
    statement: "The lenses connect unequal resource environments, design learning, and human participation in AI supported creation.",
    visual: "A conceptual relationship map connects five research lenses to five intersecting fields.",
  },
  {
    id: "lineage",
    act: "Context",
    title: "The project sits between two histories of learning.",
    statement: "One trajectory follows how people learn design. The other follows how people learn with computational systems.",
    visual: "Two historical trajectories approach one unresolved question about AI learning environments for physical product design.",
  },
  {
    id: "community",
    act: "Context",
    title: "Different communities help me understand different parts of the question.",
    statement: "The archive connects critical AI research, design pedagogy, and AI supported learning tools while revealing a missing space between them.",
    visual: "A moving horizontal precedent archive centers and explains one project at a time.",
  },
  {
    id: "capstone",
    act: "Direction",
    title: "A potential capstone could investigate AI as a guide rather than the designer.",
    statement: "I may investigate an AI supported environment that helps self directed learners develop a design process without immediately generating a finished outcome.",
    visual: "A provisional system diagram combines future methods, challenges, evidence, and previous experiments.",
  },
  {
    id: "return",
    act: "Return",
    title: "What would it mean for AI to make the process of design accessible, not only the outcome?",
    statement: "The answer depends on what the learner is able to investigate, understand, question, decide, and carry forward.",
    visual: "The opening question returns with traces of the conditions revealed throughout the presentation.",
  },
];

const processTerms = [
  "observe", "research", "interview", "context", "frame", "question", "sketch", "compare",
  "prototype", "test", "fail", "revise", "critique", "judge", "decide", "reflect",
  "wood", "metal", "textile", "ceramic", "plastic", "joinery", "casting", "weaving",
  "ergonomics", "accessibility", "sustainability", "culture", "function", "form", "system", "service",
  "minimalism", "speculation", "participation", "responsibility"
  , "user research", "field study", "ideation", "co design", "mapping", "storyboarding",
  "modeling", "rendering", "simulation", "iteration", "fabrication", "repair", "maintenance",
  "assembly", "disassembly", "modularity", "scale", "proportion", "color", "texture", "pattern",
  "typography", "interface", "affordance", "behavior", "emotion", "ethics", "equity", "inclusion",
  "circularity", "life cycle", "systems thinking", "biomimicry", "craft", "manufacturing", "coding",
  "sensing", "documentation", "visualization", "material testing", "scenario", "workshop", "survey",
  "analysis", "synthesis", "constraint", "opportunity", "community", "collaboration"
];
const mapResources = ["school", "museum", "exhibition", "studio", "mentor", "workshop", "maker space", "materials", "design company", "employment", "event", "affordable education"];
const lensData = [
  ["Design agency", "Can the learner direct and take responsibility for decisions?"],
  ["Design literacy", "Can the learner understand and evaluate design?"],
  ["Situated learning", "Does learning connect to real people, materials, and contexts?"],
  ["Human and AI collaboration", "What should the person do, and what should the system do?"],
  ["Equitable participation", "Who has a meaningful opportunity to learn and participate?"],
];

const precedents = [
  {
    name: "AI Now Institute",
    category: "Critical AI and public interest",
    layout: "institution",
    media: ["Selected publication cover"],
    sections: [
      ["Who They Are", "An independent research institute studying artificial intelligence in the public interest, with attention to power, inequality, accountability, labor, and institutions."],
      ["What They Do", "AI Now examines the companies, infrastructures, resources, policies, and social conditions that determine how AI is developed and who can participate."],
      ["Selected Work", "A New AI Lexicon: Power examines how expensive computing, education, funding, and institutional support limit meaningful participation even when code is publicly available."],
      ["Relationship to My Project", "It helps me distinguish access to an AI tool from access to the knowledge, methods, critique, materials, examples, and mentorship needed to use it meaningfully."],
    ],
    connection: "Availability does not automatically create meaningful participation.",
  },
  {
    name: "NotebookLM",
    category: "AI supported learning tool",
    layout: "sources",
    media: ["Source and response interface"],
    sections: [
      ["What It Is", "An AI research and learning platform developed by Google. Users build a personal knowledge environment from documents, websites, videos, audio, and notes."],
      ["What It Does", "NotebookLM helps users question, organize, and understand selected sources through cited responses, study guides, mind maps, audio overviews, flashcards, and quizzes."],
      ["Selected Feature", "Source Grounding links answers back to user selected material, supporting inquiry and understanding instead of only generating an outcome."],
      ["Relationship to My Project", "It inspires a learning focused approach, but assumes users already know which sources they need. My project asks how AI might guide people who do not yet have design knowledge or precedents."],
    ],
    connection: "AI can guide a learning process rather than complete the work for the user.",
  },
  {
    name: "AI Design Guide",
    category: "Design learning",
    layout: "mosaic",
    media: ["Learning path interface", "Guide and resource detail"],
    sections: [
      ["What It Is", "A learning platform created by designer Romina Kavcic that provides practical resources for designers working with AI and agentic design tools."],
      ["What It Does", "It organizes guides, prompts, templates, tool reviews, design system references, and interactive resources for professional design workflows."],
      ["Selected Feature", "Structured Learning Paths turn related guides and exercises into a repeatable sequence of learning, applying, evaluating, and saving what worked."],
      ["Relationship to My Project", "It shows how AI knowledge can connect to real design work, but it primarily serves people who already understand design. My project begins before that knowledge exists."],
    ],
    connection: "Guidance must respond to what the learner already knows.",
  },
  {
    name: "Duolingo",
    category: "AI supported learning tool",
    layout: "practice",
    media: ["AI Roleplay conversation"],
    sections: [
      ["What It Is", "A digital education platform that teaches languages through short interactive lessons, curriculum design, learning science, personalization, and game mechanics."],
      ["What It Does", "Duolingo uses a structured path that introduces skills gradually, responds to mistakes, adjusts difficulty, and provides repeated practice."],
      ["Selected Feature", "AI Roleplay places learners in real world scenarios, responds to their choices, and provides feedback. The AI creates a space to practice instead of performing the skill for them."],
      ["Relationship to My Project", "It demonstrates guided practice, feedback, and adaptation. Unlike language learning, design has no single correct answer, so my project must support different processes without fixing the outcome."],
    ],
    connection: "AI can create conditions for practice while keeping the learner responsible.",
  },
  {
    name: "People + AI Guidebook",
    category: "Human centered AI design",
    layout: "guidebook",
    media: ["Guidebook pages", "Feedback and control diagram"],
    sections: [
      ["Who It Is", "Google’s People + AI Research team studies relationships between people and artificial intelligence through research, tools, and design frameworks."],
      ["What It Does", "PAIR helps designers create AI products around human needs, addressing control, trust, explainability, feedback, data, and system failure."],
      ["Selected Work", "The People + AI Guidebook follows the AI product development process from identifying user needs to designing feedback, control, and graceful failure."],
      ["Relationship to My Project", "Its distinction between automation and augmentation supports an AI that guides rather than replaces design. Feedback + Control helps define how learners retain responsibility and influence the system."],
    ],
    connection: "The learner and the system should distribute control without removing human responsibility.",
  },
  {
    name: "Data & Society",
    category: "Critical AI and public participation",
    layout: "participation",
    media: ["Policy brief cover"],
    sections: [
      ["Who They Are", "An independent nonprofit research institute studying the social implications of data, automation, and artificial intelligence through the experiences of affected people and communities."],
      ["What They Do", "Data & Society produces research, policy guidance, public programs, and educational resources. It studies technology within existing social conditions and asks who participates, whose knowledge is valued, and who is affected."],
      ["Selected Work", "Democratizing AI: Principles for Meaningful Public Participation by Michele Gilman, 2023, argues that affected people need real influence throughout AI design and deployment, not symbolic feedback after decisions are made."],
      ["Relationship to My Project", "Entering a prompt may look like participation while the system still makes most design decisions. This precedent defines meaningful participation through the knowledge, support, and agency to understand and influence a process."],
    ],
    connection: "Participation means more than providing an initial input. A person must be able to understand, influence, and take responsibility for the process.",
  },
];

function ExperimentVisual() {
  return <div className="experiment-study">
    <h1>Let’s design a physical product.</h1>
    <div className="experiment-media experiment-video">
      <video autoPlay muted loop playsInline preload="auto" aria-label="An AI chatbot conversation about designing a chair">
        <source src="/canvas-02-texting-study-10s.mp4" type="video/mp4" />
      </video>
    </div>
    <div className="experiment-media experiment-outcome">
      <img src="/canvas-02-generated-chair.png" alt="The Walden accent chair concept and construction overview generated by AI" />
    </div>
    <p>An object was generated. What design process occurred?</p>
  </div>;
}

function CompressionVisual() {
  return <div className="compression-study">
    <div className="linear-path">{["Request", "Prompt", "Generated proposal", "Finished image"].map((step, i) => <div key={step}><span>0{i + 1}</span><b>{step}</b><em>{["Who investigated the context?", "Who framed the question?", "Who evaluated quality?", "What did the learner take away?"][i]}</em></div>)}</div>
    <div className="process-web"><p>MOVE THROUGH THE FIELD</p>{processTerms.map((term, index) => <button key={term} style={{ "--x": `${8 + (index * 37) % 82}%`, "--y": `${10 + (index * 47) % 78}%` } as React.CSSProperties}>{term}</button>)}</div>
  </div>;
}

function CompressionCanvas() {
  const steps = ["Request", "Prompt", "Generated proposal", "Finished image"];
  const questions = ["Who investigated the context?", "Who evaluated the quality?", "Who made the design decisions?", "What did the learner take away?"];
  return <div className="compression-canvas">
    <p className="compression-support">AI can move rapidly from request to result. Opportunities for research, judgment, experimentation, and learning can disappear.</p>
    <div className="linear-path">{steps.map((step, i) => <div key={step}><span>0{i + 1}</span><b>{step}</b><em>{questions[i]}</em></div>)}</div>
    <h1>Design is not a one direction sequence.</h1>
    <ForceProcessWeb />
  </div>;
}

function SituatedCanvas() {
  return <div className="situated-canvas">
    <p>Where a person lives and what surrounds them can influence which forms of design knowledge, education, mentorship, and material experience are available.</p>
    <iframe
      src="https://nicoleluu.github.io/design-resources-nyc/?v=fa1f52c"
      title="Design resources in New York City"
      loading="eager"
    />
  </div>;
}

function ForceProcessWeb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    type Node = { x: number; y: number; anchorX: number; anchorY: number; vx: number; vy: number; term: string };
    type Link = { source: number; target: number };
    let width = 1;
    let height = 1;
    let frame = 0;
    let tick = 0;
    let previousTime = 0;
    let active = -1;
    let pointer = { x: -1000, y: -1000 };
    let nodes: Node[] = [];
    const links: Link[] = processTerms.slice(1).map((_, index) => ({ source: index + 1, target: Math.floor(index / 2) }));

    const reset = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      nodes = processTerms.map((term, index) => {
        const angle = index * 2.399963;
        const radius = Math.sqrt((index + .6) / processTerms.length) * Math.min(width, height) * .34;
        const anchorX = width / 2 + Math.cos(angle) * radius;
        const anchorY = height / 2 + Math.sin(angle) * radius;
        return { x: anchorX, y: anchorY, anchorX, anchorY, vx: 0, vy: 0, term };
      });
    };

    const displayedPosition = (node: Node, index: number) => {
      const angle = tick * .22;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const independentX = Math.max(-12, Math.min(12, node.x - node.anchorX));
      const independentY = Math.max(-12, Math.min(12, node.y - node.anchorY));
      const dx = node.anchorX - width / 2 + independentX;
      const dy = node.anchorY - height / 2 + independentY;
      const floatAngle = tick * (.34 + (index % 7) * .035) + index * 1.618;
      const floatRadius = 3 + (index % 5) * .9;
      return {
        x: width / 2 + dx * cosine - dy * sine + Math.cos(floatAngle) * floatRadius,
        y: height / 2 + dx * sine + dy * cosine + Math.sin(floatAngle * 1.13) * floatRadius
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      let nearest = -1;
      let distance = 34;
      nodes.forEach((node, index) => {
        const shown = displayedPosition(node, index);
        const current = Math.hypot(shown.x - pointer.x, shown.y - pointer.y);
        if (current < distance) { distance = current; nearest = index; }
      });
      active = nearest;
    };
    const onPointerLeave = () => { active = -1; pointer = { x: -1000, y: -1000 }; };

    const draw = (time = 0) => {
      const elapsed = previousTime ? Math.min(32, time - previousTime) : 16;
      previousTime = time;
      tick += elapsed * .001;
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          const squared = Math.max(80, dx * dx + dy * dy);
          const force = 16 / squared;
          dx *= force;
          dy *= force;
          a.vx -= dx; a.vy -= dy;
          b.vx += dx; b.vy += dy;
        }
      }

      links.forEach(link => {
        const a = nodes[link.source];
        const b = nodes[link.target];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const pull = (distance - 58) * .00042;
        a.vx += dx * pull; a.vy += dy * pull;
        b.vx -= dx * pull; b.vy -= dy * pull;
      });

      nodes.forEach((node, index) => {
        const anchorPullX = node.anchorX - node.x;
        const anchorPullY = node.anchorY - node.y;
        node.vx += anchorPullX * .00115 + Math.sin(tick * 1.3 + index * .67) * .018;
        node.vy += anchorPullY * .00115 + Math.cos(tick * 1.1 + index * .53) * .018;
        node.vx *= .945; node.vy *= .945;
        node.x += node.vx;
        node.y += node.vy;
      });

      context.lineWidth = 1;
      context.strokeStyle = "rgba(233,233,228,.13)";
      links.forEach(link => {
        const source = displayedPosition(nodes[link.source], link.source);
        const target = displayedPosition(nodes[link.target], link.target);
        context.beginPath();
        context.moveTo(source.x, source.y);
        context.lineTo(target.x, target.y);
        context.stroke();
      });

      nodes.forEach((node, index) => {
        const shown = displayedPosition(node, index);
        const selected = index === active;
        const radius = selected ? 12 : 3.5;
        if (selected) {
          context.beginPath();
          context.arc(shown.x, shown.y, 25, 0, Math.PI * 2);
          context.fillStyle = "rgba(255,255,255,.06)";
          context.fill();
        }
        context.beginPath();
        context.arc(shown.x, shown.y, radius, 0, Math.PI * 2);
        context.fillStyle = selected ? "#f0f0eb" : "rgba(233,233,228,.58)";
        context.fill();
        if (selected) {
          context.font = '500 15px "Helvetica Neue", Arial, sans-serif';
          context.textAlign = "center";
          context.textBaseline = "bottom";
          context.fillStyle = "#f0f0eb";
          context.fillText(node.term, shown.x, shown.y - 18);
        }
      });

      frame = requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(reset);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    reset();
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <div className="force-process-web">
    <canvas ref={canvasRef} aria-label="Interactive network of design processes, materials, methods, styles, and concerns" />
    <ul className="sr-only">{processTerms.map(term => <li key={term}>{term}</li>)}</ul>
  </div>;
}

function InvestigationVisual() {
  const nodes = ["Person", "AI chatbot", "Design process", "Generated outcome"];
  return <div className="investigation-system">{nodes.map((node, i) => <div key={node} className={`system-node node-${i + 1}`}><span>0{i + 1}</span><b>{node}</b></div>)}<i className="link-one" /><i className="link-two" /><strong>How do chatbots shape the design process of people without formal design training?</strong><small>How might AI support learning without making important decisions for the learner?</small></div>;
}

function ResourceMap() {
  return <div className="resource-map">
    <svg viewBox="0 0 900 560" preserveAspectRatio="none"><path d="M20 420 C140 170 260 480 370 245 S610 60 880 190" /><path d="M70 70 C260 110 300 370 520 430 S720 320 885 500" /><path d="M25 270 C190 340 270 80 470 145 S660 420 890 320" /></svg>
    {mapResources.map((resource, index) => <button key={resource} style={{ left: `${6 + (index * 41) % 88}%`, top: `${9 + (index * 31) % 78}%` }}><i /><span><b>{resource}</b><small>Location / cost / language / source / date</small></span></button>)}
    <div className="map-legend"><span>RESOURCE DENSITY</span><span>CURSOR AS SEARCHLIGHT</span></div>
    <div className="stakeholders">{["learners", "families", "educators", "designers", "local industries", "AI companies", "communities", "product users"].map(x => <span key={x}>{x}</span>)}</div>
  </div>;
}

function LensesVisual() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<SVGSVGElement | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const fields = ["Physical product design", "Design education", "Human computer interaction", "AI literacy", "Computational design"];
  const items = [...lensData.map(([name]) => name), ...fields, "AI supported learning for physical product design"];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 1, 3000);
    camera.position.z = 1050;
    const renderer = new CSS3DRenderer();
    renderer.setSize(width, height);
    renderer.domElement.className = "lenses-three-stage";
    mount.appendChild(renderer.domElement);
    const group = new THREE.Group();
    scene.add(group);

    const links: Record<number, number[]> = { 0: [5, 7, 9], 1: [6, 8], 2: [5, 6, 7], 3: [7, 8, 9], 4: [6, 7, 8] };
    const objects: CSS3DObject[] = [];
    const elements: HTMLButtonElement[] = [];
    const targets = [[], [], []] as THREE.Vector3[][];
    const lensMap = [[-275,-125],[-90,-175],[100,-115],[-200,125],[175,130]];
    const fieldMap = [[-390,20],[-300,225],[0,235],[315,210],[390,-20]];
    const linkElements: Array<{ lens: number; source: number; target: number; line: SVGLineElement }> = [];
    let activeLens = -1;
    let pinnedLens = -1;
    Object.entries(links).forEach(([lensKey, related]) => {
      const lens = Number(lensKey);
      [...related, 10].forEach(target => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.classList.add("lens-relationship-line");
        linksRef.current?.appendChild(line);
        linkElements.push({ lens, source: lens, target, line });
      });
    });

    items.forEach((label, index) => {
      const element = document.createElement("button");
      element.type = "button";
      element.className = `lens-three-card ${index < 5 ? "is-lens" : index < 10 ? "is-field" : "is-center"}`;
      element.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><b>${label}</b>`;
      element.setAttribute("aria-label", label);
      const object = new CSS3DObject(element);
      object.position.set((Math.random() - .5) * 900, (Math.random() - .5) * 520, (Math.random() - .5) * 420);
      group.add(object);
      objects.push(object);
      elements.push(element);

      targets[0].push(new THREE.Vector3((Math.random() - .5) * 860, (Math.random() - .5) * 470, (Math.random() - .5) * 320));
      if (index < 5) targets[1].push(new THREE.Vector3(lensMap[index][0], lensMap[index][1], 40));
      else if (index < 10) targets[1].push(new THREE.Vector3(fieldMap[index - 5][0], fieldMap[index - 5][1], -55));
      else targets[1].push(new THREE.Vector3(0, 0, 110));
      const cluster = index < 5 ? index : index < 10 ? index - 5 : 2;
      const angle = cluster * Math.PI * 2 / 5 - Math.PI / 2;
      const radius = index < 5 ? 230 : index < 10 ? 390 : 0;
      targets[2].push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * .68, index < 5 ? 75 : -80));

      const activate = () => {
        if (index >= 5) return;
        activeLens = index;
        setSelected(index);
        const related = new Set([index, 10, ...(links[index] || [])]);
        elements.forEach((card, cardIndex) => card.classList.toggle("is-related", related.has(cardIndex)));
        elements.forEach((card, cardIndex) => card.classList.toggle("is-dimmed", !related.has(cardIndex)));
      };
      const clear = () => {
        if (pinnedLens >= 0) return;
        activeLens = -1;
        setSelected(null);
        elements.forEach(card => card.classList.remove("is-related", "is-dimmed"));
      };
      element.addEventListener("pointerenter", activate);
      element.addEventListener("pointerleave", clear);
      element.addEventListener("focus", activate);
      element.addEventListener("blur", clear);
      element.addEventListener("click", () => {
        if (index >= 5) return;
        pinnedLens = pinnedLens === index ? -1 : index;
        if (pinnedLens >= 0) activate(); else clear();
      });
    });

    let mode = 0;
    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    const cycle = window.setInterval(() => { mode = (mode + 1) % targets.length; }, 6500);
    const onPointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width - .5;
      pointerY = (event.clientY - bounds.top) / bounds.height - .5;
    };
    mount.addEventListener("pointermove", onPointerMove);
    const animate = (time: number) => {
      objects.forEach((object, index) => {
        object.position.lerp(targets[mode][index], .035);
        object.rotation.y += (0 - object.rotation.y) * .05;
      });
      group.rotation.y += (pointerX * .12 + Math.sin(time * .00022) * .035 - group.rotation.y) * .025;
      group.rotation.x += (-pointerY * .08 + Math.cos(time * .00018) * .02 - group.rotation.x) * .025;
      group.updateMatrixWorld(true);
      const stageWidth = mount.clientWidth;
      const stageHeight = mount.clientHeight;
      linksRef.current?.setAttribute("viewBox", `0 0 ${stageWidth} ${stageHeight}`);
      const sourcePosition = new THREE.Vector3();
      const targetPosition = new THREE.Vector3();
      linkElements.forEach(({ lens, source, target, line }) => {
        objects[source].getWorldPosition(sourcePosition).project(camera);
        objects[target].getWorldPosition(targetPosition).project(camera);
        line.setAttribute("x1", String((sourcePosition.x * .5 + .5) * stageWidth));
        line.setAttribute("y1", String((-sourcePosition.y * .5 + .5) * stageHeight));
        line.setAttribute("x2", String((targetPosition.x * .5 + .5) * stageWidth));
        line.setAttribute("y2", String((-targetPosition.y * .5 + .5) * stageHeight));
        line.classList.toggle("is-visible", lens === activeLens);
      });
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    const observer = new ResizeObserver(() => {
      const nextWidth = mount.clientWidth;
      const nextHeight = mount.clientHeight;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    });
    observer.observe(mount);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(cycle);
      observer.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      linkElements.forEach(({ line }) => line.remove());
      renderer.domElement.remove();
    };
  }, []);

  return <div className="lenses-three-map">
    <svg ref={linksRef} className="lens-relationship-lines" aria-hidden="true" />
    <div ref={mountRef} className="lenses-three-mount" aria-label="Interactive relationship map of five research lenses and five intersecting fields" />
    <div className={`lens-definition ${selected === null ? "is-idle" : ""}`}>
      {selected === null ? <><b>Five research lenses</b><span>Hover a lens to reveal its question and relationships.</span></> : <><b>{lensData[selected][0]}</b><span>{lensData[selected][1]}</span></>}
    </div>
    <div className="lens-map-key"><span>Research lens</span><span>Intersecting field</span><span>Central inquiry</span></div>
  </div>;
}

function LineageVisual() {
  const design = ["Apprenticeship", "Studio education", "Critique", "Learning through making", "Design manuals", "Online education"];
  const computation = ["Programmed instruction", "Computer assisted learning", "Intelligent tutors", "Online courses", "Conversational tutors", "Generative AI"];
  return <div className="lineage-study"><div className="trajectory trajectory-design"><b>LEARNING DESIGN</b>{design.map((x, i) => <button key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</button>)}</div><div className="trajectory trajectory-computation"><b>LEARNING WITH COMPUTATIONAL SYSTEMS</b>{computation.map((x, i) => <button key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</button>)}</div><div className="convergence"><span>UNRESOLVED</span><strong>What might an AI learning environment for physical product design become?</strong></div></div>;
}

function CommunityArchive() {
  const [selected, setSelected] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keepOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openProject = (index: number) => {
    keepOpen();
    setSelected(index);
  };
  const closeProject = () => {
    keepOpen();
    closeTimer.current = setTimeout(() => setSelected(null), 420);
  };
  const archiveLoop = [...precedents, ...precedents];
  return <div className={`community-archive ${selected !== null ? "has-selection" : ""}`}>
    <div className="archive-categories"><span>Critical AI and public interest</span><span>Design learning and pedagogy</span><span>AI supported learning tools</span></div>
    <div className={`archive-ribbon ${selected !== null ? "paused" : ""}`} onMouseEnter={keepOpen} onMouseLeave={closeProject}><div className="archive-ribbon-track">{archiveLoop.map((item, loopIndex) => {
      const itemIndex = loopIndex % precedents.length;
      return <button key={`${item.name}-${loopIndex}`} className={selected === itemIndex ? "active" : ""} onMouseEnter={() => openProject(itemIndex)} onFocus={() => openProject(itemIndex)} onBlur={closeProject}><i data-index={String(itemIndex + 1).padStart(2, "0")} /><span>{item.name}</span></button>;
    })}</div></div>
    {selected !== null && <div className={`precedent-record precedent-layout-${precedents[selected].layout}`} onMouseEnter={keepOpen} onMouseLeave={closeProject}>
      <header><span>{precedents[selected].category}</span><h2>{precedents[selected].name}</h2></header>
      <div className="precedent-sections">{precedents[selected].sections.map(([heading, text], index) => <section className={`precedent-section precedent-section-${index + 1}`} key={heading}><span>0{index + 1}</span><h3>{heading}</h3><p>{text}</p></section>)}</div>
      <div className="precedent-media">{precedents[selected].media.map((label, index) => <figure className={`media-frame media-frame-${index + 1}`} key={label}><div aria-hidden="true" /><figcaption>{label} / image to add</figcaption></figure>)}</div>
      <p className="precedent-connection">{precedents[selected].connection}</p>
    </div>}
  </div>;
}

function CapstoneVisual() {
  const stages = ["Learner", "Questions and intentions", "People, materials, context", "AI supported inquiry", "Sketching and experiments", "Critique and reflection", "Learner decisions"];
  const notes = ["Exploratory interviews", "Workshops and observation", "Situated research", "Prototype interaction roles", "Physical exercises", "Study reasoning and transfer", "No universal process"];
  return <div className="capstone-system"><div className="system-flow">{stages.map((stage, i) => <div key={stage}><span>0{i + 1}</span><b>{stage}</b><small>{notes[i]}</small></div>)}</div><aside><span>OPEN QUESTIONS</span>{["Who is the audience?", "What counts as learning?", "What process should be supported?", "How should AI guide?", "How does the physical world enter?", "Can I build the system?"].map(x => <p key={x}>{x}</p>)}</aside></div>;
}

function ReturnVisual() {
  const traces = ["resources", "learning", "context", "materials", "experimentation", "judgment", "agency", "responsibility"];
  return <div className="return-field"><div className="return-point"><i />ACCESS TO THE TOOL</div><div className="return-traces">{traces.map((x, i) => <span key={x} style={{ "--i": i } as React.CSSProperties}>{x}</span>)}</div><div className="return-point"><i />ACCESS TO DESIGN KNOWLEDGE</div></div>;
}

function VisualContent({ id }: { id: string }) {
  if (id === "experiment") return <ExperimentVisual />;
  if (id === "compression") return <CompressionVisual />;
  if (id === "investigation") return <InvestigationVisual />;
  if (id === "situated") return <ResourceMap />;
  if (id === "lenses") return <LensesVisual />;
  if (id === "lineage") return <LineageVisual />;
  if (id === "community") return <CommunityArchive />;
  if (id === "capstone") return <CapstoneVisual />;
  return <ReturnVisual />;
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sections = useRef<Array<HTMLElement | null>>([]);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(canvases.length - 1, index));
    sections.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(next);
    window.history.replaceState(null, "", `#${canvases[next].id}`);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") { event.preventDefault(); goTo(activeIndex + (event.shiftKey ? -1 : 1)); }
      if (["ArrowRight", "PageDown"].includes(event.key)) { event.preventDefault(); goTo(activeIndex + 1); }
      if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); goTo(activeIndex - 1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Number((entry.target as HTMLElement).dataset.index);
        setActiveIndex(index);
        window.history.replaceState(null, "", `#${canvases[index].id}`);
      }
    }), { threshold: 0.65 });
    sections.current.forEach(section => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <main className="presentation">
    <header className={`presentation-header ${activeIndex < 2 ? "hero-active" : ""}`}>
      <div className="project-name">Accessing Design</div>
      <div className="acts" aria-label="Presentation structure">{["Question", "Encounter", "Problem", "Position", "Context", "Argument", "Direction", "Return"].map(act => <span key={act} className={canvases[activeIndex].act === act ? "active" : ""}>{act}</span>)}</div>
      <div className="counter">{String(activeIndex + 1).padStart(2, "0")} / {String(canvases.length).padStart(2, "0")}</div>
    </header>
    {canvases.map((canvas, index) => <section className={`canvas canvas-${canvas.id}`} id={canvas.id} data-index={index} key={canvas.id} ref={element => { sections.current[index] = element; }}>
      {canvas.id === "question" ? <img className="hero-pdf" src="/accessing-design-hero.png" alt="Accessing Design by Nicole Lu. Does access to an AI tool provide access to design?" /> : canvas.id === "experiment" ? <ExperimentVisual /> : canvas.id === "compression" ? <CompressionCanvas /> : canvas.id === "situated" ? <SituatedCanvas /> : <>
        <div className="canvas-copy"><p className="canvas-label">{String(index + 1).padStart(2, "0")}  {canvas.act}</p><h1>{canvas.title}</h1><p className="statement">{canvas.statement}</p>{canvas.details && <ul>{canvas.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}</div>
        <aside className="visual-placeholder"><VisualContent id={canvas.id} /><p className="visual-note">{canvas.visual}</p></aside>
      </>}
      <p className="navigation-hint">Tab for next canvas&nbsp;&nbsp;&nbsp;Shift and Tab for previous&nbsp;&nbsp;&nbsp;Scroll is also available</p>
    </section>)}
  </main>;
}
