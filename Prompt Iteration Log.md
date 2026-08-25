# Prompt Engineering Iteration Log

This document details the step-by-step optimization of a prompt for generating personalized movie taste profiles and recommendations based on a user's favorites list.

---

## Target Task
**Task:** Analyze a user's movie taste based on a list of favorite films, write a personalized analysis, and recommend exactly 3 lesser-known films (avoiding mainstream blockbusters) that match their taste, complete with matching rationale.

### Input Data
- *The Dark Knight* (Action/Drama, 2008, Dir: Christopher Nolan)
- *Interstellar* (Sci-Fi/Drama, 2014, Dir: Christopher Nolan)
- *Inception* (Sci-Fi/Action, 2010, Dir: Christopher Nolan)
- *The Prestige* (Mystery/Drama, 2006, Dir: Christopher Nolan)

---

## Version 1: The Naive Prompt (Baseline)

### Prompt
```
Recommend 3 movies for someone who likes: The Dark Knight (Action/Drama, 2008), Interstellar (Sci-Fi/Drama, 2014), Inception (Sci-Fi/Action, 2010), and The Prestige (Mystery/Drama, 2006).
```

### Output
```
If you like those movies, here are 3 recommendations:

1. **Shutter Island (2010)** - Like *Inception* and *The Prestige*, this is a mind-bending thriller with a massive twist ending. Directed by Martin Scorsese and starring Leonardo DiCaprio.
2. **Tenet (2020)** - Written and directed by Christopher Nolan, this film deals with time manipulation and has complex action sequences similar to *Inception*.
3. **Arrival (2016)** - A sci-fi drama about a linguist who attempts to communicate with aliens. It deals with deep themes of time and memory, similar to *Interstellar*.
```

### Analysis & Limitations
- **Mainstream Bias:** Recommends very well-known blockbusters (*Shutter Island*, *Tenet*, *Arrival*) which the user has likely already seen.
- **Nolan Loop:** Recommends *Tenet* (another Christopher Nolan movie). Since the user's inputs are already 100% Nolan, the AI fell into a loop instead of diversifying directors.
- **Generic Tone:** The voice is conversational but basic ("If you like those... here are...").
- **No Taste Analysis:** Fails to analyze *why* the user likes these films collectively (e.g., complex structure, high-concept themes).

---

## Version 2: Role Assignment

### Prompt
```
You are an expert film critic and professional cinema curator with decades of experience writing for major film publications.

Recommend 3 movies for someone who likes: The Dark Knight (Action/Drama, 2008), Interstellar (Sci-Fi/Drama, 2014), Inception (Sci-Fi/Action, 2010), and The Prestige (Mystery/Drama, 2006).
```

### Output
```
As a film curator, looking at this list reveals a clear appetite for high-concept, intellectually demanding narratives. The user is drawn to stories that construct elaborate logical rules, explore obsessed characters, and play with temporal structures. Here are 3 refined recommendations:

1. **Memento (2000)** - This early work establishes the non-linear storytelling and psychological obsession that defines the user's favorite films.
2. **The Truman Show (1998)** - While lighter in tone, it shares the thematic focus of a manufactured reality and existential crisis seen in *Inception*.
3. **Contact (1997)** - A thoughtful sci-fi drama that matches the cosmic ambition, parent-child emotional core, and scientific wonder of *Interstellar*.
```

### What Changed and Why
- **Tone Shift:** The tone became significantly more analytical and editorial ("intellectually demanding narratives," "temporal structures").
- **Implicit Taste Profiling:** The model began analyzing the underlying common themes of the input list in its introduction.
- **Remaining Issues:** It still recommended *Memento* (another Nolan film) and *The Truman Show* (highly mainstream), failing to venture into lesser-known auteur cinema.

---

## Version 3: Context and Motivation

### Prompt
```
You are an expert film critic and professional cinema curator with decades of experience writing for major film publications.

We are building a movie discovery app. The user has favorited a selection of films, and we want to provide them with highly engaging, personalized recommendations that feel curated rather than generic. We want to avoid recommending ultra-famous blockbusters that they've almost certainly seen, focusing instead on slightly lesser-known films or auteur cinema that matches their taste profile. Do not recommend movies directed by directors who are already in the user's favorites list.

The user's favorite movies are:
- The Dark Knight (Action/Drama, 2008, Director: Christopher Nolan)
- Interstellar (Sci-Fi/Drama, 2014, Director: Christopher Nolan)
- Inception (Sci-Fi/Action, 2010, Director: Christopher Nolan)
- The Prestige (Mystery/Drama, 2006, Director: Christopher Nolan)

Recommend 3 movies for this user.
```

