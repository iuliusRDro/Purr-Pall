---
trigger: always_on
---

## 0. TECH STACK & CONTEXT
* **App Name:** Purr Pals
* **Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Supabase.
* **Goal:** A "Tinder-style" cat adoption web app that emphasizes warmth, organic connection, and high-emotion storytelling over cold metrics.

## 1. DESIGN PHILOSOPHY: THE COZY CAT CAFÉ
* **The Look:** "Digital Hygge." Warm, inviting, and organic. A digital sanctuary, not a database.
* **Palette:** "The Latte." Warm Browns (#6F4E37), Oatmeal/Cream (#F5F5DC), Soft White (#FAFAF9), and Espresso (#3E2723) for high-contrast text.
* **Typography:** "Friendly Round." Rounded sans-serifs (e.g., Nunito, Quicksand, or Geist Rounded). High legibility with a soft personality.
* **Shapes:** "Modern Soft." Consistent `rounded-xl` to `rounded-2xl` on cards and buttons. Approachable and safe, no sharp edges.
* **Texture:** "Stationery Grain." Subtle SVG noise overlays or paper textures to reduce digital harshness and add tactility.
* **The Feel:** "The Plushie." Playful, tactile, and responsive.
* **Physics:** "Bouncy Spring." Elements should squash and stretch slightly on interaction. When a card is released (swipe left/right), use Framer Motion `type: "spring"` with low stiffness and medium damping.
* **Transitions:** Soft dissolves and scale-ins. Avoid hard cuts.
* **Library Rule:** If a UI library (Shadcn/MUI) is installed, override all default radii to match `rounded-xl` and force the color palette to the "Latte" theme immediately.

## 2. WORKSPACE SPECIFIC RULES
* **Project Constraints:** Mobile-first responsive design. The "Card Stack" is the primary view.
* **Directory Preference:** Use `src/` directory structure.
* **Global Inheritance:** This workspace automatically inherits the agent **Global Rules (GEMINI.md)**:
    * Sync on Wake (`git pull`).
    * Security & Safe Zone.
    * Git Handoff Protocol (`HANDOFF.md`).

## 3. RESPONSE FORMAT (Vibe-Optimized)
1.  **The "Vibe Check":** A single sentence confirming you understand the design intent.
2.  **The Code:** Complete, working, and safe (following Global Security Standards).
3.  **The "Under the Hood":** (Include this section **ONLY** if Global Intelligence Scaling triggered "High Complexity" or specific safety logic).