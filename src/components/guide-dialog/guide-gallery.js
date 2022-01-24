import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

export default function GuideGallery({ tutorial }) {
  const [currentid, setCurrentid] = useState(0);

  return (
    <Container>
      <div className="gallery">
        <div className="gallery-imgs">
          {tutorial.map((e, index) => {
            let galleryIdType;

            if (index === currentid) {
              galleryIdType = 'curent';
            } else if (index > currentid) {
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
          {currentid > 0 && (
            <div className="left-arrow" onClick={() => setCurrentid(currentid - 1)}>
              <ArrowBack />
            </div>
          )}

          {currentid < tutorial.length - 1 && (
            <div className="right-arrow" onClick={() => setCurrentid(currentid + 1)}>
              <ArrowForward />
            </div>
          )}
        </div>
      </div>
      <div className="content">{tutorial[currentid] ? tutorial[currentid].desc : ''}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 26px;
  width: 80vw;
  height: 80vh;
  background: #fff;

  ${(props) => props.theme.breakpoints.down('sm')} {
    width: calc(100vw - 64px);
    height: calc(100vh - 64px);
  }

  .gallery {
    position: relative;
    flex: 1;
    margin-bottom: 26px;
    background-color: #eee;
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
    color: #fff;
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
    border-top: #ddd solid 1px;
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
