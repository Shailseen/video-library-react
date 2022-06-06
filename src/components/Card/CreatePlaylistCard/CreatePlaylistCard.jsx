import classNames from 'classnames'
import React from 'react'
import styles from "./CreatePlaylistCard.module.css"

const CreatePlaylistCard = () => {
  return (
    <div className={styles.container}>
        <div className={styles.input_btn_wrapper}>
        <input className={styles.input_playlist_name} type="text" placeholder='Enter playlist name' />
        <button
            className={classNames(
              "button-style-none outline-button",
              styles.btn
            )}
          >
            Log In
          </button>
        </div>
    </div>
  )
}

export default CreatePlaylistCard