### Output
```
To elevate your movie discovery experience, we have bypassed the obvious blockbusters and director Christopher Nolan's own filmography. Your taste points toward grand-scale puzzles: stories where structural complexity is coupled with deep existential stakes and obsessive pursuits. 

Here are three curated, lesser-known recommendations:

1. **Coherence (2013, Director: James Ward Byrkit)**
   - *Why it matches:* Like *Inception* and *The Prestige*, this is a micro-budget psychological puzzle. It explores parallel dimensions during a dinner party, focusing on fractured realities and character paranoia without relying on massive VFX.
2. **Sunshine (2007, Director: Danny Boyle)**
   - *Why it matches:* Sharing the existential dread and desperate survival themes of *Interstellar*, this sci-fi thriller follows a crew tasked with reigniting a dying sun. It balances physics-based problems with high-tension drama and a haunting atmosphere.
3. **The Double (2013, Director: Richard Ayoade)**
   - *Why it matches:* An atmospheric adaptation of Dostoyevsky's novella, this film channels the dark, obsessive rivalry of *The Prestige* and the psychological displacement of *Inception*, set within a dystopian bureaucracy.
```

### What Changed and Why
- **Bypassing the Loop:** The explicitly defined constraint ("Do not recommend movies directed by directors who are already in the list") successfully pushed the model to avoid Nolan's other films (like *Memento* or *Tenet*).
- **Curation Quality:** The recommendations moved to indie/underappreciated films (*Coherence*, *The Double*) which fits the app's goal of "discovery."
- **Stronger Explanations:** The explanations linked specific thematic elements (*Inception*'s fractured realities, *Interstellar*'s existential stakes) to the recommendations.

---

## Version 4: Few-Shot Examples

### Prompt
```
You are an expert film critic and professional cinema curator with decades of experience writing for major film publications.
We are building a movie discovery app. The user has favorited a selection of films, and we want to provide them with highly engaging, personalized recommendations that feel curated rather than generic. We want to avoid recommending ultra-famous blockbusters that they've almost certainly seen, focusing instead on slightly lesser-known films or auteur cinema that matches their taste profile. Do not recommend movies directed by directors who are already in the user's favorites list.

Here is an example of a high-quality recommendation output:
===
Input Favorites:
- Toy Story (1995, Animation, Director: John Lasseter)
- Spider-Man: Into the Spider-Verse (2018, Animation/Action, Director: Bob Persichetti)
- Spirited Away (2001, Animation/Fantasy, Director: Hayao Miyazaki)

Curator's Analysis: You have an appreciation for boundary-pushing animation that combines technical innovation with rich, emotional storytelling. You are drawn to transportive worlds where the visual style itself is a key narrator.

Recommendations:
1. **Kubo and the Two Strings (2016, Director: Travis Knight)**
   - *Why it matches:* Stop-motion animation at its peak, this film captures the emotional depth of Toy Story with the stunning artistic innovation of Spider-Verse.
2. **Song of the Sea (2014, Director: Tomm Moore)**
   - *Why it matches:* A hand-drawn visual masterpiece that offers the same mythological depth and quiet, magical wonder as Miyazaki's Spirited Away.
3. **The Iron Giant (1999, Director: Brad Bird)**
   - *Why it matches:* A retro classic that shares Toy Story's emotional core and theme of identity, wrapped in beautiful visual craftsmanship.
===

The user's favorite movies are:
- The Dark Knight (Action/Drama, 2008, Director: Christopher Nolan)
- Interstellar (Sci-Fi/Drama, 2014, Director: Christopher Nolan)
- Inception (Sci-Fi/Action, 2010, Director: Christopher Nolan)
- The Prestige (Mystery/Drama, 2006, Director: Christopher Nolan)

Recommend 3 movies for this user.
```

### Output
```
Curator's Analysis: You are drawn to intellectual labyrinthine thrillers that weave complex, structural puzzles around characters consumed by existential obsession. You appreciate movies that play with reality and time, demanding active audience participation.

Recommendations:
1. **Primer (2004, Director: Shane Carruth)**
   - *Why it matches:* The ultimate low-budget intellectual puzzle. Like *Inception* and *The Prestige*, it demands multiple viewings to unpack its complex, uncompromising approach to time travel and the breakdown of trust between its protagonists.
2. **Dark City (1998, Director: Alex Proyas)**
   - *Why it matches:* Preceding *Inception* and *The Matrix*, this noirish sci-fi masterpiece deals with an engineered, modular city where reality is rewritten nightly, matching the architectural scale and structural isolation of Nolan's dreamscape.
3. **Source Code (2011, Director: Duncan Jones)**
   - *Why it matches:* A high-concept thriller matching the urgent pacing of *The Dark Knight* and the logical iteration of *Inception*, centered on a protagonist trapped in a repeating time loop trying to prevent an explosion.
```

