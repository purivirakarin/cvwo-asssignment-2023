# CVWO 2023 Web Forum - [CVForum](https://cvwo-asssignment-2023-ikjxdl5tq-purivirakarin.vercel.app/)

| Name                 | Matriculation number |
| -------------------- | -------------------- |
| Puri Virakarin       | A0266314H            |

## Timeline

December <br/>
Learn: JS, TS, React.js, GO, mantine, tailwind

January <br/>
Working: on the project

## Technology

- [React.js](https://reactjs.org/) + [TailwindCSS](https://tailwindcss.com/)
- [Go](https://www.golangprograms.com) + [GORM](https://gorm.io)
- [MySQL](https://www.mysql.com) + [PlanetScale](https://planetscale.com)

## Execution Plan

#### Early December

- Learn HTML + CSS
- Learn JavaScript + TypeScript
- Learn React App
- Learn Relational Database
- Take crash courses on building simple websites
- Learn react tools (hooks, prebuilt components)
- Learn TailwindCSS

#### Late December

- Learn basic of REST API
- Learn Golang
- Build more template web apps (follow the online tutorials and crash courses)

#### Early January

- Start building API with Go
- Learn more techniques in Go app
- Build a template frontend to interact with the backend

#### Late January

- Start building frontend version 2 (clientv2)
- Learn more on TailwindCSS
- Hosting
- Integrate PlanetScale database to the project

## User Manual

### App Navigation

#### Navigation Bar

The navigation bar consists of HomePage, My Post, Crate new post, and Log Out buttons (with the current username on the left of the Log Out button) when the user has already signed in. On the contrary, there are only HomePage and Log In buttons.

#### [Home Page](https://cvwo-asssignment-2023.vercel.app/)

The HomePage shows all the posts in the forum and includes the dropdown filter feature to display only the specific category.

### User Authentication

#### [New User](https://cvwo-asssignment-2023.vercel.app/register)

- Sign up by clicking the login button at the top-right corner in the navigation bar. Afterward, click "here" in Don't have an account? Register here. Then, fill in the desired username and password and click the register button for confirmation.
- After the registration, the website will redirect to the Login page.

#### [Log in to the existing User](https://cvwo-asssignment-2023.vercel.app/login)

- Login by clicking the login button at the top-right corner in the navigation bar. Then, fill up the username and password and click "Log In" for the confirmation.
- After the login process, the website will redirect to the HomePage.

#### Log out from the current user

Click on the “Log Out” button at the top-right corner of the navigation bar.

### Managing Posts

#### Read a Post

- Posts by all users can be accessed from the homepage by clicking the "CVForum" button at the top-left corner of the navigation bar.
- Posts by the logged user can be accessed from the MyPost page by clicking "My Post" in the navigation bar at the top of the website.
- Posts' descriptions listed on HomePage and MyPost pages are shorter. To view the full version, click on the post's card, and you will be navigated to the page for an individual post.

#### Posting, editing, deleting a Post

- To create a new post, click "Create new post" on the navigation bar, and you will be directed to the create post page. Afterward, fill in the post's title and description, and select the tag of the post. Then, check the correctness of the post before clicking on the post button for confirmation. However, if the user intends to abandon the post, they can click on the cancel button and will be directed to the MyPost page.
- To edit a post, in the individual post page "/singlepost/:id," if the user is the owner of the post, they can click the "Edit Post" button on the top right corner of the post and will be directed to the Edit Post page. Then, kindly edit the post title and description and select the new desired category. Then, click the "Edit" button for confirmation; then, you will be directed to the My Post page.
- To delete a post, in the individual post page "/singlepost/:id," if the user is the owner of the post, they can click the "Edit Post" button on the top right corner of the post and will be directed to the Edit Post page. Then, click on the "Delete" button, and will be directed to the My Post page.

### Managing Comments

#### Read the comment of a post

Click on the post to be read in order to go to the individual post page. Then, all the comments on the post will be shown at the bottom of the post.

#### Posting, editing, deleting a post

- To create a new comment, go to the individual post page, and the comment box to be written is in between the bottom of the post description and comments that have been already written. The user has to fill in the comment and click the "Post" button for confirmation.
- To edit a comment, go to the individual post page, and click the "Edit" button on the bottom right corner of the comment to be edited. Then, fill in the new comment in the text area shown. Afterward, click the "Done" button for confirmation.
- To delete a comment, o to the individual post page and click the "Edit" button on the bottom right corner of the comment to be deleted. Then, click on the "Delete" button for confirmation.

### Filtering Posts

#### Filtering the posts by all users

Go to the Homepage by clicking the "CVForum" button on the top-left corner. Then Click the dropdown list after "Category"; then select the desired category of posts to be shown in the feed.

#### Filtering the posts by the current user

Go to the My Post page by clicking the "My Post" button on the navigation bar. Then Click the dropdown list after "Category"; then select the desired category of posts to be shown in the feed.
