"use client";

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [currentHero, setCurrentHero] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    setShowContent(true);
    const interval = setInterval(
      () => setCurrentHero((prev) => (prev + 1) % heroSections.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const heroSections = [
    {
      title: "Naruto Series",
      subtitles:
        "You are not alone , just one click make you motivate , happy and sorrow , full of emotions",
      image: "/images/narutoSeries.jpg",
      color: "linear-gradient(135deg, #d6ab6cff 0%, #df590cff 100%)",
      color2: "#ffffff",
    },
    {
      title: "Road To Ninja",
      subtitles: "Explore how a shinobi try the life from zero to hero",
      image: "/images/narutoManga.webp",
      color: "linear-gradient(135deg, #f7f5f9ff 0%, #dbd4e2ff 100%)",
      color2: "#FFA500",
    },
  ];

  return (
    <Box position={"relative"} height={"100vh"} overflow={"hidden"}>
      {heroSections.map((hero, index) => (
        <Fade key={index} in={currentHero === index} timeout={1000}>
          <Box
            position={"absolute"}
            top={0}
            left={0}
            bottom={0}
            right={0}
            sx={{ background: hero.color }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Container maxWidth={isMobile ? "100%" : "50%"}>
              {/* For Two Layout */}
              <Grid
                container
                minHeight={"100vh"}
                spacing={4}
                display={"flex"}
                flexDirection={isMobile ? "column" : "row"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid>
                  <Slide
                    direction="right"
                    in={currentHero === index}
                    timeout={800}
                  >
                    <Box position={"relative"}>
                      <Typography
                        variant={isMobile ? "h6" : "h3"}
                        component={"h1"}
                        sx={{ fontWeight: "bold", color: "orange", mb: 2 }}
                      >
                        {hero.title}
                      </Typography>
                      <Typography
                        variant={isMobile ? "subtitle2" : "subtitle1"}
                        sx={{ color: hero.color2, mb: 2 }}
                      >
                        {hero.subtitles}
                      </Typography>
                      <Box
                        height={isMobile ? 300 : 400}
                        maxWidth={isMobile ? "100%" : "50%"}
                        borderRadius={4}
                        overflow={"hidden"}
                        mt={3}
                      >
                        <Box
                          component={"img"}
                          src={hero.image}
                          sx={{
                            objectFit: "cover",
                            filter: "brightness(0.8)",
                          }}
                          alt={hero.title}
                          width={"100%"}
                          height={"100%"}
                        />
                      </Box>
                    </Box>
                  </Slide>
                </Grid>
                <Grid sx={{ height: "100%" }} position={"relative"}>
                  <Slide
                    direction="left"
                    in={currentHero === index}
                    timeout={800}
                  >
                    <Box
                      height={"100%"}
                      display={"flex"}
                      // flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Link passHref href={"/registerOrLogin"}>
                        <Button
                          variant="contained"
                          size="large"
                          sx={{
                            fontWeight: "bold",
                            borderRadius: 3,
                            backgroundColor: "white",
                            color: "orangered",
                          }}
                        >
                          Continue
                        </Button>
                      </Link>
                    </Box>
                  </Slide>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Fade>
      ))}
    </Box>
  );
}