### What Changed and Why
- **Structural Standardization:** The model conformed strictly to the format presented in the example (`Curator's Analysis` followed by numbered list with specific bolding and sub-bullets).
- **Targeted Rationale:** The rationales became shorter, punchier, and highly aligned with the few-shot example style, highlighting the balance of structural complexity and character drive.

---

## Version 5: Output Structure

### Prompt
```
You are an expert film critic and professional cinema curator with decades of experience writing for major film publications.
We are building a movie discovery app. The user has favorited a selection of films, and we want to provide them with highly engaging, personalized recommendations that feel curated rather than generic. We want to avoid recommending ultra-famous blockbusters that they've almost certainly seen, focusing instead on slightly lesser-known films or auteur cinema that matches their taste profile. Do not recommend movies directed by directors who are already in the user's favorites list.

The user's favorite movies are:
- The Dark Knight (Action/Drama, 2008, Director: Christopher Nolan)
- Interstellar (Sci-Fi/Drama, 2014, Director: Christopher Nolan)
- Inception (Sci-Fi/Action, 2010, Director: Christopher Nolan)
- The Prestige (Mystery/Drama, 2006, Director: Christopher Nolan)

Provide the output in JSON format. The JSON must contain:
1. "tasteAnalysis": A 2-sentence summary of the user's movie taste.
2. "recommendations": An array of 3 objects, each containing:
   - "title": Movie title
   - "year": Release year
   - "director": Director name
   - "matchReason": Brief explanation (1-2 sentences) of why this movie matches their favorites.
   - "genres": Array of genres

Example JSON shape:
{
  "tasteAnalysis": "...",
  "recommendations": [
    {
      "title": "...",
      "year": 2000,
      "director": "...",
      "matchReason": "...",
      "genres": ["...", "..."]
    }
  ]
}

Ensure the output is raw, valid JSON only. Do not include any intro, outro, or markdown code fence wrappers outside of the JSON block.
```

### Output
```json
{
  "tasteAnalysis": "You have a strong affinity for high-concept psychological puzzles that merge dramatic tension with structural complexity. You are captivated by stories exploring obsessive characters, shifting realities, and existential stakes.",
  "recommendations": [
    {
      "title": "Coherence",
      "year": 2013,
      "director": "James Ward Byrkit",
      "matchReason": "Like Inception and The Prestige, this micro-budget film weaves a mind-bending psychological puzzle around parallel realities and character paranoia without relying on blockbuster special effects.",
      "genres": ["Sci-Fi", "Thriller", "Mystery"]
    },
    {
      "title": "The Killing of a Sacred Deer",
      "year": 2017,
      "director": "Yorgos Lanthimos",
      "matchReason": "Shares the atmospheric dread and intense, uncompromising moral dilemmas of The Dark Knight, centered on an obsessive confrontation that challenges the boundaries of control.",
      "genres": ["Drama", "Mystery", "Thriller"]
    },
    {
      "title": "Mr. Nobody",
      "year": 2009,
      "director": "Jaco Van Dormael",
      "matchReason": "Captures the sweeping, non-linear cosmic ambition of Interstellar, diving deep into time, choice, and alternate realities with a similarly emotional core.",
      "genres": ["Sci-Fi", "Drama", "Romance"]
    }
  ]
}
```

### What Changed and Why
- **Machine Readability:** The output is now structured JSON, making it directly parseable by our React app backend/frontend.
- **Curation Shift:** The model selected different films (*The Killing of a Sacred Deer*, *Mr. Nobody*) to fit the constraints while meeting the structural criteria.
- **No Fluff:** Eliminated all conversational padding (no "Here is the JSON you requested..."), adhering to the "raw, valid JSON only" instruction.

---

## Version 6: Step Decomposition (Final Prompt)

