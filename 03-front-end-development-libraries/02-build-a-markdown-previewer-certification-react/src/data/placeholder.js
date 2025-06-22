import logo from "../assets/img/my-logo.png";

const placeholder = `# Hello from the React Markdown Playground!

## A spicier sub-heading appears...
### Here's some markdown magic in action:

Inline code? Easy: \`<div>Hello World</div>\`

\`\`\`javascript
// Here's a spicy code snippet:

function revealSecret(firstLine, lastLine) {
  if (firstLine === "\`\`\`" && lastLine === "\`\`\`") {
    return "✨ You found the hidden treasure!";
  }
}
\`\`\`

You can style things like **bold** to shout,  
_or italics_ for that quiet drama,  
or get fancy with **_bold italics_**,  
and even ~~strike out old ideas~~.

Need a link? Click here: [jeffamazed](https://github.com/jeffamazed)  
> Markdown wisdom goes here — blockquote style.

Tables? Yup, we got those too:

Feature | Coolness | Notes  
--------|----------|------  
Tables | Very 😎 | Markdown rocks  
Editable | Absolutely | Type away!  
Responsive | Why not? | You deserve it.

- Bulleted lists?
  - Of course.
    - With tiers.
      - And layers.
        - Like an onion.

1. Or numbered lists...
1. With identical numbers (Markdown don't care).
1. Because it auto-corrects. Magic.

Lastly, behold! Project made by:

![jeffamazed logo](${logo})
`;

export default placeholder;
