import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

export default function GuideGallery({ tutorial }) {
  const [currentId, setCurrentId] = useState(0);

  return (
    <Container>
      <div className="gallery">
        <div className="steps-mark">{`${currentId + 1} / ${tutorial.length}`}</div>
        <div className="gallery-imgs">
          {tutorial.map((e, index) => {
            let galleryIdType;

            if (index === currentId) {
              galleryIdType = 'curent';
            } else if (index > currentId) {
              galleryIdType = 'before';
            } else {
              galleryIdType = 'after';
            }

            return (
              // eslint-disable-next-line react/no-array-index-key
              <div className={`gallery-page ${galleryIdType}`} key={index}>
                <img src={e.pic} alt={e.desc} />
              </div>
            );
          })}
        </div>

        <div className="arrow-content">
          {currentId > 0 && (
            <div className="left-arrow" onClick={() => setCurrentId(currentId - 1)}>
              <ArrowBack />
            </div>
          )}

          {currentId < tutorial.length - 1 && (
            <div className="right-arrow" onClick={() => setCurrentId(currentId + 1)}>
              <ArrowForward />
            </div>
          )}
        </div>
      </div>
      <div className="content">{tutorial[currentId] ? tutorial[currentId].desc : ''}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 26px;
  background: ${(props) => props.theme.palette.common.white};

  .gallery {
    position: relative;
    flex: 1;
    margin-bottom: 26px;
    background-color: ${(props) => props.theme.palette.grey[200]};
    .gallery-imgs {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .gallery-page {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all ease 0.2s;
      &.curent {
        transform: translate(0, 0);
      }
      &.before {
        transform: translate(100%, 0);
      }
      &.after {
        transform: translate(-100%, 0);
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
      user-select: none;
    }
  }

  .steps-mark {
    position: absolute;
    left: 0;
    top: 0;
    padding: 4px 10px;
    font-size: 16px;
    color: ${(props) => props.theme.palette.common.white};
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }

  .arrow-content {
    display: flex;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
  }
  .left-arrow,
  .right-arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.palette.common.white};
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 26px;
    font-size: 18px;
    cursor: pointer;
    transition: all ease 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
  .right-arrow {
    margin-left: auto;
  }
  .content {
    padding-top: 26px;
    border-top: ${(props) => props.theme.palette.grey[300]} solid 1px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
`;

GuideGallery.propTypes = {
  tutorial: PropTypes.array,
};

GuideGallery.defaultProps = {
  tutorial: [],
};
