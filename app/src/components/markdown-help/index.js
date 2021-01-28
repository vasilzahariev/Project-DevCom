import styles from './index.module.css';

const MarkdownHelp = () => {
    return (
        <div className={styles.container}>
            <h3>Italic and Bold</h3>
            <p><i>Italic: </i>*example* or _example_ (don't use double underscore in the middle of a word)</p>
            <p><b>Bold: </b>**example** or __example__ (don't use double underscore in the middle of a word)</p>
            <p><i><b>Bold and Italic: </b>***example*** or ___example___ (don't use double underscore in the middle of a word)</i></p>

            <h3>Headings</h3>
            <p><h1 className={styles.inline}>Headling level 1: </h1> # example (don't put the text next to #)</p>
            <p><h2 className={styles.inline}>Headling level 2: </h2> ## example (don't put the text next to #)</p>
            <p><h3 className={styles.inline}>Headling level 3: </h3> ### example (don't put the text next to #)</p>
            <p><h4 className={styles.inline}>Headling level 4: </h4> #### example (don't put the text next to #)</p>
            <p><h5 className={styles.inline}>Headling level 5: </h5> ##### example (don't put the text next to #)</p>
            <p><h6 className={styles.inline}>Headling level 6: </h6> ###### example (don't put the text next to #)</p>

            <h3>Paragraphs and Line Breaks</h3>
            <p>To create paragraphs, use a blank line to separate one or more lines of text (unless the paragraph is in a list, don’t indent paragraphs with spaces or tabs)</p>
            <p>To create a line break (&lt;br&gt;), end a line with two or more spaces, and then type return </p>

            <h3>Blockquotes</h3>
            <p>To create a blockquote, add a &gt; in front of a paragraph.</p>
            <p>Blockquotes can be nested. Add a &gt;&gt; in front of the paragraph you want to nest.</p>
            <p>Blockquotes can contain other Markdown formatted elements. Not all elements can be used — you’ll need to experiment to see which ones work.</p>

            <h3>Lists</h3>
            <p>Ordered Lists: To create an ordered list, add line items with numbers followed by periods. The numbers don’t have to be in numerical order, but the list should start with the number one.</p>
            <p>Unordered Lists: To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items. Indent one or more items to create a nested list.</p>

            <h3>Code</h3>
            <p>To denote a word or phrase as code, enclose it in backticks (`)</p>
            <p>Escaping Backticks: If the word or phrase you want to denote as code includes one or more backticks, you can escape it by enclosing the word or phrase in double backticks (``)</p>
            <p>Code Blocks: To create code blocks, indent every line of the block by at least four spaces or one tab</p>

            <h3>Horizontal Rules</h3>
            <p>To create a horizontal rule, use three or more asterisks (***), dashes (---), or underscores (___) on a line by themselves (put blank lines before and after horizontal rules)</p>

            <h3>Links</h3>
            <p>[Link Text](link) - <i>Example: [Duck Duck Go](https://duckduckgo.com)</i></p>
            <p>You can optionally add a title for a link. This will appear as a tooltip when the user hovers over the link. To add a title, enclose it in parentheses after the URL - <i>Example: [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy")</i></p>
            <p>URLs and Email Addresses: To quickly turn a URL or email address into a link, enclose it in angle brackets</p>
            <p>Encode spaces with 20%</p>

            <h3>Images</h3>
            <p>To add an image, add an exclamation mark (!), followed by alt text in brackets, and the path or URL to the image asset in parentheses. You can optionally add a title after the URL in the parentheses</p>
            <p>![alt text](path/url title)</p>
            <p>Linking images: To add a link to an image, enclose the Markdown for the image in brackets, and then add the link in parentheses</p>
            <p>[![alt text](image_path/image_url title)](link)</p>

            <h3>Escaping Characters</h3>
            <p>To display a literal character that would otherwise be used to format text in a Markdown document, add a backslash (\) in front of the character</p>
        </div>
    );
}

export default MarkdownHelp;
