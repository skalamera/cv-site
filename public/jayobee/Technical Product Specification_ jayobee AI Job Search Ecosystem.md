### Technical Product Specification: jayobee AI Job Search Ecosystem

##### 1\. Architectural Vision and Strategic Objectives

The jayobee ecosystem is engineered as a centralized, high-efficiency command center for technical job seekers, designed to replace fragmented manual tracking with a cohesive, AI-driven pipeline. In an era where Applicant Tracking Systems (ATS) create high-friction barriers, jayobee represents a strategic pivot toward the normalization of unstructured web data. By integrating Large Language Model (LLM) intelligence directly into the user's browsing context, the system transforms the job search from an administrative burden into a latency-optimized technical operation.The core mission of the system is the mitigation of technical friction and the elimination of manual data entry. Through the orchestration of Gemini-powered analysis and robust Document Object Model (DOM) automation, jayobee significantly reduces "time-to-apply" while maximizing application quality.**Primary Strategic Value Propositions:**

* **Asynchronous Sourcing:**  Context-menu triggers allow for the instant extraction and structuring of job description (JD) metadata from any web portal, bypassing manual copy-paste workflows.  
* **Context-Aware Document Generation:**  Direct synthesis of job-specific resumes and cover letters using the active JD context window to ensure peak ATS compatibility.  
* **"AI Apply" Automation:**  Robotic Process Automation (RPA) of the "last mile" application submission via intelligent form-filling and automated document attachment.This framework empowers the candidate to operate at a higher level of abstraction, focusing on strategic decision-making while the system handles repetitive data execution.

##### 2\. System Architecture and Chrome Manifest V3 Framework

Jayobee utilizes the Chrome Extension Manifest V3 (MV3) framework to enable direct interaction with the user’s browsing context and various ATS portals. This architecture facilitates the injection of content scripts into complex forms and the management of state persistence without the latency or privacy risks associated with external server-side processing.

###### *Core Technical Stack*

Component,Technology  
Extension Framework,Chrome Extension Manifest V3  
AI/LLM Engine,Google Gemini 2.5 Flash API (Latency-Optimized)  
DOM Parsing,Custom Traversal Scripts & Portal-Specific Handlers  
PDF Processing,pdf.js (Parsing) & Lightweight Native JS (Generation)

###### *Extension Component Model*

The modular architecture is designed to handle distinct computational loads while adhering to MV3's service worker constraints:

