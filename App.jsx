import { useState, useEffect } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const SEEDED_GAMES = [
  {date:"2025-12-04",winningTeam:"White",redTeam:["Andy", "Ben", "Brian", "Conor", "Crosby", "Gordon", "Liam", "Sam P", "Tommo", "Tony"],whiteTeam:["Ade", "Alex", "Elliot C", "John S", "Jon R", "Miles", "Paul", "Rob", "Spud"],scorers:{"Ade": 1, "Alex": 1, "Gordon": 1, "John S": 2, "Miles": 1, "Tony": 1},gf:0,ga:0},
  {date:"2025-12-11",winningTeam:"White",redTeam:["Alex", "Andy", "Brian", "Conor", "Elliot C", "Gordon", "Green", "Jon R", "Ste", "Tommo", "Will"],whiteTeam:["Ade", "Ben", "Crosby", "Hase", "Liam", "Miles", "Pring", "Rob", "Roy", "Sam P", "Tony"],scorers:{"Ade": 1, "Jon R": 1, "Liam": 1, "Sam P": 1, "Will": 1},gf:0,ga:0},
  {date:"2025-12-18",winningTeam:"White",redTeam:["Ben", "Crosby", "Elliot C", "Gordon", "Paul", "Pring", "Roy", "Spud", "Will"],whiteTeam:["Ade", "Brian", "Chris", "Conor", "Green", "Joe", "Jon R", "Matty", "Miles", "Rob"],scorers:{"Ade": 2, "Ben": 1, "Brian": 1, "Gordon": 1, "Joe": 1, "Matty": 1, "Sam R": 1, "Will": 2},gf:0,ga:0},
  {date:"2026-01-15",winningTeam:"Red",redTeam:["Ben", "Brian", "Crosby", "Elliot C", "Gordon", "Jon R", "Mark", "Roy", "Shaun", "Tommo", "Tony"],whiteTeam:["Ade", "Alex", "Andy", "Conor", "Green", "Hase", "Miles", "Pring", "Rob", "Spud", "Will"],scorers:{"Brian": 1, "Jon R": 1, "Mark": 1, "Roy": 1},gf:0,ga:0},
  {date:"2026-01-22",winningTeam:"White",redTeam:["Ade", "Conor", "Crosby", "Gordon", "Green", "Jon R", "Pring", "Sam P", "Shaun", "Tony"],whiteTeam:["Alex", "Andy", "Brian", "Elliot C", "Hase", "Liam", "Mark", "Rob", "Spud", "Tommo"],scorers:{"Ade": 1, "Alex": 1, "Elliot C": 1},gf:0,ga:0},
  {date:"2026-01-29",winningTeam:"White",redTeam:["Gordon", "Kofi", "Liam", "Mark", "Pring", "Roy", "Sam T", "Shaun", "Tony"],whiteTeam:["Ade", "Alex", "Ben", "Crosby", "Elliot C", "Green", "Jon R", "Rob", "Spud"],scorers:{"Ade": 2, "Alex": 2, "Elliot C": 3, "Gordon": 1, "Mark": 1, "Spud": 2},gf:0,ga:0},
  {date:"2026-02-05",winningTeam:"White",redTeam:["Ade", "Andy", "Brian", "Callum", "Conor", "Jon R", "Kofi", "Mark", "Sam P", "Sam T", "Shaun"],whiteTeam:["Alex", "Ben", "Crosby", "Elliot C", "Hase", "Liam", "Pring", "Rob", "Roy", "Spud", "Tony"],scorers:{"Alex": 1, "Jon R": 1, "Liam": 1, "Roy": 1, "Sam P": 2, "Tony": 2},gf:0,ga:0},
  {date:"2026-02-12",winningTeam:"Red",redTeam:["Ade", "Alex", "Andy", "Callum", "Conor", "Crosby", "Green", "Hase", "Mark", "Rob"],whiteTeam:["Ben", "Elliot C", "Gordon", "Joe", "Kofi", "Pring", "Roy", "Sam T", "Spud", "Tony"],scorers:{"Ade": 3, "Callum": 1, "Conor": 1, "Gordon": 1, "Joe": 1},gf:0,ga:0},
  {date:"2026-02-19",winningTeam:"White",redTeam:["Andy", "Brian", "Callum", "Conor", "Elliot C", "Kofi", "Pring", "Spud", "Zak"],whiteTeam:["Alex", "Ben", "Gordon", "Hase", "Joe", "Rob", "Roy", "Sam P", "Will"],scorers:{"Alex": 1, "Sam P": 2, "Will": 2},gf:0,ga:0},
  {date:"2026-02-26",winningTeam:"White",redTeam:["Ade", "Alex", "Andy", "Crosby", "Gordon", "Green", "Hase", "Joe", "Liam", "Mark", "Roy"],whiteTeam:["Ben", "Brian", "Conor", "Elliot C", "Jon R", "Kofi", "Pring", "Rob", "Sam P", "Spud", "Tony"],scorers:{"Ade": 1, "Crosby": 1, "Elliot C": 1, "Kofi": 2, "Sam P": 2},gf:0,ga:0},
  {date:"2026-03-05",winningTeam:"White",redTeam:["Green", "Hase", "Joe", "Liam", "Mark", "Roy", "Sam T", "Shaun", "Spud", "Tommo", "Tony"],whiteTeam:["Ade", "Alex", "Ben", "Brian", "Conor", "Crosby", "Elliot C", "Gordon", "Kofi", "Pring", "Rob"],scorers:{"Alex": 1, "Crosby": 1, "Gordon": 1, "Kofi": 1},gf:0,ga:0},
  {date:"2026-03-12",winningTeam:"Red",redTeam:["Crosby", "Elliot C", "Gordon", "Hase", "John D", "Jon R", "Kofi", "Mark", "Pring", "Roy"],whiteTeam:["Ade", "Brian", "Conor", "Crosby's Bro", "Green", "Liam", "Rob", "Sam T", "Shaun", "Spud"],scorers:{"Conor": 1, "Crosby": 1, "Gordon": 1},gf:0,ga:0},
  {date:"2026-03-19",winningTeam:"Red",redTeam:["Ade", "Ben", "Brian", "Callum", "Conor", "Crosby", "Hase", "Joe", "Sam T", "Spud", "Tommo"],whiteTeam:["Alex", "Elliot C", "Gordon", "Green", "John D", "Jon R", "Kofi", "Mark", "Paul Mc", "Pring", "Rob"],scorers:{"Joe": 1},gf:0,ga:0},
  {date:"2026-03-26",winningTeam:"White",redTeam:["Alex", "Ben", "Brian", "Crosby", "Green", "Harry", "Hase", "Liam", "Sam T", "Shaun", "Spud"],whiteTeam:["Ade", "Elliot C", "Gordon", "John D", "Jon R", "Kofi", "Mark", "Paul Mc", "Rob", "Roy", "Tommo"],scorers:{"Green": 1, "Roy": 1, "Tommo": 1},gf:0,ga:0},
  {date:"2026-04-02",winningTeam:"Red",redTeam:["Alex", "Conor", "Crosby", "Elliot C", "Jon R", "Roy", "Shaun", "Spud", "Tommo"],whiteTeam:["Ade", "Brian", "Gordon", "Harry", "Jack", "Joe", "Paul Mc", "Pring", "Rob"],scorers:{"Roy": 1},gf:0,ga:0},
  {date:"2026-04-16",winningTeam:"White",redTeam:["Alex", "Brian", "Elliot C", "Green", "Jon R", "Mark", "Roy", "Sam P", "Shaun", "Spud"],whiteTeam:["Ade", "Callum", "Conor", "Gordon", "Harry", "Hase", "Paul Mc", "Pring", "Sam T", "Tommo"],scorers:{"Ade": 2, "Callum": 2, "Conor": 2, "Green": 2, "Roy": 3, "Sam P": 1, "Shaun": 1},gf:0,ga:0},
  {date:"2026-04-23",winningTeam:"Red",redTeam:["Brian", "Elliot C", "Gordon", "Green", "Harry", "Hase", "Pring", "Roy", "Shaun"],whiteTeam:["Ade", "Alex", "Callum", "Conor", "Mark", "Paul Mc", "Rob", "Sam T", "Spud"],scorers:{"Ade": 1, "Alex": 1, "Brian": 2, "Elliot C": 3, "Gordon": 1, "Harrison": 2, "Hase": 1, "Pring": 1, "Rob": 2, "Spud": 1},gf:0,ga:0},
  {date:"2026-04-30",winningTeam:"Draw",redTeam:["Elliot C", "Harry", "Shaun", "Brian", "Pring", "Rob", "Ade", "Conor", "Hase", "Tommo"],whiteTeam:["Joe", "Alex", "Tony", "Callum", "Jon R", "Mark", "Green", "Spud", "Paul Mc", "Sam T"],scorers:{"Elliot C": 1, "Callum": 1},ownGoals:{},gf:1,ga:1},
  {date:"2026-05-07",winningTeam:"White",redTeam:["Ben", "Green", "Hase", "Mark", "Miles", "Roy", "Shaun", "Tommo", "Tony"],whiteTeam:["Brian", "Callum", "Conor", "Crosby", "Elliot C", "Jon R", "Pring", "Rob", "Sam T", "Spud"],scorers:{"Ben": 1, "Brian": 1, "Callum": 2, "Conor": 1, "Elliot C": 3, "Jon R": 3, "Roy": 1},gf:0,ga:0},
  {date:"2026-05-14",winningTeam:"White",redTeam:["Ade", "Conor", "Green", "Hase", "Joe", "Liam", "Mark", "Sam T", "Spud", "Tommo"],whiteTeam:["Alex", "Brian", "Elliot C", "Harry", "Jon R", "Miles", "Paul Mc", "Rob", "Shaun", "Tony"],scorers:{"Ade": 1, "Brian": 1, "Harrison": 1, "Liam": 1, "Miles": 1, "Tony": 1},gf:0,ga:0},
  {date:"2026-05-21",winningTeam:"White",redTeam:["Ade", "Alex", "Andy", "Brian", "Joe", "Jon R", "Miles", "Shaun"],whiteTeam:["Callum", "Conor", "Crosby", "Elliot C", "Hase", "Mark", "Rob", "Sam T"],scorers:{"Ade": 1, "Alex": 1, "Andy": 1, "Callum": 3, "Crosby": 2, "Elliot C": 3, "Mark": 1, "Sam T": 1},gf:0,ga:0},
  {date:"2026-05-28",winningTeam:"White",redTeam:["Callum", "Ade", "Alex", "Conor", "Mark", "Rob", "Pring", "Brian", "Green", "Sam T"],whiteTeam:["Elliot C", "Miles", "Joe", "Roy", "Kofi", "Paul Mc", "Shaun", "Andy", "Crosby", "Brian Mc"],scorers:{"Alex": 1, "Brian Mc": 1, "Elliot C": 1, "Joe": 1, "Kofi": 1},ownGoals:{},gf:4,ga:1},
  {date:"2026-06-04",winningTeam:"Red",redTeam:["Alex", "Brian", "Conor", "Elliot C", "Liam", "Mark", "Paul Mc", "Rob", "Shaun", "Spud", "Tommo"],whiteTeam:["Ade", "Callum", "Crosby", "Green", "Harry", "Hase", "Joe", "Jon R", "Pring", "Roy", "Sam T"],scorers:{"Elliot C": 1},gf:0,ga:0},
  {date:"2026-06-11",winningTeam:"White",redTeam:["Shaun", "Elliot C", "Sam P", "Andy", "Brian", "Miles", "Crosby", "Jon R", "Kofi", "Pring"],whiteTeam:["Brian Mc", "Jude", "Callum", "Ade", "Hase", "Mark", "Rob", "Sam T", "Green", "Tommo"],scorers:{"Callum": 1, "Ade": 1, "Mark": 1, "Sam P": 2, "Miles": 1},ownGoals:{"Andy": 1},gf:4,ga:3},
  {date:"2026-06-18",winningTeam:"Red",redTeam:["Ade", "Sam T", "Conor", "Crosby", "Kofi", "Hase", "Tommo", "Shaun"],whiteTeam:["Callum", "Miles", "Rob", "Brian", "Pring", "Green", "Roy", "Alex"],scorers:{"Ade": 3, "Sam T": 1, "Crosby": 2, "Callum": 1, "Roy": 2, "Alex": 1},ownGoals:{},gf:6,ga:4},
  {date:"2026-06-25",winningTeam:"Red",redTeam:["Brian Mc", "Rob", "Hase", "Sam T", "Jon R", "Tony", "Ade", "Joe", "Miles"],whiteTeam:["Elliot C", "Crosby", "Shaun", "Callum", "Mark", "Spud", "Brian", "Liam", "Green"],scorers:{"Hase": 1, "Ade": 3, "Joe": 3, "Mark": 1},ownGoals:{},gf:7,ga:1},
  {date:"2026-07-02",winningTeam:"White",redTeam:["Ste", "Rob", "Sam T", "Liam", "Sam P", "Miles", "Mark", "Pring", "Jack", "Shaun"],whiteTeam:["Elliot C", "Hase", "Ben", "Joe", "Callum", "Crosby", "Jonah", "Andy", "Jon R", "Ade"],scorers:{"Ade": 3, "Callum": 2, "Jon R": 2, "Elliot C": 2, "Jonah": 1, "Crosby": 1, "Liam": 1},ownGoals:{},gf:11,ga:1},
];




const isValidGame = (g) => g && g.redTeam && g.whiteTeam && g.redTeam.length > 0 && g.whiteTeam.length > 0;

// ─── DYNAMIC STATS COMPUTATION ──────────────────────────────────────────────
function computeStats(allGames) {
  const streak   = (seq, fn) => { let c=0; for(let i=seq.length-1;i>=0;i--){ if(seq[i]===null)continue; if(fn(seq[i]))c++; else break; } return c; };
  const maxStreak= (seq, fn) => { let mx=0,c=0; for(const r of seq){ if(r===null)continue; if(fn(r)){c++;mx=Math.max(mx,c);}else c=0; } return mx; };

  // Get sorted played dates — exclude incomplete games (a team with no players)
  const played = [...allGames]
    .filter(g => g.redTeam && g.whiteTeam && g.redTeam.length > 0 && g.whiteTeam.length > 0)
    .sort((a,b) => new Date(a.date)-new Date(b.date));

  // Collect all player names across all games
  const nameSet = new Set();
  played.forEach(g => { [...g.redTeam,...g.whiteTeam].forEach(n=>nameSet.add(n)); });

  const players = [...nameSet].sort().map(name => {
    const results = played.map(g => {
      const all = [...g.redTeam,...g.whiteTeam];
      if (!all.includes(name)) return null;
      if (g.winningTeam === "Draw") return 0.5; // draw
      const onRed = g.redTeam.includes(name);
      return (onRed && g.winningTeam==="Red")||(!onRed && g.winningTeam==="White") ? 1 : 0;
    });
    const playedRes = results.filter(r=>r!==null);
    const wins      = playedRes.filter(r=>r===1).length;
    const draws     = playedRes.filter(r=>r===0.5).length;
    const lossCount = playedRes.filter(r=>r===0).length;
    const games     = playedRes.length;
    const rawGoals  = played.reduce((s,g) => s+(g.scorers?.[name]||0), 0);
    const ownGoalsN = played.reduce((s,g) => s+(g.ownGoals?.[name]||0), 0);
    const goals     = rawGoals - ownGoalsN;
    const winPct    = games>0 ? Math.round(wins/games*1000)/10 : 0;

    // Personal GF/GA: sum of team goals scored/conceded in games the player appeared
    let teamGF = 0, teamGA = 0;
    played.forEach(g => {
      const inGame = [...g.redTeam,...g.whiteTeam].includes(name);
      if (!inGame) return;
      const onRed    = g.redTeam.includes(name);
      const myTeam   = onRed ? g.redTeam : g.whiteTeam;
      const oppTeam  = onRed ? g.whiteTeam : g.redTeam;
      // GF = my team's scorers + opposition own goals
      const myGF = [...myTeam].reduce((s,n)=>s+(g.scorers?.[n]||0),0)
                 + [...oppTeam].reduce((s,n)=>s+(g.ownGoals?.[n]||0),0);
      const myGA = [...oppTeam].reduce((s,n)=>s+(g.scorers?.[n]||0),0)
                 + [...myTeam].reduce((s,n)=>s+(g.ownGoals?.[n]||0),0);
      teamGF += myGF;
      teamGA += myGA;
    });

    // Scoring sequence — only count games with a regular goal (not OG)
    const scoredSeq = played
      .filter(g => [...g.redTeam,...g.whiteTeam].includes(name))
      .map(g => (g.scorers?.[name]||0) > 0 ? 1 : 0);

    return {
      name,
      total_wins:      wins,
      total_draws:     draws,
      total_losses:    lossCount,
      games_played:    games,
      win_pct:         winPct,
      total_goals:     goals,
      raw_goals:       rawGoals,
      own_goals:       ownGoalsN,
      games_attended:  games,
      team_gf:         teamGF,
      team_ga:         teamGA,
      team_gd:         teamGF - teamGA,
      // no-win streak: loss OR draw breaks an unbeaten run; win OR draw breaks a no-win run
      cur_no_win:      streak(playedRes,   r=>r===0),
      cur_unbeaten:    streak(playedRes,   r=>r===1 || r===0.5),
      max_no_win:      maxStreak(playedRes,r=>r===0),
      max_unbeaten:    maxStreak(playedRes,r=>r===1 || r===0.5),
      cur_scoring:     streak(scoredSeq,   r=>r===1),
      max_scoring:     maxStreak(scoredSeq,r=>r===1),
    };
  });

  // Team games for TeamPanel
  const teamGames = played.map(g => {
    const d = new Date(g.date);
    const dateStr = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;
    // Goals: for a winner game gf is winner's goals; for a draw both equal.
    // Compute red & white goals, then assign gf/ga relative to winner (or red for draws).
    const redGoals   = g.redTeam.reduce((s,n)=>s+(g.scorers?.[n]||0),0)
                     + g.whiteTeam.reduce((s,n)=>s+(g.ownGoals?.[n]||0),0);
    const whiteGoals = g.whiteTeam.reduce((s,n)=>s+(g.scorers?.[n]||0),0)
                     + g.redTeam.reduce((s,n)=>s+(g.ownGoals?.[n]||0),0);
    let gf, ga;
    if (g.winningTeam === "Red")        { gf = redGoals;   ga = whiteGoals; }
    else if (g.winningTeam === "White") { gf = whiteGoals; ga = redGoals; }
    else                                { gf = redGoals;   ga = whiteGoals; } // draw: show red-white
    return { date: dateStr, isoDate: g.date, winner: g.winningTeam, gf: g.gf||gf, ga: g.ga||ga,
             redGoals, whiteGoals,
             redTeam: g.redTeam, whiteTeam: g.whiteTeam,
             scorers: g.scorers||{}, ownGoals: g.ownGoals||{} };
  });

  // ── Second pass: stronger/weaker team appearances ──────────────────────────
  // Uses each player's own win% + goal-diff as a simple strength proxy (profile-free
  // so it works inside computeStats). For each game, compare the two teams' average
  // strength; tally whether each player was on the stronger or weaker side.
  const strengthOf = (name) => {
    const p = players.find(pl => pl.name === name);
    if (!p) return 50;
    return p.win_pct + (p.team_gd || 0) * 0.5; // win% plus half the goal diff
  };
  const teamAvg = (team) => team.length
    ? team.reduce((s,n)=>s+strengthOf(n),0)/team.length : 0;

  const strongerCount = {}, weakerCount = {};
  played.forEach(g => {
    const rAvg = teamAvg(g.redTeam);
    const wAvg = teamAvg(g.whiteTeam);
    if (rAvg === wAvg) return; // evenly matched, skip
    const strongerTeam = rAvg > wAvg ? g.redTeam : g.whiteTeam;
    const weakerTeam   = rAvg > wAvg ? g.whiteTeam : g.redTeam;
    strongerTeam.forEach(n => { strongerCount[n] = (strongerCount[n]||0)+1; });
    weakerTeam.forEach(n   => { weakerCount[n]   = (weakerCount[n]||0)+1; });
  });

  players.forEach(p => {
    p.stronger_team = strongerCount[p.name] || 0;
    p.weaker_team   = weakerCount[p.name]   || 0;
  });

  return { players, teamGames };
}


const DEFAULT_PROFILES = {
  "Conor": { ageGroup: "u25" },
  "Elliot C": { ageGroup: "u25" },
  "Harry": { ageGroup: "u25" },
  "Jack": { ageGroup: "u25" },
  "Joe": { ageGroup: "u25" },
  "Jude": { ageGroup: "u25" },
  "Callum": { ageGroup: "u25" },
  "Alex": { ageGroup: "u25" },
  "Liam": { ageGroup: "u25" },
  "Roy": { ageGroup: "u25" },
  "Sam P": { ageGroup: "u25" },
  "Sam R": { ageGroup: "u25" },
  "Will": { ageGroup: "u25" },
  "Zak": { ageGroup: "u25" },
  "Ade": { ageGroup: "45+" },
  "Gordon": { ageGroup: "45+" },
  "Jon R": { ageGroup: "45+" },
  "Shaun": { ageGroup: "45+" },
};

const AGE_GROUPS = [
  { id:"u25",  label:"Under 25",  modifier: 1.10 },  // youth bonus
  { id:"25-35",label:"25–35",     modifier: 1.00 },  // prime
  { id:"35-45",label:"35–45",     modifier: 0.92 },  // experienced
  { id:"45+",  label:"45+",       modifier: 0.82 },  // veteran
];

