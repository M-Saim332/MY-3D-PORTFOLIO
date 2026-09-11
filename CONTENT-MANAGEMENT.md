# Portfolio content dashboard

This project includes a Sanity Studio dashboard in the `studio` folder. Only users invited to the Sanity project can add, edit, publish, or delete content. Portfolio visitors can read published content but cannot open the dashboard or change anything.

## One-time connection

1. Create or sign in to your Sanity account at https://www.sanity.io/manage.
2. Create a project named `Muhammad Saim Portfolio` with the `production` dataset.
3. Copy the project ID shown by Sanity.
4. Copy `studio/.env.example` to `studio/.env` and replace `your_project_id` with that ID.
5. Copy `.env.example` to `.env.local` and place the same project ID there.
6. In the project folder, run `cd studio`, then `npm install`, followed by `npm run dev`.
7. Open the local Studio URL shown in the terminal and sign in. Create one **Profile & links** document, then publish it.

After the first setup, run `npm run studio` from the main project folder whenever you want to manage the portfolio.

## What you can manage

- **Profile & links:** name, About text, headline, email, GitHub, LinkedIn, LeetCode, location, domain, and both profile photographs.
- **Projects:** add, edit, delete, reorder, upload an image, set a technology stack, and add live/source links.
- **Certificates:** add, edit, delete, reorder, upload the certificate image, and add its verification link.

Press **Publish** after editing. The public portfolio reads published content automatically. Until Sanity is connected, the site uses the sample content in `src/data.js`, so development and Vercel builds continue to work.

## Deploying the private dashboard

From the `studio` folder, run `npm run deploy`. Sanity will ask you to choose a Studio hostname. Bookmark the resulting `*.sanity.studio` address. The address can be public, but editing still requires your Sanity login and project permission.

Never commit `.env`, `.env.local`, login credentials, or write tokens to GitHub.
