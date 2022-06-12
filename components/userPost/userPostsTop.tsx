import utilStyles from '../../styles/utils.module.css'
import userPost from '../../styles/userPost.module.css'
import { CgProfile } from "react-icons/cg";
import { Img } from 'react-image';
import { IconContext } from "react-icons"
import { Row, Col } from 'react-bootstrap'

export default function UserPostsTop(props) {

  const json = props.result.Post[0]

  return (
    <div className={userPost.detailPostTop}>
      <Row >
        <Col xs={6} md={4} className={utilStyles.detailContent}>
          <div>
            <span className={utilStyles.navIcons}>
              <IconContext.Provider value={{ size: '150px' }}>
                <Img src={json.userImageUrl}
                  loader={<CgProfile />}
                  unloader={<CgProfile />} />
              </IconContext.Provider >
            </span >
          </div >
        </Col>
        <Col xs={12} md={8} className={utilStyles.detailContent}>
          <h2>{json.nickName}</h2>
          <span>{json.textProfile}</span>
        </Col >
      </Row >
    </div>
  )
}
