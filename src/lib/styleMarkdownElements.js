import { matches } from "hast-util-select";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

const wideImageClassNames = [
  "w-[100vw]",
  "ml-[50%]",
  "-translate-x-[50%]",
  "max-w-5xl",
  "mx-auto",
  "lg:rounded-xl",
];

const transforms = [
  // Make images wider than the article container
  // This applies to images embedded using Markdown syntax `![]()`
  {
    selector: (node) => matches("img", node),
    transform: (node) => {
      // Make the <img> wide
      node.properties.className ||= [];
      node.properties.className.push(...wideImageClassNames);
    },
  },

  // Make <img> tags wider than the article container
  // This applies to <img> tags written into the Markdown
  {
    // HTML written in MDX counts as a "mdxJsxFlowElement" rather than a regular "element"
    // Otherwise we'd be able to use "matches" from "hast-util-select" for this selector
    selector: (node) => (node.type == "mdxJsxFlowElement" && node.name == "img"),
    transform: (node) => {
      let classAttr = node.attributes.find(attr => attr.name == "class");
      if (classAttr == undefined) {
        classAttr = {
          type: "mdxJsxAttribute",
          name: "class",
          value: "",
        }
        node.attributes.push(classAttr);
      }

      if (classAttr.value) classAttr.value += " "
      classAttr.value += wideImageClassNames.join(" ");
    },
  },

  // Make code blocks full width
  {
    selector: (node) => matches("pre.astro-code", node),
    transform: (node) => {
      // Make the <pre> full width
      node.properties.className.push(
        "w-[100vw]",
        "ml-[50%]",
        "-translate-x-[50%]",
        "rounded-none"
      );

      // Wrap the inner <code> with a container div
      node.children = [
        h("div", { className: ["max-w-2xl", "mx-auto"] }, node.children)
      ];
    },
  },
];

export default function styleMarkdownElements() {
  return (tree) => {
    let matchingTransform;

    const findMatchingSelector = (node) => {
      const found = transforms.find(obj => obj.selector(node))
      if (found) matchingTransform = found.transform
      return !!found;
    };

    const runMatchingTransform = (node) => {
      matchingTransform(node);
    }

    visit(tree, findMatchingSelector, runMatchingTransform);
  }
}
