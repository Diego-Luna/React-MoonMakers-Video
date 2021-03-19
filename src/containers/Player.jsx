/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { getVideoSource } from '../actions';
import Header from '../components/Header';
import '../assets/styles/components/Player.css';
import NotFount from './NotFound';

const Player = (props) => {
  const { id } = props.match.params;
  const hasPlaying = Object.keys(props.playing).length > 0;
  useEffect(() => {
    props.getVideoSource(id);
  },[]);
  // return hasPlaying ? (
  //   <div className='Player'>
  //     <video controls autoPlay>
  //       <source src={props.playing.source} type='video/mp4' />
  //     </video>
  //     <div className='Player-back'>
  //       <button type='button' onClick={() => props.history.goBack()}>
  //         Regresar
  //       </button>
  //     </div>
  //   </div>
  // ) : <NotFound />;
  return !hasPlaying ? <NotFount /> : (
    <div>
      <Header />
      <div className='player'>
        <div className='player-back'>
          <ReactPlayer className='player-video' url={props.playing.source} />
          <button className='button-player' type='button' onClick={() => props.history.goBack()}>
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  getVideoSource: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
