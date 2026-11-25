class AlejandrosElement extends HTMLElement {
    constructor() {
        super();
       /* this.currentIdea = 0;
        this.ideas = [
            {
                text: "Deliberate 'world blending' in voice models to replicate real human speech patterns. Use probability distribution of LLM tokens to find two tokens with semantic similarity, blend into one word. Inspired by Douglas Hofstadter's 2005 lecture at Stanford University.",
                sources: ["Douglas Hofstadter, 'Analogy as the Core of Cognition'"]
            },
            {
                text: "Borrow concepts like Chomsky's 'Strong Minimalist Thesis', using the proposed simple machinery of human natural language to formalize it algorithmically. Use this to encode the 'facts' of a document into a formal language, permitting retrieval of natural language-based files to be formally verifiable.",
                sources: ["Noam Chomsky, 'Merge and the Strong Minimalist Thesis'"]
            },
            {
                text: "Assess the economic impact of sycophancy in language models with poor reasoning. Does the cost of paying for better models offset the detriment of relying on poor reasoning, to make financial decisions?",
                sources: ["Hong et al., 'Measuring Sycophancy of Language Models in Mult-turn Dialogues'"]
            }
        ]; */


    }

    static get observedAttributes() {
        return ["show-sources"];
    }

    connectedCallback() {
        const heading = document.createElement("h2");
        heading.textContent = "Some Hilarious Dad Jokes";

        this.display = document.createElement("p");

        this.status = document.createElement("p");

        this.status.setAttribute("role", "status");

        this.sources = document.createElement("div");

        let saved = null;
        try {
            saved = localStorage.getItem(KEY);
        } catch {}
        this.toggleAttribute("show-sources", saved === "shown");

        this.button = document.createElement("button");
        this.button.textContent = "Make me groan";

        this.button.addEventListener("click", () => {
            this.loadDadJokes();
        });

        this.appendChild(heading);
        this.appendChild(this.display);
        this.appendChild(this.status);
        this.appendChild(this.sources);
        this.appendChild(this.button);

        const toggleSources = document.querySelector("#toggle-sources");
        toggleSources.addEventListener("click", () => {
            this.toggleAttribute("show-sources");
            try {
                localStorage.setItem(KeyboardEvent, this.hasAttribute("show-sources") ? "shown" : "hidden");
            } catch{}
        });

        this.updateSource();

        this.loadDadJokes();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "show-sources") {
            const showingSources = newValue !== null;
            this.sources.hidden = !showingSources;

            const toggleSources = document.querySelector("#toggle-sources");
            toggleSources.textContent = showingSources ? "Hide sources" : "Show sources";
            toggleSources.setAttribute("aria-expanded", String(showingSources));
        }
    }

    async loadDadJokes() {
        this.button.disabled = true;
        this.status.textContent = "Status: A groan is on its way...";

        try {
            const response = await fetch("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            const data = await response.json();

            if (typeof data?.joke !== "string") {
                throw new Error("Expected a joke in the response.");
            }

            this.display.textContent = data.joke;
            this.status.textContent = "Status: Your groan was successfully delivered!";
        } catch (error) {
            console.error("Could not load a joke.", error);
            this.status.textContent = "Status: Oops, couldn't deliver the joke. Please try it again.";
        } finally {
            this.button.disabled = false;
        }
    }

    /* updateIdea() { */ updateSource() {
        this.sources.hidden = !this.hasAttribute("show-sources");

        // this.display.textContent = idea.text;
        // this.status.textContent = `Idea ${this.currentIdea + 1} of ${this.ideas.length}`;

        while (this.sources.firstChild) {
            this.sources.removeChild(this.sources.firstChild);
        }

        const heading = document.createElement("h3");
        heading.textContent = "Sources";
        this.sources.appendChild(heading);

        const list = document.createElement("ul");
        const item = document.createElement("li");
        item.textContent = "icanhazdadjoke.com";
        list.appendChild(item);
        this.sources.appendChild(list);

    }
}

customElements.define("alejandros-element", AlejandrosElement);