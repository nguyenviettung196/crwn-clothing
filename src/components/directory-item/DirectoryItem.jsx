import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundImage, Body, DirectoryItemContainer } from './DirectoryItem.styles';

export default function DirectoryItem({ category }) {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => {
    navigate(route);
  };
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage
        imageUrl={imageUrl}
      />
      <Body>
        <h2>{title}</h2>
        <p>shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
}