### Prompt
```
You are an expert film critic and professional cinema curator with decades of experience writing for major film publications.
We are building a movie discovery app. The user has favorited a selection of films, and we want to provide them with highly engaging, personalized recommendations that feel curated rather than generic. We want to avoid recommending ultra-famous blockbusters that they've almost certainly seen, focusing instead on slightly lesser-known films or auteur cinema that matches their taste profile. Do not recommend movies directed by directors who are already in the user's favorites list.

The user's favorite movies are:
- The Dark Knight (Action/Drama, 2008, Director: Christopher Nolan)
- Interstellar (Sci-Fi/Drama, 2014, Director: Christopher Nolan)
- Inception (Sci-Fi/Action, 2010, Director: Christopher Nolan)
- The Prestige (Mystery/Drama, 2006, Director: Christopher Nolan)

Before writing your final recommendations, decompose your thinking into a structured analysis.
Follow these steps inside a `<thinking>` tag:
1. Identify common themes in the user's favorites (e.g., identity, sacrifice, obsession, non-linear timelines).
2. Identify stylistic and structural preferences (e.g., high-concept sci-fi, complex narratives, rich atmospheric scores, dramatic tension).
3. Recognize the obvious director pattern (Christopher Nolan) and note that you must recommend films from other directors who share similar stylistic sensibilities (e.g., Denis Villeneuve, Danny Boyle, Alex Garland, David Fincher) rather than more Nolan films.
4. Brainstorm 5 lesser-known movies that fit this profile, select the top 3, and explain why they match.

After the `</thinking>` tag, output the final result in JSON format. The JSON must contain:
1. "tasteAnalysis": A 2-sentence summary of the user's movie taste.
2. "recommendations": An array of 3 objects, each containing:
   - "title": Movie title
   - "year": Release year
   - "director": Director name
   - "matchReason": Brief explanation (1-2 sentences) of why this movie matches their favorites.
   - "genres": Array of genres

Example JSON shape:
{
  "tasteAnalysis": "...",
  "recommendations": [
    {
      "title": "...",
      "year": 2000,
      "director": "...",
      "matchReason": "...",
      "genres": ["...", "..."]
    }
  ]
}

Make sure the JSON block is syntactically correct and includes no trailing commas or invalid formatting.
```

### Output
```xml
<thinking>
1. Common Themes: The user's favorites center around psychological obsession, loss of grounding (literal and psychological), sacrifice for a larger goal (saving humanity, performing a trick, maintaining justice), and non-linear or multi-layered narratives.
2. Stylistic/Structural Preferences: High-concept science fiction and elevated thrillers. Tight, fast-paced plotting, massive stakes, mechanical logic systems, heavy atmospheric scores, and high intellectual tension.
3. Director Pattern: The director is Christopher Nolan across all four titles. The rule states I must not recommend Nolan movies. I need to source movies from directors like Denis Villeneuve, Danny Boyle, Alex Garland, David Fincher, or Shane Carruth who specialize in high-stakes intellectual puzzles.
4. Brainstorming 5 candidates:
   - *Primer* (Shane Carruth) - Great time puzzle, fits *Inception/The Prestige*. Slightly too dry/low budget.
   - *Coherence* (James Ward Byrkit) - Fits the reality distortion of *Inception*, very tense.
   - *Sunshine* (Danny Boyle) - Sci-fi with existential stakes and intense psychological pressure, fits *Interstellar*.
   - *Enemy* (Denis Villeneuve) - Extreme obsession, double identities, fits *The Prestige*. Might be too surreal.
   - *Moon* (Duncan Jones) - Isolation, psychological revelation, sci-fi theme, fits *Interstellar*.
Selection:
1. *Coherence* (Sci-Fi/Thriller, 2013) - Captures the reality-bending puzzle aspect.
2. *Sunshine* (Sci-Fi/Thriller, 2007) - Captures the cosmic scale and high pressure of *Interstellar*.
3. *Enemy* (Mystery/Thriller, 2013) - Captures the double-identity obsession of *The Prestige*.
</thinking>
{
  "tasteAnalysis": "You are drawn to intense, intellectually challenging thrillers and sci-fi that explore themes of obsession, fragmented identity, and existential stakes. You appreciate narratives constructed like complex puzzles that demand active mental engagement to solve.",
  "recommendations": [
    {
      "title": "Coherence",
      "year": 2013,
      "director": "James Ward Byrkit",
      "matchReason": "A masterclass in low-budget tension, this reality-bending puzzle echoes the shifting structures of Inception and The Prestige as dinner party guests face anomalous spatial events.",
      "genres": ["Sci-Fi", "Thriller", "Mystery"]
    },
    {
      "title": "Sunshine",
      "year": 2007,
      "director": "Danny Boyle",
      "matchReason": "This film matches the cosmic scale, existential survival theme, and atmospheric gravity of Interstellar, following a space crew dealing with psychological and physical breakdowns.",
      "genres": ["Sci-Fi", "Thriller", "Adventure"]
    },
    {
      "title": "Enemy",
      "year": 2013,
      "director": "Denis Villeneuve",
      "matchReason": "Directed with a dark, brooding atmosphere, this psychological thriller explores double identity and paranoia, echoing the obsessive rivalry and structural mystery of The Prestige.",
      "genres": ["Mystery", "Thriller", "Drama"]
    }
  ]
}
```

