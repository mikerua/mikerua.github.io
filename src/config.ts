export const SITE = {
  website: "https://mikerua.github.io/", // replace this with your deployed domain
  author: "Michael McDonagh",
  profile: "https://mikerua.github.io/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Naming is Hard",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    url: "https://github.com/mikerua/mikerua.github.io/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
} as const;
