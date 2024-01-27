import { matches } from "hast-util-select";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

// Make images wider than the article container
// This applies to images embedded using Markdown syntax `![]()`
// that are standalone (i.e. not surrounded by paragraph text)
const wideImages = {
  selector: (node) => matches("img", node),
  transform: (node, index, parent) => {
    if (parent.tagName !== "p" || parent.children.length > 1) return;

    // Turn the parent <p> into a full-width container <div>
    parent.tagName = "div";
    parent.properties.className ||= [];
    parent.properties.className.push(
      "w-[100vw]",
      "max-w-5xl",
      "ml-[50%]",
      "-translate-x-[50%]",
      "mx-auto",
    );

    // Center the <img> and give it rounded corners
    node.properties.className ||= [];
    node.properties.className.push("mx-auto", "lg:rounded-2xl");
  },
};

// Make code blocks full width
const fullWidthCodeBlocks = {
  selector: (node) => matches("pre.astro-code", node),
  transform: (node) => {
    // Make the <pre> full width
    node.properties.className.push(
      "w-[100vw]",
      "ml-[50%]",
      "-translate-x-[50%]",
      "rounded-none",
      "dark:contrast-[1.15]",
      "dark:brightness-90",
    );

    // Wrap the inner <code> with a container div
    node.children = [
      h("div", { className: ["max-w-2xl", "mx-auto"] }, node.children),
    ];
  },
};

const transforms = [wideImages, fullWidthCodeBlocks];

export default function styleMarkdownElements() {
  return (tree) => {
    let matchingTransform;

    const findMatchingSelector = (node) => {
      const found = transforms.find((obj) => obj.selector(node));
      if (found) matchingTransform = found.transform;
      return !!found;
    };

    const runMatchingTransform = (node, index, parent) => {
      matchingTransform(node, index, parent);
    };

    visit(tree, findMatchingSelector, runMatchingTransform);
  };
}
