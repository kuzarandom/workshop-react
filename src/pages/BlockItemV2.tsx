import React, { useEffect, useRef, useState } from "react";
import LockIcon from "@mui/icons-material/Lock"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import { Stack, Paper, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import styles from './styles.module.css'

export const CardListItemProgress = styled(Box)(({ theme }) => ({
    background: "rgba(255, 255, 255, 0.4)",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: '16px',
    boxShadow: '0px 4px 30px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(5px)',
    marginBottom: '8px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    userSelect: 'none',
    fontSize: 16,
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    transition: 'all 0.05s',
    ':hover': {
        background: "rgba(255, 255, 255, 0.8)",
    }
}))

const BlockItemV2 = ({ item, setArraySelect, setArrayAll }: any) => {
    const countDownRef = useRef<any>(null)
    const [lock, setLock] = useState(false);

    const fnCountdown = () => {
        countDownRef.current = setTimeout((data) => {
            fnReturnData()
        }, 5000)
    }

    const fnToggleLock = (event: any, lock: boolean) => {
        event.stopPropagation()
        if (!lock) {
            clearInterval(countDownRef.current)
        } else {
            fnCountdown()
        }
        setLock(!lock)
    }

    const fnReturnData = () => {
        setArrayAll((prev: any) => [...prev, item])
        setArraySelect((prev: any) => prev.filter((data: any) => data.word !== item.word))
    }

    useEffect(() => {
        fnCountdown()
        
        return () => {
            clearInterval(countDownRef.current)
        }
    }, [])

    return (
        <CardListItemProgress onClick={() => {
            if (lock !== true) {
                fnReturnData()
            }
        }} sx={{ position: 'relative' }}>
            {item.word}
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
        </CardListItemProgress>
    )
}

export default BlockItemV2