// Compute composite player rating 0-100
// Weights: ability 35%, fitness 30%, win rate 25%, age modifier applied overall
const compositeRating = (profile, winPct) => {
  if (!profile) return winPct; // fallback to just win rate
  const ability  = ((profile.ability  || 3) / 5) * 35;
  const fitness  = ((profile.fitness  || 3) / 5) * 30;
  const winScore = (winPct / 100) * 25;
  const gdScore  = Math.min(Math.max((profile.gd || 0) + 50, 0), 100) / 100 * 10;
  const raw      = ability + fitness + winScore + gdScore;
  const ageGroup = AGE_GROUPS.find(a => a.id === (profile.ageGroup || "25-35"));
  const modifier = ageGroup ? ageGroup.modifier : 1.0;
  return Math.round(raw * modifier);
};


// ─── ROLLING "FORM AT THE TIME" RATING ──────────────────────────────────────
// Computes a player's form using only games BEFORE a given date, over a rolling
// window (default last 6 games). This lets us judge a February fixture on
// February form rather than whole-season hindsight.
const formAsOf = (name, beforeDate, allGames, windowSize = 6) => {
  const prior = allGames
    .filter(g => g.date < beforeDate && [...g.redTeam, ...g.whiteTeam].includes(name)
                 && g.redTeam.length > 0 && g.whiteTeam.length > 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-windowSize);

  if (prior.length === 0) return { winPct: 50, gd: 0, games: 0 }; // neutral default

  let wins = 0, gf = 0, ga = 0;
  prior.forEach(g => {
    const onRed   = g.redTeam.includes(name);
    const myTeam  = onRed ? g.redTeam : g.whiteTeam;
    const oppTeam = onRed ? g.whiteTeam : g.redTeam;
    if (g.winningTeam !== "Draw") {
      if ((onRed && g.winningTeam === "Red") || (!onRed && g.winningTeam === "White")) wins++;
    } else { wins += 0.5; }
    gf += myTeam.reduce((s,n)=>s+(g.scorers?.[n]||0),0) + oppTeam.reduce((s,n)=>s+(g.ownGoals?.[n]||0),0);
    ga += oppTeam.reduce((s,n)=>s+(g.scorers?.[n]||0),0) + myTeam.reduce((s,n)=>s+(g.ownGoals?.[n]||0),0);
  });
  return {
    winPct: Math.round(wins / prior.length * 100),
    gd: gf - ga,
    games: prior.length,
  };
};

// Rolling composite rating as of a date — blends profile (ability/fitness/age)
// with form-at-the-time win% and goal difference.
const ratingAsOf = (name, beforeDate, allGames, profiles, windowSize = 6) => {
  const form = formAsOf(name, beforeDate, allGames, windowSize);
  const prof = { ...(profiles?.[name] || {}), gd: form.gd };
  return compositeRating(prof, form.winPct);
};

const COMPARE_COLORS = ["#f59e0b", "#34d399", "#f87171", "#a78bfa"];

// ─── STORAGE ABSTRACTION (works in Claude artifacts + deployed apps) ─────────
const Storage = {
  // Write to BOTH window.storage AND localStorage so data survives
  // regardless of which environment the app runs in. Read prefers whichever
  // has data, so a game saved in one place is never lost.
  async get(key) {
    let wsVal = null, lsVal = null;
    try { if (window.storage) { const r = await window.storage.get(key); wsVal = r ? r.value : null; } } catch(e) {}
    try { lsVal = localStorage.getItem(key); } catch(e) {}
    // Prefer the value that parses to the most games (most complete data)
    const count = (v) => { try { const a = JSON.parse(v); return Array.isArray(a) ? a.length : (a ? 1 : 0); } catch(e) { return 0; } };
    if (wsVal && lsVal) return count(wsVal) >= count(lsVal) ? wsVal : lsVal;
    return wsVal || lsVal;
  },
  async set(key, value) {
    // Write to both, independently — a failure in one never blocks the other
    try { if (window.storage) await window.storage.set(key, value); } catch(e) {}
    try { localStorage.setItem(key, value); } catch(e) {}
  }
};


const normalize = (val, max) => max === 0 ? 0 : Math.round((val / max) * 100);
const ukDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`;
};

function getRadarData(p, maxGoals, maxWins, maxGames) {
  return [
    { stat: "Goals",      value: normalize(p.total_goals, maxGoals) },
    { stat: "Wins",       value: normalize(p.total_wins, maxWins) },
    { stat: "Win %",      value: Math.round(p.win_pct) },
    { stat: "Attendance", value: normalize(p.games_attended, maxGames) },
  ];
}

function StatBadge({ label, value, sub, color }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${color}40`, borderRadius:12, padding:"14px 16px", display:"flex", flexDirection:"column", gap:3, flex:1, minWidth:90 }}>
      <span style={{ color:"#9ca3af", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"monospace" }}>{label}</span>
      <span style={{ color, fontSize:28, fontWeight:800, lineHeight:1, fontFamily:"'Bebas Neue','Impact',sans-serif", letterSpacing:"0.02em" }}>{value}</span>
      {sub && <span style={{ color:"#6b7280", fontSize:11 }}>{sub}</span>}
    </div>
  );
}

