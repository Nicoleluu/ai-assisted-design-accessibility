"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Act = "Question" | "Problem" | "Context" | "Direction";

type Canvas = {
  id: string;
  act: Act;
  label: string;
  tone: "light" | "dark";
};

const canvases: Canvas[] = [
  { id: "question", act: "Question", label: "Opening question", tone: "light" },
  { id: "experiment", act: "Question", label: "Experiment and outcome", tone: "dark" },
  { id: "problem", act: "Problem", label: "Research problem", tone: "light" },
  { id: "situated", act: "Problem", label: "Situated position and stakes", tone: "dark" },
  { id: "lenses", act: "Problem", label: "Keywords and fields", tone: "light" },
  { id: "lineage", act: "Context", label: "Historical lineage", tone: "dark" },
  { id: "community", act: "Context", label: "Community and missing space", tone: "light" },
  { id: "argument", act: "Direction", label: "Emerging argument", tone: "dark" },
  { id: "capstone", act: "Direction", label: "Potential capstone approach", tone: "light" },
  { id: "return", act: "Direction", label: "Return to the question", tone: "light" },
];

const actStarts: Record<Act, number> = {
  Question: 0,
  Problem: 2,
  Context: 5,
  Direction: 7,
};

function BranchField() {
  return (
    <div className="branch-field" aria-hidden="true">
      <i className="branch branch-a" />
      <i className="branch branch-b" />
      <i className="branch branch-c" />
      <i className="branch branch-d" />
      <span className="trace trace-a">knowledge</span>
      <span className="trace trace-b">resources</span>
      <span className="trace trace-c">possibility</span>
      <span className="trace trace-d">judgment</span>
      <b className="fragment fragment-a" />
      <b className="fragment fragment-b" />
      <b className="fragment fragment-c" />
    </div>
  );
}

