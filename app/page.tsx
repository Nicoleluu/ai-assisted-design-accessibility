"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
    id: "argument",
    act: "Argument",
    title: "AI can make design production more available without making design knowledge accessible.",
    statement: "Meaningful accessibility requires opportunities to investigate, experiment, understand, question, evaluate, imagine, and take responsibility for design decisions.",
    visual: "The generated object expands from one answer into a field of informed possibilities.",
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
  { name: "AI Now Institute", category: "Critical AI", detail: "Public interest research that helps frame the institutional and social consequences of AI." },
  { name: "Data and Society", category: "Critical AI", detail: "Research that connects technology to social structures, communities, and lived experience." },
  { name: "Studio Education", category: "Design Learning", detail: "Learning through critique, iteration, observation, making, and reflective practice." },
  { name: "Learning Through Making", category: "Design Learning", detail: "Knowledge develops through materials, physical experiments, failures, and revisions." },
  { name: "NotebookLM", category: "AI Learning Tool", detail: "A functional precedent for AI interaction organized around learning and source based inquiry." },
  { name: "Conversational Tutors", category: "AI Learning Tool", detail: "Systems that use dialogue to guide understanding rather than only deliver information." },
  { name: "AI Literacy Toolkits", category: "AI Learning Tool", detail: "Resources that help people question, interpret, and use AI systems more critically." },
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
        const radius = Math.sqrt((index + .6) / processTerms.length) * Math.min(width, height) * .29;
        const anchorX = width / 2 + Math.cos(angle) * radius;
        const anchorY = height / 2 + Math.sin(angle) * radius;
        return { x: anchorX, y: anchorY, anchorX, anchorY, vx: 0, vy: 0, term };
      });
    };

    const displayedPosition = (node: Node, index: number) => {
      const angle = tick * .22;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const dx = node.x - width / 2;
      const dy = node.y - height / 2;
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
  const [selected, setSelected] = useState(0);
  const fields = ["Physical product design", "Design education", "Human computer interaction", "AI literacy", "Computational design"];
  return <div className="lenses-map">
    <div className="territories">{fields.map((field, i) => <span key={field} className={`territory territory-${i + 1}`}>{field}</span>)}</div>
    <strong>AI supported learning<br />for physical product design</strong>
    <div className="lens-controls">{lensData.map(([name], i) => <button key={name} className={selected === i ? "active" : ""} onMouseEnter={() => setSelected(i)} onFocus={() => setSelected(i)}>{name}</button>)}</div>
    <p><b>{lensData[selected][0]}</b>{lensData[selected][1]}</p>
  </div>;
}

function LineageVisual() {
  const design = ["Apprenticeship", "Studio education", "Critique", "Learning through making", "Design manuals", "Online education"];
  const computation = ["Programmed instruction", "Computer assisted learning", "Intelligent tutors", "Online courses", "Conversational tutors", "Generative AI"];
  return <div className="lineage-study"><div className="trajectory trajectory-design"><b>LEARNING DESIGN</b>{design.map((x, i) => <button key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</button>)}</div><div className="trajectory trajectory-computation"><b>LEARNING WITH COMPUTATIONAL SYSTEMS</b>{computation.map((x, i) => <button key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</button>)}</div><div className="convergence"><span>UNRESOLVED</span><strong>What might an AI learning environment for physical product design become?</strong></div></div>;
}

function CommunityArchive() {
  const [selected, setSelected] = useState(4);
  return <div className="community-archive">
    <div className="archive-categories"><span>Critical AI and public interest</span><span>Design learning and pedagogy</span><span>AI supported learning tools</span></div>
    <div className="archive-ribbon">{precedents.map((item, i) => <button key={item.name} className={selected === i ? "active" : ""} onClick={() => setSelected(i)} onMouseEnter={() => setSelected(i)}><i data-index={String(i + 1).padStart(2, "0")} /><span>{item.name}</span></button>)}</div>
    <div className="precedent-record"><span>{precedents[selected].category}</span><h2>{precedents[selected].name}</h2><p>{precedents[selected].detail}</p><small>Image, creator, date, approach, relationship, and citation to add</small></div>
    <div className="missing-space"><span>MISSING SPACE TO INVESTIGATE</span><p>AI supported design learning that encourages inquiry, material investigation, judgment, and human decision making without immediately generating the final outcome.</p></div>
  </div>;
}

function ArgumentVisual() {
  const layers = ["People", "Context", "Research", "Materials", "Tests", "Alternatives", "Failures", "Iterations", "Decisions", "Responsibility"];
  return <div className="argument-field"><div className="object-core"><span>ONE GENERATED ANSWER</span><div className="chair-mark"><i /><b /></div></div>{layers.map((x, i) => <button key={x} style={{ "--angle": `${i * 36}deg`, "--radius": `${32 + (i % 3) * 7}%` } as React.CSSProperties}>{x}</button>)}<strong>A FIELD OF INFORMED POSSIBILITIES</strong></div>;
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
  if (id === "argument") return <ArgumentVisual />;
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
      {canvas.id === "question" ? <img className="hero-pdf" src="/accessing-design-hero.png" alt="Accessing Design by Nicole Lu. Does access to an AI tool provide access to design?" /> : canvas.id === "experiment" ? <ExperimentVisual /> : canvas.id === "compression" ? <CompressionCanvas /> : <>
        <div className="canvas-copy"><p className="canvas-label">{String(index + 1).padStart(2, "0")}  {canvas.act}</p><h1>{canvas.title}</h1><p className="statement">{canvas.statement}</p>{canvas.details && <ul>{canvas.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}</div>
        <aside className="visual-placeholder"><VisualContent id={canvas.id} /><p className="visual-note">{canvas.visual}</p></aside>
      </>}
      <p className="navigation-hint">Tab for next canvas&nbsp;&nbsp;&nbsp;Shift and Tab for previous&nbsp;&nbsp;&nbsp;Scroll is also available</p>
    </section>)}
  </main>;
}