function StreakBadge({ label, current, best, isGood }) {
  const color = isGood ? (current > 0 ? "#34d399" : "#4b5563") : (current > 0 ? "#f87171" : "#4b5563");
  const bestColor = isGood ? "#34d399" : "#f87171";
  const bestLabel = isGood ? "Best" : "Worst";
  return (
    <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${color}30`, borderRadius:10, padding:"12px 14px", flex:1, minWidth:110 }}>
      <div style={{ color:"#6b7280", fontSize:10, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6, fontFamily:"monospace" }}>{label}</div>
      <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
        <span style={{ color, fontSize:26, fontWeight:800, fontFamily:"'Bebas Neue','Impact',sans-serif" }}>{current}</span>
        <span style={{ color:"#4b5563", fontSize:11 }}>now</span>
      </div>
      <div style={{ color:"#4b5563", fontSize:11, marginTop:2 }}>{bestLabel}: <span style={{ color: bestColor }}>{best}</span></div>
    </div>
  );
}

function TeamPanel({ teamGames: TEAM_GAMES, players: PLAYERS, profiles, allGames }) {
  const [expandedGame, setExpandedGame] = useState(null);
  const totalGF = TEAM_GAMES.reduce((s, g) => s + g.gf, 0);
  const totalGA = TEAM_GAMES.reduce((s, g) => s + g.ga, 0);
  const n = TEAM_GAMES.length;

  // Streaks — each game is a win (the winning team always wins by definition here,
  // but track W/L from whoever is "White" as a proxy for the session — actually
  // every game has a winner so track high-scoring wins vs close games)
  // For team streaks: every game recorded IS a completed game with a winner.
  // "Team" streaks don't apply the same way — instead show White vs Red records.
  const whiteWins = TEAM_GAMES.filter(g => g.winner === "White").length;
  const redWins   = TEAM_GAMES.filter(g => g.winner === "Red").length;
  const draws     = TEAM_GAMES.filter(g => g.winner === "Draw").length;

  // Current streaks for White and Red
  let whiteStreak = 0, redStreak = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (TEAM_GAMES[i].winner === "White") whiteStreak++; else break;
  }
  for (let i = n - 1; i >= 0; i--) {
    if (TEAM_GAMES[i].winner === "Red") redStreak++; else break;
  }
  let maxWhite = 0, maxRed = 0, cur = 0;
  for (const g of TEAM_GAMES) { if (g.winner === "White") { cur++; maxWhite = Math.max(maxWhite, cur); } else cur = 0; }
  cur = 0;
  for (const g of TEAM_GAMES) { if (g.winner === "Red")   { cur++; maxRed   = Math.max(maxRed,   cur); } else cur = 0; }

  const chartData = TEAM_GAMES.map(g => ({ date: g.date, "Goals For": g.gf, "Goals Against": g.ga }));

  return (
    <div>
      <div style={{ fontSize:12, color:"#6b7280", marginBottom:16, fontFamily:"monospace", letterSpacing:"0.05em" }}>SEASON 25/26 · {n} GAMES PLAYED</div>

      {/* Headline stats */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:16 }}>
        <StatBadge label="Goals For"     value={totalGF} sub={`${(totalGF/n).toFixed(1)} per game`} color="#34d399" />
        <StatBadge label="Goals Against" value={totalGA} sub={`${(totalGA/n).toFixed(1)} per game`} color="#f87171" />
        <StatBadge label="Goal Diff"     value={`+${totalGF - totalGA}`} color="#60a5fa" />
      </div>

      {/* White vs Red record */}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>Shirt Record</div>
        <div style={{ display:"flex", gap:10 }}>
          <div style={{ flex:1, background:"rgba(232,232,232,0.07)", border:"1px solid rgba(232,232,232,0.2)", borderRadius:10, padding:"12px 14px" }}>
            <div style={{ fontSize:10, color:"#cbd5e1", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4, display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ display:"inline-block", width:10, height:10, borderRadius:2, background:"#e8e8e8", border:"1px solid #94a3b8" }}></span> White
            </div>
            <div style={{ fontSize:28, fontWeight:800, color:"#f9fafb", fontFamily:"'Bebas Neue',Impact,sans-serif" }}>{whiteWins}<span style={{ fontSize:14, color:"#6b7280", marginLeft:4 }}>wins</span></div>
            <div style={{ fontSize:11, color:"#6b7280" }}>Current: <span style={{ color:"#f9fafb" }}>{whiteStreak}</span> · Best run: <span style={{ color:"#f9fafb" }}>{maxWhite}</span></div>
          </div>
          <div style={{ flex:1, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:10, padding:"12px 14px" }}>
            <div style={{ fontSize:10, color:"#f87171", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>🔴 Red</div>
            <div style={{ fontSize:28, fontWeight:800, color:"#f87171", fontFamily:"'Bebas Neue',Impact,sans-serif" }}>{redWins}<span style={{ fontSize:14, color:"#6b7280", marginLeft:4 }}>wins</span></div>
            <div style={{ fontSize:11, color:"#6b7280" }}>Current: <span style={{ color:"#f87171" }}>{redStreak}</span> · Best run: <span style={{ color:"#f87171" }}>{maxRed}</span></div>
          </div>
        </div>
        {draws > 0 && (
          <div style={{ marginTop:8, textAlign:"center", fontSize:12, color:"#94a3b8",
            background:"rgba(148,163,184,0.08)", border:"1px solid rgba(148,163,184,0.2)",
            borderRadius:8, padding:"6px" }}>
            🤝 {draws} draw{draws!==1?"s":""} this season
          </div>
        )}
      </div>

      {/* Goals for/against chart */}
      <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>Goals For vs Against</div>
      <div style={{ height:200, marginBottom:8 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top:4, right:4, left:-20, bottom:0 }}>
            <XAxis dataKey="date" tick={{ fill:"#4b5563", fontSize:9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:"#4b5563", fontSize:10 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8, color:"#f9fafb", fontSize:12 }} />
            <Legend wrapperStyle={{ fontSize:11, color:"#9ca3af" }} />
            <Bar dataKey="Goals For"     fill="#34d399" radius={[3,3,0,0]} />
            <Bar dataKey="Goals Against" fill="#f87171" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Game grid */}
      {/* ── BALANCE & UPSETS ─────────────────────────────────────────── */}
      {(() => {
        // Form-at-the-time: rate each player using only games BEFORE this fixture.
        const avgAsOf = (team, isoDate) => team && team.length
          ? Math.round(team.reduce((s,n)=>s+ratingAsOf(n, isoDate, allGames||[], profiles),0)/team.length) : 0;

        const rated = TEAM_GAMES.filter(g =>
          g.redTeam && g.whiteTeam &&
          g.redTeam.length >= 2 && g.whiteTeam.length >= 2 &&
          (g.gf + g.ga) < 30
        ).map(g => {
          const isDraw = g.winner === "Draw";
          const winners = g.winner === "Red" ? g.redTeam : g.whiteTeam;
          const losers  = g.winner === "Red" ? g.whiteTeam : g.redTeam;
          const winRating  = isDraw ? avgAsOf(g.redTeam, g.isoDate)   : avgAsOf(winners, g.isoDate);
          const loseRating = isDraw ? avgAsOf(g.whiteTeam, g.isoDate) : avgAsOf(losers, g.isoDate);
          const gap = loseRating - winRating; // +ve = winners were weaker = upset
          const margin = Math.abs(g.gf - g.ga);
          const isUpset = !isDraw && gap >= 3;
          const isOverperf = !isDraw && !isUpset && gap > -2 && margin >= 3;
          return { ...g, isDraw, winRating, loseRating, gap, margin, isUpset, isOverperf };
        });

        const upsets = rated.filter(g => g.isUpset);
        if (rated.length === 0) return null;

        return (
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>⚖️ Balance, Upsets & Overperformance</div>
            <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid #2d3748", borderRadius:12, padding:"12px 14px", marginBottom:10 }}>
              <div style={{ fontSize:13, color:"#f1f5f9", marginBottom:4 }}>
                <strong style={{ color:"#fbbf24" }}>{upsets.length}</strong> upset{upsets.length!==1?"s":""} · <strong style={{ color:"#fb923c" }}>{rated.filter(g=>g.isOverperf).length}</strong> overperformance{rated.filter(g=>g.isOverperf).length!==1?"s":""} from {rated.filter(g=>!g.isDraw).length} decisive games
              </div>
              <div style={{ fontSize:11, color:"#6b7280" }}>
                Upset = weaker team (by form) won. Overperformance = even teams but a 3+ goal margin. Form uses last 6 games before each fixture.
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {rated.map((g, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10,
                  background: g.isUpset ? "rgba(251,191,36,0.06)" : g.isOverperf ? "rgba(251,146,60,0.06)" : g.isDraw ? "rgba(148,163,184,0.05)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${g.isUpset ? "rgba(251,191,36,0.25)" : g.isOverperf ? "rgba(251,146,60,0.25)" : g.isDraw ? "rgba(148,163,184,0.2)" : "#1f2937"}`,
                  borderRadius:10, padding:"9px 12px" }}>
                  <span style={{ fontSize:11, color:"#4b5563", minWidth:38, fontFamily:"monospace" }}>{g.date}</span>
                  <span style={{ fontSize:12, color: g.isDraw?"#94a3b8":g.winner==="Red"?"#f87171":"#e2e8f0", fontWeight:700, minWidth:48 }}>
                    {g.isDraw?"🤝":g.winner==="Red"?"🔴":"⚪"} {g.gf}-{g.ga}
                  </span>
                  <span style={{ flex:1, fontSize:11, color:"#6b7280" }}>
                    {g.isDraw ? `Red ⭐${g.winRating} vs White ⭐${g.loseRating}` : `Winner ⭐${g.winRating} vs ⭐${g.loseRating}`}
                  </span>
                  {g.isDraw ? (
                    <span style={{ fontSize:11, color:"#94a3b8", fontWeight:700,
                      background:"rgba(148,163,184,0.12)", padding:"2px 8px", borderRadius:10 }}>
                      🤝 DRAW
                    </span>
                  ) : g.isUpset ? (
                    <span style={{ fontSize:11, color:"#fbbf24", fontWeight:700,
                      background:"rgba(251,191,36,0.12)", padding:"2px 8px", borderRadius:10 }}>
                      ⚡ UPSET +{g.gap}
                    </span>
                  ) : g.isOverperf ? (
                    <span style={{ fontSize:11, color:"#fb923c", fontWeight:700,
                      background:"rgba(251,146,60,0.12)", padding:"2px 8px", borderRadius:10 }}>
                      🚀 OVERPERFORMANCE
                    </span>
                  ) : (
                    <span style={{ fontSize:11, color:"#34d399" }}>
                      {g.gap <= -3 ? "✓ as expected" : "≈ even"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>Results <span style={{ textTransform:"none", color:"#374151" }}>· tap a score for detail</span></div>
      {/* Legend */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:8 }}>
        <span style={{ fontSize:9, color:"#fbbf24" }}>⚡ Gold = upset</span>
        <span style={{ fontSize:9, color:"#fb923c" }}>🚀 Orange = overperformance</span>
        <span style={{ fontSize:9, color:"#cbd5e1" }}>Silver = minor edge</span>
        <span style={{ fontSize:9, color:"#f87171" }}>🔴 Red win</span>
        <span style={{ fontSize:9, color:"#e2e8f0" }}>⚪ White win</span>
        <span style={{ fontSize:9, color:"#94a3b8" }}>🤝 Draw</span>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
        {TEAM_GAMES.map((g, i) => {
          const isOpen = expandedGame === i;
          const isDraw = g.winner === "Draw";

          // Determine balance status using form-at-the-time ratings
          const avgAsOf = (team) => team && team.length
            ? Math.round(team.reduce((s,n)=>s+ratingAsOf(n, g.isoDate, allGames||[], profiles),0)/team.length) : 0;
          let status = "standard"; // standard | upset | minor | overperf
          if (!isDraw && g.redTeam && g.whiteTeam && g.redTeam.length >= 2 && g.whiteTeam.length >= 2) {
            const winners = g.winner === "Red" ? g.redTeam : g.whiteTeam;
            const losers  = g.winner === "Red" ? g.whiteTeam : g.redTeam;
            const gap = avgAsOf(losers) - avgAsOf(winners); // +ve = weaker team won
            const margin = Math.abs(g.gf - g.ga);
            if (gap >= 3) status = "upset";                       // weaker team won (any margin)
            else if (gap >= 1) status = "minor";                  // slight underdog won
            else if (gap > -2 && margin >= 3) status = "overperf"; // even teams, big scoreline
          }

          // Colour scheme by status
          let tileBg, tileBorder, scoreColor, labelColor, label;
          if (isOpen) {
            tileBg = "rgba(245,158,11,0.2)"; tileBorder = "#f59e0b"; scoreColor = "#f59e0b";
            labelColor = "#f59e0b"; label = isDraw ? "Draw" : g.winner;
          } else if (isDraw) {
            tileBg = "rgba(148,163,184,0.12)"; tileBorder = "rgba(148,163,184,0.3)";
            scoreColor = "#94a3b8"; labelColor = "#94a3b8"; label = "Draw";
          } else if (status === "upset") {
            tileBg = "linear-gradient(160deg,rgba(251,191,36,0.22),rgba(245,158,11,0.10))";
            tileBorder = "#fbbf24"; scoreColor = "#fbbf24"; labelColor = "#fbbf24";
            label = `${g.winner} ⚡`;
          } else if (status === "overperf") {
            tileBg = "linear-gradient(160deg,rgba(251,146,60,0.22),rgba(234,88,12,0.10))";
            tileBorder = "#fb923c"; scoreColor = "#fb923c"; labelColor = "#fb923c";
            label = `${g.winner} 🚀`;
          } else if (status === "minor") {
            tileBg = "linear-gradient(160deg,rgba(226,232,240,0.18),rgba(148,163,184,0.06))";
            tileBorder = "rgba(203,213,225,0.5)"; scoreColor = "#e2e8f0"; labelColor = "#cbd5e1";
            label = g.winner;
          } else {
            tileBg = g.winner === "White" ? "rgba(255,255,255,0.06)" : "rgba(239,68,68,0.12)";
            tileBorder = g.winner === "White" ? "rgba(255,255,255,0.15)" : "rgba(239,68,68,0.3)";
            scoreColor = g.winner === "White" ? "#f9fafb" : "#f87171";
            labelColor = g.winner === "White" ? "#9ca3af" : "#f87171";
            label = g.winner;
          }

          return (
            <div key={i} onClick={() => setExpandedGame(isOpen ? null : i)} style={{
              borderRadius:7, cursor:"pointer",
              background: tileBg, border: `1px solid ${tileBorder}`,
              padding:"5px 7px", textAlign:"center", minWidth:42,
              boxShadow: !isOpen && status === "upset" ? "0 0 8px rgba(251,191,36,0.25)" : !isOpen && status === "overperf" ? "0 0 8px rgba(251,146,60,0.25)" : "none",
            }}>
              <div style={{ fontSize:9, color:"#6b7280", marginBottom:1 }}>{g.date}</div>
              <div style={{ fontSize:13, fontWeight:800, color: scoreColor, fontFamily:"'Bebas Neue',Impact,sans-serif", letterSpacing:"0.05em" }}>{g.gf}-{g.ga}</div>
              <div style={{ fontSize:8, color: labelColor }}>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Expanded game detail */}
      {expandedGame !== null && TEAM_GAMES[expandedGame] && (() => {
        const g = TEAM_GAMES[expandedGame];
        const isDraw = g.winner === "Draw";
        const teamPanel = (names, label, isWinner, color, bg, border) => (
          <div style={{ flex:1, background:bg, border:`1px solid ${border}`, borderRadius:10, padding:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ fontSize:11, color, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.05em" }}>{label}</span>
              {isWinner && <span style={{ fontSize:9, color:"#34d399", background:"rgba(52,211,153,0.15)", padding:"1px 6px", borderRadius:8 }}>WON</span>}
            </div>
            {(names||[]).map(n => {
              const goals = g.scorers?.[n] || 0;
              const ogs   = g.ownGoals?.[n] || 0;
              return (
                <div key={n} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                  <span style={{ fontSize:12, color:"#e2e8f0" }}>{n}</span>
                  <span style={{ fontSize:11 }}>
                    {goals > 0 && <span style={{ color:"#f59e0b" }}>{"⚽".repeat(Math.min(goals,5))}{goals>5?` ${goals}`:""}</span>}
                    {ogs > 0 && <span style={{ color:"#f87171", marginLeft:4 }}>OG×{ogs}</span>}
                  </span>
                </div>
              );
            })}
          </div>
        );
        return (
          <div style={{ marginTop:12, background:"rgba(255,255,255,0.02)", border:"1px solid #2d3748", borderRadius:12, padding:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:14, fontWeight:800, color:"#f1f5f9", fontFamily:"'Bebas Neue',Impact,sans-serif", letterSpacing:"0.05em" }}>
                {g.date} · {isDraw ? `Draw ${g.redGoals}-${g.whiteGoals}` : `${g.winner} won ${g.gf}-${g.ga}`}
              </span>
              <button onClick={() => setExpandedGame(null)} style={{ background:"transparent", border:"none", color:"#4b5563", cursor:"pointer", fontSize:16, lineHeight:1 }}>×</button>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              {teamPanel(g.redTeam, `🔴 Red (${(g.redTeam||[]).length})`, g.winner==="Red", "#f87171", "rgba(239,68,68,0.07)", "rgba(239,68,68,0.25)")}
              {teamPanel(g.whiteTeam, `⚪ White (${(g.whiteTeam||[]).length})`, g.winner==="White", "#e2e8f0", "rgba(232,232,232,0.04)", "rgba(232,232,232,0.15)")}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function PlayerCard({ player: p, maxGoals, maxWins, maxGames }) {
  const losses = p.total_losses != null ? p.total_losses : (p.games_played - p.total_wins);
  return (
    <div style={{ background:"linear-gradient(135deg,#1a1f2e 0%,#111827 100%)", border:"1px solid #2d3748", borderRadius:16, padding:20, marginBottom:20 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
        <div style={{ width:46, height:46, borderRadius:"50%", background:"linear-gradient(135deg,#cc2200 50%,#e8e8e8 50%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:800, color:"#0f172a", fontFamily:"'Bebas Neue',Impact,sans-serif", border:"2px solid #475569" }}>
          {p.name[0]}
        </div>
        <div>
          <div style={{ fontSize:22, fontWeight:800, color:"#f9fafb", fontFamily:"'Bebas Neue',Impact,sans-serif", letterSpacing:"0.05em" }}>{p.name}</div>
          <div style={{ fontSize:11, color:"#6b7280" }}>ThuNFC · Season 25/26</div>
        </div>
      </div>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
        <StatBadge label="Goals"  value={p.total_goals}                  color="#f59e0b" />
        <StatBadge label="Wins"   value={p.total_wins} sub={`${losses}L${p.total_draws?` · ${p.total_draws}D`:""}`} color="#34d399" />
        <StatBadge label="Win %"  value={`${p.win_pct}%`}                color="#60a5fa" />
        <StatBadge label="Games"  value={p.games_attended} sub="attended" color="#a78bfa" />
      </div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
        <StatBadge label="Team GF" value={p.team_gf||0} sub="goals scored"    color="#34d399" />
        <StatBadge label="Team GA" value={p.team_ga||0} sub="goals conceded"  color="#f87171" />
        <StatBadge label="Goal Diff" value={(p.team_gd||0)>0?`+${p.team_gd||0}`:p.team_gd||0}
          sub="while playing" color={(p.team_gd||0)>=0?"#60a5fa":"#f87171"} />
      </div>

      <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>Current Streaks</div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
        <StreakBadge label="Unbeaten Run"   current={p.cur_unbeaten} best={p.max_unbeaten} isGood={true} />
        <StreakBadge label="Without a Win"  current={p.cur_no_win}   best={p.max_no_win}   isGood={false} />
        <StreakBadge label="Scoring Streak" current={p.cur_scoring}  best={p.max_scoring}  isGood={true} />
      </div>

      <div style={{ height:190 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={getRadarData(p, maxGoals, maxWins, maxGames)}>
            <PolarGrid stroke="#2d3748" />
            <PolarAngleAxis dataKey="stat" tick={{ fill:"#9ca3af", fontSize:11 }} />
            <Radar dataKey="value" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop:10, padding:"10px 14px", background:"rgba(245,158,11,0.08)", borderRadius:8, border:"1px solid rgba(245,158,11,0.2)" }}>
        <span style={{ fontSize:12, color:"#9ca3af" }}>Goals per game: </span>
        <span style={{ fontSize:13, fontWeight:700, color:"#f59e0b" }}>
          {p.games_attended > 0 ? (p.total_goals / p.games_attended).toFixed(2) : "—"}
        </span>
        <span style={{ fontSize:12, color:"#6b7280", marginLeft:16 }}>Win rate: </span>
        <span style={{ fontSize:13, fontWeight:700, color:"#34d399" }}>
          {p.win_pct > 0 ? `${p.win_pct}%` : "—"}
        </span>
        <span style={{ fontSize:12, color:"#6b7280", marginLeft:16 }}>GF/GA per game: </span>
        <span style={{ fontSize:13, fontWeight:700, color:"#34d399" }}>
          {p.games_attended > 0 ? ((p.team_gf||0)/p.games_attended).toFixed(1) : "—"}
        </span>
        <span style={{ fontSize:12, color:"#6b7280" }}>/</span>
        <span style={{ fontSize:13, fontWeight:700, color:"#f87171" }}>
          {p.games_attended > 0 ? ((p.team_ga||0)/p.games_attended).toFixed(1) : "—"}
        </span>
      </div>
    </div>
  );
}

const RANKINGS = [
  {
    id: "goals",
    label: "Top Scorers",
    emoji: "⚽",
    color: "#f59e0b",
    fn: p => p.total_goals,
    fmt: v => `${v} goals`,
    higherIsBetter: true,
    minGames: 0,
  },
  {
    id: "wins",
    label: "Most Wins",
    emoji: "🏆",
    color: "#34d399",
    fn: p => p.total_wins,
    fmt: v => `${v} wins`,
    higherIsBetter: true,
    minGames: 0,
  },
  {
    id: "win_pct",
    label: "Best Win Rate",
    emoji: "📈",
    color: "#60a5fa",
    fn: p => p.win_pct,
    fmt: v => `${v}%`,
    higherIsBetter: true,
    minGames: 5,
  },
  {
    id: "attendance",
    label: "Most Attended",
    emoji: "📅",
    color: "#a78bfa",
    fn: p => p.games_attended,
    fmt: v => `${v} games`,
    higherIsBetter: true,
    minGames: 0,
  },
  {
    id: "goals_per_game",
    label: "Goals Per Game",
    emoji: "🎯",
    color: "#fb923c",
    fn: p => p.games_attended >= 3 ? +(p.total_goals / p.games_attended).toFixed(2) : 0,
    fmt: v => `${v.toFixed ? v.toFixed(2) : v}`,
    higherIsBetter: true,
    minGames: 3,
  },
  {
    id: "max_unbeaten",
    label: "Best Unbeaten Run",
    emoji: "🔥",
    color: "#f472b6",
    fn: p => p.max_unbeaten,
    fmt: v => `${v} games`,
    higherIsBetter: true,
    minGames: 0,
  },
  {
    id: "max_scoring",
    label: "Best Scoring Streak",
    emoji: "⚡",
    color: "#facc15",
    fn: p => p.max_scoring,
    fmt: v => `${v} games`,
    higherIsBetter: true,
    minGames: 0,
  },
  {
    id: "losses",
    label: "Most Losses",
    emoji: "📉",
    color: "#f87171",
    fn: p => p.total_losses != null ? p.total_losses : (p.games_played - p.total_wins),
    fmt: v => `${v} losses`,
    higherIsBetter: true,
    minGames: 3,
  },
  {
    id: "draws",
    label: "Most Draws",
    emoji: "🤝",
    color: "#94a3b8",
    fn: p => p.total_draws || 0,
    fmt: v => `${v} draws`,
    higherIsBetter: true,
    minGames: 1,
  },
  {
    id: "max_no_win",
    label: "Worst No-Win Run",
    emoji: "😬",
    color: "#94a3b8",
    fn: p => p.max_no_win,
    fmt: v => `${v} games`,
    higherIsBetter: true,
    minGames: 3,
  },
  {
    id: "lowest_win_pct",
    label: "Lowest Win Rate",
    emoji: "🪣",
    color: "#fb7185",
    fn: p => p.win_pct,
    fmt: v => `${v}%`,
    higherIsBetter: false,
    minGames: 5,
  },
  {
    id: "worst_no_win_cur",
    label: "Current No-Win Streak",
    emoji: "🥶",
    color: "#7dd3fc",
    fn: p => p.cur_no_win,
    fmt: v => `${v} games`,
    higherIsBetter: true,
    minGames: 3,
  },
  {
    id: "team_gf",
    label: "Most Goals Scored (Team)",
    emoji: "🎯",
    color: "#34d399",
    fn: p => p.team_gf || 0,
    fmt: v => `${v} scored`,
    higherIsBetter: true,
    minGames: 3,
  },
  {
    id: "team_ga",
    label: "Most Goals Conceded (Team)",
    emoji: "🙈",
    color: "#f87171",
    fn: p => p.team_ga || 0,
    fmt: v => `${v} conceded`,
    higherIsBetter: true,
    minGames: 3,
  },
  {
    id: "team_gd",
    label: "Best Goal Difference",
    emoji: "📊",
    color: "#60a5fa",
    fn: p => p.team_gd || 0,
    fmt: v => v >= 0 ? `+${v}` : `${v}`,
    higherIsBetter: true,
    minGames: 3,
  },
];

const MEDAL_COLORS = ["#f59e0b", "#9ca3af", "#cd7c3a"];
const MEDAL_LABELS = ["🥇", "🥈", "🥉"];

function RankingsView({ players: PLAYERS }) {
  const [activeRanking, setActiveRanking] = useState("goals");
  const ranking = RANKINGS.find(r => r.id === activeRanking);

  const sorted = [...PLAYERS]
    .filter(p => p.games_attended >= ranking.minGames)
    .sort((a, b) => {
      const va = ranking.fn(a), vb = ranking.fn(b);
      return ranking.higherIsBetter ? vb - va : va - vb;
    });

  const topVal = ranking.fn(sorted[0]);

  return (
    <div>
      {/* Category selector */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontFamily: "monospace" }}>Select Category</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {RANKINGS.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveRanking(r.id)}
              style={{
                padding: "8px 14px",
                borderRadius: 10,
                border: activeRanking === r.id ? `2px solid ${r.color}` : "1px solid #2d3748",
                background: activeRanking === r.id ? `${r.color}18` : "rgba(255,255,255,0.02)",
                color: activeRanking === r.id ? r.color : "#6b7280",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: activeRanking === r.id ? 700 : 400,
                display: "flex",
                alignItems: "center",
                gap: 5,
                transition: "all 0.15s",
              }}
            >
              <span>{r.emoji}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Podium for top 3 */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, marginBottom: 24, padding: "0 8px" }}>
        {[sorted[0], sorted[1], sorted[2]].map((p, podiumIdx) => {
          const rank = podiumIdx;
          const heights = [120, 90, 70];
          const val = p ? ranking.fn(p) : 0;
          return p ? (
            <div key={p.name} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ fontSize: 18 }}>{MEDAL_LABELS[rank]}</div>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: `linear-gradient(135deg, ${ranking.color}40, ${ranking.color}20)`,
                border: `2px solid ${ranking.color}${rank === 0 ? "ff" : rank === 1 ? "99" : "66"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 800, color: ranking.color,
                fontFamily: "'Bebas Neue', Impact, sans-serif",
              }}>
                {p.name[0]}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#f1f5f9", textAlign: "center" }}>{p.name}</div>
              <div style={{ fontSize: 12, color: ranking.color, fontWeight: 800 }}>{ranking.fmt(val)}</div>
              <div style={{
                width: "100%",
                height: heights[rank],
                background: `linear-gradient(180deg, ${ranking.color}30, ${ranking.color}10)`,
                border: `1px solid ${ranking.color}40`,
                borderBottom: "none",
                borderRadius: "6px 6px 0 0",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 900, color: `${ranking.color}50`,
                fontFamily: "'Bebas Neue', Impact, sans-serif",
              }}>
                {rank + 1}
              </div>
            </div>
          ) : <div key={podiumIdx} style={{ flex: 1 }} />;
        })}
      </div>

      {/* Full leaderboard */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1f2937", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid #1f2937", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#4b5563", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace" }}>
            {ranking.emoji} {ranking.label}
          </span>
          {ranking.minGames > 0 && (
            <span style={{ fontSize: 10, color: "#374151", fontStyle: "italic" }}>Min {ranking.minGames} games</span>
          )}
        </div>
        {sorted.map((p, i) => {
          const val = ranking.fn(p);
          const pct = topVal > 0 ? (val / topVal) * 100 : 0;
          const isTop3 = i < 3;
          return (
            <div key={p.name} style={{
              padding: "11px 16px",
              borderBottom: i < sorted.length - 1 ? "1px solid #111827" : "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: isTop3 ? `${ranking.color}08` : "transparent",
            }}>
              {/* Rank number */}
              <div style={{
                width: 26, height: 26, borderRadius: 6,
                background: isTop3 ? `${ranking.color}20` : "transparent",
                border: isTop3 ? `1px solid ${ranking.color}40` : "1px solid #1f2937",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800,
                color: isTop3 ? ranking.color : "#4b5563",
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                flexShrink: 0,
              }}>
                {i + 1}
              </div>

              {/* Name */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: isTop3 ? 700 : 400, color: isTop3 ? "#f1f5f9" : "#9ca3af", marginBottom: 3 }}>
                  {p.name}
                  {i === 0 && <span style={{ marginLeft: 6, fontSize: 10, color: ranking.color, background: `${ranking.color}20`, padding: "1px 6px", borderRadius: 4 }}>LEADER</span>}
                </div>
                {/* Bar */}
                <div style={{ height: 4, background: "#1f2937", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${ranking.color}, ${ranking.color}80)`,
                    borderRadius: 2,
                    transition: "width 0.3s ease",
                  }} />
                </div>
              </div>

              {/* Value */}
              <div style={{
                fontSize: 14, fontWeight: 800,
                color: isTop3 ? ranking.color : "#6b7280",
                fontFamily: "'Bebas Neue', Impact, sans-serif",
                letterSpacing: "0.04em",
                flexShrink: 0,
                minWidth: 60,
                textAlign: "right",
              }}>
                {ranking.fmt(val)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompareView({ selected, onToggle, players: PLAYERS }) {
  const cPlayers = PLAYERS.filter(p => selected.includes(p.name));
  const barData = ["Goals","Wins","Win %","Attendance"].map(stat => {
    const row = { stat };
    cPlayers.forEach(p => {
      if (stat === "Goals")      row[p.name] = p.total_goals;
      else if (stat === "Wins")  row[p.name] = p.total_wins;
      else if (stat === "Win %") row[p.name] = p.win_pct;
      else                       row[p.name] = p.games_attended;
    });
    return row;
  });

  // Normalized radar data — every axis scaled 0-100 across the whole squad
  // so no single metric (like attendance) dominates the shape.
  const maxOf = (fn) => Math.max(...PLAYERS.map(fn), 1);
  const norms = {
    goals:   maxOf(p => p.total_goals),
    wins:    maxOf(p => p.total_wins),
    att:     maxOf(p => p.games_attended),
    gd:      maxOf(p => Math.abs(p.team_gd || 0)),
  };
  const radarAxes = ["Win %", "Goals", "Wins", "Attendance", "Goal Diff"];
  const radarData = radarAxes.map(axis => {
    const row = { axis };
    cPlayers.forEach(p => {
      let v = 0;
      if (axis === "Win %")         v = p.win_pct;
      else if (axis === "Goals")    v = (p.total_goals / norms.goals) * 100;
      else if (axis === "Wins")     v = (p.total_wins / norms.wins) * 100;
      else if (axis === "Attendance") v = (p.games_attended / norms.att) * 100;
      else if (axis === "Goal Diff")  v = (((p.team_gd||0) + norms.gd) / (norms.gd*2)) * 100;
      row[p.name] = Math.round(v);
    });
    return row;
  });

  return (
    <div>
      <div style={{ fontSize:12, color:"#6b7280", marginBottom:8 }}>Select up to 4 players:</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:20 }}>
        {PLAYERS.map(p => {
          const isSelected = selected.includes(p.name);
          const ci = selected.indexOf(p.name);
          return (
            <button key={p.name} onClick={() => onToggle(p.name)} style={{
              padding:"5px 12px", borderRadius:20,
              border: isSelected ? `2px solid ${COMPARE_COLORS[ci]}` : "1px solid #374151",
              background: isSelected ? `${COMPARE_COLORS[ci]}20` : "transparent",
              color: isSelected ? COMPARE_COLORS[ci] : "#9ca3af",
              cursor:"pointer", fontSize:12, fontWeight: isSelected ? 700 : 400,
            }}>{p.name}</button>
          );
        })}
      </div>

      {cPlayers.length >= 2 ? (
        <>
          {/* Overlapping normalized radar */}
          <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4, fontFamily:"monospace" }}>Player Profiles <span style={{ textTransform:"none", color:"#374151" }}>· all axes 0-100%</span></div>
          <div style={{ height:280, marginBottom:8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="#2d3748" />
                <PolarAngleAxis dataKey="axis" tick={{ fill:"#9ca3af", fontSize:11 }} />
                {cPlayers.map((p, i) => (
                  <Radar key={p.name} name={p.name} dataKey={p.name}
                    stroke={COMPARE_COLORS[i]} fill={COMPARE_COLORS[i]} fillOpacity={0.12} strokeWidth={2} />
                ))}
                <Legend wrapperStyle={{ fontSize:12 }} />
                <Tooltip contentStyle={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8, color:"#f9fafb", fontSize:12 }}
                  formatter={(v) => `${v}%`} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4, marginTop:12, fontFamily:"monospace" }}>Raw Totals</div>
          <div style={{ height:240, marginBottom:20 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top:10, right:10, left:-10, bottom:0 }}>
                <XAxis dataKey="stat" tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill:"#6b7280", fontSize:10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8, color:"#f9fafb" }} />
                <Legend wrapperStyle={{ fontSize:12, color:"#9ca3af" }} />
                {cPlayers.map((p, i) => <Bar key={p.name} dataKey={p.name} fill={COMPARE_COLORS[i]} radius={[4,4,0,0]} />)}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ overflowX:"auto", borderRadius:12, border:"1px solid #1f2937", background:"#0d1117" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, tableLayout:"fixed" }}>
              <thead>
                <tr style={{ borderBottom:"1px solid #2d3748", background:"#111827" }}>
                  <th style={{ padding:"8px 6px 8px 10px", textAlign:"left", color:"#6b7280", fontWeight:500,
                    fontSize:10, textTransform:"uppercase", position:"sticky", left:0,
                    background:"#111827", zIndex:2, borderRight:"1px solid #1f2937", width:"34%" }}>Stat</th>
                  {cPlayers.map((p, i) => (
                    <th key={p.name} style={{ padding:"8px 4px", textAlign:"center", color:COMPARE_COLORS[i], fontWeight:700, fontSize:11.5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label:"Goals",           fn: p => p.raw_goals != null ? p.raw_goals : p.total_goals },
                  { label:"Wins",            fn: p => p.total_wins },
                  { label:"Draws",           fn: p => p.total_draws || 0 },
                  { label:"Losses",          fn: p => p.total_losses != null ? p.total_losses : (p.games_played-p.total_wins), lowerIsBetter: true },
                  { label:"Games Played",    fn: p => p.games_played },
                  { label:"Win %",           fn: p => p.win_pct,    fmt: v => `${v}%` },
                  { label:"Attendance",      fn: p => p.games_attended },
                  { label:"Goals/Game",      fn: p => p.games_attended > 0 ? +(p.total_goals/p.games_attended).toFixed(2) : 0, fmt: v => v.toFixed(2) },
                  { label:"Own Goals",       fn: p => p.own_goals || 0, lowerIsBetter: true },
                  { label:"Unbeaten Run",    fn: p => p.cur_unbeaten },
                  { label:"Best Unbeaten",   fn: p => p.max_unbeaten },
                  { label:"W/o Win (cur)",   fn: p => p.cur_no_win,  lowerIsBetter: true },
                  { label:"W/o Win (worst)", fn: p => p.max_no_win,  lowerIsBetter: true },
                  { label:"Scoring Streak",  fn: p => p.cur_scoring },
                  { label:"Best Scoring",    fn: p => p.max_scoring },
                  { label:"Team GF",         fn: p => p.team_gf||0 },
                  { label:"Team GA",         fn: p => p.team_ga||0, lowerIsBetter: true },
                  { label:"Goal Diff",       fn: p => p.team_gd||0, fmt: v => v>=0?`+${v}`:v },
                ].map((row, ri) => {
                  const vals = cPlayers.map(row.fn);
                  const best = row.lowerIsBetter ? Math.min(...vals) : Math.max(...vals);
                  const rowBg = ri % 2 === 0 ? "#0d1117" : "#0a0f16";
                  return (
                    <tr key={row.label} style={{ borderBottom:"1px solid #111827" }}>
                      <td style={{ padding:"9px 6px 9px 10px", color:"#9ca3af", fontSize:11,
                        position:"sticky", left:0, background:rowBg, zIndex:1,
                        borderRight:"1px solid #1f2937", whiteSpace:"nowrap" }}>{row.label}</td>
                      {cPlayers.map((p, i) => {
                        const val = row.fn(p);
                        const isTop = val === best && best > 0;
                        const display = row.fmt ? row.fmt(val) : val;
                        const note = row.note ? row.note(p) : "";
                        return (
                          <td key={p.name} style={{ padding:"9px 4px", textAlign:"center",
                            color: isTop ? COMPARE_COLORS[i] : "#d1d5db",
                            fontWeight: isTop ? 800 : 400, background:rowBg }}>
                            <span style={{ whiteSpace:"nowrap" }}>{display}{isTop && <span style={{ marginLeft:2, fontSize:8 }}>▲</span>}</span>
                            {note && <span style={{ display:"block", fontSize:8, color:"#f87171", fontWeight:600, marginTop:1 }}>{note}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div style={{ textAlign:"center", color:"#4b5563", padding:"40px 0", fontSize:14 }}>Select at least 2 players to compare</div>
      )}
    </div>
  );
}


// ─── PLAYER NAMES (canonical list for registry) ────────────────────────────
const PLAYER_NAMES = [
  "Ade","Alex","Andy","Ben","Brian","Brian Mc","Callum","Chris","Conor","Crosby","Crosby's Bro","Elliot C","Gordon","Green","Harry","Hase","Jack","Joe","John D","John S","Jon R","Jonah","Jude","Kofi","Liam","Mark","Matty","Miles","Paul","Paul Mc","Pring","Rob","Roy","Sam P","Sam R","Sam T","Shaun","Spud","Ste","Tommo","Tony","Will","Zak"
];

function RegistryView({ onGameSaved, savedGames, setSavedGames }) {
  const [unlocked, setUnlocked]   = useState(false);
  const [pwInput, setPwInput]     = useState("");
  const [pwError, setPwError]     = useState(false);
  const [date, setDate]           = useState("");
  const [playerList, setPlayerList] = useState([...PLAYER_NAMES]);
  useEffect(() => {
    (async () => {
      try {
        const stored = await Storage.get("thunade_players");
        if (stored) setPlayerList(JSON.parse(stored));
      } catch(e) {}
    })();
  }, []);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [addError, setAddError]     = useState("");
  const [addSuccess, setAddSuccess] = useState("");
  const [profiles, setProfiles]     = useState(DEFAULT_PROFILES);

  // Load profiles, merging stored over hardcoded defaults
  useEffect(() => {
    (async () => {
      try {
        const stored = await Storage.get("thunade_profiles");
        if (stored) {
          const parsed = JSON.parse(stored);
          const merged = { ...DEFAULT_PROFILES };
          Object.keys(parsed).forEach(name => {
            merged[name] = { ...DEFAULT_PROFILES[name], ...parsed[name] };
          });
          setProfiles(merged);
        }
      } catch(e) {}
    })();
  }, []);

  const saveProfile = async (name, key, val) => {
    const updated = { ...profiles, [name]: { ...(profiles[name]||{}), [key]: val } };
    setProfiles(updated);
    await Storage.set("thunade_profiles", JSON.stringify(updated));
  };

  const [backupText, setBackupText] = useState("");
  const [importText, setImportText] = useState("");
  const [backupMsg, setBackupMsg]   = useState("");

  const makeBackup = () => {
    const data = { games: savedGames, profiles, players: playerList };
    setBackupText(JSON.stringify(data));
    setBackupMsg("✓ Backup ready — copy the text below and save it somewhere safe");
  };

  const doImport = async () => {
    try {
      const data = JSON.parse(importText.trim());
      if (data.games) { setSavedGames(data.games); await Storage.set("thunade_games", JSON.stringify(data.games)); }
      if (data.profiles) { setProfiles(data.profiles); await Storage.set("thunade_profiles", JSON.stringify(data.profiles)); }
      if (data.players) { setPlayerList(data.players); await Storage.set("thunade_players", JSON.stringify(data.players)); }
      setBackupMsg(`✓ Restored ${data.games?.length||0} games successfully!`);
      setImportText("");
    } catch(e) {
      setBackupMsg("✗ Couldn't read that backup text — make sure it's pasted in full");
    }
  };
  const [winningTeam, setWinningTeam] = useState("White");
  const [redTeam, setRedTeam]     = useState([]);
  const [whiteTeam, setWhiteTeam] = useState([]);
  const [scorers, setScorers]     = useState({}); // { name: goals }
  const [ownGoals, setOwnGoals]     = useState({}); // { name: ownGoalCount }
  const [saved, setSaved]         = useState(false);
  const [view, setView]           = useState("form"); // "form" | "history"

  const togglePlayer = (name, team) => {
    if (team === "Red") {
      setRedTeam(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
      setWhiteTeam(prev => prev.filter(n => n !== name));
    } else {
      setWhiteTeam(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
      setRedTeam(prev => prev.filter(n => n !== name));
    }
    // Clear scorer if deselected
    if (redTeam.includes(name) || whiteTeam.includes(name)) {
      setScorers(prev => { const n = {...prev}; delete n[name]; return n; });
    }
  };

  const setGoals = (name, val) => {
    const g = Math.max(0, parseInt(val) || 0);
    if (g === 0) {
      setScorers(prev => { const n = {...prev}; delete n[name]; return n; });
    } else {
      setScorers(prev => ({ ...prev, [name]: g }));
    }
  };

  const toggleOwnGoal = (name) => {
    setOwnGoals(prev => {
      const cur = prev[name] || 0;
      const next = cur + 1;
      if (next > 3) { // max 3 OGs, cycle back to 0
        const n = {...prev}; delete n[name]; return n;
      }
      return { ...prev, [name]: next };
    });
  };

  const allPlaying = [...redTeam, ...whiteTeam];
  // Compute each team's goals (scorers + opposition own goals)
  const redGoals   = redTeam.reduce((s,n)=>s+(scorers[n]||0),0)   + whiteTeam.reduce((s,n)=>s+(ownGoals[n]||0),0);
  const whiteGoals = whiteTeam.reduce((s,n)=>s+(scorers[n]||0),0) + redTeam.reduce((s,n)=>s+(ownGoals[n]||0),0);
  // gf/ga shown relative to winner (or red-white for draws)
  const gf = winningTeam === "White" ? whiteGoals : redGoals;
  const ga = winningTeam === "White" ? redGoals   : whiteGoals;

  const handleSave = async () => {
    if (!date || allPlaying.length === 0) return;
    const game = { date, winningTeam, redTeam, whiteTeam, scorers, ownGoals, gf, ga };
    // Replace existing entry for same date, or append
    const updated = [...savedGames.filter(g => g.date !== date), game];
    setSavedGames(updated);
    await Storage.set("thunade_games", JSON.stringify(updated));
    onGameSaved(game);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setDate(""); setRedTeam([]); setWhiteTeam([]); setScorers({}); setOwnGoals({});
    }, 2000);
  };

  const handleDelete = async (idx) => {
    const updated = savedGames.filter((_, i) => i !== idx);
    setSavedGames(updated);
    await Storage.set("thunade_games", JSON.stringify(updated));
  };

  const btn = (label, active, onClick, color="#f59e0b") => (
    <button onClick={onClick} style={{
      padding:"6px 14px", borderRadius:20, cursor:"pointer", fontSize:12,
      border: active ? `2px solid ${color}` : "1px solid #374151",
      background: active ? `${color}18` : "transparent",
      color: active ? color : "#6b7280", fontWeight: active ? 700 : 400,
    }}>{label}</button>
  );

  const input = (placeholder, value, onChange, type="text") => (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange}
      style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8,
        padding:"9px 12px", color:"#f9fafb", fontSize:13, outline:"none",
        width:"100%", boxSizing:"border-box" }} />
  );

  const checkPassword = () => {
    if (pwInput === "LegendAde93") {
      setUnlocked(true);
      setPwError(false);
    } else {
      setPwError(true);
      setPwInput("");
    }
  };

  const addPlayer = async () => {
    const name = newPlayerName.trim();
    if (!name) { setAddError("Please enter a name"); return; }
    if (playerList.map(n=>n.toLowerCase()).includes(name.toLowerCase())) {
      setAddError(`${name} is already in the squad`); return;
    }
    const updated = [...playerList, name].sort();
    setPlayerList(updated);
    await Storage.set("thunade_players", JSON.stringify(updated));
    setNewPlayerName("");
    setAddError("");
    setAddSuccess(`✓ ${name} added to the squad!`);
    setTimeout(() => setAddSuccess(""), 3000);
  };

  const removePlayer = async (name) => {
    if (!window.confirm(`Remove ${name} from the squad?`)) return;
    const updated = playerList.filter(n => n !== name);
    setPlayerList(updated);
    await Storage.set("thunade_players", JSON.stringify(updated));
  };

  if (!unlocked) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"40px 16px" }}>
      <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
      <div style={{ fontSize:18, fontWeight:800, color:"#f1f5f9", fontFamily:"'Bebas Neue',Impact,sans-serif",
        letterSpacing:"0.06em", marginBottom:4 }}>ADMIN ONLY</div>
      <div style={{ fontSize:12, color:"#4b5563", marginBottom:28, textAlign:"center" }}>
        Enter the password to log games
      </div>
      <input
        type="password"
        placeholder="Password..."
        value={pwInput}
        onChange={e => { setPwInput(e.target.value); setPwError(false); }}
        onKeyDown={e => e.key === "Enter" && checkPassword()}
        style={{ width:"100%", maxWidth:280, boxSizing:"border-box",
          background:"#1f2937", border: pwError ? "1px solid #ef4444" : "1px solid #374151",
          borderRadius:10, padding:"12px 16px", color:"#f9fafb", fontSize:14,
          outline:"none", textAlign:"center", marginBottom:10 }}
      />
      {pwError && (
        <div style={{ fontSize:12, color:"#ef4444", marginBottom:10 }}>Incorrect password</div>
      )}
      <button onClick={checkPassword} style={{
        width:"100%", maxWidth:280, padding:"12px", borderRadius:10, border:"none",
        background:"linear-gradient(135deg,#ef4444,#cc2200)", color:"#fff",
        fontSize:14, fontWeight:800, cursor:"pointer", letterSpacing:"0.05em",
        fontFamily:"'Bebas Neue',Impact,sans-serif",
      }}>UNLOCK</button>
    </div>
  );

  return (
    <div>
      {/* Admin badge */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ fontSize:11, color:"#34d399", background:"rgba(52,211,153,0.1)",
          border:"1px solid rgba(52,211,153,0.2)", borderRadius:20, padding:"3px 10px",
          fontFamily:"monospace", letterSpacing:"0.06em" }}>🔓 ADMIN ACCESS</div>
        <button onClick={() => setUnlocked(false)} style={{ background:"transparent", border:"none",
          color:"#4b5563", cursor:"pointer", fontSize:12 }}>Lock 🔒</button>
      </div>
      {/* Sub-tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {btn("➕ Log Game", view==="form",    () => setView("form"))}
        {btn("📋 History",  view==="history", () => setView("history"), "#60a5fa")}
        {btn("👤 Players",  view==="players", () => setView("players"), "#34d399")}
        {btn("⭐ Profiles", view==="profiles", () => setView("profiles"), "#f59e0b")}
        {btn("💾 Backup",   view==="backup",   () => setView("backup"), "#34d399")}
      </div>

      {view === "form" && (
        <>
          {/* Date */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:"monospace" }}>Game Date</div>
            {input("", date, e => setDate(e.target.value), "date")}
          </div>

          {/* Winning team */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:"monospace" }}>Result</div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => setWinningTeam("White")} style={{
                flex:1, padding:"10px 6px", borderRadius:10, cursor:"pointer", fontSize:12, fontWeight:700,
                border: winningTeam==="White" ? "2px solid #e8e8e8" : "1px solid #374151",
                background: winningTeam==="White" ? "rgba(232,232,232,0.12)" : "transparent",
                color: winningTeam==="White" ? "#f1f5f9" : "#6b7280",
              }}>⚪ White Won</button>
              <button onClick={() => setWinningTeam("Draw")} style={{
                flex:1, padding:"10px 6px", borderRadius:10, cursor:"pointer", fontSize:12, fontWeight:700,
                border: winningTeam==="Draw" ? "2px solid #94a3b8" : "1px solid #374151",
                background: winningTeam==="Draw" ? "rgba(148,163,184,0.15)" : "transparent",
                color: winningTeam==="Draw" ? "#cbd5e1" : "#6b7280",
              }}>🤝 Draw</button>
              <button onClick={() => setWinningTeam("Red")} style={{
                flex:1, padding:"10px 6px", borderRadius:10, cursor:"pointer", fontSize:12, fontWeight:700,
                border: winningTeam==="Red" ? "2px solid #ef4444" : "1px solid #374151",
                background: winningTeam==="Red" ? "rgba(239,68,68,0.12)" : "transparent",
                color: winningTeam==="Red" ? "#ef4444" : "#6b7280",
              }}>🔴 Red Won</button>
            </div>
          </div>

          {/* Team sheets side by side */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:"monospace" }}>Team Sheets — tap to assign</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {/* Red */}
              <div style={{ background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:10, padding:10 }}>
                <div style={{ fontSize:11, color:"#f87171", fontWeight:700, marginBottom:8, textAlign:"center" }}>🔴 RED ({redTeam.length})</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {playerList.map(n => (
                    <button key={n} onClick={() => togglePlayer(n, "Red")} style={{
                      padding:"3px 8px", borderRadius:12, cursor:"pointer", fontSize:11,
                      border: redTeam.includes(n) ? "2px solid #ef4444" : "1px solid #374151",
                      background: redTeam.includes(n) ? "rgba(239,68,68,0.2)" : "transparent",
                      color: redTeam.includes(n) ? "#f87171" : "#6b7280",
                      fontWeight: redTeam.includes(n) ? 700 : 400,
                    }}>{n}</button>
                  ))}
                </div>
              </div>
              {/* White */}
              <div style={{ background:"rgba(232,232,232,0.04)", border:"1px solid rgba(232,232,232,0.15)", borderRadius:10, padding:10 }}>
                <div style={{ fontSize:11, color:"#cbd5e1", fontWeight:700, marginBottom:8, textAlign:"center" }}>⚪ WHITE ({whiteTeam.length})</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {playerList.map(n => (
                    <button key={n} onClick={() => togglePlayer(n, "White")} style={{
                      padding:"3px 8px", borderRadius:12, cursor:"pointer", fontSize:11,
                      border: whiteTeam.includes(n) ? "2px solid #cbd5e1" : "1px solid #374151",
                      background: whiteTeam.includes(n) ? "rgba(203,213,225,0.15)" : "transparent",
                      color: whiteTeam.includes(n) ? "#e2e8f0" : "#6b7280",
                      fontWeight: whiteTeam.includes(n) ? 700 : 400,
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scorers — only show players who played */}
          {allPlaying.length > 0 && (
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>⚽ Goal Scorers</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {allPlaying.sort().map(n => {
                  const isRed = redTeam.includes(n);
                  return (
                    <div key={n} style={{ display:"flex", alignItems:"center", gap:8,
                      background:"rgba(255,255,255,0.02)", borderRadius:8, padding:"8px 12px",
                      border:`1px solid ${isRed ? "rgba(239,68,68,0.2)" : "rgba(203,213,225,0.1)"}` }}>
                      <span style={{ flex:1, fontSize:13, color: isRed ? "#f87171" : "#e2e8f0" }}>
                        {n}
                        {ownGoals[n] > 0 && <span style={{ fontSize:10, color:"#f87171", marginLeft:5 }}>OG×{ownGoals[n]}</span>}
                      </span>
                      {/* Regular goals */}
                      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ fontSize:9, color:"#4b5563", fontFamily:"monospace" }}>⚽</span>
                        <button onClick={() => setGoals(n, (scorers[n]||0) - 1)} style={{
                          width:24, height:24, borderRadius:5, border:"1px solid #374151",
                          background:"transparent", color:"#6b7280", cursor:"pointer", fontSize:13, lineHeight:1
                        }}>−</button>
                        <span style={{ fontSize:15, fontWeight:800, color:"#f59e0b", minWidth:18, textAlign:"center",
                          fontFamily:"'Bebas Neue',Impact,sans-serif" }}>{scorers[n] || 0}</span>
                        <button onClick={() => setGoals(n, (scorers[n]||0) + 1)} style={{
                          width:24, height:24, borderRadius:5, border:"1px solid #374151",
                          background:"transparent", color:"#6b7280", cursor:"pointer", fontSize:13, lineHeight:1
                        }}>+</button>
                      </div>
                      {/* Own goal toggle */}
                      <button onClick={() => toggleOwnGoal(n)} style={{
                        padding:"3px 8px", borderRadius:6, cursor:"pointer", fontSize:10, fontWeight:700,
                        border: ownGoals[n] > 0 ? "2px solid #f87171" : "1px solid #374151",
                        background: ownGoals[n] > 0 ? "rgba(248,113,113,0.15)" : "transparent",
                        color: ownGoals[n] > 0 ? "#f87171" : "#4b5563",
                        lineHeight:1.4,
                      }} title="Tap to add own goal (cycles 0→1→2→3→0)">
                        OG{ownGoals[n] > 0 ? ` ×${ownGoals[n]}` : ""}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary before saving */}
          {allPlaying.length > 0 && date && (
            <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid #2d3748", borderRadius:10, padding:"12px 16px", marginBottom:16 }}>
              <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>Summary</div>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                <span style={{ fontSize:13, color:"#9ca3af" }}>📅 {ukDate(date)}</span>
                <span style={{ fontSize:13, color: winningTeam==="Red" ? "#f87171" : winningTeam==="Draw" ? "#94a3b8" : "#e2e8f0" }}>
                  {winningTeam==="Draw" ? `🤝 Draw ${redGoals}-${whiteGoals}` : `${winningTeam==="Red" ? "🔴" : "⚪"} ${winningTeam} won`}
                </span>
                <span style={{ fontSize:13, color:"#34d399" }}>GF: {gf}</span>
                <span style={{ fontSize:13, color:"#f87171" }}>GA: {ga}</span>
                <span style={{ fontSize:13, color:"#a78bfa" }}>👥 {allPlaying.length} players</span>
                {Object.keys(ownGoals).length > 0 && (
                  <span style={{ fontSize:13, color:"#f87171" }}>
                    🔴 OG: {Object.entries(ownGoals).map(([n,v])=>`${n}×${v}`).join(", ")}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Save button */}
          <button onClick={handleSave} disabled={!date || allPlaying.length === 0} style={{
            width:"100%", padding:"14px", borderRadius:10, border:"none", cursor: (!date || allPlaying.length===0) ? "not-allowed" : "pointer",
            background: saved ? "#34d399" : (!date || allPlaying.length===0) ? "#1f2937" : "linear-gradient(135deg,#ef4444,#cc2200)",
            color: saved ? "#0d1117" : (!date || allPlaying.length===0) ? "#4b5563" : "#fff",
            fontSize:14, fontWeight:800, letterSpacing:"0.05em",
            fontFamily:"'Bebas Neue',Impact,sans-serif", transition:"all 0.2s",
          }}>
            {saved ? "✓ GAME SAVED!" : "SAVE GAME"}
          </button>
        </>
      )}

      {view === "players" && (
        <div>
          {/* Add new player */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>Add New Player</div>
            <div style={{ display:"flex", gap:8 }}>
              <input
                placeholder="Enter name..."
                value={newPlayerName}
                onChange={e => { setNewPlayerName(e.target.value); setAddError(""); setAddSuccess(""); }}
                onKeyDown={e => e.key === "Enter" && addPlayer()}
                style={{ flex:1, background:"#1f2937", border:`1px solid ${addError ? "#ef4444" : "#374151"}`,
                  borderRadius:8, padding:"10px 12px", color:"#f9fafb", fontSize:13, outline:"none" }}
              />
              <button onClick={addPlayer} style={{
                padding:"10px 18px", borderRadius:8, border:"none", cursor:"pointer",
                background:"linear-gradient(135deg,#34d399,#059669)",
                color:"#0f172a", fontSize:13, fontWeight:800,
                fontFamily:"'Bebas Neue',Impact,sans-serif", letterSpacing:"0.05em",
              }}>ADD</button>
            </div>
            {addError   && <div style={{ fontSize:12, color:"#ef4444", marginTop:6 }}>{addError}</div>}
            {addSuccess && <div style={{ fontSize:12, color:"#34d399", marginTop:6 }}>{addSuccess}</div>}
          </div>

          {/* Player list */}
          <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>
            Squad ({playerList.length} players)
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {playerList.map(name => (
              <div key={name} style={{
                display:"flex", alignItems:"center", gap:4,
                padding:"5px 10px 5px 12px", borderRadius:20,
                background:"rgba(255,255,255,0.04)", border:"1px solid #2d3748",
              }}>
                <span style={{ fontSize:13, color:"#e2e8f0" }}>{name}</span>
                <button onClick={() => removePlayer(name)} style={{
                  background:"transparent", border:"none", cursor:"pointer",
                  color:"#4b5563", fontSize:14, lineHeight:1, padding:"0 2px",
                  display:"flex", alignItems:"center",
                }} title="Remove">×</button>
              </div>
            ))}
          </div>
        </div>
      )}


      {view === "profiles" && (
        <div>
          <div style={{ fontSize:11, color:"#4b5563", marginBottom:16, fontFamily:"monospace" }}>
            SET ABILITY, FITNESS & AGE FOR EACH PLAYER. USED IN BALANCED TEAM PICKS.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {playerList.map(name => {
              const p = profiles[name] || {};
              const winPct = (() => { const pl = typeof PLAYERS !== "undefined" ? PLAYERS : []; const found = pl.find(x=>x.name===name); return found?found.win_pct:0; })();
              const rating = compositeRating(p, winPct);
              return (
                <div key={name} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid #2d3748", borderRadius:12, padding:"12px 14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <span style={{ fontSize:14, fontWeight:700, color:"#f1f5f9" }}>{name}</span>
                    <span style={{ fontSize:12, color:"#f59e0b", background:"rgba(245,158,11,0.12)",
                      border:"1px solid rgba(245,158,11,0.2)", borderRadius:20, padding:"2px 10px",
                      fontWeight:800, fontFamily:"'Bebas Neue',Impact,sans-serif" }}>
                      ⭐ {rating}
                    </span>
                  </div>

                  {/* Age group */}
                  <div style={{ marginBottom:8 }}>
                    <div style={{ fontSize:10, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4, fontFamily:"monospace" }}>Age Group</div>
                    <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                      {AGE_GROUPS.map(ag => (
                        <button key={ag.id} onClick={() => saveProfile(name,"ageGroup",ag.id)} style={{
                          padding:"3px 10px", borderRadius:12, cursor:"pointer", fontSize:11,
                          border: (p.ageGroup||"25-35")===ag.id ? "2px solid #a78bfa" : "1px solid #374151",
                          background: (p.ageGroup||"25-35")===ag.id ? "rgba(167,139,250,0.15)" : "transparent",
                          color: (p.ageGroup||"25-35")===ag.id ? "#a78bfa" : "#6b7280",
                          fontWeight: (p.ageGroup||"25-35")===ag.id ? 700 : 400,
                        }}>{ag.label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Ability */}
                  <div style={{ marginBottom:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:10, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.06em", fontFamily:"monospace" }}>Ability</span>
                      <span style={{ fontSize:11, color:"#60a5fa", fontWeight:700 }}>{p.ability||3}/5</span>
                    </div>
                    <div style={{ display:"flex", gap:4 }}>
                      {[1,2,3,4,5].map(v => (
                        <button key={v} onClick={() => saveProfile(name,"ability",v)} style={{
                          flex:1, height:28, borderRadius:6, cursor:"pointer", border:"none",
                          background: v <= (p.ability||3) ? "#60a5fa" : "#1f2937",
                          color: v <= (p.ability||3) ? "#0f172a" : "#374151",
                          fontSize:12, fontWeight:800,
                        }}>{v}</button>
                      ))}
                    </div>
                  </div>

                  {/* Fitness */}
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:10, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.06em", fontFamily:"monospace" }}>Fitness</span>
                      <span style={{ fontSize:11, color:"#34d399", fontWeight:700 }}>{p.fitness||3}/5</span>
                    </div>
                    <div style={{ display:"flex", gap:4 }}>
                      {[1,2,3,4,5].map(v => (
                        <button key={v} onClick={() => saveProfile(name,"fitness",v)} style={{
                          flex:1, height:28, borderRadius:6, cursor:"pointer", border:"none",
                          background: v <= (p.fitness||3) ? "#34d399" : "#1f2937",
                          color: v <= (p.fitness||3) ? "#0f172a" : "#374151",
                          fontSize:12, fontWeight:800,
                        }}>{v}</button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "backup" && (
        <div>
          <div style={{ fontSize:11, color:"#4b5563", marginBottom:16, fontFamily:"monospace" }}>
            BACK UP YOUR LOGGED GAMES — STORAGE CAN BE CLEARED BY YOUR BROWSER, SO SAVE A COPY REGULARLY.
          </div>

          {backupMsg && (
            <div style={{ marginBottom:14, padding:"8px 12px", borderRadius:8, fontSize:12,
              background: backupMsg.startsWith("✓") ? "rgba(52,211,153,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${backupMsg.startsWith("✓") ? "rgba(52,211,153,0.25)" : "rgba(239,68,68,0.25)"}`,
              color: backupMsg.startsWith("✓") ? "#34d399" : "#f87171" }}>
              {backupMsg}
            </div>
          )}

          {/* Export */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>
              Export ({savedGames.length} games)
            </div>
            <button onClick={makeBackup} style={{
              width:"100%", padding:"12px", borderRadius:10, border:"none", cursor:"pointer",
              background:"linear-gradient(135deg,#34d399,#059669)", color:"#0f172a",
              fontSize:13, fontWeight:800, fontFamily:"'Bebas Neue',Impact,sans-serif",
              letterSpacing:"0.05em", marginBottom:8,
            }}>📋 CREATE BACKUP</button>
            {backupText && (
              <textarea readOnly value={backupText} onClick={e => e.target.select()}
                style={{ width:"100%", boxSizing:"border-box", height:80, background:"#1f2937",
                  border:"1px solid #374151", borderRadius:8, padding:"10px", color:"#9ca3af",
                  fontSize:11, fontFamily:"monospace", outline:"none", resize:"vertical" }} />
            )}
          </div>

          {/* Import */}
          <div>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>
              Restore from backup
            </div>
            <textarea placeholder="Paste a backup here..." value={importText}
              onChange={e => setImportText(e.target.value)}
              style={{ width:"100%", boxSizing:"border-box", height:80, background:"#1f2937",
                border:"1px solid #374151", borderRadius:8, padding:"10px", color:"#f9fafb",
                fontSize:11, fontFamily:"monospace", outline:"none", resize:"vertical", marginBottom:8 }} />
            <button onClick={doImport} disabled={!importText.trim()} style={{
              width:"100%", padding:"12px", borderRadius:10, border:"none",
              cursor: importText.trim() ? "pointer" : "not-allowed",
              background: importText.trim() ? "linear-gradient(135deg,#60a5fa,#2563eb)" : "#1f2937",
              color: importText.trim() ? "#fff" : "#4b5563",
              fontSize:13, fontWeight:800, fontFamily:"'Bebas Neue',Impact,sans-serif", letterSpacing:"0.05em",
            }}>♻️ RESTORE BACKUP</button>
          </div>
        </div>
      )}

      {view === "history" && (
        <div>
          {savedGames.length === 0 ? (
            <div style={{ textAlign:"center", color:"#4b5563", padding:"40px 0", fontSize:14 }}>
              No games logged yet — use Log Game to add one
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[...savedGames].reverse().map((g, i) => {
                const realIdx = savedGames.length - 1 - i;
                return (
                  <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid #2d3748", borderRadius:12, padding:"12px 14px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                      <span style={{ fontSize:13, fontWeight:700, color:"#f1f5f9" }}>📅 {ukDate(g.date)}</span>
                      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                        <span style={{ fontSize:12,
                          color: g.winningTeam==="Red" ? "#f87171" : g.winningTeam==="Draw" ? "#94a3b8" : "#cbd5e1",
                          background: g.winningTeam==="Red" ? "rgba(239,68,68,0.15)" : g.winningTeam==="Draw" ? "rgba(148,163,184,0.12)" : "rgba(203,213,225,0.08)",
                          padding:"2px 8px", borderRadius:10 }}>
                          {g.winningTeam==="Draw" ? `🤝 Draw ${g.gf}-${g.ga}` : `${g.winningTeam==="Red" ? "🔴" : "⚪"} ${g.winningTeam} ${g.gf}-${g.ga}`}
                        </span>
                        <button onClick={() => handleDelete(realIdx)} style={{
                          background:"transparent", border:"none", color:"#4b5563",
                          cursor:"pointer", fontSize:14, padding:"2px 6px"
                        }}>🗑</button>
                      </div>
                    </div>
                    <div style={{ fontSize:11, color:"#6b7280" }}>
                      <span style={{ color:"#f87171" }}>Red: </span>{g.redTeam.join(", ")}
                    </div>
                    <div style={{ fontSize:11, color:"#6b7280", marginTop:2 }}>
                      <span style={{ color:"#cbd5e1" }}>White: </span>{g.whiteTeam.join(", ")}
                    </div>
                    {Object.keys(g.scorers||{}).length > 0 && (
                      <div style={{ fontSize:11, color:"#f59e0b", marginTop:4 }}>
                        ⚽ {Object.entries(g.scorers).map(([n,v]) => `${n} (${v})`).join(", ")}
                      </div>
                    )}
                    {Object.keys(g.ownGoals||{}).length > 0 && (
                      <div style={{ fontSize:11, color:"#f87171", marginTop:2 }}>
                        🔴 OG: {Object.entries(g.ownGoals).map(([n,v]) => `${n} (${v})`).join(", ")}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ─── FORM / COMPARISON VIEW ─────────────────────────────────────────────────
function FormView({ savedGames, players: PLAYERS }) {
  const [period, setPeriod]         = useState("last4");
  const [customMonth, setCustomMonth] = useState("");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd]     = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [search, setSearch]         = useState("");
  const [sortStat, setSortStat]     = useState("winPctDiff"); // which stat to sort form table by

  // ── helpers ───────────────────────────────────────────────────────────────
  // Logged games override seeded ONLY if valid (both teams have players)
  const validLogged = Object.values(
    savedGames.reduce((acc, g) => { if (isValidGame(g)) acc[g.date] = g; return acc; }, {})
  );
  const loggedDates = new Set(validLogged.map(g => g.date));
  const allGames = [
    ...SEEDED_GAMES.filter(g => !loggedDates.has(g.date)),
    ...validLogged,
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  const gamesInPeriod = (periodKey) => {
    const allSorted = [...allGames].sort((a,b) => new Date(a.date) - new Date(b.date));
    if (periodKey === "last4")  return allSorted.slice(-4);
    if (periodKey === "last8")  return allSorted.slice(-8);
    if (periodKey === "month") {
      const target = new Date().toISOString().slice(0,7);
      return allSorted.filter(g => g.date.startsWith(target));
    }
    if (periodKey === "custom") {
      // Filter to games between customStart and customEnd (inclusive).
      return allSorted.filter(g => {
        const d = g.date.slice(0,10);
        if (customStart && d < customStart) return false;
        if (customEnd   && d > customEnd)   return false;
        return customStart || customEnd; // need at least one bound set
      });
    }
    return allSorted;
  };

  const playerStats = (name, games) => {
    const played = games.filter(g => [...g.redTeam, ...g.whiteTeam].includes(name));
    const wins   = played.filter(g => {
      if (g.winningTeam === "Draw") return false;
      const onRed = g.redTeam.includes(name);
      return (onRed && g.winningTeam === "Red") || (!onRed && g.winningTeam === "White");
    });
    const draws  = played.filter(g => g.winningTeam === "Draw");
    const goals  = played.reduce((s, g) => s + (g.scorers?.[name] || 0), 0)
                 - played.reduce((s, g) => s + (g.ownGoals?.[name] || 0), 0);
    const winPct = played.length > 0 ? Math.round((wins.length / played.length) * 100) : 0;
    const losses = played.length - wins.length - draws.length;
    return { played: played.length, wins: wins.length, draws: draws.length, losses, goals, winPct };
  };

  // Season baseline from PLAYERS array
  const seasonStats = (name) => {
    const p = PLAYERS.find(pl => pl.name === name);
    if (!p) return null;
    return { winPct: p.win_pct, goals: p.total_goals, played: p.games_played };
  };

  const periodGames    = gamesInPeriod(period);
  const allPlayers     = [...new Set(
    periodGames.flatMap(g => [...g.redTeam, ...g.whiteTeam])
  )].sort();
  const filteredList   = allPlayers.filter(n => n.toLowerCase().includes(search.toLowerCase()));

  const FORM_STATS = [
    { id:"winPctDiff", label:"Win % vs Season", shortLabel:"Form",   color:"#60a5fa",
      val: (r,s) => s ? r.winPct - s.winPct : 0,
      fmt: v => (v>0?"+":"")+v+"%", higherBetter:true },
    { id:"winPct",     label:"Win Rate",         shortLabel:"Win %",  color:"#34d399",
      val: (r)   => r.winPct,
      fmt: v => v+"%", higherBetter:true },
    { id:"wins",       label:"Wins",             shortLabel:"Wins",   color:"#34d399",
      val: (r)   => r.wins,
      fmt: v => v+"W", higherBetter:true },
    { id:"losses",     label:"Losses",           shortLabel:"Losses", color:"#f87171",
      val: (r)   => r.losses,
      fmt: v => v+"L", higherBetter:false },
    { id:"goals",      label:"Goals",            shortLabel:"Goals",  color:"#f59e0b",
      val: (r)   => r.goals,
      fmt: v => v+"⚽", higherBetter:true },
    { id:"goalsPerGame",label:"Goals/Game",      shortLabel:"G/G",    color:"#fb923c",
      val: (r)   => r.played>0 ? +(r.goals/r.played).toFixed(2) : 0,
      fmt: v => v.toFixed(2), higherBetter:true },
    { id:"played",     label:"Games Played",     shortLabel:"Played", color:"#a78bfa",
      val: (r)   => r.played,
      fmt: v => v+"GP", higherBetter:true },
  ];
  const activeStat = FORM_STATS.find(s => s.id === sortStat) || FORM_STATS[0];

  // Form table: all players in period sorted by selected stat
  const formTable = allPlayers.map(name => {
    const recent = playerStats(name, periodGames);
    const season = seasonStats(name);
    const diff   = season ? recent.winPct - season.winPct : 0;
    const sortVal = activeStat.val(recent, season);
    return { name, recent, season, diff, sortVal };
  }).sort((a, b) => activeStat.higherBetter ? b.sortVal - a.sortVal : a.sortVal - b.sortVal);

  const arrow = (diff) => {
    if (diff > 10)  return { icon:"▲", color:"#34d399" };
    if (diff < -10) return { icon:"▼", color:"#f87171" };
    return { icon:"●", color:"#6b7280" };
  };

  const fmtUK = (d) => d ? `${d.slice(8,10)}/${d.slice(5,7)}` : "";
  const customLabel = customStart && customEnd ? `${fmtUK(customStart)} – ${fmtUK(customEnd)}`
                    : customStart ? `From ${fmtUK(customStart)}`
                    : customEnd ? `Up to ${fmtUK(customEnd)}`
                    : "Custom Range";
  const periodLabel = { last4:"Last 4 Games", last8:"Last 8 Games", month:"This Month", custom: customLabel };

  const btn = (id, label) => (
    <button key={id} onClick={() => setPeriod(id)} style={{
      padding:"7px 13px", borderRadius:20, cursor:"pointer", fontSize:12,
      border: period===id ? "2px solid #f59e0b" : "1px solid #2d3748",
      background: period===id ? "rgba(245,158,11,0.15)" : "transparent",
      color: period===id ? "#f59e0b" : "#6b7280",
      fontWeight: period===id ? 700 : 400,
    }}>{label}</button>
  );

  return (
    <div>
      {/* Period selector */}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>Period</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
          {btn("last4","Last 4")}
          {btn("last8","Last 8")}
          {btn("month","This Month")}
          {btn("custom","Custom")}
        </div>
        {period === "custom" && (
          <div style={{ display:"flex", gap:8, alignItems:"flex-end", flexWrap:"wrap" }}>
            <div>
              <div style={{ fontSize:10, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3, fontFamily:"monospace" }}>From</div>
              <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8,
                  padding:"8px 10px", color:"#f9fafb", fontSize:13, outline:"none" }} />
            </div>
            <div>
              <div style={{ fontSize:10, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3, fontFamily:"monospace" }}>To</div>
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8,
                  padding:"8px 10px", color:"#f9fafb", fontSize:13, outline:"none" }} />
            </div>
            {(customStart || customEnd) && (
              <button onClick={() => { setCustomStart(""); setCustomEnd(""); }} style={{
                padding:"8px 12px", borderRadius:8, border:"1px solid #374151",
                background:"transparent", color:"#6b7280", cursor:"pointer", fontSize:12 }}>Clear</button>
            )}
          </div>
        )}
      </div>

      {allGames.length === 0 ? (
        <div style={{ textAlign:"center", color:"#4b5563", padding:"40px 0" }}>
          No games found
        </div>
      ) : periodGames.length === 0 ? (
        <div style={{ textAlign:"center", color:"#4b5563", padding:"40px 0" }}>
          No games found for this period
        </div>
      ) : (
        <>
          <div style={{ fontSize:11, color:"#4b5563", marginBottom:12, fontFamily:"monospace" }}>
            {periodGames.length} game{periodGames.length !== 1 ? "s" : ""} · {periodLabel[period]}
          </div>

          {/* ── STAT SELECTOR */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>Sort & Highlight By</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {FORM_STATS.map(s => (
                <button key={s.id} onClick={() => setSortStat(s.id)} style={{
                  padding:"6px 12px", borderRadius:20, cursor:"pointer", fontSize:12,
                  border: sortStat===s.id ? `2px solid ${s.color}` : "1px solid #2d3748",
                  background: sortStat===s.id ? `${s.color}18` : "transparent",
                  color: sortStat===s.id ? s.color : "#6b7280",
                  fontWeight: sortStat===s.id ? 700 : 400,
                }}>{s.shortLabel}</button>
              ))}
            </div>
          </div>

          {/* ── FORM TABLE ─────────────────────────────────────────────── */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>📊 Form Table</div>
            <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid #1f2937", borderRadius:12, overflow:"hidden" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 36px 36px 36px 50px 64px", gap:4,
                padding:"8px 12px", borderBottom:"1px solid #1f2937",
                fontSize:10, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.06em" }}>
                <span>Player</span>
                {[
                  { key:"played",  label:"P",    id:"played"  },
                  { key:"wins",    label:"W",    id:"wins"    },
                  { key:"losses",  label:"L",    id:"losses"  },
                  { key:"winPct",  label:"Win%", id:"winPct"  },
                ].map(col => (
                  <span key={col.id}
                    onClick={() => setSortStat(col.id)}
                    style={{ textAlign:"center", cursor:"pointer",
                      color: sortStat===col.id ? activeStat.color : "#4b5563",
                      fontWeight: sortStat===col.id ? 800 : 400,
                      userSelect:"none",
                    }}>
                    {col.label}{sortStat===col.id ? (activeStat.higherBetter?"↓":"↑") : ""}
                  </span>
                ))}
                <span
                  onClick={() => setSortStat(sortStat==="winPctDiff" ? "winPct" : "winPctDiff")}
                  style={{ textAlign:"right", cursor:"pointer",
                    color: activeStat.color, fontWeight:800, userSelect:"none" }}>
                  {activeStat.shortLabel}{activeStat.higherBetter ? "↓" : "↑"}
                </span>
              </div>
              {formTable.map((row, i) => {
                const a = arrow(row.diff);
                const sv = activeStat.val(row.recent, row.season);
                const isTop = i === 0;
                return (
                  <div key={row.name} onClick={() => setSelectedPlayer(selectedPlayer === row.name ? null : row.name)}
                    style={{ display:"grid", gridTemplateColumns:"1fr 36px 36px 36px 50px 64px", gap:4,
                      padding:"9px 12px", cursor:"pointer",
                      borderBottom: i < formTable.length-1 ? "1px solid #111827" : "none",
                      background: selectedPlayer === row.name ? "rgba(245,158,11,0.06)" : isTop ? `${activeStat.color}08` : i%2===0 ? "rgba(255,255,255,0.01)" : "transparent",
                    }}>
                    <span style={{ fontSize:13, color: selectedPlayer===row.name ? "#f59e0b" : isTop ? activeStat.color : "#e2e8f0", fontWeight: selectedPlayer===row.name||isTop ? 700 : 400 }}>
                      {isTop && "👑 "}{row.name}
                    </span>
                    <span style={{ fontSize:13, color:"#9ca3af", textAlign:"center" }}>{row.recent.played}</span>
                    <span style={{ fontSize:13, color:"#34d399", textAlign:"center" }}>{row.recent.wins}</span>
                    <span style={{ fontSize:13, color:"#f87171", textAlign:"center" }}>{row.recent.losses}</span>
                    <span style={{ fontSize:12, color:"#f1f5f9", textAlign:"center", fontWeight:600 }}>{row.recent.winPct}%</span>
                    <span style={{ fontSize:13, color: isTop ? activeStat.color : a.color, textAlign:"right", fontWeight: isTop ? 800 : 700 }}>
                      {sortStat==="winPctDiff" ? `${a.icon} ${row.diff>0?"+":""}${row.diff}%` : activeStat.fmt(sv)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── PLAYER FORM CARD ───────────────────────────────────────── */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>🔍 Player Deep Dive</div>
            <input placeholder="Search player..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width:"100%", boxSizing:"border-box", background:"#1f2937", border:"1px solid #374151",
                borderRadius:8, padding:"9px 12px", color:"#f9fafb", fontSize:13, marginBottom:8, outline:"none" }} />
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
              {filteredList.map(name => (
                <button key={name} onClick={() => setSelectedPlayer(selectedPlayer===name ? null : name)} style={{
                  padding:"4px 12px", borderRadius:20, cursor:"pointer", fontSize:12,
                  border: selectedPlayer===name ? "2px solid #f59e0b" : "1px solid #2d3748",
                  background: selectedPlayer===name ? "rgba(245,158,11,0.15)" : "transparent",
                  color: selectedPlayer===name ? "#f59e0b" : "#6b7280",
                  fontWeight: selectedPlayer===name ? 700 : 400,
                }}>{name}</button>
              ))}
            </div>

            {selectedPlayer && (() => {
              const r = playerStats(selectedPlayer, periodGames);
              const s = seasonStats(selectedPlayer);
              const a = arrow(s ? r.winPct - s.winPct : 0);
              const diff = s ? r.winPct - s.winPct : 0;
              return (
                <div style={{ background:"linear-gradient(135deg,#1a1f2e,#111827)", border:"1px solid #2d3748", borderRadius:16, padding:18 }}>
                  {/* Header */}
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                    <div style={{ width:44, height:44, borderRadius:"50%",
                      background:"linear-gradient(135deg,#cc2200 50%,#e8e8e8 50%)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:18, fontWeight:800, color:"#0f172a",
                      fontFamily:"'Bebas Neue',Impact,sans-serif", border:"2px solid #334155" }}>
                      {selectedPlayer[0]}
                    </div>
                    <div>
                      <div style={{ fontSize:20, fontWeight:800, color:"#f9fafb", fontFamily:"'Bebas Neue',Impact,sans-serif", letterSpacing:"0.05em" }}>{selectedPlayer}</div>
                      <div style={{ fontSize:11, color:"#6b7280" }}>{periodLabel[period]}</div>
                    </div>
                    <div style={{ marginLeft:"auto", fontSize:28, fontWeight:900, color:a.color, fontFamily:"'Bebas Neue',Impact,sans-serif" }}>
                      {a.icon} {diff > 0 ? "+" : ""}{diff}%
                    </div>
                  </div>

                  {/* Recent stats row */}
                  <div style={{ display:"flex", gap:8, marginBottom:12 }}>
                    {[
                      { label:"Played",   value: r.played,  color:"#a78bfa" },
                      { label:"Wins",     value: r.wins,    color:"#34d399" },
                      { label:"Losses",   value: r.losses,  color:"#f87171" },
                      { label:"Goals",    value: r.goals,   color:"#f59e0b" },
                      { label:"Win %",    value:`${r.winPct}%`, color:"#60a5fa" },
                    ].map(stat => (
                      <div key={stat.label} style={{ flex:1, background:"rgba(255,255,255,0.04)",
                        border:`1px solid ${stat.color}30`, borderRadius:10, padding:"10px 6px", textAlign:"center" }}>
                        <div style={{ fontSize:9, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3, fontFamily:"monospace" }}>{stat.label}</div>
                        <div style={{ fontSize:20, fontWeight:800, color:stat.color, fontFamily:"'Bebas Neue',Impact,sans-serif" }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Season (grey) vs Recent (gold) overlay radar — normalized 0-100 */}
                  {s && (() => {
                    const seasonW = Math.round(s.winPct/100*s.played);
                    const seasonL = s.played - seasonW;
                    const maxG  = Math.max(r.goals, s.goals, 1);
                    const maxGP = Math.max(r.played, s.played, 1);
                    const maxW  = Math.max(r.wins, seasonW, 1);
                    const radar = [
                      { axis:"Win %",      Recent: r.winPct,
                                            Season: s.winPct },
                      { axis:"Goals",      Recent: Math.round(r.goals/maxG*100),
                                            Season: Math.round(s.goals/maxG*100) },
                      { axis:"Wins",       Recent: Math.round(r.wins/maxW*100),
                                            Season: Math.round(seasonW/maxW*100) },
                      { axis:"Attendance", Recent: Math.round(r.played/maxGP*100),
                                            Season: Math.round(s.played/maxGP*100) },
                    ];
                    return (
                      <div style={{ marginBottom:12 }}>
                        <div style={{ fontSize:10, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4, fontFamily:"monospace" }}>Profile · {periodLabel[period]} vs Season</div>
                        <div style={{ height:240 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radar} outerRadius="68%">
                              <PolarGrid stroke="#2d3748" />
                              <PolarAngleAxis dataKey="axis" tick={{ fill:"#9ca3af", fontSize:11 }} />
                              <Radar name="Season avg" dataKey="Season" stroke="#6b7280" fill="#6b7280" fillOpacity={0.15} strokeWidth={1.5} />
                              <Radar name={periodLabel[period]} dataKey="Recent" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} strokeWidth={2} />
                              <Legend wrapperStyle={{ fontSize:11 }} />
                              <Tooltip contentStyle={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8, color:"#f9fafb", fontSize:12 }} formatter={(v)=>`${v}%`} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    );
                  })()}

                  {/* vs Season comparison bars — all stats */}
                  {s && (() => {
                    const bars = [
                      { label:"Win %",      recent: r.winPct,  season: s.winPct,  max:100, color:"#60a5fa", fmt: v=>`${v}%`, higherBetter:true },
                      { label:"Goals",      recent: r.goals,   season: s.goals,   max: Math.max(r.goals, s.goals, 1), color:"#f59e0b", fmt: v=>v, higherBetter:true },
                      { label:"Goals/Game", recent: r.played>0?+(r.goals/r.played).toFixed(2):0,
                        season: s.played>0?+(s.goals/s.played).toFixed(2):0,
                        max: Math.max(r.played>0?r.goals/r.played:0, s.played>0?s.goals/s.played:0, 0.5),
                        color:"#fb923c", fmt: v=>v.toFixed(2), higherBetter:true },
                      { label:"Wins",       recent: r.wins,    season: Math.round(s.winPct/100*s.played), max: Math.max(r.wins, Math.round(s.winPct/100*s.played), 1), color:"#34d399", fmt: v=>v, higherBetter:true },
                      { label:"Losses",     recent: r.losses,  season: s.played - Math.round(s.winPct/100*s.played), max: Math.max(r.losses, s.played - Math.round(s.winPct/100*s.played), 1), color:"#f87171", fmt: v=>v, higherBetter:false },
                    ];
                    return (
                      <div style={{ background:"rgba(255,255,255,0.02)", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontSize:10, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10, fontFamily:"monospace" }}>vs Season Average</div>
                        {bars.map(row => {
                          const better = row.higherBetter ? row.recent >= row.season : row.recent <= row.season;
                          return (
                            <div key={row.label} style={{ marginBottom:10 }}>
                              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                                <span style={{ fontSize:11, color:"#9ca3af" }}>{row.label}</span>
                                <span style={{ fontSize:11, color: better ? "#34d399" : "#f87171", fontWeight:700 }}>
                                  {row.fmt(row.recent)} <span style={{ color:"#4b5563" }}>vs</span> {row.fmt(row.season)}
                                </span>
                              </div>
                              <div style={{ position:"relative", height:5, background:"#1f2937", borderRadius:3 }}>
                                <div style={{ position:"absolute", left:0, top:0, height:"100%",
                                  width:`${Math.min((row.season/row.max)*100,100)}%`, background:"#374151", borderRadius:3 }} />
                                <div style={{ position:"absolute", left:0, top:0, height:"100%",
                                  width:`${Math.min((row.recent/row.max)*100,100)}%`,
                                  background:`linear-gradient(90deg,${row.color},${row.color}88)`,
                                  borderRadius:3, transition:"width 0.3s" }} />
                              </div>
                            </div>
                          );
                        })}
                        <div style={{ display:"flex", gap:12, marginTop:4 }}>
                          <span style={{ fontSize:9, color:"#60a5fa" }}>■ Recent period</span>
                          <span style={{ fontSize:9, color:"#374151" }}>■ Season avg</span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Game by game results for this period */}
                  <div style={{ marginTop:12 }}>
                    <div style={{ fontSize:10, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:"monospace" }}>Game by Game</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                      {periodGames.map((g, i) => {
                        const played = [...g.redTeam, ...g.whiteTeam].includes(selectedPlayer);
                        if (!played) return (
                          <div key={i} style={{ width:34, height:34, borderRadius:6, background:"#111827",
                            border:"1px solid #1f2937", display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:9, color:"#374151" }}>–</div>
                        );
                        const onRed = g.redTeam.includes(selectedPlayer);
                        const isDraw = g.winningTeam === "Draw";
                        const won   = !isDraw && ((onRed && g.winningTeam==="Red") || (!onRed && g.winningTeam==="White"));
                        const goals = g.scorers[selectedPlayer] || 0;
                        return (
                          <div key={i} title={ukDate(g.date)} style={{
                            width:34, height:34, borderRadius:6,
                            background: won ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
                            border:`1px solid ${won ? "#34d39940" : "#f8717140"}`,
                            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                            <span style={{ fontSize:10, color: won ? "#34d399" : "#f87171", fontWeight:700 }}>{won?"W":"L"}</span>
                            {goals > 0 && <span style={{ fontSize:8, color:"#f59e0b" }}>⚽{goals}</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </>
      )}
    </div>
  );
}


// ─── HEAD TO HEAD VIEW ───────────────────────────────────────────────────────
function H2HView({ savedGames, roster }) {
  const [playerA, setPlayerA] = useState("Ade");
  const [playerB, setPlayerB] = useState("Rob");
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");

  // Logged games override seeded ONLY if valid (both teams have players)
  const validLogged = Object.values(
    savedGames.reduce((acc, g) => { if (isValidGame(g)) acc[g.date] = g; return acc; }, {})
  );
  const loggedDates = new Set(validLogged.map(g => g.date));
  const allGames = [
    ...SEEDED_GAMES.filter(g => !loggedDates.has(g.date)),
    ...validLogged,
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Games involving both players
  const bothGames = allGames.filter(g => {
    const all = [...g.redTeam, ...g.whiteTeam];
    return all.includes(playerA) && all.includes(playerB);
  });

  // Same team games
  const sameTeam = bothGames.filter(g => {
    const aRed = g.redTeam.includes(playerA);
    const bRed = g.redTeam.includes(playerB);
    return aRed === bRed;
  });
  const sameWins   = sameTeam.filter(g => {
    if (g.winningTeam === "Draw") return false;
    const onRed = g.redTeam.includes(playerA);
    return (onRed && g.winningTeam==="Red") || (!onRed && g.winningTeam==="White");
  });
  const sameDraws  = sameTeam.filter(g => g.winningTeam === "Draw");
  const sameLosses = sameTeam.length - sameWins.length - sameDraws.length;

  // Opposite team games
  const opposed = bothGames.filter(g => {
    const aRed = g.redTeam.includes(playerA);
    const bRed = g.redTeam.includes(playerB);
    return aRed !== bRed;
  });
  const oppDraws = opposed.filter(g => g.winningTeam === "Draw");
  const aWins = opposed.filter(g => {
    if (g.winningTeam === "Draw") return false;
    const aRed = g.redTeam.includes(playerA);
    return (aRed && g.winningTeam==="Red") || (!aRed && g.winningTeam==="White");
  });
  const bWinsArr = opposed.filter(g => {
    if (g.winningTeam === "Draw") return false;
    const aRed = g.redTeam.includes(playerA);
    return !((aRed && g.winningTeam==="Red") || (!aRed && g.winningTeam==="White"));
  });
  const bWins = bWinsArr.length;

  const dominator = aWins.length > bWins ? playerA : bWins > aWins.length ? playerB : null;

  const filteredA = (roster||PLAYER_NAMES).filter(n => n !== playerB && n.toLowerCase().includes(searchA.toLowerCase()));
  const filteredB = (roster||PLAYER_NAMES).filter(n => n !== playerA && n.toLowerCase().includes(searchB.toLowerCase()));

  const pctBar = (val, total, color) => (
    <div style={{height:8, background:"#1f2937", borderRadius:4, overflow:"hidden", flex:1}}>
      <div style={{height:"100%", width:`${total>0?(val/total)*100:0}%`,
        background:color, borderRadius:4, transition:"width 0.4s"}}/>
    </div>
  );

  const playerPicker = (selected, setSelected, search, setSearch, label, color) => (
    <div style={{flex:1}}>
      <div style={{fontSize:10, color:"#4b5563", textTransform:"uppercase",
        letterSpacing:"0.08em", marginBottom:6, fontFamily:"monospace"}}>{label}</div>
      <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}
        style={{width:"100%", boxSizing:"border-box", background:"#1f2937",
          border:`1px solid ${color}40`, borderRadius:8, padding:"7px 10px",
          color:"#f9fafb", fontSize:12, outline:"none", marginBottom:6}}/>
      <div style={{maxHeight:140, overflowY:"auto", display:"flex", flexWrap:"wrap", gap:4}}>
        {filteredA.length===0||label.includes("B") ? filteredB.map(n=>(
          <button key={n} onClick={()=>{setSelected(n);setSearch("");}} style={{
            padding:"3px 9px", borderRadius:12, cursor:"pointer", fontSize:11,
            border: selected===n ? `2px solid ${color}` : "1px solid #2d3748",
            background: selected===n ? `${color}20` : "transparent",
            color: selected===n ? color : "#6b7280",
            fontWeight: selected===n ? 700 : 400,
          }}>{n}</button>
        )) : filteredA.map(n=>(
          <button key={n} onClick={()=>{setSelected(n);setSearch("");}} style={{
            padding:"3px 9px", borderRadius:12, cursor:"pointer", fontSize:11,
            border: selected===n ? `2px solid ${color}` : "1px solid #2d3748",
            background: selected===n ? `${color}20` : "transparent",
            color: selected===n ? color : "#6b7280",
            fontWeight: selected===n ? 700 : 400,
          }}>{n}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {/* Player selectors */}
      <div style={{display:"flex", gap:10, marginBottom:20}}>
        {/* Player A */}
        <div style={{flex:1}}>
          <div style={{fontSize:10, color:"#f59e0b", textTransform:"uppercase",
            letterSpacing:"0.08em", marginBottom:6, fontFamily:"monospace"}}>Player A</div>
          <input placeholder="Search..." value={searchA} onChange={e=>setSearchA(e.target.value)}
            style={{width:"100%", boxSizing:"border-box", background:"#1f2937",
              border:"1px solid #f59e0b40", borderRadius:8, padding:"7px 10px",
              color:"#f9fafb", fontSize:12, outline:"none", marginBottom:6}}/>
          <div style={{maxHeight:130, overflowY:"auto", display:"flex", flexWrap:"wrap", gap:4}}>
            {(roster||PLAYER_NAMES).filter(n=>n!==playerB&&n.toLowerCase().includes(searchA.toLowerCase())).map(n=>(
              <button key={n} onClick={()=>{setPlayerA(n);setSearchA("");}} style={{
                padding:"3px 9px", borderRadius:12, cursor:"pointer", fontSize:11,
                border: playerA===n ? "2px solid #f59e0b" : "1px solid #2d3748",
                background: playerA===n ? "rgba(245,158,11,0.2)" : "transparent",
                color: playerA===n ? "#f59e0b" : "#6b7280",
                fontWeight: playerA===n ? 700 : 400,
              }}>{n}</button>
            ))}
          </div>
        </div>

        {/* VS divider */}
        <div style={{display:"flex", alignItems:"center", paddingTop:20}}>
          <div style={{fontSize:22, fontWeight:900, color:"#374151",
            fontFamily:"'Bebas Neue',Impact,sans-serif"}}>VS</div>
        </div>

        {/* Player B */}
        <div style={{flex:1}}>
          <div style={{fontSize:10, color:"#60a5fa", textTransform:"uppercase",
            letterSpacing:"0.08em", marginBottom:6, fontFamily:"monospace"}}>Player B</div>
          <input placeholder="Search..." value={searchB} onChange={e=>setSearchB(e.target.value)}
            style={{width:"100%", boxSizing:"border-box", background:"#1f2937",
              border:"1px solid #60a5fa40", borderRadius:8, padding:"7px 10px",
              color:"#f9fafb", fontSize:12, outline:"none", marginBottom:6}}/>
          <div style={{maxHeight:130, overflowY:"auto", display:"flex", flexWrap:"wrap", gap:4}}>
            {(roster||PLAYER_NAMES).filter(n=>n!==playerA&&n.toLowerCase().includes(searchB.toLowerCase())).map(n=>(
              <button key={n} onClick={()=>{setPlayerB(n);setSearchB("");}} style={{
                padding:"3px 9px", borderRadius:12, cursor:"pointer", fontSize:11,
                border: playerB===n ? "2px solid #60a5fa" : "1px solid #2d3748",
                background: playerB===n ? "rgba(96,165,250,0.2)" : "transparent",
                color: playerB===n ? "#60a5fa" : "#6b7280",
                fontWeight: playerB===n ? 700 : 400,
              }}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      {bothGames.length === 0 ? (
        <div style={{textAlign:"center", color:"#4b5563", padding:"30px 0", fontSize:13}}>
          No games found where both {playerA} and {playerB} played
        </div>
      ) : (
        <>
          {/* Summary header */}
          <div style={{background:"linear-gradient(135deg,#1a1f2e,#111827)",
            border:"1px solid #2d3748", borderRadius:16, padding:18, marginBottom:14}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16}}>
              <div style={{textAlign:"center", flex:1}}>
                <div style={{fontSize:26, fontWeight:900, color:"#f59e0b",
                  fontFamily:"'Bebas Neue',Impact,sans-serif"}}>{playerA}</div>
              </div>
              <div style={{textAlign:"center", padding:"0 10px"}}>
                <div style={{fontSize:11, color:"#4b5563", fontFamily:"monospace"}}>
                  {bothGames.length} games together
                </div>
              </div>
              <div style={{textAlign:"center", flex:1}}>
                <div style={{fontSize:26, fontWeight:900, color:"#60a5fa",
                  fontFamily:"'Bebas Neue',Impact,sans-serif"}}>{playerB}</div>
              </div>
            </div>

            {/* ── SAME TEAM ─────────────────────────────────────────── */}
            <div style={{background:"rgba(255,255,255,0.03)", border:"1px solid #2d3748",
              borderRadius:12, padding:"14px", marginBottom:10}}>
              <div style={{fontSize:11, color:"#a78bfa", textTransform:"uppercase",
                letterSpacing:"0.08em", marginBottom:10, fontFamily:"monospace"}}>
                🤝 Same Team — {sameTeam.length} games
              </div>
              <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:8}}>
                <span style={{fontSize:28, fontWeight:900, color:"#34d399",
                  fontFamily:"'Bebas Neue',Impact,sans-serif", minWidth:32}}>{sameWins.length}</span>
                {pctBar(sameWins.length, sameTeam.length, "#34d399")}
                {pctBar(sameLosses, sameTeam.length, "#f87171")}
                <span style={{fontSize:28, fontWeight:900, color:"#f87171",
                  fontFamily:"'Bebas Neue',Impact,sans-serif", minWidth:32, textAlign:"right"}}>{sameLosses}</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span style={{fontSize:11, color:"#34d399"}}>Wins together</span>
                <span style={{fontSize:11, color:"#f87171"}}>Losses together</span>
              </div>
              {sameTeam.length > 0 && (
                <div style={{marginTop:8, padding:"6px 10px", background:"rgba(167,139,250,0.08)",
                  borderRadius:8, fontSize:12, color:"#a78bfa", textAlign:"center"}}>
                  Win rate together: <strong>{Math.round(sameWins.length/sameTeam.length*100)}%</strong>
                  {sameDraws.length > 0 && <span style={{color:"#94a3b8"}}> · {sameDraws.length} draw{sameDraws.length!==1?"s":""}</span>}
                </div>
              )}
            </div>

            {/* ── HEAD TO HEAD ──────────────────────────────────────── */}
            <div style={{background:"rgba(255,255,255,0.03)", border:"1px solid #2d3748",
              borderRadius:12, padding:"14px"}}>
              <div style={{fontSize:11, color:"#f87171", textTransform:"uppercase",
                letterSpacing:"0.08em", marginBottom:10, fontFamily:"monospace"}}>
                ⚔️ Head to Head — {opposed.length} games
              </div>
              {opposed.length === 0 ? (
                <div style={{fontSize:12, color:"#4b5563", textAlign:"center"}}>
                  Never faced each other on opposite teams
                </div>
              ) : (
                <>
                  <div style={{display:"flex", alignItems:"center", gap:6, marginBottom:8}}>
                    <span style={{fontSize:28, fontWeight:900, color:"#f59e0b",
                      fontFamily:"'Bebas Neue',Impact,sans-serif", minWidth:28}}>{aWins.length}</span>
                    {pctBar(aWins.length, opposed.length, "#f59e0b")}
                    {pctBar(bWins, opposed.length, "#60a5fa")}
                    <span style={{fontSize:28, fontWeight:900, color:"#60a5fa",
                      fontFamily:"'Bebas Neue',Impact,sans-serif", minWidth:28, textAlign:"right"}}>{bWins}</span>
                  </div>
                  <div style={{display:"flex", justifyContent:"space-between", marginBottom:8}}>
                    <span style={{fontSize:11, color:"#f59e0b"}}>{playerA} wins</span>
                    <span style={{fontSize:11, color:"#60a5fa"}}>{playerB} wins</span>
                  </div>
                  {dominator && (
                    <div style={{padding:"6px 10px", background:"rgba(239,68,68,0.08)",
                      border:"1px solid rgba(239,68,68,0.2)", borderRadius:8,
                      fontSize:12, color:"#f87171", textAlign:"center"}}>
                      👑 <strong>{dominator}</strong> has the edge in direct matchups
                    </div>
                  )}
                  {!dominator && (
                    <div style={{padding:"6px 10px", background:"rgba(100,116,139,0.08)",
                      borderRadius:8, fontSize:12, color:"#64748b", textAlign:"center"}}>
                      🤝 Perfectly even head to head
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ── GAME BY GAME LOG ────────────────────────────────────── */}
          <div style={{fontSize:11, color:"#4b5563", textTransform:"uppercase",
            letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace"}}>Game Log</div>
          <div style={{display:"flex", flexDirection:"column", gap:6}}>
            {[...bothGames].reverse().map((g,i) => {
              const aRed   = g.redTeam.includes(playerA);
              const bRed   = g.redTeam.includes(playerB);
              const sameT  = aRed === bRed;
              const isDraw = g.winningTeam === "Draw";
              const aWon   = !isDraw && ((aRed && g.winningTeam==="Red")||(!aRed && g.winningTeam==="White"));
              const bWon   = !isDraw && ((bRed && g.winningTeam==="Red")||(!bRed && g.winningTeam==="White"));
              const dateStr = ukDate(g.date);
              return (
                <div key={i} style={{display:"flex", alignItems:"center", gap:10,
                  background:"rgba(255,255,255,0.02)", border:"1px solid #1f2937",
                  borderRadius:10, padding:"9px 12px"}}>
                  <span style={{fontSize:11, color:"#4b5563", minWidth:36, fontFamily:"monospace"}}>{dateStr}</span>
                  {sameT ? (
                    <>
                      <span style={{fontSize:11, color:"#a78bfa", flex:1}}>🤝 Same team</span>
                      <span style={{fontSize:12, fontWeight:700,
                        color: isDraw ? "#94a3b8" : aWon ? "#34d399" : "#f87171"}}>
                        {isDraw ? "Drew together 🤝" : aWon ? "Won together ✓" : "Lost together ✗"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span style={{fontSize:11, color:"#6b7280", flex:1}}>
                        <span style={{color:"#f59e0b"}}>{playerA}</span>
                        <span style={{color:"#4b5563"}}> vs </span>
                        <span style={{color:"#60a5fa"}}>{playerB}</span>
                      </span>
                      <span style={{fontSize:12, fontWeight:700,
                        color: isDraw ? "#94a3b8" : aWon ? "#f59e0b" : "#60a5fa"}}>
                        {isDraw ? "Draw 🤝" : aWon ? `${playerA} won ⚔️` : `${playerB} won ⚔️`}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}


// ─── TEAM PICKER VIEW ───────────────────────────────────────────────────────
function TeamPickerView({ players: PLAYERS, profiles, allGames, roster }) {
  const [tab, setTab]               = useState("auto");  // "auto" | "manual"
  const [useForm, setUseForm]       = useState(true);   // true = current form, false = season avg
  const [available, setAvailable]   = useState([]);
  const [search, setSearch]         = useState("");
  const [redTeam, setRedTeam]       = useState([]);
  const [whiteTeam, setWhiteTeam]   = useState([]);
  const [mode, setPickMode]         = useState("random"); // "random" | "balanced"
  const [picked, setPicked]         = useState(false);
  // Manual mode
  const [manualRed, setManualRed]   = useState([]);
  const [manualWhite, setManualWhite] = useState([]);
  const [manualSearch, setManualSearch] = useState("");

  const toggleAvailable = (name) => {
    setAvailable(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
    setPicked(false);
    setRedTeam([]); setWhiteTeam([]);
  };

  const selectAll = () => { setAvailable([...(roster||PLAYER_NAMES)]); setPicked(false); };
  const clearAll  = () => { setAvailable([]); setPicked(false); setRedTeam([]); setWhiteTeam([]); };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const pickTeams = () => {
    if (available.length < 2) return;
    const pool = shuffle(available);
    const half = Math.floor(pool.length / 2);

    if (mode === "random") {
      setRedTeam(pool.slice(0, half));
      setWhiteTeam(pool.slice(half));
    } else {
      // Balanced: sort by rating (current form or season avg), snake draft
      const isU25 = (n) => (profiles?.[n]?.ageGroup) === "u25";
      const withStats = pool.map(name => {
        const p = PLAYERS.find(pl => pl.name === name);
        return { name, rating: rateName(name), u25: isU25(name) };
      }).sort((a, b) => b.rating - a.rating);

      let red = [], white = [];
      withStats.forEach((p, i) => {
        const pick = Math.floor(i / 2) % 2 === 0
          ? (i % 2 === 0 ? "red" : "white")
          : (i % 2 === 0 ? "white" : "red");
        if (pick === "red") red.push(p.name); else white.push(p.name);
      });

      // ── Second pass: even out the U25 count via rating-neutral swaps ──────────
      const ratingOf = (n) => withStats.find(w => w.name === n).rating;
      const u25Count = (team) => team.filter(isU25).length;
      let guard = 0;
      while (Math.abs(u25Count(red) - u25Count(white)) > 1 && guard < 50) {
        guard++;
        const heavy = u25Count(red) > u25Count(white) ? red : white;
        const light = heavy === red ? white : red;
        // A young player to give away from the heavy team
        const youngOnHeavy = heavy.filter(isU25).sort((a,b)=>ratingOf(a)-ratingOf(b));
        // A similar-rated non-young player to take back from the light team
        const oldOnLight = light.filter(n => !isU25(n)).sort((a,b)=>ratingOf(a)-ratingOf(b));
        if (!youngOnHeavy.length || !oldOnLight.length) break;
        // Pick the swap that keeps ratings closest
        let bestSwap = null, bestDiff = Infinity;
        youngOnHeavy.forEach(y => {
          oldOnLight.forEach(o => {
            const diff = Math.abs(ratingOf(y) - ratingOf(o));
            if (diff < bestDiff) { bestDiff = diff; bestSwap = [y, o]; }
          });
        });
        if (!bestSwap) break;
        const [y, o] = bestSwap;
        // Perform swap
        heavy.splice(heavy.indexOf(y), 1); heavy.push(o);
        light.splice(light.indexOf(o), 1); light.push(y);
      }

      setRedTeam(red);
      setWhiteTeam(white);
    }
    setPicked(true);
  };

  const filtered = (roster||PLAYER_NAMES).filter(n => n.toLowerCase().includes(search.toLowerCase()));

  // "As of now" date for current-form ratings (tomorrow, so all games count)
  const todayStr = new Date(Date.now() + 86400000).toISOString().slice(0,10);

  // Unified rating: current form (rolling last 6) or season average
  const rateName = (name) => {
    if (useForm) return ratingAsOf(name, todayStr, allGames || [], profiles);
    const p    = PLAYERS.find(pl => pl.name === name);
    const prof = { ...(profiles?.[name] || {}) };
    if (p) prof.gd = p.team_gd || 0;
    return p ? compositeRating(prof, p.win_pct) : 50;
  };

  const teamRating = (team) => {
    if (!team.length) return 0;
    return Math.round(team.reduce((s, n) => s + rateName(n), 0) / team.length);
  };
  const teamWinPct = (team) => teamRating(team);
  const teamGD = (team) => {
    // Use each player's AVERAGE goal difference per game (not raw season total,
    // which would be dominated by who has played the most games), then sum.
    const stats = team.map(n => PLAYERS.find(p => p.name === n)).filter(Boolean);
    const total = stats.reduce((s, p) => {
      const perGame = p.games_played > 0 ? (p.team_gd||0) / p.games_played : 0;
      return s + perGame;
    }, 0);
    return Math.round(total * 10) / 10; // one decimal
  };

  // Age mix: count of under-25s and over-45s per team (from profiles)
  const teamYouth = (team) => team.filter(n => (profiles?.[n]?.ageGroup) === "u25").length;
  const teamVets  = (team) => team.filter(n => (profiles?.[n]?.ageGroup) === "45+").length;

  const odd = available.length % 2 !== 0;

  const getRating = (name) => rateName(name);

  const teamAvgRating = (team) => {
    if (!team.length) return 0;
    return Math.round(team.reduce((s, n) => s + getRating(n), 0) / team.length);
  };

  const toggleManual = (name, team) => {
    if (team === "red") {
      setManualRed(prev => prev.includes(name) ? prev.filter(n=>n!==name) : [...prev, name]);
      setManualWhite(prev => prev.filter(n=>n!==name));
    } else {
      setManualWhite(prev => prev.includes(name) ? prev.filter(n=>n!==name) : [...prev, name]);
      setManualRed(prev => prev.filter(n=>n!==name));
    }
  };

  const manualFiltered = (roster||PLAYER_NAMES).filter(n =>
    n.toLowerCase().includes(manualSearch.toLowerCase())
  );
  const manualAllPicked = [...manualRed, ...manualWhite];

  return (
    <div>
      {/* Top tab switcher */}
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        <button onClick={() => setTab("auto")} style={{
          flex:1, padding:"10px", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:700,
          border: tab==="auto" ? "2px solid #f59e0b" : "1px solid #374151",
          background: tab==="auto" ? "rgba(245,158,11,0.12)" : "transparent",
          color: tab==="auto" ? "#f59e0b" : "#6b7280",
        }}>🎲 Auto Pick</button>
        <button onClick={() => setTab("manual")} style={{
          flex:1, padding:"10px", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:700,
          border: tab==="manual" ? "2px solid #a78bfa" : "1px solid #374151",
          background: tab==="manual" ? "rgba(167,139,250,0.12)" : "transparent",
          color: tab==="manual" ? "#a78bfa" : "#6b7280",
        }}>⚖️ Rate My Teams</button>
      </div>

      {/* ── MANUAL BALANCE CHECKER ─────────────────────────────────────── */}
      {tab === "manual" && (
        <div>
          <div style={{ fontSize:11, color:"#4b5563", marginBottom:12, fontFamily:"monospace" }}>
            TAP A PLAYER THEN ASSIGN TO RED OR WHITE TO CHECK BALANCE
          </div>
          <input placeholder="Search player..." value={manualSearch}
            onChange={e => setManualSearch(e.target.value)}
            style={{ width:"100%", boxSizing:"border-box", background:"#1f2937",
              border:"1px solid #374151", borderRadius:8, padding:"8px 12px",
              color:"#f9fafb", fontSize:13, marginBottom:10, outline:"none" }} />

          {/* Player list with Red/White assign buttons */}
          <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:16 }}>
            {manualFiltered.map(name => {
              const onRed   = manualRed.includes(name);
              const onWhite = manualWhite.includes(name);
              const rating  = getRating(name);
              return (
                <div key={name} style={{ display:"flex", alignItems:"center", gap:6,
                  padding:"7px 10px", borderRadius:8,
                  background: onRed ? "rgba(239,68,68,0.07)" : onWhite ? "rgba(232,232,232,0.04)" : "rgba(255,255,255,0.02)",
                  border: onRed ? "1px solid rgba(239,68,68,0.25)" : onWhite ? "1px solid rgba(232,232,232,0.15)" : "1px solid #1f2937",
                }}>
                  <span style={{ flex:1, fontSize:13, color: onRed?"#f87171":onWhite?"#e2e8f0":"#6b7280" }}>{name}</span>
                  <span style={{ fontSize:10, color:"#f59e0b", marginRight:4 }}>⭐{rating}</span>
                  <button onClick={() => toggleManual(name,"red")} style={{
                    padding:"3px 10px", borderRadius:10, cursor:"pointer", fontSize:11, fontWeight:700,
                    border: onRed ? "2px solid #ef4444" : "1px solid #374151",
                    background: onRed ? "rgba(239,68,68,0.2)" : "transparent",
                    color: onRed ? "#f87171" : "#4b5563",
                  }}>🔴</button>
                  <button onClick={() => toggleManual(name,"white")} style={{
                    padding:"3px 10px", borderRadius:10, cursor:"pointer", fontSize:11, fontWeight:700,
                    border: onWhite ? "2px solid #cbd5e1" : "1px solid #374151",
                    background: onWhite ? "rgba(203,213,225,0.15)" : "transparent",
                    color: onWhite ? "#e2e8f0" : "#4b5563",
                  }}>⚪</button>
                  {(onRed||onWhite) && (
                    <button onClick={() => { setManualRed(p=>p.filter(n=>n!==name)); setManualWhite(p=>p.filter(n=>n!==name)); }} style={{
                      background:"transparent", border:"none", color:"#4b5563", cursor:"pointer", fontSize:14, padding:"0 2px"
                    }}>×</button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Team summary */}
          {(manualRed.length > 0 || manualWhite.length > 0) && (
            <>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:12, padding:12 }}>
                  <div style={{ fontSize:11, color:"#f87171", fontWeight:800, marginBottom:8, textTransform:"uppercase" }}>🔴 Red ({manualRed.length})</div>
                  {manualRed.map(n => (
                    <div key={n} style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:12, color:"#f1f5f9" }}>{n}</span>
                      <span style={{ fontSize:10, color:"#f59e0b" }}>⭐{getRating(n)}</span>
                    </div>
                  ))}
                  {manualRed.length > 0 && (
                    <div style={{ marginTop:8, paddingTop:6, borderTop:"1px solid rgba(239,68,68,0.2)",
                      fontSize:12, color:"#f87171", fontWeight:700 }}>
                      Avg: ⭐{teamAvgRating(manualRed)}
                    </div>
                  )}
                </div>
                <div style={{ background:"rgba(232,232,232,0.04)", border:"1px solid rgba(232,232,232,0.15)", borderRadius:12, padding:12 }}>
                  <div style={{ fontSize:11, color:"#e2e8f0", fontWeight:800, marginBottom:8, textTransform:"uppercase" }}>⚪ White ({manualWhite.length})</div>
                  {manualWhite.map(n => (
                    <div key={n} style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:12, color:"#f1f5f9" }}>{n}</span>
                      <span style={{ fontSize:10, color:"#f59e0b" }}>⭐{getRating(n)}</span>
                    </div>
                  ))}
                  {manualWhite.length > 0 && (
                    <div style={{ marginTop:8, paddingTop:6, borderTop:"1px solid rgba(232,232,232,0.1)",
                      fontSize:12, color:"#cbd5e1", fontWeight:700 }}>
                      Avg: ⭐{teamAvgRating(manualWhite)}
                    </div>
                  )}
                </div>
              </div>

              {/* Balance rating */}
              {manualRed.length > 0 && manualWhite.length > 0 && (() => {
                const rr = teamAvgRating(manualRed);
                const rw = teamAvgRating(manualWhite);
                const diff = Math.abs(rr - rw);
                const verdict = diff <= 1 ? { label:"🟢 Excellent balance", color:"#34d399" }
                              : diff <= 3 ? { label:"🟡 Pretty even", color:"#f59e0b" }
                              : diff <= 5 ? { label:"🟠 Slightly mismatched", color:"#fb923c" }
                              : diff <= 7 ? { label:"🟠 Mismatched", color:"#fb923c" }
                              : { label:"🔴 Uneven teams", color:"#f87171" };
                const stronger = rr > rw ? "Red" : "White";
                return (
                  <div style={{ background:"rgba(255,255,255,0.02)", border:`1px solid ${verdict.color}30`,
                    borderRadius:12, padding:"14px 16px" }}>
                    <div style={{ fontSize:16, fontWeight:800, color:verdict.color,
                      fontFamily:"'Bebas Neue',Impact,sans-serif", letterSpacing:"0.05em",
                      marginBottom:10, textAlign:"center" }}>
                      {verdict.label}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <span style={{ fontSize:14, fontWeight:800, color:"#f87171", minWidth:34, textAlign:"right" }}>⭐{rr}</span>
                      <div style={{ flex:1, height:8, background:"#1f2937", borderRadius:4, overflow:"hidden", position:"relative" }}>
                        <div style={{ position:"absolute", left:0, top:0, height:"100%", width:"50%", background:"#374151", borderRadius:4 }}/>
                        <div style={{
                          position:"absolute", left:0, top:0, height:"100%",
                          width:`${rr/(rr+rw)*100}%`,
                          background:`linear-gradient(90deg,#ef4444,#ef444480)`, borderRadius:4, transition:"width 0.4s"
                        }}/>
                      </div>
                      <span style={{ fontSize:14, fontWeight:800, color:"#e2e8f0", minWidth:34 }}>⭐{rw}</span>
                    </div>
                    <div style={{ fontSize:11, color:"#6b7280", textAlign:"center" }}>
                      {diff === 0 ? "Perfectly matched!" : `${stronger} stronger by ${diff} rating points`}
                    </div>
                    {diff > 5 && (
                      <button onClick={() => setTab("auto")} style={{
                        width:"100%", marginTop:10, padding:"8px", borderRadius:8, border:"none",
                        cursor:"pointer", background:"rgba(167,139,250,0.15)", color:"#a78bfa",
                        fontSize:12, fontWeight:700,
                      }}>Switch to Auto Pick to rebalance →</button>
                    )}
                  </div>
                );
              })()}
            </>
          )}
        </div>
      )}

      {/* Rating basis toggle (applies to both auto + manual) */}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:"monospace" }}>Rate Players By</div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => setUseForm(true)} style={{
            flex:1, padding:"9px", borderRadius:10, cursor:"pointer", fontSize:12, fontWeight:700,
            border: useForm ? "2px solid #34d399" : "1px solid #374151",
            background: useForm ? "rgba(52,211,153,0.12)" : "transparent",
            color: useForm ? "#34d399" : "#6b7280",
          }}>🔥 Current Form</button>
          <button onClick={() => setUseForm(false)} style={{
            flex:1, padding:"9px", borderRadius:10, cursor:"pointer", fontSize:12, fontWeight:700,
            border: !useForm ? "2px solid #60a5fa" : "1px solid #374151",
            background: !useForm ? "rgba(96,165,250,0.12)" : "transparent",
            color: !useForm ? "#60a5fa" : "#6b7280",
          }}>📊 Season Average</button>
        </div>
        <div style={{ fontSize:11, color:"#4b5563", marginTop:6, fontStyle:"italic" }}>
          {useForm ? "Uses each player's last 6 games — rewards players in form right now" : "Uses whole-season win rate and goal difference"}
        </div>
      </div>

      {/* ── AUTO PICK ──────────────────────────────────────────────────── */}
      {tab === "auto" && (
      <div>
      {/* Mode selector */}
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8, fontFamily:"monospace" }}>Pick Method</div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => setPickMode("random")} style={{
            flex:1, padding:"10px", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:700,
            border: mode==="random" ? "2px solid #f59e0b" : "1px solid #374151",
            background: mode==="random" ? "rgba(245,158,11,0.12)" : "transparent",
            color: mode==="random" ? "#f59e0b" : "#6b7280",
          }}>🎲 Random</button>
          <button onClick={() => setPickMode("balanced")} style={{
            flex:1, padding:"10px", borderRadius:10, cursor:"pointer", fontSize:13, fontWeight:700,
            border: mode==="balanced" ? "2px solid #60a5fa" : "1px solid #374151",
            background: mode==="balanced" ? "rgba(96,165,250,0.12)" : "transparent",
            color: mode==="balanced" ? "#60a5fa" : "#6b7280",
          }}>⚖️ Balanced</button>
        </div>
        <div style={{ fontSize:11, color:"#4b5563", marginTop:6, fontStyle:"italic" }}>
          {mode==="random" ? "Splits players into two random equal teams" : "Snake draft by win rate — tries to even out team strength"}
        </div>
      </div>

      {/* Player selector */}
      <div style={{ marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"monospace" }}>
            Available Players ({available.length})
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={selectAll} style={{ fontSize:11, color:"#f59e0b", background:"transparent", border:"none", cursor:"pointer", padding:"2px 6px" }}>All</button>
            <button onClick={clearAll}  style={{ fontSize:11, color:"#6b7280", background:"transparent", border:"none", cursor:"pointer", padding:"2px 6px" }}>Clear</button>
          </div>
        </div>
        <input placeholder="Search player..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width:"100%", boxSizing:"border-box", background:"#1f2937", border:"1px solid #374151",
            borderRadius:8, padding:"8px 12px", color:"#f9fafb", fontSize:13, marginBottom:8, outline:"none" }} />
        <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
          {filtered.map(name => {
            const sel = available.includes(name);
            return (
              <button key={name} onClick={() => toggleAvailable(name)} style={{
                padding:"5px 12px", borderRadius:20, cursor:"pointer", fontSize:12,
                border: sel ? "2px solid #f59e0b" : "1px solid #374151",
                background: sel ? "rgba(245,158,11,0.15)" : "transparent",
                color: sel ? "#f59e0b" : "#6b7280",
                fontWeight: sel ? 700 : 400,
              }}>{name}</button>
            );
          })}
        </div>
      </div>

      {/* Odd player warning */}
      {odd && (
        <div style={{ marginBottom:12, padding:"8px 12px", background:"rgba(245,158,11,0.08)",
          border:"1px solid rgba(245,158,11,0.2)", borderRadius:8, fontSize:12, color:"#f59e0b" }}>
          ⚠️ Odd number of players — one will sit out (shown below)
        </div>
      )}

      {/* Pick button */}
      <button onClick={pickTeams} disabled={available.length < 2} style={{
        width:"100%", padding:"14px", borderRadius:10, border:"none",
        cursor: available.length < 2 ? "not-allowed" : "pointer",
        background: available.length < 2 ? "#1f2937" : "linear-gradient(135deg,#ef4444,#cc2200)",
        color: available.length < 2 ? "#4b5563" : "#fff",
        fontSize:15, fontWeight:800, letterSpacing:"0.05em",
        fontFamily:"'Bebas Neue',Impact,sans-serif", marginBottom:20,
      }}>
        {picked ? "🔀 REPICK TEAMS" : "🎲 PICK TEAMS"}
      </button>

      {/* Results */}
      {picked && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            {/* Red team */}
            <div style={{ background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:12, padding:14 }}>
              <div style={{ fontSize:12, color:"#f87171", fontWeight:800, marginBottom:10,
                textTransform:"uppercase", letterSpacing:"0.06em" }}>
                🔴 Red ({redTeam.length})
              </div>
              {redTeam.map(name => {
                const p = PLAYERS.find(pl => pl.name === name);
                return (
                  <div key={name} style={{ display:"flex", justifyContent:"space-between",
                    alignItems:"center", marginBottom:5 }}>
                    <span style={{ fontSize:13, color:"#f1f5f9" }}>{name}</span>
                    {p && (() => {
                    const prof = profiles?.[name] || {};
                    prof.gd = p.team_gd || 0;
                    const rating = compositeRating(prof, p.win_pct);
                    return <span style={{ fontSize:10, color:"#f59e0b" }}>⭐{rating}</span>;
                  })()}
                  </div>
                );
              })}
              <div style={{ marginTop:10, paddingTop:8, borderTop:"1px solid rgba(239,68,68,0.2)" }}>
                <div style={{ fontSize:11, color:"#f87171" }}>Avg rating: <strong>⭐{teamWinPct(redTeam)}</strong></div>
                <div style={{ fontSize:11, color:"#6b7280" }}>Combined GD: <span style={{ color: teamGD(redTeam)>=0?"#34d399":"#f87171", fontWeight:700 }}>{teamGD(redTeam)>=0?"+":""}{teamGD(redTeam)}</span></div>
                {(teamYouth(redTeam) > 0 || teamVets(redTeam) > 0) && (
                  <div style={{ fontSize:11, color:"#6b7280" }}>Age mix: {teamYouth(redTeam) > 0 && <span style={{ color:"#34d399" }}>{teamYouth(redTeam)} U25</span>}{teamYouth(redTeam) > 0 && teamVets(redTeam) > 0 && " · "}{teamVets(redTeam) > 0 && <span style={{ color:"#fb923c" }}>{teamVets(redTeam)} 45+</span>}</div>
                )}
              </div>
            </div>

            {/* White team */}
            <div style={{ background:"rgba(232,232,232,0.05)", border:"1px solid rgba(232,232,232,0.15)", borderRadius:12, padding:14 }}>
              <div style={{ fontSize:12, color:"#e2e8f0", fontWeight:800, marginBottom:10,
                textTransform:"uppercase", letterSpacing:"0.06em" }}>
                ⚪ White ({whiteTeam.length})
              </div>
              {whiteTeam.map(name => {
                const p = PLAYERS.find(pl => pl.name === name);
                return (
                  <div key={name} style={{ display:"flex", justifyContent:"space-between",
                    alignItems:"center", marginBottom:5 }}>
                    <span style={{ fontSize:13, color:"#f1f5f9" }}>{name}</span>
                    {p && (() => {
                    const prof = profiles?.[name] || {};
                    prof.gd = p.team_gd || 0;
                    const rating = compositeRating(prof, p.win_pct);
                    return <span style={{ fontSize:10, color:"#f59e0b" }}>⭐{rating}</span>;
                  })()}
                  </div>
                );
              })}
              <div style={{ marginTop:10, paddingTop:8, borderTop:"1px solid rgba(232,232,232,0.1)" }}>
                <div style={{ fontSize:11, color:"#cbd5e1" }}>Avg rating: <strong>⭐{teamWinPct(whiteTeam)}</strong></div>
                <div style={{ fontSize:11, color:"#6b7280" }}>Combined GD: <span style={{ color: teamGD(whiteTeam)>=0?"#34d399":"#f87171", fontWeight:700 }}>{teamGD(whiteTeam)>=0?"+":""}{teamGD(whiteTeam)}</span></div>
                {(teamYouth(whiteTeam) > 0 || teamVets(whiteTeam) > 0) && (
                  <div style={{ fontSize:11, color:"#6b7280" }}>Age mix: {teamYouth(whiteTeam) > 0 && <span style={{ color:"#34d399" }}>{teamYouth(whiteTeam)} U25</span>}{teamYouth(whiteTeam) > 0 && teamVets(whiteTeam) > 0 && " · "}{teamVets(whiteTeam) > 0 && <span style={{ color:"#fb923c" }}>{teamVets(whiteTeam)} 45+</span>}</div>
                )}
              </div>
            </div>
          </div>

          {/* Odd player out */}
          {odd && available.length > 0 && (() => {
            const allPicked = [...redTeam, ...whiteTeam];
            const sitOut = available.find(n => !allPicked.includes(n));
            return sitOut ? (
              <div style={{ textAlign:"center", padding:"10px", background:"rgba(255,255,255,0.03)",
                border:"1px solid #2d3748", borderRadius:10, fontSize:13, color:"#6b7280" }}>
                🪑 Sitting out: <span style={{ color:"#f59e0b", fontWeight:700 }}>{sitOut}</span>
              </div>
            ) : null;
          })()}

          {/* Balance indicator */}
          <div style={{ marginTop:12, padding:"10px 14px", background:"rgba(255,255,255,0.02)",
            border:"1px solid #2d3748", borderRadius:10 }}>
            <div style={{ fontSize:11, color:"#4b5563", textTransform:"uppercase",
              letterSpacing:"0.08em", marginBottom:6, fontFamily:"monospace" }}>Balance Check</div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:12, color:"#f87171", minWidth:30, textAlign:"right" }}>⭐{teamWinPct(redTeam)}</span>
              <div style={{ flex:1, height:6, background:"#1f2937", borderRadius:3, overflow:"hidden" }}>
                <div style={{
                  height:"100%", borderRadius:3,
                  background: Math.abs(teamWinPct(redTeam)-teamWinPct(whiteTeam)) <= 1 ? "#34d399" : "#f59e0b",
                  width:`${teamWinPct(redTeam) / Math.max(teamWinPct(redTeam)+teamWinPct(whiteTeam),1) * 100}%`,
                  transition:"width 0.4s",
                }}/>
              </div>
              <span style={{ fontSize:12, color:"#e2e8f0", minWidth:30 }}>⭐{teamWinPct(whiteTeam)}</span>
            </div>
            <div style={{ fontSize:11, color:"#4b5563", marginTop:4, textAlign:"center" }}>
              {Math.abs(teamWinPct(redTeam)-teamWinPct(whiteTeam)) <= 3
                ? <span style={{ color:"#34d399" }}>✓ Well balanced teams</span>
                : <span style={{ color:"#f59e0b" }}>⚠ {Math.abs(teamWinPct(redTeam)-teamWinPct(whiteTeam))} rating gap — tap Repick or try Balanced mode</span>
              }
            </div>
          </div>
        </>
      )}
      </div>
      )}
    </div>
  );
}


// ─── INSIGHTS VIEW ──────────────────────────────────────────────────────────
function InsightsView({ players: PLAYERS, allGames, profiles }) {
  const ukd = (iso) => iso ? `${iso.slice(8,10)}/${iso.slice(5,7)}` : "";
  // Compute real scores from scorers (seeded gf/ga are often 0)
  const scoreOf = (g) => {
    const red = g.redTeam.reduce((s,n)=>s+(g.scorers?.[n]||0),0) + g.whiteTeam.reduce((s,n)=>s+(g.ownGoals?.[n]||0),0);
    const white = g.whiteTeam.reduce((s,n)=>s+(g.scorers?.[n]||0),0) + g.redTeam.reduce((s,n)=>s+(g.ownGoals?.[n]||0),0);
    const winG = g.winningTeam === "White" ? white : red;
    const loseG = g.winningTeam === "White" ? red : white;
    return { red, white, winG, loseG };
  };
  const valid = allGames
    .filter(g => g.redTeam && g.whiteTeam && g.redTeam.length > 0 && g.whiteTeam.length > 0)
    .map(g => { const sc = scoreOf(g); return { ...g, gf: sc.winG, ga: sc.loseG, _red: sc.red, _white: sc.white }; });

  // ── Talisman & Jinx (min 5 games) ──────────────────────────────────────────
  const qualified = PLAYERS.filter(p => p.games_played >= 5);
  const talisman = [...qualified].sort((a,b) => b.win_pct - a.win_pct)[0];
  const jinx     = [...qualified].sort((a,b) => a.win_pct - b.win_pct)[0];

  // ── Goal involvement: player's goals as % of their team's goals when playing ─
  const involvement = PLAYERS.filter(p => p.games_played >= 5 && p.team_gf > 0)
    .map(p => ({ name: p.name, pct: Math.round((p.total_goals / p.team_gf) * 100), goals: p.total_goals }))
    .sort((a,b) => b.pct - a.pct);
  const topInvolve = involvement[0];

  // ── Biggest win & heaviest scoreline ────────────────────────────────────────
  let biggest = null, highestScoring = null;
  valid.forEach(g => {
    const margin = Math.abs(g.gf - g.ga);
    const total  = g.gf + g.ga;
    if (!biggest || margin > biggest.margin) biggest = { ...g, margin };
    if (!highestScoring || total > highestScoring.total) highestScoring = { ...g, total };
  });

  // ── Best & worst duos (same team, min 4 games together) ─────────────────────
  const pairStats = {};
  valid.forEach(g => {
    [g.redTeam, g.whiteTeam].forEach(team => {
      const onRed = team === g.redTeam;
      const won = g.winningTeam !== "Draw" && ((onRed && g.winningTeam==="Red")||(!onRed && g.winningTeam==="White"));
      for (let a=0; a<team.length; a++) {
        for (let b=a+1; b<team.length; b++) {
          const key = [team[a], team[b]].sort().join(" & ");
          if (!pairStats[key]) pairStats[key] = { games:0, wins:0 };
          pairStats[key].games++;
          if (won) pairStats[key].wins++;
        }
      }
    });
  });
  const duos = Object.entries(pairStats)
    .filter(([,v]) => v.games >= 4)
    .map(([key,v]) => ({ key, ...v, winPct: Math.round(v.wins/v.games*100) }));
  const bestDuo  = [...duos].sort((a,b) => b.winPct - a.winPct || b.games - a.games)[0];
  const worstDuo = [...duos].sort((a,b) => a.winPct - b.winPct || b.games - a.games)[0];

  // ── Hottest streak: longest current/historical unbeaten run ─────────────────
  const hottest = [...PLAYERS].sort((a,b) => b.max_unbeaten - a.max_unbeaten)[0];
  const onFire = PLAYERS.filter(p => p.cur_unbeaten >= 3).sort((a,b)=>b.cur_unbeaten-a.cur_unbeaten);
  const coldest = PLAYERS.filter(p => p.cur_no_win >= 3).sort((a,b)=>b.cur_no_win-a.cur_no_win);

  // ── Red vs White overall ────────────────────────────────────────────────────
  const redW = valid.filter(g => g.winningTeam==="Red").length;
  const whiteW = valid.filter(g => g.winningTeam==="White").length;
  const drawN = valid.filter(g => g.winningTeam==="Draw").length;

  // ── Ever-present (most games) & top scorer ──────────────────────────────────
  const everPresent = [...PLAYERS].sort((a,b)=>b.games_played-a.games_played)[0];
  const topScorer   = [...PLAYERS].sort((a,b)=>b.total_goals-a.total_goals)[0];
  const totalGoals  = valid.reduce((s,g)=>s+g.gf+g.ga,0);

  const card = (emoji, title, value, sub, color) => (
    <div style={{ background:"linear-gradient(135deg,#1a1f2e,#111827)", border:`1px solid ${color}30`,
      borderRadius:14, padding:"14px 16px", display:"flex", alignItems:"center", gap:14 }}>
      <div style={{ fontSize:30, lineHeight:1 }}>{emoji}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:10, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"monospace", marginBottom:2 }}>{title}</div>
        <div style={{ fontSize:17, fontWeight:800, color, fontFamily:"'Bebas Neue',Impact,sans-serif", letterSpacing:"0.03em", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{value}</div>
        {sub && <div style={{ fontSize:11, color:"#9ca3af", marginTop:1 }}>{sub}</div>}
      </div>
    </div>
  );

  if (valid.length === 0) return (
    <div style={{ textAlign:"center", color:"#4b5563", padding:"40px 0" }}>No games yet — insights will appear as you log results</div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      <div style={{ fontSize:12, color:"#6b7280", marginBottom:2, fontFamily:"monospace", letterSpacing:"0.05em" }}>
        💡 AUTO-GENERATED FROM {valid.length} GAMES · {totalGoals} GOALS
      </div>

      {talisman && card("🍀", "Talisman", talisman.name, `Team wins ${talisman.win_pct}% when they play`, "#34d399")}
      {jinx && jinx.name !== talisman?.name && card("🪦", "The Jinx", jinx.name, `Team wins just ${jinx.win_pct}% with them`, "#f87171")}
      {topInvolve && card("🎯", "Mr Goals", topInvolve.name, `${topInvolve.pct}% of his team's goals (${topInvolve.goals} scored)`, "#f59e0b")}
      {bestDuo && card("🤝", "Dream Team", bestDuo.key, `${bestDuo.winPct}% win rate · ${bestDuo.games} games together`, "#60a5fa")}
      {worstDuo && worstDuo.key !== bestDuo?.key && card("💔", "Cursed Pairing", worstDuo.key, `Only ${worstDuo.winPct}% in ${worstDuo.games} games together`, "#fb7185")}
      {hottest && card("🔥", "Best Streak Ever", hottest.name, `${hottest.max_unbeaten}-game unbeaten run`, "#fb923c")}
      {biggest && card("💥", "Biggest Hammering", `${biggest.winningTeam} ${biggest.gf}-${biggest.ga}`, `${ukd(biggest.isoDate)} · ${biggest.margin}-goal margin`, "#a78bfa")}
      {highestScoring && card("⚽", "Goal Fest", `${highestScoring.gf}-${highestScoring.ga}`, `${ukd(highestScoring.isoDate)} · ${highestScoring.total} goals total`, "#fbbf24")}
      {topScorer && card("👟", "Top Scorer", topScorer.name, `${topScorer.total_goals} goals this season`, "#f59e0b")}
      {everPresent && card("📅", "Mr Reliable", everPresent.name, `${everPresent.games_played} games — never misses`, "#94a3b8")}
      {card("👕", "Shirt Battle", `Red ${redW} – ${whiteW} White`, drawN > 0 ? `${drawN} draw${drawN!==1?"s":""} too` : "Who rules the season?", "#e2e8f0")}

      {onFire.length > 0 && (
        <div style={{ background:"rgba(251,146,60,0.08)", border:"1px solid rgba(251,146,60,0.25)", borderRadius:14, padding:"14px 16px" }}>
          <div style={{ fontSize:10, color:"#fb923c", textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"monospace", marginBottom:8 }}>🔥 On Fire Right Now</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {onFire.map(p => (
              <span key={p.name} style={{ fontSize:12, color:"#fb923c", background:"rgba(251,146,60,0.12)", border:"1px solid rgba(251,146,60,0.3)", borderRadius:20, padding:"3px 10px", fontWeight:700 }}>
                {p.name} · {p.cur_unbeaten} unbeaten
              </span>
            ))}
          </div>
        </div>
      )}

      {coldest.length > 0 && (
        <div style={{ background:"rgba(96,165,250,0.06)", border:"1px solid rgba(96,165,250,0.2)", borderRadius:14, padding:"14px 16px" }}>
          <div style={{ fontSize:10, color:"#60a5fa", textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"monospace", marginBottom:8 }}>🥶 In a Cold Spell</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {coldest.map(p => (
              <span key={p.name} style={{ fontSize:12, color:"#7dd3fc", background:"rgba(96,165,250,0.1)", border:"1px solid rgba(96,165,250,0.25)", borderRadius:20, padding:"3px 10px", fontWeight:700 }}>
                {p.name} · {p.cur_no_win} without a win
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("player");
  const [rankMode, setRankMode] = useState("goals");
  const [savedGames, setSavedGames] = useState([]);

  // Load saved games on mount (works in Claude artifacts + deployed apps)
  useEffect(() => {
    (async () => {
      try {
        const stored = await Storage.get("thunade_games");
        if (stored) setSavedGames(JSON.parse(stored));
      } catch(e) {}
    })();
  }, []);

  const handleGameSaved = (game) => {
    setSavedGames(prev => [...prev, game]);
  };

  const [playerProfiles, setPlayerProfiles] = useState(DEFAULT_PROFILES);

  // Shared player roster — starts from PLAYER_NAMES, merges any added players
  // from storage, and always includes anyone who appears in a game.
  const [roster, setRoster] = useState([...PLAYER_NAMES]);
  useEffect(() => {
    (async () => {
      try {
        const stored = await Storage.get("thunade_players");
        if (stored) {
          const parsed = JSON.parse(stored);
          setRoster([...new Set([...PLAYER_NAMES, ...parsed])].sort());
        }
      } catch(e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const stored = await Storage.get("thunade_profiles");
        if (stored) {
          // Merge stored profiles over the hardcoded defaults so manually-set
          // ability/fitness is kept, but baked-in ages are never lost.
          const parsed = JSON.parse(stored);
          const merged = { ...DEFAULT_PROFILES };
          Object.keys(parsed).forEach(name => {
            merged[name] = { ...DEFAULT_PROFILES[name], ...parsed[name] };
          });
          setPlayerProfiles(merged);
        }
      } catch(e) {}
    })();
  }, []);

  // Compute all stats dynamically from seeded + logged games
  // A logged game overrides a seeded game for the same date ONLY if it's valid
  // (both teams have players). This prevents a broken stored entry from hiding
  // a correct seeded game.
  const validLogged = Object.values(
    savedGames.reduce((acc, g) => { if (isValidGame(g)) acc[g.date] = g; return acc; }, {})
  );
  const loggedDatesApp = new Set(validLogged.map(g => g.date));
  const allGames = [
    ...SEEDED_GAMES.filter(g => !loggedDatesApp.has(g.date)),
    ...validLogged,
  ].sort((a, b) => new Date(a.date) - new Date(b.date));
  const { players: PLAYERS, teamGames: TEAM_GAMES } = computeStats(allGames);
  // Effective roster: stored roster + anyone who has appeared in a game
  const gamePlayers = new Set();
  allGames.forEach(g => { [...(g.redTeam||[]), ...(g.whiteTeam||[])].forEach(n => gamePlayers.add(n)); });
  const fullRoster = [...new Set([...roster, ...gamePlayers])].sort();
  const maxGoals = Math.max(...PLAYERS.map(p => p.total_goals), 1);
  const maxWins  = Math.max(...PLAYERS.map(p => p.total_wins), 1);
  const maxGames = Math.max(...PLAYERS.map(p => p.games_attended), 1);
  const [selectedPlayer, setSelectedPlayer] = useState("Ade");
  const [compareList, setCompareList] = useState(["Rob","Ade","Elliot C","Sam P"]);
  const [search, setSearch] = useState("");

  const player = PLAYERS.find(p => p.name === selectedPlayer);
  const filtered = PLAYERS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const toggleCompare = name => setCompareList(prev =>
    prev.includes(name) ? prev.filter(n => n !== name) : prev.length >= 4 ? prev : [...prev, name]
  );

  return (
    <div style={{ minHeight:"100vh", width:"100%", maxWidth:"100vw", overflowX:"hidden", background:"#0d1117", color:"#f9fafb", fontFamily:"'Inter','Segoe UI',sans-serif", paddingBottom:40, boxSizing:"border-box" }}>
      <div style={{ background:"linear-gradient(180deg,#111827 0%,#0d1117 100%)", borderBottom:"1px solid #1f2937", padding:"14px 20px 0", position:"sticky", top:0, zIndex:10, width:"100%", boxSizing:"border-box", overflowX:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
          {/* Club shield badge */}
          <svg width="52" height="52" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="lh"><rect x="5" y="3" width="24" height="55"/></clipPath>
            <clipPath id="rh"><rect x="29" y="3" width="24" height="55"/></clipPath>
            <path d="M29 3L5 12V31C5 43 16 52 29 55C42 52 53 43 53 31V12L29 3Z" fill="#cc2200" clipPath="url(#lh)"/>
            <path d="M29 3L5 12V31C5 43 16 52 29 55C42 52 53 43 53 31V12L29 3Z" fill="#dde3e8" clipPath="url(#rh)"/>
            <line x1="29" y1="3" x2="29" y2="55" stroke="#0f172a" strokeWidth="1.5"/>
            <path d="M29 3L5 12V31C5 43 16 52 29 55C42 52 53 43 53 31V12L29 3Z" fill="none" stroke="#475569" strokeWidth="1.2"/>
            <text x="29" y="28" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="900" fontFamily="Impact,sans-serif" letterSpacing="0.8">THUNFC</text>
            <text x="29" y="37" textAnchor="middle" fill="#1e293b" fontSize="5" fontFamily="Impact,sans-serif" letterSpacing="1.2">EST 1993</text>
          </svg>

          {/* App title */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize:21, fontWeight:800, letterSpacing:"0.06em", fontFamily:"'Bebas Neue',Impact,sans-serif", lineHeight:1.1 }}>
              <span style={{ color:"#ef4444" }}>THUN</span><span style={{ color:"#f1f5f9" }}>ADE </span><span style={{ color:"#475569" }}>APP</span>
            </div>
            <div style={{ fontSize:10, color:"#4b5563", letterSpacing:"0.1em" }}>SEASON 2025/26 · EST 1993</div>
          </div>

          {/* Pixelated photo mascot */}
          <div style={{ flexShrink:0, position:"relative" }}>
            <img
              src="data:image/png;base64,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"
              width="76"
              height="76"
              style={{
                borderRadius: "50%",
                border: "2px solid #ef4444",
                display: "block",
              }}
            />
            <div style={{
              position:"absolute", bottom:-4, right:-4,
              background:"#ef4444", borderRadius:"50%",
              width:18, height:18, display:"flex",
              alignItems:"center", justifyContent:"center",
              fontSize:10, border:"2px solid #0d1117"
            }}>⚽</div>
          </div>
        </div>
        <div style={{ display:"flex", borderBottom:"1px solid #1f2937", overflowX:"auto", overflowY:"hidden", scrollbarWidth:"none", msOverflowStyle:"none", WebkitOverflowScrolling:"touch" }}>
          {["player","team","form","h2h","insights","rankings","compare","pick","registry"].map(tab => (
            <button key={tab} onClick={() => setMode(tab)} style={{
              padding:"9px 14px", border:"none", background:"transparent",
              color: mode === tab ? "#f59e0b" : "#6b7280", cursor:"pointer",
              fontSize:12, fontWeight: mode === tab ? 700 : 400,
              borderBottom: mode === tab ? "2px solid #f59e0b" : "2px solid transparent",
              marginBottom:-1, textTransform:"capitalize", letterSpacing:"0.03em",
              whiteSpace:"nowrap", flexShrink:0,
            }}>
              {tab === "player" ? "👤 My Stats" : tab === "team" ? "👕 Team" : tab === "form" ? "📈 Form" : tab === "h2h" ? "⚔️ H2H" : tab === "rankings" ? "🏆 Rankings" : tab === "compare" ? "📊 Compare" : tab === "pick" ? "🎲 Pick" : tab === "insights" ? "💡 Insights" : "➕ Log"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding:"18px 16px", boxSizing:"border-box", width:"100%", overflowX:"hidden" }}>
        {mode === "player" && (
          <>
            <input placeholder="Search player..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ width:"100%", boxSizing:"border-box", background:"#1f2937", border:"1px solid #374151", borderRadius:8, padding:"10px 14px", color:"#f9fafb", fontSize:14, marginBottom:12, outline:"none" }} />
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:18 }}>
              {filtered.map(p => (
                <button key={p.name} onClick={() => { setSelectedPlayer(p.name); setSearch(""); }} style={{
                  padding:"5px 13px", borderRadius:20,
                  border: selectedPlayer === p.name ? "2px solid #f59e0b" : "1px solid #374151",
                  background: selectedPlayer === p.name ? "rgba(245,158,11,0.15)" : "transparent",
                  color: selectedPlayer === p.name ? "#f59e0b" : "#9ca3af",
                  cursor:"pointer", fontSize:13, fontWeight: selectedPlayer === p.name ? 700 : 400,
                }}>{p.name}</button>
              ))}
            </div>
            {player && <PlayerCard player={player} maxGoals={maxGoals} maxWins={maxWins} maxGames={maxGames} />}
          </>
        )}
        {mode === "team" && <TeamPanel teamGames={TEAM_GAMES} players={PLAYERS} profiles={playerProfiles} allGames={allGames} />}
        {mode === "form" && <FormView savedGames={savedGames} players={PLAYERS} />}
        {mode === "h2h" && <H2HView savedGames={savedGames} roster={fullRoster} />}
        {mode === "pick" && <TeamPickerView players={PLAYERS} profiles={playerProfiles} allGames={allGames} roster={fullRoster} />}
        {mode === "insights" && <InsightsView players={PLAYERS} allGames={allGames} profiles={playerProfiles} />}
        {mode === "rankings" && <RankingsView players={PLAYERS} />}
        {mode === "compare" && <CompareView selected={compareList} onToggle={toggleCompare} players={PLAYERS} />}
        {mode === "registry" && <RegistryView onGameSaved={handleGameSaved} savedGames={savedGames} setSavedGames={setSavedGames} />}
      </div>
    </div>
  );
}