function CanvasContent({ id }: { id: string }) {
  if (id === "question") {
    return (
      <div className="opening composition">
        <BranchField />
        <p className="eyebrow">COLLOQUIUM FINAL · WORKING STRUCTURE</p>
        <h1>What does it mean for AI assisted design to be <em>accessible?</em></h1>
        <p className="opening-prompt">Does access to an AI tool provide access to design?</p>
        <p className="author">NICOLE LU · COMPUTATIONAL DESIGN PRACTICES</p>
      </div>
    );
  }

  if (id === "experiment") {
    return (
      <div className="experiment composition accumulated">
        <header className="canvas-heading">
          <p className="eyebrow">AN EXPLORATORY ENCOUNTER</p>
          <h2>One prompt. One object. Many invisible decisions.</h2>
        </header>
        <div className="experiment-path">
          <section className="participant-card">
            <span>01 · PERSON</span>
            <strong>No formal design training</strong>
            <small>Exploratory participant. Final audience not yet defined.</small>
          </section>
          <section className="prompt-card">
            <span>02 · PROMPT</span>
            <blockquote>“I want to design a chair.”</blockquote>
            <small>Future slot: prompt transcript or screen recording</small>
          </section>
          <section className="outcome-card" data-module="experiment-output">
            <span>03 · OUTCOME</span>
            <div className="chair-placeholder"><i /><i /><i /></div>
            <small>Future slot: generated chair concept</small>
          </section>
        </div>
        <div className="decision-field">
          {[
            "USER?", "CONTEXT?", "MATERIAL?", "ERGONOMICS?",
            "TESTING?", "MANUFACTURING?", "ITERATION?", "RESPONSIBILITY?",
          ].map((item) => <span key={item}>{item}</span>)}
        </div>
        <p className="canvas-question">An object was generated. What design process occurred?</p>
      </div>
    );
  }

  if (id === "problem") {
    return (
      <div className="problem composition">
        <header className="canvas-heading split-heading">
          <p className="eyebrow">THE RESEARCH PROBLEM</p>
          <p className="section-note">Working definitions and questions. Not final claims.</p>
        </header>
        <div className="not-equal-grid">
          <section>
            <span>PRODUCING AN OBJECT</span>
            <strong>request<br />receive<br />select</strong>
          </section>
          <div className="not-equal-symbol">≠</div>
          <section>
            <span>PARTICIPATING IN DESIGN</span>
            <strong>investigate<br />experiment<br />evaluate<br />decide</strong>
          </section>
        </div>
        <div className="research-question">
          <span>PRIMARY QUESTION</span>
          <p>How do general purpose generative AI assistants shape the design process of people without formal design training?</p>
        </div>
      </div>
    );
  }

  if (id === "situated") {
    return (
      <div className="situated composition accumulated">
        <header className="canvas-heading split-heading">
          <p className="eyebrow">A SITUATED QUESTION</p>
          <p className="section-note">Audience hypothesis requires future research.</p>
        </header>
        <p className="personal-statement">I became interested in design in an environment where education, mentorship, professional communities, and visible design careers were difficult or expensive to access.</p>
        <div className="cycle-map" data-module="resource-cycle">
          {[
            "Smaller design industry",
            "Fewer visible careers",
            "Less support",
            "Education appears risky",
            "Fewer people enter",
          ].map((item, index) => (
            <div key={item} className={`cycle-node node-${index + 1}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>{item}
            </div>
          ))}
          <div className="ai-interruption">GENERAL AI<br />IMMEDIATE OUTPUT<br /><b>UNCERTAIN LEARNING</b></div>
        </div>
        <p className="audience-line"><span>STARTING AUDIENCE</span> Self directed learners with limited access to formal design education and surrounding design resources.</p>
      </div>
    );
  }

  if (id === "lenses") {
    const lenses = [
      ["01", "Design agency", "Who directs and takes responsibility?"],
      ["02", "Design literacy", "Who can understand and evaluate?"],
      ["03", "Situated learning", "How does learning meet context?"],
      ["04", "Human AI collaboration", "What should each participant do?"],
      ["05", "Equitable participation", "Who can meaningfully begin?"],
    ];
    return (
      <div className="lenses composition">
        <header className="canvas-heading">
          <p className="eyebrow">FIVE RESEARCH LENSES</p>
          <h2>What existing AI design interactions may not yet support.</h2>
        </header>
        <div className="lens-field">
          {lenses.map(([number, title, prompt]) => (
            <article key={title}>
              <span>{number}</span><h3>{title}</h3><p>{prompt}</p>
            </article>
          ))}
          <div className="field-center">AI SUPPORTED LEARNING<br /><b>FOR PHYSICAL PRODUCT DESIGN</b></div>
        </div>
        <div className="field-list">PRODUCT DESIGN · DESIGN EDUCATION · HUMAN COMPUTER INTERACTION · AI LITERACY · COMPUTATIONAL DESIGN</div>
      </div>
    );
  }

  if (id === "lineage") {
    const design = ["Apprenticeship", "Studio", "Critique", "Learning through making", "Online design learning"];
    const computing = ["Programmed instruction", "Computer assisted learning", "Intelligent tutors", "Conversational tools", "Generative AI learning"];
    return (
      <div className="lineage composition accumulated" data-module="dual-timeline">
        <header className="canvas-heading">
          <p className="eyebrow">HISTORICAL LINEAGE · RESEARCH REQUIRED</p>
          <h2>Two histories approach an unresolved intersection.</h2>
        </header>
        <div className="timeline-row">
          <span className="timeline-label">LEARNING DESIGN</span>
          {design.map((item, i) => <div key={item}><small>{1900 + i * 25}*</small>{item}</div>)}
        </div>
        <div className="timeline-row">
          <span className="timeline-label">LEARNING WITH COMPUTATION</span>
          {computing.map((item, i) => <div key={item}><small>{1950 + i * 18}*</small>{item}</div>)}
        </div>
        <p className="timeline-question">What might an AI learning environment for physical product design become?</p>
        <p className="placeholder-warning">*Dates and examples are structural placeholders pending historical research.</p>
      </div>
    );
  }

  if (id === "community") {
    const regions = [
      ["CRITICAL AI + PUBLIC INTEREST", "AI Now Institute", "Data & Society", "AI literacy research"],
      ["DESIGN LEARNING + PEDAGOGY", "Studio education", "Reflective practice", "Material experimentation"],
      ["AI SUPPORTED LEARNING", "NotebookLM", "Conversational tutors", "Contextual guidance"],
    ];
    return (
      <div className="community composition" data-module="community-map">
        <header className="canvas-heading split-heading">
          <p className="eyebrow">COMMUNITY OF PRACTICE</p>
          <p className="section-note">Who frames the problem? Who suggests an approach?</p>
        </header>
        <div className="community-map">
          {regions.map(([title, ...items], regionIndex) => (
            <section key={title} className={`region region-${regionIndex + 1}`}>
              <h3>{title}</h3>
              {items.map(item => <span key={item}>{item}</span>)}
            </section>
          ))}
          <div className="missing-space">
            <span>POSSIBLE MISSING SPACE</span>
            <p>AI supported design learning that encourages inquiry, material investigation, judgment, and human decision making.</p>
          </div>
        </div>
        <p className="community-foot">Community: educators, researchers, designers, institutions, tool builders. <b>Audience: learners who may not have access to those communities.</b></p>
      </div>
    );
  }

  if (id === "argument") {
    return (
      <div className="argument composition">
        <p className="eyebrow">EMERGING ARGUMENT</p>
        <div className="argument-fragments" aria-hidden="true">
          {[
            "people", "research", "material", "testing", "alternatives", "failure", "context", "decisions",
          ].map(item => <span key={item}>{item}</span>)}
        </div>
        <h2>AI can make design production more available without making design knowledge <em>accessible.</em></h2>
        <p className="argument-support">Design knowledge expands what a person is able to imagine, not only what they are able to evaluate.</p>
      </div>
    );
  }

  if (id === "capstone") {
    const stages = ["Learner", "Questions + intentions", "People + materials + context", "AI supported inquiry", "Physical experiments", "Critique + reflection", "Learner decisions"];
    return (
      <div className="capstone composition" data-module="system-map">
        <header className="canvas-heading split-heading">
          <div><p className="eyebrow">POTENTIAL CAPSTONE · NOT A FINAL SOLUTION</p><h2>A possible environment for learning through design.</h2></div>
          <p className="section-note">Form, audience, guidance model, and evaluation remain open.</p>
        </header>
        <div className="system-flow">
          {stages.map((stage, i) => <div key={stage} className={i === 3 ? "uncertain" : ""}><span>{String(i + 1).padStart(2, "0")}</span>{stage}</div>)}
        </div>
        <div className="method-grid">
          <section><span>QUESTION</span><p>Who is the audience?</p><small>Interviews + exploratory workshops</small></section>
          <section><span>QUESTION</span><p>What counts as learning?</p><small>Reasoning + reflection + transfer</small></section>
          <section><span>QUESTION</span><p>How should AI guide?</p><small>Prototype several interaction roles</small></section>
          <section><span>QUESTION</span><p>How does the physical world enter?</p><small>Observation + making + testing</small></section>
        </div>
      </div>
    );
  }

  return (
    <div className="return composition">
      <BranchField />
      <p className="eyebrow">RETURN TO THE QUESTION</p>
      <h2>What would it mean for AI to make the <em>process</em> of design accessible, not only the outcome?</h2>
      <div className="return-traces">PEOPLE · MATERIALS · RESEARCH · EXPERIMENTS · DECISIONS · RESPONSIBILITY</div>
      <p className="author">NICOLE LU · WORK IN PROGRESS</p>
    </div>
  );
}

export default function Home() {
  const initialIndex = useMemo(() => {
    if (typeof window === "undefined") return 0;
    const index = canvases.findIndex(canvas => canvas.id === window.location.hash.slice(1));
    return index >= 0 ? index : 0;
  }, []);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const touchStart = useRef<number | null>(null);
  const activeCanvas = canvases[activeIndex];

  const goTo = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(canvases.length - 1, next));
    setActiveIndex(bounded);
    window.history.replaceState(null, "", `#${canvases[bounded].id}`);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex + 1);
      }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex - 1);
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(canvases.length - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goTo]);

  return (
    <main
      className={`presentation tone-${activeCanvas.tone}`}
      onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const difference = touchStart.current - event.changedTouches[0].clientX;
        if (Math.abs(difference) > 60) goTo(activeIndex + (difference > 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <nav className="act-tabs" aria-label="Presentation chapters">
        {(Object.keys(actStarts) as Act[]).map(act => (
          <button key={act} className={activeCanvas.act === act ? "active" : ""} onClick={() => goTo(actStarts[act])}>
            <span>{String((Object.keys(actStarts) as Act[]).indexOf(act) + 1).padStart(2, "0")}</span>{act}
          </button>
        ))}
      </nav>

      <section className="stage" aria-live="polite" aria-label={`${activeIndex + 1} of ${canvases.length}: ${activeCanvas.label}`}>
        <CanvasContent id={activeCanvas.id} />
      </section>

      <footer className="presentation-controls">
        <div className="canvas-meta">
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(canvases.length).padStart(2, "0")}</span>
          <p>{activeCanvas.label}</p>
        </div>
        <div className="progress" aria-hidden="true"><i style={{ width: `${((activeIndex + 1) / canvases.length) * 100}%` }} /></div>
        <div className="arrow-controls">
          <button onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous canvas">←</button>
          <button onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === canvases.length - 1} aria-label="Next canvas">→</button>
        </div>
      </footer>
    </main>
  );
}
