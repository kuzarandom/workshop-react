import React, { useEffect, useRef, useState } from "react"
import "./App.css"
import Container from "@mui/material/Container"
import { Stack, Paper, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import LockIcon from "@mui/icons-material/Lock"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import styles from './/style.module.css'

type ItemType = {
  lang: "TH" | "EN"
  word: string
  lock?: boolean
}

const Item = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.2)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#1A2027",
  width: 400,
  height: 600,
  borderRadius: '16px',
  boxShadow: '0px 4px 30px rgba(0,0,0,0.1)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)'
}))


const CardListItem = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.4)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: '16px',
  boxShadow: '0px 4px 30px rgba(0,0,0,0.1)',
  backdropFilter: 'blur(5px)',
  marginBottom: '8px',
  fontSize: 16,
  border: '1px solid rgba(255, 255, 255, 0.7)',
  cursor: 'pointer',
  transition: 'all 0.05s',
  ':hover': {
    background: "rgba(255, 255, 255, 0.8)",
  }
}))

const CardListHeader = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 1)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: '16px',
  boxShadow: '0px 4px 30px rgba(0,0,0,0.1)',
  backdropFilter: 'blur(5px)',
  marginBottom: '8px',
  fontSize: 16,

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
    setArraySelected([...arraySelected, data])
  }

  return (
    <div className={styles.container}>
      {/* <Container sx={{ paddingTop: 20 , backgroundColor: 'red' }}> */}
      <Stack direction="row" spacing={10} justifyContent={"center"}>
        <Box width={400}>
          <CardListHeader sx={{ marginBottom: 1, width: "100%" }}>
            คำศัพท์
          </CardListHeader>
          <Item sx={{ marginBottom: 1 }}>
            {arrayAll.map((item, index) => {
              return (
                <CardListItem
                  key={index}
                  onClick={() => fnMoveWord(item)}
                >
                  {item.word}
                </CardListItem>
              )
            })}
          </Item>
        </Box>

        <Box width={400}>
          <CardListHeader sx={{ marginBottom: 1, width: "100%" }}>
            ภาษาไทย
          </CardListHeader>
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
          <CardListHeader sx={{ marginBottom: 1, width: "100%" }}>
            ภาษาอังกฤษ
          </CardListHeader>
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
      {/* </Container> */}
    </div>
  )
}

export default App

const BlockItem = React.memo(({ item, setArraySelect, setArrayAll }: any) => {
  const [countdown, setCountdown] = useState(5)
  const countDownRef = useRef<any>(null)
  const [lock, setLock] = useState(false);
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
    setLock(!lock)
    // setArraySelect((prev: any) => {
    //   return prev.map((data: any) => {
    //     if (item.word === data.word) {
    //       return { ...data, lock: !item.lock }
    //     } else {
    //       return data
    //     }
    //   })
    // })
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
    <CardListItem onClick={() => {
      if (lock !== true) {
        fnReturnData()
      }
    }} sx={{ position: 'relative' }}>
      {item.word} {`  ${countdown} s`}
      {
        lock ? (
          <LockIcon
            sx={{
              position: "absolute",
              right: 20
            }}
            fontSize="small"
            onClick={(event) => fnToggleLock(event, lock)}
          />
        ) : (
          <LockOpenIcon
            sx={{
              position: "absolute",
              right: 20
            }}
            fontSize="small"
            onClick={(event) => fnToggleLock(event, lock)}
          />
        )
      }
    </CardListItem>
  )
})
