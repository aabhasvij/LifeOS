import { useState } from "react";

const pillars = [
  {
    id: 1,
    time: "1:36 – 3:33",
    title: "Future Bryan's Message",
    icon: "⏳",
    color: "#E8C547",
    summary: "Bryan's older self sends a message back: the biggest regret isn't working too hard — it's not taking care of the body sooner. The framing is simple: every workout is a deposit into your future health account.",
    keyTakeaway: "Start now. Consistency compounds just like interest."
  },
  {
    id: 2,
    time: "3:33 – 6:02",
    title: "Strength Training",
    icon: "🏋️",
    color: "#FF6B6B",
    summary: "Muscle mass is the #1 predictor of longevity and metabolic health. Resistance training 3x/week protects bone density, insulin sensitivity, and prevents age-related decline. Compound movements (deadlifts, squats, presses) are prioritized over isolation work.",
    keyTakeaway: "Train for the 80-year-old version of you. Strength is survival."
  },
  {
    id: 3,
    time: "6:02 – 7:47",
    title: "Zone 2 Cardio (Low Intensity)",
    icon: "🚶",
    color: "#4ECDC4",
    summary: "Zone 2 is 60–70% max HR — a pace where you can hold a conversation but it's slightly effortful. This trains mitochondrial density and fat oxidation. 150–180 min/week is the target. Brisk walking, light jogging, cycling all count.",
    keyTakeaway: "This is your aerobic base. Most people skip it chasing intensity."
  },
  {
    id: 4,
    time: "7:47 – 10:39",
    title: "Zone 4–5 Cardio (High Intensity)",
    icon: "🔥",
    color: "#FF8C42",
    summary: "Zone 4–5 is 85–100% max HR. Used in small doses (1–2x/week), it spikes VO2 max — one of the strongest longevity biomarkers. Protocol: 4 min all-out effort, 4 min recovery, 4–5 rounds. Your football match already covers this.",
    keyTakeaway: "VO2 max improvement = years added to your life."
  },
  {
    id: 5,
    time: "10:39 – 11:59",
    title: "Mobility & Flexibility",
    icon: "🧘",
    color: "#A29BFE",
    summary: "Often neglected, mobility is what lets you keep training as you age. Focus on hip flexors, thoracic spine, hamstrings, and ankles. 10–15 min daily is sufficient. Dynamic stretching before training, static after.",
    keyTakeaway: "Flexibility is your insurance policy against injury."
  },
  {
    id: 6,
    time: "11:59 – 13:27",
    title: "Balance",
    icon: "⚖️",
    color: "#55EFC4",
    summary: "Balance training is the most underrated pillar. Single-leg work, proprioception drills, and unstable surface training protect you from falls and build deep stabilizer muscles. Directly translates to football agility.",
    keyTakeaway: "Balance declines fast if untrained. It compounds fast if trained."
  }
];

