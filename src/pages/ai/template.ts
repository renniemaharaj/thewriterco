export const summaryTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Writer Company AI - [Topic of Study]</title>
    <style>
        /* General Styles */
        html {
            scroll-behavior: smooth; /* Ensure smooth scrolling applies */
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: #2d2d2d;
            color: #eee;
            margin: 0;
            padding: 0;
            line-height: 1.8;
        }

        .container {
            width: 90%;
            max-width: 900px;
            margin: auto;
            padding: 20px;
        }

        header, footer {
            background-color: #222;
            color: #fff;
            padding: 15px;
            text-align: center;
        }

        h1, h2 {
            color: #fff;
        }

        h2 {
            font-size: 1.8em;
            border-bottom: 2px solid #777;
            padding-bottom: 5px;
        }

        .section {
            margin-bottom: 20px;
            padding: 20px;
            background-color: #444;
            border-radius: 8px;
            box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        }

        /* Collapsible Study Points */
        .point {
            margin-bottom: 10px;
            padding-left: 10px;
            border-left: 4px solid #888;
            cursor: pointer;
        }

        .content {
            display: none;
            padding: 10px;
            background-color: #555;
            border-radius: 6px;
            margin-top: 5px;
        }

        .scripture, .discussion, .considerations, .conclusion {
            margin-bottom: 10px;
            color: #ccc;
        }

        /* Table of Contents */
        .toc {
            background-color: #333;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .toc h3 {
            margin-top: 0;
            color: #fff;
        }

        .toc ul {
            list-style: none;
            padding: 0;
        }

        .toc li {
            margin: 5px 0;
        }

        .toc a {
            color: #ddd;
            text-decoration: none;
        }

        .toc a:hover {
            text-decoration: underline;
        }

        footer {
            padding: 15px 0;
            text-align: center;
        }

        .branding a {
            color: #bbb;
            text-decoration: none;
        }

        .branding a:hover {
            text-decoration: underline;
        }

        .axioms {
            font-style: italic;
            margin-top: 15px;
            color: #aaa;
        }

        .version {
            margin-top: 10px;
            font-size: 0.9em;
            color: #bbb;
        }
    </style>
</head>
<body>

    <header>
        <h1>[Topic of Study]</h1>
    </header>

    <div class="container">
        <!-- Table of Contents -->
        <div class="toc">
            <h3>Table of Contents</h3>
            <ul>
                <li><a href="#importance-of-studying">Example Study: The Importance of Studying</a></li>
            </ul>
        </div>

        <!-- Example Study Section -->
        <div class="section" id="importance-of-studying">
            <h2>Example Study: The Importance of Studying</h2>
            <div class="point" onclick="toggleContent(this)">
                <strong>Point 1:</strong> Why study the Bible? (Click to expand)
                <div class="content">
                    <div class="scripture">
                        <strong>Scripture:</strong> 2 Timothy 2:15 - "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth."
                    </div>
                    <div class="discussion">
                        <strong>Discussion:</strong> This verse highlights the importance of diligent study of the scriptures to understand God's will and to accurately teach and apply His word.
                    </div>
                    <div class="considerations">
                        <strong>Considerations:</strong> Studying the Bible helps us grow in faith, understand God's plan, and effectively share the Gospel with others.
                    </div>
                    <div class="conclusion">
                        <strong>Conclusion:</strong> Regular Bible study is crucial for spiritual growth and fulfilling our purpose as Christians.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <div class="branding">
            The Writer Company, Trinidad and Tobago<br>
            <a href="https://thewriterco.com">thewriterco.com</a> |
            <a href="https://thewriterco.com/reasoning">thewriterco.com/reasoning</a> |
            <a href="https://thewriterco.com/ai">thewriterco.com/ai</a>
        </div>
        <div class="axioms">
            <p>Axiom 1: Existence of God - We affirm the existence of God.</p>
            <p>Axiom 2: KJV Bible as Truth - The King James Version (KJV) Bible is the complete and authoritative Word of God.</p>
            <p>Axiom 3: Jesus Christ as Truth - Jesus Christ is the Truth, as revealed in the KJV Bible.</p>
        </div>
        <div class="version">
            <p><strong>Template Version:</strong> 1.0.0</p>
            <p><strong>Date Created:</strong> [Insert Date Here]</p>
        </div>
    </footer>

    <script>
        // Expand/collapse study points
        function toggleContent(element) {
            const content = element.querySelector(".content");
            content.style.display = content.style.display === "block" ? "none" : "block";
        }
    </script>

</body>
</html>
`;
