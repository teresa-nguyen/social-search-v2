import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import moment from 'moment';
import { Button, Input, Grid, Card, Image, Text, Title } from '@mantine/core';
import Head from 'next/head';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [redditResults, setRedditResults] = useState([]);
  const [youtubeResults, setYoutubeResults] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRedditResults(data.redditResults);
        setYoutubeResults(data.youtubeResults);
      });
  };

  return (
    <div className={styles.App}>
      <Head>
        <title>Social Search</title>
        <meta name='description' content='Social Search' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Title order={1} className={styles.header}>
        The Social Search
      </Title>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          className={styles.input}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button type='submit' color='orange' radius='md'>
          Search
        </Button>
      </form>
      <Title order={2}>Reddit Results</Title>
      <Grid>
        {redditResults.map((redditResult) => {
          return (
            <Grid.Col span={4} key={redditResult.data.id}>
              <Card
                shadow='sm'
                p='xl'
                component='a'
                href={`https://www.reddit.com${redditResult.data.permalink}`}
                target='_blank'
                withBorder='true'
              >
                <Grid style={{ height: 275 }}>
                  <Grid.Col span={12}>
                    <Text
                      component='span'
                      weight={500}
                      style={{ marginRight: 8 }}
                    >
                      {redditResult.data.subreddit_name_prefixed}
                    </Text>
                    <Text
                      component='span'
                      size='xs'
                      color='gray'
                      style={{ marginRight: 8 }}
                    >
                      • posted by {redditResult.data.author}
                    </Text>
                    <Text component='span' size='xs' color='gray'>
                      {moment.unix(redditResult.data.created).fromNow()}
                    </Text>
                  </Grid.Col>
                  <Grid.Col
                    span={redditResult.data.thumbnail !== 'self' ? 8 : 12}
                  >
                    <Text
                      weight={500}
                      size='lg'
                      lineClamp={6}
                      style={{ minHeight: 183 }}
                    >
                      {redditResult.data.title}
                    </Text>
                  </Grid.Col>
                  {redditResult.data.thumbnail !== 'self' && (
                    <Grid.Col span={4}>
                      <Image src={redditResult.data.thumbnail} height={160} />
                    </Grid.Col>
                  )}
                  <Grid.Col span={12} style={{ alignSelf: 'flex-end' }}>
                    <Text
                      component='span'
                      size='sm'
                      style={{ marginRight: 12 }}
                    >
                      {redditResult.data.ups} upvote
                    </Text>
                    <Text
                      component='span'
                      size='sm'
                      style={{ marginRight: 12 }}
                    >
                      {redditResult.data.num_comments} comments
                    </Text>
                    <Text component='span' size='sm'>
                      {redditResult.data.total_awards_received} awards
                    </Text>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
      <Title order={2} style={{ marginTop: 48 }}>
        YouTube Results
      </Title>
      <Grid>
        {youtubeResults.map((youtubeResult) => {
          return (
            <Grid.Col span={4} key={youtubeResult.id.videoId}>
              <Card
                shadow='sm'
                p='xl'
                component='a'
                href={`https://www.youtube.com/watch?v=${youtubeResult.id.videoId}`}
                target='_blank'
                withBorder='true'
              >
                <Grid style={{ height: 275 }}>
                  <Grid.Col span={12}>
                    <Image
                      src={youtubeResult.snippet.thumbnails.medium.url}
                      fit='contain'
                      height={160}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Text
                      weight={500}
                      size='lg'
                      lineClamp={6}
                      style={{ minHeight: 183 }}
                    >
                      {youtubeResult.snippet.title}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
}
