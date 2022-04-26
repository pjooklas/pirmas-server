import { file } from "../lib/file.js";
import { utils } from "../lib/utils.js";
import { PageTemplate } from "../lib/PageTemplate.js";

class PageBlogPost extends PageTemplate {
    /**
     * Sabloninio puslapio konstruktorius.
     * @constructor
     * @param {object} data Duomenu objektas
     */
    constructor(data) {
        super(data);
        this.pageCSSfileName = 'blog-post';
    }

    async getPostData() {
        const postas = await file.read('blog', this.data.trimmedPath.split('/')[1] + '.json');
        const blogPostas = utils.parseJSONtoObject(postas[1]);
        const author = await file.read('accounts', blogPostas.author + '.json');
        const authorName = utils.parseJSONtoObject(author[1]);
        blogPostas.name = authorName.username;
        return blogPostas;
    }

    isValidPost() {
        //ar ne tusti stringai, ar file readai ir parsai gerai irase
        return true;
    }

    badPostHTML() {
        return `<section class="container blog-inner">
                    <h1 class="row title">500</h1>
                    <p class="row">Something's wrong with server. Please, come back later.</p>
                </section>`;
    }

    correctPostHTML(post) {
        return `<section class="container blog-inner">
                    <h1 class="row title">${post.title}</h1>
                    <p class="row">${post.content}</p>
                    <footer class="row">${post.name}</footer>
                </section>`;
    }

    async mainHTML() {
        const postData = await this.getPostData();
        if (this.isValidPost(postData)) {
            return this.correctPostHTML(postData);
        } else {
            return this.badPostHTML();
        }
    }
}

export { PageBlogPost };