* **background.js** : The service worker managing the extension lifecycle, message passing, and state coordination.  
* **content/** : Houses the logic for DOM traversal and form detection. It includes specialized handlers for platforms like  **Ashby, Greenhouse, Lever, Workday, iCIMS, Taleo, and LinkedIn** .  
* **offscreen/** : Critical for PDF processing. Since MV3 service workers cannot host the DOM-heavy pdf.js library, this offscreen document is used for quiet, background PDF parsing.  
* **lib/** : The utility layer managing Gemini 2.5 Flash API integration and local storage persistence.**AI Rationale:**  Gemini 2.5 Flash was selected for its optimal balance of high-speed inference and low-latency response, which is essential for UI-bound tasks and real-time DOM interactions.**Security and Permission Model**  By utilizing ActiveTab, Scripting, Storage, and ContextMenus, jayobee maintains a localized data model. All sensitive resume data and application histories are persisted in local browser storage, ensuring the user retains absolute sovereignty over their data.

##### 3\. AI-Driven Metadata Extraction and Analysis Pipeline

To drive effective match scoring, the system must transform raw JD text into structured, high-fidelity data. This extraction serves as the foundational telemetry for the entire jayobee pipeline.

###### *Metadata Extraction Engine*

When a user executes a "Save to jayobee" command via the context menu, the Gemini 2.5 Flash model performs entity extraction and classification:

* **Core Entities:**  Job Title, Company, Location, Archetype, and Compensation.  
* **Classification:**  Structured mapping of unstructured text into a machine-readable schema.

###### *Match Score & Gap Analysis Logic*

The system evaluates the extracted data against the Master Resume to generate a precise  **5.0 scale match score** . This provides three diagnostic outputs:

1. **Top Strength Identification:**  Highlighting key technical alignments.  
2. **Main Gap Analysis:**  Pinpointing experience deficiencies relative to the JD.  
3. **Interview Mitigation Strategy:**  Providing actionable talking points to bridge identified gaps.**The "Active JD" Context**  Setting a job as the  **Active JD**  (triggered by the  **⭐ Star icon** ) establishes a  **singleton state**  within the extension. This context serves as the primary reference point for all downstream LLM prompts, ensuring every document generated is contextually synced to that specific role.

##### 4\. The Generative Document Engine

Generic resumes are a strategic liability. Jayobee’s generative engine creates "Tailored CVs" that utilize job-specific vocabulary to bypass ATS filters and capture recruiter attention.**Generative Outputs:**

* **Tailored CV (HTML-PDF):**  Rewrites summaries and bullet points to mirror JD vocabulary.  
* *So What?*  This ensures high keyword density and relevance, significantly increasing the probability of passing automated filters.  
* **Metric-Driven Cover Letters:**  Focuses on punchy, quantitative achievements.  
* *So What?*  This replaces corporate filler with hard evidence, making a more compelling case for the candidate's immediate impact.  
* **Interview Prep (STAR+R):**  Maps experience to JD requirements via Situation, Task, Action, Result, and Reflection.  
* *So What?*  This reduces the cognitive load and "activation energy" required for high-pressure interview preparation.  
* **Outreach Drafter:**  Generates 300-character personalized LinkedIn requests.  
* *So What?*  This turns a 10-minute drafting task into a 2-second copy-paste operation, maximizing networking throughput.**Technical Note:**  The engine distinguishes between the  **Styled HTML-PDF**  (for human reviewers) and the  **"Raw" ATS-friendly PDF**  (for automated uploads), ensuring the candidate is optimized for both audiences.

##### 5\. "AI Apply": Advanced DOM Automation and Form Interaction

"AI Apply" automates the "last mile"—the interaction with diverse ATS portals. This RPA layer maps the Master Resume schema to complex, multi-page application forms.

###### *Portal Handlers and Generic Fallback*

The system maintains dedicated scripts for major platforms:  **Workday, Greenhouse, Ashby, Lever, LinkedIn, iCIMS, and Taleo** . In the absence of a dedicated script, a  **"Generic" handler fallback**  attempts to map the unknown DOM structure to the user's data schema, serving as an architectural safety net.**Intelligent Form Filling Workflow:**

1. **Form Detection:**  Identification of input fields, dropdowns, and patterns.  
2. **Dynamic Q\&A:**  The extension uses the Active JD and resume context to answer open-ended queries (e.g., "Why this role?").  
3. **ATS PDF Generation:**  The system converts tailored text into a raw PDF and automatically triggers the "Resume Upload" field attachment.**Data Hierarchy & Overrides:**  Application logic follows a tiered priority:  
4. **Custom Q\&A** : User-defined overrides for specific questions.  
5. **Additional Questions** : Common application queries (e.g., "Willing to relocate?").  
6. **Profile Information** : Standard identity fields (Name, Address, Phone).  
7. **AI-Generated Responses** : Contextual answers generated as a fallback.

##### 6\. Master Resume Pipeline and AI Audit System

The effectiveness of the AI is dependent on the "Ground Truth" foundation: the  **Master Resume** .

###### *Master Resume Audit Interface*

The system provides a  **Resume Audit Score**  (e.g., 92/100) and detailed telemetry across three categories:

* **Top Strengths:**  Use of quantifiable metrics (e.g., impact on CSAT, resolution times, and operational efficiency).  
* **Weaknesses:**  Detection of inconsistent metric usage or weak verbs in legacy roles, specifically calling out omissions in roles at  **BuildingLink, 1010 data, and Lytx** .  
* **Highly Actionable Steps:**  Guidance to rephrase entries (e.g., changing "Assisted with redesign" to "Led redesign, resulting in Y improvement").**Parsing and Storage Mechanism**  The system uses pdf.js within an  **offscreen document**  to transform the PDF into  **Parsed Master Resume Text** . This raw text is the source of truth for the LLM's context window.

##### 7\. Tracking, Management, and State Lifecycle

To maintain a high-volume search funnel, jayobee manages the lifecycle of every opportunity within "The Hub," preventing data loss across the pipeline.

###### *Job Lifecycle States and UI Triggers*

* **Pipeline** : The initial entry point for clipped descriptions.  
* **Saved (❤️ icon)** : High-priority roles staged for action.  
* **Tracker (Bookmark icon)** : Active applications, sub-categorized as  **Applied**  or  **Interviewing** .  
* **Archived** : Terminal states for  **Accepted**  or  **Rejected**  roles (keeping the active workspace clean).

###### *Data Management*

Users maintain full control over their local database with features to  **Export JD Clips (.txt)**  for external analysis or  **Clear All JD Clips**  to purge local state.By combining deep AI contextual analysis with sophisticated DOM automation, jayobee transforms the job search from a fragmented administrative chore into a high-performance, engineering-led operation.  
