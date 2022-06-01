// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const searchTerm = req.query.q;

  const redditPromise = fetch(
    `https://www.reddit.com/search.json?q=${searchTerm}`
  )
    .then((response) => response.json())
    .then((data) => data.data.children);

  const youtubePromise = fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchTerm}&type=video&key=${process.env.YOUTUBE_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data.items);

  const [redditResults, youtubeResults] = await Promise.all([
    redditPromise,
    youtubePromise,
  ]);

  res.status(200).json({ redditResults, youtubeResults });
}
