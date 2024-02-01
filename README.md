<h1 align="center">Hi 👋, I'm Nam Pham</h1>
<h3 align="center">A passionate frontend developer from Vietnam</h3>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="welcome-to-mernbloger">Welcome to MERNBLOGER</h1>
<p>Hi! I’m your first Markdown file in <strong>MERN BLOGGER</strong>.  <strong>MERN BLOGGER</strong> is a website that let you blog dynamicly with its editor. You can create content and display your ideas here.</p>
<h1 id="user-stories-front-end">User Stories (Front End)</h1>
<p>Lets walk you through on what you can do with our blogger!</p>
<h2 id="account">Account</h2>
<h3 id="create-account">Create account</h3>
<p>Despite that you can access all of our blogs already, why creating an account for. Having an account will let you manage your preference better, allowing you to contribute more to the conversation with like, comment and reply features, and even posting blog  yourself. Your account will be manage through our database, or if you choose “Continue with Google”, your account will be authorised through Google’s BaaS: Firebase.</p>
<h3 id="log-in-log-out">Log-in Log-out</h3>
<p>Users can log in with registered infomation and user’s session will be authorised with JWT generated acces token for the duration of 24 hours. Logging out will nullify the access token.</p>
<h3 id="change-account-profile-infomation">Change account profile infomation</h3>
<p>User can change username, avatar, biography, and social links to other platform<br>
Changing password is also possible</p>
<h2 id="blogs">Blogs</h2>
<h3 id="fetch-blogs">Fetch blogs</h3>
<p>User will get a number of blogs display on the screen, to access more user can use <strong>“Load more”</strong> button if shown.</p>
<h3 id="post-blogs">Post Blogs</h3>
<p>Using intergrated EditorJs library,  user can create dynamic content not only with Text but also with <strong>Image</strong>, <strong>List</strong>, <strong>Heading</strong> and <strong>Quote</strong>.</p>
<p>If the user is satisfy with the content, then the blog could be set for <strong>publishing</strong> with Description and Tags or if the user is not satisfied, the blog content  could be saved as <strong>draft</strong> for further adjustment.</p>
<h3 id="edit-blogs">Edit Blogs</h3>
<p>Published blog when clicked into the edit button will put blog into the editor and blog content would be modifiable.</p>
<h3 id="recommened-blog">Recommened blog</h3>
<p>Using the <strong>Tag</strong> system, fetching similar blog that could be of interest for User.</p>
<h3 id="blog-stat">Blog stat</h3>
<p>Each time a user click on a link to a blog page, read will increase by one.</p>
<p>User can access their own <strong>blog’s stat</strong> through the blog managing page. Stats include: <strong>Likes, Comments, Reads.</strong></p>
<h2 id="blog-interaction">Blog Interaction</h2>
<h3 id="like-blogs">Like blogs</h3>
<p>User can <strong>like</strong> blog and increase the number of likes the blog has. As normal Social App, user can only like a blog once.<br>
User can acces their own liked blogs. User can also <strong>unlike</strong> a blog by clicking the like button again after liking</p>
<h3 id="comment-blogs">Comment blogs</h3>
<p>User can leave <strong>coments</strong> on a blog.<br>
User can leave a reply to a comment and can also <strong>reply a reply recursively</strong>. Similar to the comment featuer of Facebook.</p>
<h3 id="share-blog-to-other-social-network.">Share blog to other Social Network.</h3>
<p>User can share blog to other Social network like Twitter, Facebook.</p>
<h2 id="user-interaction">User Interaction</h2>
<h3 id="follow">Follow</h3>
<p>User <strong>can follow other user</strong> and user’s homepage blog will be <strong>fetched according to user’s following.</strong></p>
<p>User <strong>get notify</strong> when get followed by other user. However, user cannot reject follower request as the main purpose of the website is Blogging.</p>
<p>User can access <strong>following user</strong> and <strong>followers</strong> in their dashboard.</p>
<h3 id="notification">Notification</h3>
<p>User get <strong>notification</strong> upon:</p>
<ul>
<li>User blog <strong>got liked</strong> by other user.</li>
<li>User blog <strong>got commented</strong> by other User.</li>
<li>User comment <strong>got replied</strong> by other User.</li>
<li>User <strong>got followed</strong> by other User.</li>
</ul>
<p>User Notification icon will <strong>display red dot</strong> when there are unseen notification.<br>
Upon accessing Notification page, the page will display <strong>unseen and seen</strong> notifications. After reloading, navigating to different page, all unseen notification will be marked as seen.</p>
<h2 id="backend-api-endpoints">Backend API Endpoints</h2>
<h3 id="image-data-to-aws-link">Image data to AWS link</h3>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /get-upload-url
* @description Upload image to AWS service and return link to that image
* @body   
* @access Public  
*/</span>
</code></pre>
<h3 id="authorization">Authorization</h3>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /signup  
* @description Sign up with fullname, email, password 
* @body {fullname, email, passsword}  
* @access Public  
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /signup  
* @description Log in with username and password  
* @body {email, passsword}  
* @access Public  
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /google-auth
* @description Log in with your google credentials
* @body none
* @access Public  
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /change-pasword
* @description Change your account password
* @body {curentPassword, newPasssword}  
* @access Login required
*/</span>
</code></pre>
<h2 id="blog">Blog</h2>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /latest-blogs
* @description Fetch latest blogs
* @body {page}  
* @access Public  
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /latest-blogs-with-auth
* @description Fetch latest blogs when user is signed in
* @body {page}  
* @access Public  
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /all-latest-blogs-count
* @description Count latest blogs
* @body none
* @access Public  
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route GET /trending-blogs
* @description Fetch trending blogs
* @body none
* @access Public   
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /search-blogs
* @description Search for blogs with specific queries
* @body { tag, query, page, author, limit, eliminate_blog }
* @access Public  
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /search-blogs-count
* @description Search for number of blogs with specific queries
* @body { tag, query, author }
* @access Public  
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /get-blog
* @description Get info of a specific blog
* @body { blog_id, draft, mode }
* @access Public  
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /create-blog
* @description Create a blog with specific data
* @body { title, banner, content, des, tags, draft, id }
* @access Sign in required 
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /like-blog
* @description Like a blog with specific data
* @body { _id, isLikedByUser }
* @access Sign in required 
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /isliked-by-user
* @description Check if a blog is liked by a user already or not.
* @body { _id }
* @access Sign in required 
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /user-written-blogs
* @description Fetch blogs that written by a user
* @body { page, draft, query, deletedDocCount }
* @access Sign in required 
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /user-written-blogs-count
* @description Count number blogs that written by a user
* @body { draft, query }
* @access Sign in required 
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /liked-blogs
* @description fetch blogs that liked by a user
* @body { page }
* @access Sign in required 
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /liked-blogs-count
* @description count blogs that liked by a user
* @body none
* @access Sign in required 
*/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /delete-blog
* @description Delete a blog
* @body { blog_id }
* @access Sign in required 
*/</span>
</code></pre>
<h2 id="user">User</h2>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /get-profile
* @description Get user profile
* @body { username }
* @access Public
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /search-users
* @description Search for users
* @body { query }
* @access Public
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /update-profile-img
* @description Update User profile picture
* @body { url }
* @access Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /update-profile
* @description Update User profile infomation
* @body { username, bio, social_links }
* @access Signin Required
**/</span>
</code></pre>
<h2 id="follow-1">Follow</h2>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /check-follow
* @description Check if an User follow another user
* @body {target}
* @access Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /update-follow
* @description Update infomation of a follow relationship
* @body {target, status}
* @access Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /get-followings
* @description Fetch following infomation of a user
* @body {page}
* @access Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /get-followings-count
* @description Count following users of a user
* @body none
* @access Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /get-followers
* @description Fetch followers infomation of a user
* @body {page}
* @access Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /get-followers-count
* @description Count followers of a user
* @body none
* @access Signin Required
**/</span>
</code></pre>
<h2 id="comment">Comment</h2>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /add-comment
* @description Add comment
* @body { _id, comment, blog_author, replying_to, notification_id }
* @access Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /edit-comment
* @description Edit comment
* @body { _id, comment }
* @access Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /get-blog-comments
* @description Get comments of a blog
* @body { blog_id, skip }
* @access Public
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /get-replies
* @description Get replies of a comment
* @body { _id, skip }
* @access Public
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /delete-comment
* @description Delete a comment
* @body { _id }
* @access  Signin Required
**/</span>
</code></pre>
<h2 id="notification-1">Notification</h2>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /new-notification
* @description Check if user have new  notification
* @body none
* @access  Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /notifications
* @description Fetch notifications of an user
* @body { page, filter, deletedDocCount }
* @access  Signin Required
**/</span>
</code></pre>
<pre class=" language-javascript"><code class="prism  language-javascript"><span class="token comment">/**  
* @route POST /all-notifications-count
* @description Count notifications of an user
* @body { filter }
* @access  Signin Required
**/</span>
</code></pre>
</div>

- 🌱 I’m currently learning **Java and OOP**

- 👨‍💻 All of my projects are available at [https://github.com/Riatstars](https://github.com/Riatstars)

- 📫 How to reach me **riatstars@gmail.com**

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://firebase.google.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.java.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://www.microsoft.com/en-us/sql-server" target="_blank" rel="noreferrer"> <img src="https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" alt="mssql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>
