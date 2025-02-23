import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

// Custom plugin to add classes to HTML elements
function addClasses() {
    return (tree: any) => {
        visit(tree, (node) => {
            if (!node.properties) return;

            // Add classes based on node type
            switch (node.tagName) {
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    node.properties.className = [`heading-${node.tagName}`];
                    break;
                case 'ul':
                    node.properties.className = ['unordered-list'];
                    break;
                case 'ol':
                    node.properties.className = ['ordered-list'];
                    break;
                case 'li':
                    node.properties.className = ['list-item'];
                    break;
                case 'blockquote':
                    node.properties.className = ['blockquote'];
                    break;
                case 'pre':
                    if (node.children[0]?.properties?.className) {
                        const language = node.children[0].properties.className[0];
                        node.properties.className = ['code-block', language];
                    }
                    break;
            }
        });
    };
}

export async function markdownToHtml(markdown: string) {
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, {
            allowDangerousHtml: true
        })
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(addClasses)
        .use(rehypeStringify, {
            allowDangerousHtml: true
        })
        .process(markdown);

    return result.toString();
}