import React, { useEffect, useRef, useState } from "react"
import "./App.css"
import Container from "@mui/material/Container"
import { Stack, Paper, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import LockIcon from "@mui/icons-material/Lock"
import LockOpenIcon from "@mui/icons-material/LockOpen"

type ItemType = {
  lang: "TH" | "EN"
  word: string
  lock?: boolean
}

const BlockItemList = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#1A2027",
  border: "1px solid #1A2027",
  cursor: "pointer",
  userSelect: "none",
  ":hover": {
    backgroundColor: "#1A2027",
    color: "white"
  }
}))

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  width: 400,
  height: 600
}))

const BlockHeader = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#1A2027",
  border: "1px solid #1A2027"
}))

function App() {

  const [arrayAll, setArrayAll] = useState<ItemType[]>([
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
  ])

  const [arraySelected, setArraySelected] = useState<ItemType[]>([]);

  const fnMoveWord = (data: ItemType) => {
    setArrayAll((prev) => prev.filter((item, i) => item.word !== data.word))
    setArraySelected([...arraySelected, {
      ...data,
      lock: false
    }])
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ height: "1000px", paddingTop: 20 }}>
        <Stack direction="row" spacing={10} justifyContent={"center"}>
          <Box width={400}>
            <BlockHeader sx={{ marginBottom: 1, width: "100%" }}>
              คำศัพท์
            </BlockHeader>
            <Item sx={{ marginBottom: 1 }}>
              {arrayAll.map((item, index) => {
                return (
                  <BlockItemList
                    key={index}
                    onClick={() => fnMoveWord(item)}
                  >
                    {item.word}
                  </BlockItemList>
                )
              })}
            </Item>
          </Box>

          <Box width={400}>
            <BlockHeader sx={{ marginBottom: 1, width: "100%" }}>
              ภาษาไทย
            </BlockHeader>
            <Item sx={{ marginBottom: 1 }}>
              {arraySelected.filter(item => item.lang === "TH").map((item, index) => {
                return (
                  <BlockItem
                    key={item.word}
                    index={index}
                    item={item}
                    setArrayAll={setArrayAll}
                    setArraySelect={setArraySelected}
                  />
                )
              })}
            </Item>
          </Box>

          <Box width={400}>
            <BlockHeader sx={{ marginBottom: 1, width: "100%" }}>
              ภาษาอังกฤษ
            </BlockHeader>
            <Item sx={{ marginBottom: 1 }}>
              {arraySelected.filter(item => item.lang === "EN").map((item, index) => {
                return (
                  <BlockItem
                    key={item.word}
                    index={index}
                    item={item}
                    setArrayAll={setArrayAll}
                    setArraySelect={setArraySelected}
                  />
                )
              })}
            </Item>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default App

const BlockItem = React.memo(({ item, setArraySelect, setArrayAll }: any) => {
  const [countdown, setCountdown] = useState(5)
  const countDownRef = useRef<any>(null)

  const fnCountdown = () => {
    let count = 5
    countDownRef.current = setInterval(() => {
      setCountdown(count)
      count--
      if (count < 0) {
        clearInterval(countDownRef.current)
        setArrayAll((prev: any) => [...prev, item])
        setArraySelect((prev: any) => prev.filter((data: any) => data.word !== item.word))
      }

    }, 1000)
  }

  const CallbackCountdown = React.useCallback(() => {
    fnCountdown()
  }, [])

  const fnToggleLock = (event: any, lock: boolean) => {
    event.stopPropagation()
    if (!lock) {
      clearInterval(countDownRef.current)
    } else {
      CallbackCountdown()
    }
    setArraySelect((prev: any) => {
      return prev.map((data: any) => {
        if (item.word === data.word) {
          return { ...data, lock: !item.lock }
        } else {
          return data
        }
      })
    })
  }

  const fnReturnData = () => {
    clearInterval(countDownRef.current)
    setArrayAll((prev: any) => [...prev, item])
    setArraySelect((prev: any) => prev.filter((data: any) => data.word !== item.word))
  }

  useEffect(() => {
    CallbackCountdown()
  }, [])

  return (
    <BlockItemList onClick={fnReturnData} sx={{ position: 'relative' }}>
      {item.word} {`  ${countdown} s`}
      {
        item.lock ? (
          <LockIcon
            sx={{
              position: "absolute",
              right: 20
            }}
            fontSize="small"
            onClick={(event) => fnToggleLock(event, item.lock)}
          />
        ) : (
          <LockOpenIcon
            sx={{
              position: "absolute",
              right: 20
            }}
            fontSize="small"
            onClick={(event) => fnToggleLock(event, item.lock)}
          />
        )
      }
    </BlockItemList>
  )
})