### What Changed and Why
- **Systematic Curation:** By breaking down the task, the model systematically analyzed the theme and director bias before writing the recommendations.
- **Improved Alignment:** The selection of *Enemy* and *Sunshine* represent a higher degree of curation than the previous random grabs. The match reasons are more precise, directly connecting the psychological paranoia of *Enemy* to *The Prestige* and the atmospheric tension of *Sunshine* to *Interstellar*.
- **Logical Accuracy:** Chain-of-thought processing prevented the model from failing constraints (like accidentally listing a Nolan movie or suggesting a movie that didn't fit the genres).

---

## Cross-Model Comparison (Claude vs ChatGPT)

We evaluated the Final Step-Decomposition Prompt on **Claude (3.5 Sonnet)** and **ChatGPT (GPT-4o)**.

| Criteria | Claude (3.5 Sonnet) | ChatGPT (GPT-4o) |
| --- | --- | --- |
| **Tone** | Scholarly, precise, and understated. Reads like an actual article from *Sight & Sound*. | Enthusiastic, commercial, and energetic. Sounds like a marketing blurb for a streaming service. |
| **Accuracy to Constraints** | 100% compliant. Strictly avoided Nolan, selected true lesser-known indie puzzles (*Coherence*, *Enemy*), and kept JSON format pristine. | 100% compliant, but the "lesser-known" definition was looser (it suggested *Ex Machina* in a test run, which is highly famous). |
| **Analytical Depth** | Exceptional. Inside the `<thinking>` tag, Claude correctly isolated the "preoccupation with time and memory as physical, navigable spaces" in Nolan's work. | Good, but more superficial. The analysis list focused on plot summaries rather than underlying thematic structures. |
| **JSON Validation** | Valid JSON, zero markdown wraps outside the XML logic. | Valid JSON, but wrapped it in a markdown ```json block despite the prompt asking for raw JSON. |
| **Failure Points** | Can sometimes suggest films that are *too* obscure/surreal (*Upstream Color*), bordering on unwatchable for casual app users. | Tends to recommend movies that are too mainstream (*Ex Machina*, *Shutter Island*) unless the prompt explicitly bans specific films. |

---

## Reusable Prompt Template

Below is a reusable template that can be used for any personalized recommendation and taste profiling task (e.g., books, music, video games, articles).

```markdown
You are an expert [ROLE] and professional [SPECIALTY] with decades of experience curating high-quality selections.
We are building a [APPLICATION TYPE]. The user has selected a list of items they love, and we want to provide them with highly engaging, personalized recommendations that feel curated rather than generic. We want to avoid recommending ultra-famous items they have almost certainly experienced, focusing instead on slightly lesser-known or [CURATION CRITERIA] items that match their taste profile. Do not recommend items by creators already present in the user's favorites list.

The user's favorite items are:
[LIST OF INPUT ITEMS WITH METADATA]

Before writing your final recommendations, decompose your thinking into a structured analysis.
Follow these steps inside a `<thinking>` tag:
1. Identify common themes, attributes, and styles in the user's favorites.
2. Identify stylistic and structural preferences of the user.
3. Recognize the obvious creator or brand patterns and note that you must recommend items from other creators who share similar sensibilities.
4. Brainstorm 5 lesser-known items that fit this profile, select the top 3, and explain why they match.

After the `</thinking>` tag, output the final result in JSON format. The JSON must contain:
1. "tasteAnalysis": A 2-sentence summary of the user's taste/style profile.
2. "recommendations": An array of 3 objects, each containing:
   - "title": Item title/name
   - "creator": Creator/Author/Developer name
   - "matchReason": Brief explanation (1-2 sentences) of why this item matches their favorites.
   - "attributes": Array of key attributes/genres/tags

Example JSON shape:
{
  "tasteAnalysis": "...",
  "recommendations": [
    {
      "title": "...",
      "creator": "...",
      "matchReason": "...",
      "attributes": ["...", "..."]
    }
  ]
}

Make sure the JSON block is syntactically correct and includes no trailing commas or invalid formatting. Output only valid JSON after the closing thinking tag.
```
