//changed file
import { Flex } from '@rebass/grid';
import Paragraph from 'shared-components/Typography/Paragraph';
import PropTypes from 'prop-types';
import React from 'react';
import { StyledBox, StyledCategoryShows, TextWrapper } from './styled';
import { Row, Column } from '../../../../shared-components/Grid';
import { ellipsis } from 'polished';
import { useEffect, useState } from 'react';

function CategoryShows({ shows, description }) {
  const [normalShows, setNormalShows] = useState(shows);
  const [showSorted, setShowSorted] = useState(false);
  useEffect(() => {
    setShowSorted(false);
  }, [normalShows, showSorted]);
  const sortFunction = () => {
    const sortedShows = shows.sort((a, b) => {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    setNormalShows(sortedShows);
    setShowSorted(true);
  };
  return (
    <StyledCategoryShows>
      <button
        style={{ fontSize: '16px', backgroundColor: '#4CAF50' }}
        onClick={sortFunction}
      >
        sort
      </button>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        style={{ gridTemplateColumns: 'repeat(12,minmax(250px, 1fr))' }}
      >
        <Row>
          {normalShows.map((show) => (
            <Column key={show.id}>
              <img src={show.images.squareLarge.url} width="100%" />
              <StyledBox width={[1]}>
                {show.name && (
                  <TextWrapper>
                    <Paragraph
                      style={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis',
                      }}
                      text={show.name}
                      variant="l"
                      transparent
                    />
                  </TextWrapper>
                )}
              </StyledBox>
              <StyledBox width={[1]}>
                {show.description && (
                  <Paragraph
                    style={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {show.description}
                  </Paragraph>
                )}
              </StyledBox>
            </Column>
          ))}
        </Row>
      </Flex>
    </StyledCategoryShows>
  );
}

CategoryShows.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      images: PropTypes.shape({
        squareLarge: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    })
  ),
  description: PropTypes.string,
};

CategoryShows.defaultProps = {
  shows: [],
  description: null,
};

export default CategoryShows;
