import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

import ImageZoom from '../../components/ImageZoom';

import * as S from './styles';

export default function Home(){
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [])

    return(
        <S.Container>
            <S.Title>Component Zoom with Gesture Handler</S.Title>
            {loading ? <ActivityIndicator size={'large'} /> : <S.Zoom source={{uri: 'https://media.idownloadblog.com/wp-content/uploads/2022/03/iPad-peek-performance-Apple-event-wallpaper.png'}} />}
        </S.Container>
    )
}