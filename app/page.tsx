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
    visual: "Opening visual to develop: a quiet field that separates access to a tool from access to design knowledge.",
  },
  {
    id: "experiment",
    act: "Question",
    title: "A small experiment makes the problem visible.",
    statement: "I will ask a person without formal design training to use a general AI chatbot to design a familiar physical product.",
    details: ["The first prompt", "The conversation", "The generated result", "What the participant understood and decided"],
    visual: "Material to add: screenshots or a short screen recording arranged as one clear sequence.",
  },
  {
    id: "problem",
    act: "Problem",
    title: "Producing an object is not the same as participating in design.",
    statement: "How do general purpose AI chatbots shape the design process of people without formal design training?",
    details: ["Who investigates the context?", "Who evaluates quality?", "Who makes design decisions?", "What does the learner take away?"],
    visual: "Visual to develop: compare the visible output with the design decisions and learning that may be missing from the process.",
  },
  {
    id: "situated",
    act: "Problem",
    title: "The question comes from unequal starting conditions.",
    statement: "My interest comes from growing up in a place where design education, mentors, professional communities, and visible design careers were limited or expensive.",
    details: ["Location", "Family support", "Education", "Professional exposure", "Time and money", "Language"],
    visual: "Visual to develop: a situated map of the conditions that shape how someone first encounters design.",
  },
  {
    id: "fields",
    act: "Problem",
    title: "Five ideas organize the research.",
    statement: "These keywords connect the social problem, the learning problem, and the design problem.",
    details: ["Design agency", "Design literacy", "Situated learning", "Human and AI collaboration", "Equitable participation"],
    visual: "Visual to develop: map the five keywords across product design, design education, human computer interaction, AI literacy, and computational design.",
  },
  {
    id: "lineage",
    act: "Context",
    title: "The project sits between two histories of learning.",
    statement: "I will trace how people have learned design and how people have learned with computational systems.",
    details: ["Studio education and critique", "Learning through making", "Online design education", "Computer assisted learning", "Conversational learning tools", "Generative AI"],
    visual: "Research and visual to develop: two historical timelines that meet at AI supported design learning.",
  },
  {
    id: "community",
    act: "Context",
    title: "Existing communities frame different parts of the question.",
    statement: "My community of practice includes critical AI research, design education, AI literacy, and tools that support learning.",
    details: ["AI Now Institute", "Data and Society", "NotebookLM", "Design educators", "AI literacy researchers", "Learning tool designers"],
    visual: "Research and visual to develop: a map showing what each precedent contributes, what it does not address, and where my project may sit.",
  },
  {
    id: "argument",
    act: "Direction",
    title: "AI can make design production more available without making design knowledge accessible.",
    statement: "Meaningful accessibility would help a person investigate, question, experiment, evaluate, decide, and learn through the design process.",
    visual: "Visual to develop: reveal the knowledge and human decisions that sit between a request and a finished design.",
  },
  {
    id: "capstone",
    act: "Direction",
    title: "A potential capstone could investigate AI as a guide rather than a designer.",
    statement: "The possible outcome is a platform or an added layer for an existing chatbot that encourages people to think and learn through physical product design.",
    details: ["Interview potential learners", "Run exploratory workshops", "Study different forms of guidance", "Prototype interactions", "Test what participants learn", "Revise the audience and scope"],
    visual: "Visual to develop: a provisional research and prototyping plan. The form of the final system should remain open.",
  },
  {
    id: "return",
    act: "Direction",
    title: "What would it mean for AI to make the process of design accessible, not only the outcome?",
    statement: "This is the question I want the capstone research to make more precise.",
    visual: "Closing visual to develop: return to the opening field after the hidden conditions, histories, communities, and possibilities have been revealed.",
  },
];

