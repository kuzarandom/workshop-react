import React, { useState } from "react";
import "./App.css";
import Container from "@mui/material/Container";
import { Stack, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

type Item = {
  lang: "TH" | "EN";
  word: string;
};

function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1A2027",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    width: 400,
    height: 800
  }));

  const BlockContent = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#1A2027",
    border: "1px solid #1A2027",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#1A2027",
      color: "white"
    }
  }));

  const array: Item[] = [
    {
      lang: "TH",
      word: "ควาย"
    },
    {
      lang: "EN",
      word: "Buffalo"
    },
    {
      lang: "TH",
      word: "ปลาทอง"
    },
    {
      lang: "EN",
      word: "Goldfish"
    },
    {
      lang: "TH",
      word: "ม้า"
    },
    {
      lang: "EN",
      word: "Horse"
    },
    {
      lang: "TH",
      word: "กระต่าย"
    },
    {
      lang: "EN",
      word: "Rabbit"
    },
    {
      lang: "TH",
      word: "แกะ"
    },
    {
      lang: "EN",
      word: "Sheep"
    }
  ];
  const [arrayAll, setArrayAll] = useState<Item[]>(array);
  const [arrayTH, setArrayTH] = useState();
  const [arrayEN, setArrayEN] = useState();

  const fnRemove = (data: Item, index: any) => {
    arrayAll.splice(index, 1);
    setArrayAll(arrayAll)
    console.log(data.word, index);
    console.log(array);
  };

  return (
    <div className="App">
      <Container maxWidth="lg" sx={{ height: "1000px", paddingTop: 20 }}>
        <Stack direction="row" spacing={10} justifyContent={"center"}>
          <Box width={400}>
            <BlockContent sx={{ marginBottom: 1, width: "100%" }}>
              คำศัพท์
            </BlockContent>
            <Item sx={{ marginBottom: 1 }}>
              {arrayAll.map((item, index) => {
                return (
                  <BlockContent
                    key={index}
                    onClick={() => fnRemove(item, index)}
                  >
                    {item.word}
                  </BlockContent>
                );
              })}
            </Item>
          </Box>

          <Box width={400}>
            <BlockContent sx={{ marginBottom: 1, width: "100%" }}>
              ภาษาไทย
            </BlockContent>
            <Item>
              {/* <BlockContent>คำศัพท์</BlockContent> */}
            </Item>
          </Box>

          <Box width={400}>
            <BlockContent sx={{ marginBottom: 1, width: "100%" }}>
              ภาษาอังกฤษ
            </BlockContent>
            <Item>
              {/* <BlockContent>คำศัพท์</BlockContent> */}
            </Item>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
