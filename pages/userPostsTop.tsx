import utilStyles from '../styles/utils.module.css'
import { CgProfile } from "react-icons/cg";
import { Img } from 'react-image';
import { IconContext } from "react-icons"

export default function UserPostsTop(props) {

  const json = props.result.Post[0];

  return (
    <><br></br>
      <div className={utilStyles.postImageArea2}>
        <IconContext.Provider value={{ size: '50px' }}>
          <span className={utilStyles.postImageArea2}>
            <Img src={json.userImageUrl}
              loader={<CgProfile />}
              unloader={<CgProfile />} />
          </span >
          <span className={utilStyles.text3}>{json.nickName}</span>
        </IconContext.Provider >
      </div >
    </>)
}