const weekPlan = [
  {
    day: "Monday",
    label: "Strength A",
    type: "strength",
    color: "#FF6B6B",
    focus: "Lower Body + Core",
    exercises: [
      { name: "Barbell Back Squat", sets: "4 × 6–8", note: "Control the descent (3 sec)" },
      { name: "Romanian Deadlift", sets: "3 × 8–10", note: "Hip hinge focus, full stretch" },
      { name: "Walking Lunges", sets: "3 × 12/leg", note: "Weighted dumbbells" },
      { name: "Leg Press", sets: "3 × 10–12", note: "Full range, feet shoulder-width" },
      { name: "Hanging Leg Raises", sets: "3 × 12–15", note: "Slow and controlled" },
      { name: "Plank", sets: "3 × 45 sec", note: "Squeeze glutes + core hard" },
    ],
    cardio: "10 min Zone 2 (incline walk) post-workout",
    mobility: "Hip flexor + hamstring stretch 5 min",
    duration: "~65 min"
  },
  {
    day: "Tuesday",
    label: "Zone 2 + Balance",
    type: "cardio",
    color: "#4ECDC4",
    focus: "Aerobic Base + Stability",
    exercises: [
      { name: "Treadmill / Outdoor Brisk Walk", sets: "35–40 min", note: "Maintain conversational pace, ~130–140 BPM" },
      { name: "Single-Leg Romanian Deadlift", sets: "3 × 10/leg", note: "Bodyweight or light DB" },
      { name: "Single-Leg Calf Raises", sets: "3 × 15/leg", note: "Slow tempo" },
      { name: "Bosu Ball Squat / Balance Stand", sets: "3 × 30 sec/leg", note: "Eyes open → eyes closed progression" },
    ],
    cardio: null,
    mobility: "Full body dynamic mobility routine — 10 min",
    duration: "~55 min"
  },
  {
    day: "Wednesday",
    label: "Strength B",
    type: "strength",
    color: "#FF6B6B",
    focus: "Upper Body Push + Pull",
    exercises: [
      { name: "Barbell / DB Bench Press", sets: "4 × 6–8", note: "Full ROM, controlled" },
      { name: "Bent Over Barbell Row", sets: "4 × 6–8", note: "Squeeze shoulder blades" },
      { name: "Overhead Press (DB/BB)", sets: "3 × 8–10", note: "Strict form, no leg drive" },
      { name: "Lat Pulldown", sets: "3 × 10–12", note: "Full stretch at top" },
      { name: "Incline DB Curl", sets: "3 × 12", note: "Slow eccentric" },
      { name: "Tricep Dips / Pushdowns", sets: "3 × 12", note: "Lock out at bottom" },
    ],
    cardio: "10 min Zone 2 (bike/walk) post-workout",
    mobility: "Thoracic spine + shoulder mobility 5 min",
    duration: "~65 min"
  },
  {
    day: "Thursday",
    label: "Zone 2 + Core",
    type: "cardio",
    color: "#4ECDC4",
    focus: "Aerobic Base + Stability",
    exercises: [
      { name: "Treadmill / Brisk Walk / Cycle", sets: "35–40 min", note: "Conversational pace, ~130–140 BPM — Zone 2 only" },
      { name: "Dead Bug", sets: "3 × 10/side", note: "Core stability essential for football" },
      { name: "Pallof Press", sets: "3 × 12/side", note: "Anti-rotation core strength" },
      { name: "Side Plank", sets: "3 × 35 sec/side", note: "Lateral stability for cutting movements" },
    ],
    cardio: null,
    mobility: "Hip flexor + thoracic rotation — 8 min (prep for weekend football)",
    duration: "~55 min"
  },
  {
    day: "Friday",
    label: "Strength C",
    type: "strength",
    color: "#FF6B6B",
    focus: "Deadlift + Athletic Power",
    exercises: [
      { name: "Conventional Deadlift", sets: "4 × 5", note: "King of all lifts. Build from 70% 1RM" },
      { name: "Bulgarian Split Squat", sets: "3 × 8/leg", note: "Rear foot elevated, brutal but essential" },
      { name: "Trap Bar Shrug / Farmer Carry", sets: "3 × 40m", note: "Builds grip + traps + posture" },
      { name: "Cable Face Pulls", sets: "3 × 15", note: "Shoulder health and posture" },
      { name: "Ab Wheel Rollout", sets: "3 × 10", note: "Full extension if possible" },
    ],
    cardio: "5 min Zone 2 warm-up on bike before lifting",
    mobility: "Hip flexor + pigeon pose stretch post-session",
    duration: "~60 min"
  },
  {
    day: "Saturday",
    label: "Zone 2 + Mobility",
    type: "cardio",
    color: "#4ECDC4",
    focus: "Pre-Football Active Recovery",
    exercises: [
      { name: "Outdoor Walk or Light Jog", sets: "30–35 min", note: "Keep it easy — saving legs for Sunday football" },
      { name: "Full Body Stretching Routine", sets: "15 min", note: "Focus: hips, quads, calves, hamstrings — football prep" },
      { name: "Dead Hang (bar)", sets: "3 × 20–30 sec", note: "Decompresses spine, builds grip" },
    ],
    cardio: null,
    mobility: "This IS the mobility day — be thorough, especially legs for Sunday",
    duration: "~50 min"
  },
  {
    day: "Sunday",
    label: "Football",
    type: "football",
    color: "#F9CA24",
    focus: "Zone 4–5 + Agility",
    exercises: [
      { name: "Drill Session", sets: "60 min", note: "Treat drills seriously — lateral cuts = balance training" },
      { name: "Match Play", sets: "30–40 min", note: "This is your HIIT/Zone 4–5 session for the week" },
    ],
    cardio: "Already covered by the match",
    mobility: "Post-football mandatory: calf, quad, hamstring, hip flexor static stretch — 10 min",
    duration: "~100 min"
  }
];

const typeColors = {
  strength: "#FF6B6B",
  cardio: "#4ECDC4",
  football: "#F9CA24",
  rest: "#74B9FF"
};

const typeLabels = {
  strength: "STRENGTH",
  cardio: "CARDIO",
  football: "FOOTBALL",
  rest: "REST"
};

