import styled from 'styled-components/native';
import ImageZoom from '../../components/ImageZoom';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #5B4B8A;
`;

export const Title = styled.Text`
    font-size: 18px;
    padding-bottom: 50px;
    color: #FFFFFF;
    font-weight: 700;
`;

export const Zoom = styled(ImageZoom)``;