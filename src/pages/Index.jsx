import React, { useEffect, useState } from "react";
import { Container, Text, VStack, Box, Switch, FormControl, FormLabel, Select } from "@chakra-ui/react";
import Parser from "rss-parser";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL("https://hnrss.org/newest");
      setStories(feed.items);
    };

    fetchStories();
  }, []);

  const filteredStories = stories.filter(story => {
    if (!filter) return true;
    const lowerCaseTitle = story.title.toLowerCase();
    return lowerCaseTitle.includes(filter.toLowerCase());
  });

  return (
    <Container
      centerContent
      maxW="container.md"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg={darkMode ? "gray.800" : "white"}
      color={darkMode ? "white" : "black"}
    >
      <VStack spacing={4} width="100%">
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="dark-mode" mb="0">
              Dark Mode
            </FormLabel>
            <Switch id="dark-mode" isChecked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </FormControl>
          <Select placeholder="Filter by subject" onChange={(e) => setFilter(e.target.value)}>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="psychology">Psychology</option>
          </Select>
        </Box>
        {filteredStories.map((story, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%" bg={darkMode ? "gray.700" : "gray.100"}>
            <Text fontSize="xl" fontWeight="bold">
              <a href={story.link} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
            </Text>
            <Text mt={2}>{story.contentSnippet}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;