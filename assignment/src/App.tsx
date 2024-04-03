import React, { useEffect, useState } from "react";
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

  const BlockHeader = styled(Paper)(({ theme }) => ({
    backgroundColor: "white",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#1A2027",
    border: "1px solid #1A2027"
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
  const [arrayAll, setArrayAll] = useState<Item[]>([
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
  ]);
  const [arrayTH, setArrayTH] = useState<Item[]>([]);
  const [arrayEN, setArrayEN] = useState<Item[]>([]);
  const [timeoutArray, setTimeoutArray] = useState<any>([]);
  // const [selected, setSelected] = useState<Item>();

  const debounce = (func:any, timeout = 3000) => {
    let timer:any;
    return (...args:any) => {
      clearTimeout(timer);
      // @ts-ignore: Unreachable code error
      timer = setTimeout(() => { func.apply(this); }, timeout);
    };
  }
  function saveInput(){
    console.log('Saving data');
  }
  const processChange = debounce(() => saveInput());

  // useEffect(
  //   () => {
  //     timeoutArray.push(setTimeout(() => {
  //       if(selected?.lang ==='TH'){
  //         fnReturnTH(selected)
  //       }else if(selected?.lang ==='EN'){
  //         fnReturnEN(selected)
  //       }
  //     }, 2000))
  //     // return () => {
  //     //   timeoutArray.forEach((timeout: string | number | NodeJS.Timeout | undefined) => clearTimeout(timeout));
  //     // };
  //   },
  //   [selected]
  // );

  const fnRemove = (data: Item, index: any) => {
    // setSelected(data);
    setArrayAll(prev => prev.filter((_, i) => i !== index));
    setArrayTH(prev => {
      return [...prev, data].filter((item: Item) => item.lang === "TH");
    });
    setArrayEN(prev => {
      return [...prev, data].filter((item: Item) => item.lang === "EN");
    });

  };

  const fnReturnTH = (data: Item) => {
    setArrayAll(prev => {
      return [...prev, data];
    });
    setArrayTH(prev => prev.filter((item, i) => item.word !== data.word));
  };

  const fnReturnEN = (data: Item) => {
    setArrayAll(prev => {
      return [...prev, data];
    });
    setArrayEN(prev => prev.filter((item, i) => item.word !== data.word));
  };

  const fnClearTimeout = (data:any) => {
    clearTimeout(timeoutArray[data]);
  }

  return (
    <div className="App">
      <Container maxWidth="lg" sx={{ height: "1000px", paddingTop: 20 }}>
        <Stack direction="row" spacing={10} justifyContent={"center"}>
          <Box width={400}>
            <BlockHeader sx={{ marginBottom: 1, width: "100%" }} >
              คำศัพท์
            </BlockHeader>
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
            <BlockHeader sx={{ marginBottom: 1, width: "100%" }}>
              ภาษาไทย
            </BlockHeader>
            <Item sx={{ marginBottom: 1 }}>
              {arrayTH.map((item, index) => {
                return (
                  <BlockContent 
                    key={index} 
                    // onClick={() => fnReturnTH(item)}
                    onClick={()=> fnClearTimeout(item)}
                  >
                    {item.word}
                  </BlockContent>
                );
              })}
            </Item>
          </Box>

          <Box width={400}>
            <BlockHeader sx={{ marginBottom: 1, width: "100%" }}>
              ภาษาอังกฤษ
            </BlockHeader>
            <Item sx={{ marginBottom: 1 }}>
              {arrayEN.map((item, index) => {
                return (
                  <BlockContent key={index} onClick={() => fnReturnEN(item)}>
                    {item.word}
                  </BlockContent>
                );
              })}
            </Item>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