export default function TrainingPlan() {
  const [activeTab, setActiveTab] = useState("breakdown");
  const [expandedDay, setExpandedDay] = useState("Monday");
  const [expandedPillar, setExpandedPillar] = useState(null);

  const activeDay = weekPlan.find(d => d.day === expandedDay);

  return (
    <div style={{
      fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
      background: "#0D0D0D",
      color: "#F0EDE6",
      minHeight: "100vh",
      maxWidth: "780px",
      margin: "0 auto",
      padding: "0 0 40px 0"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; font-family: inherit; }
        .tab-btn:hover { opacity: 0.85; }
        .day-pill { cursor: pointer; transition: all 0.2s; }
        .day-pill:hover { transform: translateY(-1px); }
        .pillar-card { cursor: pointer; transition: all 0.2s; }
        .pillar-card:hover { transform: translateX(3px); }
        .ex-row { border-bottom: 1px solid #1E1E1E; }
        .ex-row:last-child { border-bottom: none; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)",
        borderBottom: "3px solid #E8C547",
        padding: "28px 24px 20px"
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#E8C547", marginBottom: "6px", fontFamily: "Barlow Condensed, sans-serif" }}>
          BASED ON BRYAN JOHNSON · YOU'RE EXERCISING WRONG (2026)
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 800,
          margin: 0,
          letterSpacing: "1px",
          lineHeight: 1.1,
          fontFamily: "Barlow Condensed, sans-serif"
        }}>
          YOUR PERSONALISED<br />
          <span style={{ color: "#E8C547" }}>TRAINING PROTOCOL</span>
        </h1>
        <div style={{ display: "flex", gap: "16px", marginTop: "14px", flexWrap: "wrap" }}>
          {[
            { label: "WEIGHT", val: "105 kg" },
            { label: "HEIGHT", val: "5'11\"" },
            { label: "BASE", val: "1.5 months" },
            { label: "FOOTBALL", val: "1×/week" }
          ].map(s => (
            <div key={s.label} style={{
              background: "#1A1A1A",
              border: "1px solid #333",
              borderRadius: "4px",
              padding: "5px 12px",
              fontFamily: "Barlow Condensed, sans-serif"
            }}>
              <div style={{ fontSize: "9px", color: "#888", letterSpacing: "2px" }}>{s.label}</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#F0EDE6" }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #222", background: "#111" }}>
        {[
          { id: "breakdown", label: "VIDEO BREAKDOWN" },
          { id: "plan", label: "WEEKLY PLAN" },
          { id: "notes", label: "STRATEGY NOTES" }
        ].map(t => (
          <button
            key={t.id}
            className="tab-btn"
            onClick={() => setActiveTab(t.id)}
            style={{
              flex: 1,
              padding: "14px 8px",
              fontSize: "12px",
              letterSpacing: "1.5px",
              fontWeight: 700,
              background: activeTab === t.id ? "#1A1A1A" : "transparent",
              color: activeTab === t.id ? "#E8C547" : "#666",
              borderBottom: activeTab === t.id ? "2px solid #E8C547" : "2px solid transparent",
              fontFamily: "Barlow Condensed, sans-serif"
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* VIDEO BREAKDOWN */}
      {activeTab === "breakdown" && (
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ fontSize: "11px", color: "#666", letterSpacing: "2px", marginBottom: "16px" }}>
            6 SEGMENTS · TAP TO EXPAND
          </div>
          {pillars.map(p => (
            <div
              key={p.id}
              className="pillar-card"
              onClick={() => setExpandedPillar(expandedPillar === p.id ? null : p.id)}
              style={{
                background: "#141414",
                border: `1px solid ${expandedPillar === p.id ? p.color : "#222"}`,
                borderLeft: `4px solid ${p.color}`,
                borderRadius: "6px",
                marginBottom: "10px",
                overflow: "hidden"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: "12px" }}>
                <span style={{ fontSize: "22px" }}>{p.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "9px", color: "#666", letterSpacing: "2px", fontFamily: "Barlow Condensed" }}>{p.time}</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.5px", fontFamily: "Barlow Condensed" }}>{p.title}</div>
                </div>
                <span style={{ color: "#444", fontSize: "16px", transform: expandedPillar === p.id ? "rotate(180deg)" : "none", transition: "0.2s" }}>▼</span>
              </div>
              {expandedPillar === p.id && (
                <div style={{ padding: "0 16px 16px", borderTop: "1px solid #1E1E1E" }}>
                  <p style={{ fontFamily: "Barlow, sans-serif", fontSize: "14px", color: "#BBB", lineHeight: 1.6, margin: "12px 0 10px" }}>
                    {p.summary}
                  </p>
                  <div style={{
                    background: "#0D0D0D",
                    border: `1px solid ${p.color}33`,
                    borderLeft: `3px solid ${p.color}`,
                    borderRadius: "4px",
                    padding: "10px 14px"
                  }}>
                    <div style={{ fontSize: "9px", color: p.color, letterSpacing: "2px", marginBottom: "4px", fontFamily: "Barlow Condensed" }}>KEY TAKEAWAY</div>
                    <div style={{ fontFamily: "Barlow, sans-serif", fontSize: "13px", color: "#F0EDE6", fontWeight: 600 }}>{p.keyTakeaway}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* WEEKLY PLAN */}
      {activeTab === "plan" && (
        <div>
          {/* Day selector */}
          <div style={{ padding: "16px 20px 0", overflowX: "auto" }}>
            <div style={{ display: "flex", gap: "8px", minWidth: "min-content" }}>
              {weekPlan.map(d => (
                <div
                  key={d.day}
                  className="day-pill"
                  onClick={() => setExpandedDay(d.day)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: `2px solid ${expandedDay === d.day ? d.color : "#222"}`,
                    background: expandedDay === d.day ? `${d.color}18` : "#141414",
                    cursor: "pointer",
                    minWidth: "70px",
                    textAlign: "center"
                  }}
                >
                  <div style={{ fontSize: "9px", color: expandedDay === d.day ? d.color : "#555", letterSpacing: "1px", fontFamily: "Barlow Condensed" }}>
                    {d.day.slice(0, 3).toUpperCase()}
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: expandedDay === d.day ? d.color : "#888", letterSpacing: "0.5px", fontFamily: "Barlow Condensed", marginTop: "2px" }}>
                    {typeLabels[d.type]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Day detail */}
          {activeDay && (
            <div style={{ padding: "16px 20px" }}>
              <div style={{
                background: "#141414",
                border: `1px solid ${activeDay.color}44`,
                borderTop: `3px solid ${activeDay.color}`,
                borderRadius: "8px",
                overflow: "hidden"
              }}>
                <div style={{ padding: "16px 18px", borderBottom: "1px solid #1E1E1E" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: "10px", color: activeDay.color, letterSpacing: "2px", fontFamily: "Barlow Condensed" }}>{activeDay.day.toUpperCase()}</div>
                      <div style={{ fontSize: "24px", fontWeight: 800, fontFamily: "Barlow Condensed", letterSpacing: "0.5px" }}>{activeDay.label}</div>
                      <div style={{ fontSize: "13px", color: "#888", fontFamily: "Barlow", marginTop: "2px" }}>{activeDay.focus}</div>
                    </div>
                    <div style={{
                      background: "#0D0D0D",
                      border: `1px solid ${activeDay.color}55`,
                      borderRadius: "6px",
                      padding: "8px 12px",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: "9px", color: "#666", letterSpacing: "1px", fontFamily: "Barlow Condensed" }}>DURATION</div>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: activeDay.color, fontFamily: "Barlow Condensed" }}>{activeDay.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Exercises */}
                <div>
                  {activeDay.exercises.map((ex, i) => (
                    <div key={i} className="ex-row" style={{ display: "flex", alignItems: "center", padding: "12px 18px", gap: "12px" }}>
                      <div style={{
                        width: "26px", height: "26px",
                        background: `${activeDay.color}22`,
                        border: `1px solid ${activeDay.color}55`,
                        borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: 700, color: activeDay.color,
                        flexShrink: 0, fontFamily: "Barlow Condensed"
                      }}>{i + 1}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "15px", fontWeight: 700, fontFamily: "Barlow Condensed", letterSpacing: "0.3px" }}>{ex.name}</div>
                        <div style={{ fontSize: "12px", color: "#888", fontFamily: "Barlow", marginTop: "1px" }}>{ex.note}</div>
                      </div>
                      <div style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: activeDay.color,
                        fontFamily: "Barlow Condensed",
                        letterSpacing: "0.5px",
                        textAlign: "right",
                        minWidth: "80px"
                      }}>{ex.sets}</div>
                    </div>
                  ))}
                </div>

                {/* Cardio + Mobility */}
                <div style={{ padding: "12px 18px", background: "#0D0D0D", borderTop: "1px solid #1E1E1E", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {activeDay.cardio && (
                    <div style={{
                      flex: 1, minWidth: "180px",
                      background: "#141414",
                      border: "1px solid #4ECDC433",
                      borderLeft: "3px solid #4ECDC4",
                      borderRadius: "4px",
                      padding: "8px 12px"
                    }}>
                      <div style={{ fontSize: "9px", color: "#4ECDC4", letterSpacing: "2px", fontFamily: "Barlow Condensed" }}>CARDIO</div>
                      <div style={{ fontSize: "12px", color: "#CCC", fontFamily: "Barlow", marginTop: "2px" }}>{activeDay.cardio}</div>
                    </div>
                  )}
                  <div style={{
                    flex: 1, minWidth: "180px",
                    background: "#141414",
                    border: "1px solid #A29BFE33",
                    borderLeft: "3px solid #A29BFE",
                    borderRadius: "4px",
                    padding: "8px 12px"
                  }}>
                    <div style={{ fontSize: "9px", color: "#A29BFE", letterSpacing: "2px", fontFamily: "Barlow Condensed" }}>MOBILITY</div>
                    <div style={{ fontSize: "12px", color: "#CCC", fontFamily: "Barlow", marginTop: "2px" }}>{activeDay.mobility}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STRATEGY NOTES */}
      {activeTab === "notes" && (
        <div style={{ padding: "20px" }}>
          {[
            {
              icon: "⚽",
              color: "#F9CA24",
              title: "Football = Your HIIT Session",
              body: "The 30–40 min match you play hits Zone 4–5 naturally. Stop adding dedicated HIIT on top of it. Football Sunday already checks your high-intensity cardio box for the week. Saturday is intentionally kept light — fresh legs going into Sunday means better performance on the pitch."
            },
            {
              icon: "📊",
              color: "#4ECDC4",
              title: "Zone 2 Is Your Biggest Gap",
              body: "At 105 kg, your fat oxidation and aerobic base need the most work. Tuesday and Saturday Zone 2 sessions, plus your Sunday walk, are non-negotiable. This is where body composition changes happen."
            },
            {
              icon: "💪",
              color: "#FF6B6B",
              title: "Progressive Overload — The Only Rule",
              body: "Add weight or reps each week on big lifts (Squat, Deadlift, Press, Row). Even 2.5 kg added per week on 3 lifts means you're 30+ kg stronger in 10 weeks. Track it."
            },
            {
              icon: "🧘",
              color: "#A29BFE",
              title: "Mobility After Football Is Critical",
              body: "At your size, hip flexors and hamstrings take a beating in football. 10 minutes of static stretching post-match dramatically reduces injury risk and next-day soreness. Don't skip it."
            },
            {
              icon: "⚖️",
              color: "#55EFC4",
              title: "Balance Work = Football Performance",
              body: "Single-leg work (Bulgarian split squat, single-leg RDL, BOSU balance) isn't just for longevity — it directly improves your agility, cutting ability, and injury resilience on the pitch."
            },
            {
              icon: "🔄",
              color: "#E8C547",
              title: "Reassess in 6 Weeks",
              body: "After 6 weeks on this plan, your fitness baseline will have meaningfully shifted. Add a 5th strength session, extend Zone 2 duration, or increase intensity on the high-intensity days."
            }
          ].map((note, i) => (
            <div key={i} style={{
              background: "#141414",
              border: `1px solid ${note.color}33`,
              borderLeft: `4px solid ${note.color}`,
              borderRadius: "6px",
              padding: "16px 18px",
              marginBottom: "12px"
            }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "20px" }}>{note.icon}</span>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, fontFamily: "Barlow Condensed", letterSpacing: "0.5px", color: note.color }}>{note.title}</div>
                  <div style={{ fontSize: "13px", color: "#AAA", fontFamily: "Barlow", lineHeight: 1.6, marginTop: "5px" }}>{note.body}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Weekly volume summary */}
          <div style={{
            background: "#141414",
            border: "1px solid #333",
            borderRadius: "6px",
            padding: "16px 18px",
            marginTop: "4px"
          }}>
            <div style={{ fontSize: "11px", color: "#E8C547", letterSpacing: "2px", marginBottom: "12px", fontFamily: "Barlow Condensed" }}>WEEKLY VOLUME SUMMARY</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { label: "Strength Sessions", val: "3×/week", color: "#FF6B6B" },
                { label: "Zone 2 Cardio", val: "~90–100 min", color: "#4ECDC4" },
                { label: "High Intensity (Football)", val: "~40 min", color: "#F9CA24" },
                { label: "Mobility / Stretching", val: "~35–40 min", color: "#A29BFE" },
                { label: "Balance Training", val: "2×/week", color: "#55EFC4" },
                { label: "Total Active Days", val: "6 of 7", color: "#E8C547" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #1E1E1E" }}>
                  <div style={{ fontSize: "12px", color: "#888", fontFamily: "Barlow" }}>{s.label}</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: s.color, fontFamily: "Barlow Condensed" }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