function VisualContent({ id, note }: { id: string; note: string }) {
  if (id === "question") return (
    <div className="opening-field" aria-label={note}>
      <div className="hero-wordmark" aria-label="Accessing Design">
        <span className="word-accessing">Accessing</span>
        <span className="word-design">Design</span>
      </div>
    </div>
  );

  if (id === "experiment") {
    const terms = ["observe", "ask", "research", "frame", "sketch", "test", "compare", "prototype", "fail", "revise", "judge", "decide"];
    return (
      <div className="process-field" aria-label={note}>
        {terms.map((term, index) => <span key={term} style={{ "--x": `${10 + (index * 37) % 80}%`, "--y": `${12 + (index * 53) % 76}%`, "--delay": `${index * 35}ms` } as React.CSSProperties}>{term}</span>)}
        <p>Move through the field</p>
      </div>
    );
  }

  if (id === "problem") return (
    <div className="compressed-process" aria-label={note}>
      <div><span>01</span><b>Ask AI</b></div><i />
      <div><span>02</span><b>Generate</b></div><i />
      <div><span>03</span><b>Select</b></div><i />
      <div><span>04</span><b>Finished object</b></div>
      <p>Where did the design process go?</p>
    </div>
  );

  if (id === "situated") {
    const resources = ["school", "museum", "mentor", "studio", "workshop", "job", "materials", "community"];
    return (
      <div className="resource-map" aria-label={note}>
        <svg viewBox="0 0 800 520" preserveAspectRatio="none"><path d="M30 390 C130 210 220 470 325 260 S530 70 770 190" /><path d="M95 80 C250 120 260 360 470 410 S660 350 780 470" /></svg>
        {resources.map((resource, index) => <button key={resource} style={{ left: `${9 + (index * 41) % 83}%`, top: `${12 + (index * 29) % 74}%` }}><i /><span>{resource}<small>resource image to add</small></span></button>)}
        <p>Move across the map to reveal resources</p>
      </div>
    );
  }

  if (id === "fields") return (
    <div className="field-intersection" aria-label={note}>
      <span>Product design</span><span>Design education</span><span>AI literacy</span><span>Human computer interaction</span><span>Computational design</span>
      <b>ACCESSIBLE<br />DESIGN LEARNING</b>
    </div>
  );

  if (id === "lineage") return (
    <div className="lineage-lines" aria-label={note}>
      <div><span>Learning design</span><i /><i /><i /><i /><i /></div>
      <div><span>Learning with computation</span><i /><i /><i /><i /><i /></div>
      <b>?</b><p>Research, dates, and examples to add</p>
    </div>
  );

  if (id === "community") {
    const projects = ["AI Now", "Data and Society", "NotebookLM", "Design education", "AI literacy", "Learning tools"];
    return (
      <div className="archive" aria-label={note}>
        <div className="archive-track">{[...projects, ...projects].map((project, index) => <button key={`${project}-${index}`} aria-label={project}><i /><span>{String((index % projects.length) + 1).padStart(2, "0")}</span></button>)}</div>
        <div className="archive-focus"><span>Selected precedent</span><p>Click a project image to show its summary, approach, and relationship to this research.</p></div>
      </div>
    );
  }

  if (id === "argument") return (
    <div className="argument-gap" aria-label={note}><span>AVAILABLE OUTPUT</span><i /><b>?</b><i /><span>ACCESSIBLE KNOWLEDGE</span></div>
  );

  if (id === "capstone") return (
    <div className="capstone-loop" aria-label={note}>
      {["Question", "Investigate", "Make", "Reflect", "Decide"].map((step, index) => <span key={step} style={{ "--i": index } as React.CSSProperties}>{step}</span>)}
      <b>AI<br /><small>guide</small></b>
    </div>
  );

  return <div className="return-field" aria-label={note}><i /><span>OUTCOME</span><b>PROCESS</b><span>KNOWLEDGE</span><i /></div>;
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
      if (event.key === "Tab") {
        event.preventDefault();
        goTo(activeIndex + (event.shiftKey ? -1 : 1));
      }
      if (["ArrowRight", "PageDown"].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex + 1);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          setActiveIndex(index);
          window.history.replaceState(null, "", `#${canvases[index].id}`);
        }
      }),
      { threshold: 0.65 },
    );
    sections.current.forEach(section => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="presentation">
      <header className={`presentation-header ${activeIndex === 0 ? "hero-active" : ""}`}>
        <div className="project-name">Accessing Design</div>
        <div className="acts" aria-label="Presentation structure">
          {["Question", "Problem", "Context", "Direction"].map(act => (
            <span key={act} className={canvases[activeIndex].act === act ? "active" : ""}>{act}</span>
          ))}
        </div>
        <div className="counter">{String(activeIndex + 1).padStart(2, "0")} / {String(canvases.length).padStart(2, "0")}</div>
      </header>

      {canvases.map((canvas, index) => (
        <section
          className={`canvas canvas-${canvas.id}`}
          id={canvas.id}
          data-index={index}
          key={canvas.id}
          ref={element => { sections.current[index] = element; }}
        >
          {canvas.id === "question" ? (
            <img className="hero-pdf" src="/accessing-design-hero.png" alt="Accessing Design by Nicole Lu. Does access to an AI tool provide access to design?" />
          ) : (
            <>
              <div className="canvas-copy">
                <p className="canvas-label">{String(index + 1).padStart(2, "0")}  {canvas.act}</p>
                <h1>{canvas.title}</h1>
                <p className="statement">{canvas.statement}</p>
                {canvas.details && (
                  <ul>{canvas.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
                )}
              </div>
              <aside className="visual-placeholder">
                <VisualContent id={canvas.id} note={canvas.visual} />
                <p className="visual-note">{canvas.visual}</p>
              </aside>
            </>
          )}
          <p className="navigation-hint">Tab for next canvas&nbsp;&nbsp;&nbsp;Shift and Tab for previous&nbsp;&nbsp;&nbsp;Scroll is also available</p>
        </section>
      ))}
    </main>
  );
}
